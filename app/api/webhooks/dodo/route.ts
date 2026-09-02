import { promises as fs } from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Webhook } from 'standardwebhooks'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type DodoWebhookPayload = {
  type?: string
  payload_type?: string
  data?: {
    customer?: { email?: string; name?: string }
    customer_email?: string
    email?: string
    payment_id?: string
    checkout_session_id?: string
    total_amount?: number
    currency?: string
    status?: string
    metadata?: Record<string, unknown>
  }
  customer?: { email?: string; name?: string }
  customer_email?: string
  email?: string
  payment_id?: string
  checkout_session_id?: string
  total_amount?: number
  currency?: string
  status?: string
  metadata?: Record<string, unknown>
}

function headerValue(headers: Headers, name: string) {
  return headers.get(name) || headers.get(name.toLowerCase()) || ''
}

function getEventType(payload: DodoWebhookPayload) {
  return payload.type || payload.payload_type || ''
}

function isSuccessfulPaymentEvent(payload: DodoWebhookPayload) {
  const eventType = getEventType(payload).toLowerCase()
  const status = String(payload.data?.status || payload.status || '').toLowerCase()

  return (
    eventType.includes('payment.succeeded') ||
    eventType.includes('payment_succeeded') ||
    (eventType.includes('payment') && status === 'succeeded')
  )
}

function getBuyerEmail(payload: DodoWebhookPayload) {
  return (
    payload.data?.customer?.email ||
    payload.data?.customer_email ||
    payload.data?.email ||
    payload.customer?.email ||
    payload.customer_email ||
    payload.email ||
    ''
  )
}

async function logPurchase(record: Record<string, unknown>) {
  const line = `${JSON.stringify(record)}\n`
  const runtimeLogPath = path.join('/tmp', 'pivotsnap-dodo-purchases.jsonl')
  await fs.appendFile(runtimeLogPath, line, 'utf-8')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildDeliveryContent() {
  const pineScriptCode = process.env.PINE_SCRIPT_CODE
  const deliveryUrl = process.env.PINE_SCRIPT_DELIVERY_URL || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://pivotsnap.tech'}/tradingview-script`

  if (pineScriptCode && pineScriptCode !== 'replace_me_with_actual_pine_script_or_use_delivery_url') {
    return {
      text: `Here is your PivotSnap Pine Script code:\n\n${pineScriptCode}`,
      html: `<p>Here is your PivotSnap Pine Script code:</p><pre style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.6;">${escapeHtml(pineScriptCode)}</pre>`,
    }
  }

  return {
    text: `Your PivotSnap Pine Script code/access instructions are available here: ${deliveryUrl}`,
    html: `<p>Your PivotSnap Pine Script code or secure access instructions are available here:</p><p><a href="${escapeHtml(deliveryUrl)}">${escapeHtml(deliveryUrl)}</a></p>`,
  }
}

async function sendDeliveryEmail(payload: { email: string; eventId: string; purchasedAt: string }) {
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'code@pivotsnap.tech'
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@pivotsnap.tech'

  if (!resendApiKey || resendApiKey === 'replace_me_resend_api_key') {
    console.warn('RESEND_API_KEY is not configured; Dodo purchase delivery email was not sent automatically.', payload)
    return
  }

  const resend = new Resend(resendApiKey)
  const deliveryContent = buildDeliveryContent()
  const subject = 'Your PivotSnap TradingView Indicator code'

  await resend.emails.send({
    from: `PivotSnap <${fromEmail}>`,
    to: payload.email,
    subject,
    text: [
      'Thank you for purchasing PivotSnap.',
      '',
      'PivotSnap is a TradingView reversal, entry, exit, and buy/sell signal indicator for technical-analysis workflows.',
      '',
      deliveryContent.text,
      '',
      'Setup instructions:',
      '1. Open TradingView and go to Pine Editor.',
      '2. Paste the PivotSnap Pine Script code or follow the secure access link instructions.',
      '3. Save the script and add it to your chart.',
      '',
      `If you have any issues, contact support at ${supportEmail}.`,
      '',
      `Purchase reference: ${payload.eventId}`,
      `Purchase time: ${payload.purchasedAt}`,
    ].join('\n'),
    html: `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px;margin:0 auto;">
        <h1 style="font-size:24px;margin-bottom:12px;">Thank you for purchasing PivotSnap</h1>
        <p>PivotSnap is a TradingView reversal, entry, exit, and buy/sell signal indicator for technical-analysis workflows.</p>
        ${deliveryContent.html}
        <h2 style="font-size:18px;margin-top:24px;">Setup instructions</h2>
        <ol>
          <li>Open TradingView and go to Pine Editor.</li>
          <li>Paste the PivotSnap Pine Script code or follow the secure access link instructions.</li>
          <li>Save the script and add it to your chart.</li>
        </ol>
        <p>If you have any issues, contact support at <a href="mailto:${escapeHtml(supportEmail)}">${escapeHtml(supportEmail)}</a>.</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
        <p style="font-size:12px;color:#64748b;">Purchase reference: ${escapeHtml(payload.eventId)}<br />Purchase time: ${escapeHtml(payload.purchasedAt)}</p>
        <p style="font-size:12px;color:#64748b;">Trading involves risk. PivotSnap is software and educational content only, not financial advice.</p>
      </div>
    `,
  })
}

export async function POST(request: Request) {
  const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY

  if (!webhookKey) {
    return NextResponse.json({ error: 'Dodo webhook key is not configured' }, { status: 500 })
  }

  const rawBody = await request.text()
  const webhook = new Webhook(webhookKey)

  let payload: DodoWebhookPayload

  try {
    payload = webhook.verify(rawBody, {
      'webhook-id': headerValue(request.headers, 'webhook-id'),
      'webhook-timestamp': headerValue(request.headers, 'webhook-timestamp'),
      'webhook-signature': headerValue(request.headers, 'webhook-signature'),
    }) as DodoWebhookPayload
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid Dodo webhook signature'
    return NextResponse.json({ error: message }, { status: 401 })
  }

  if (isSuccessfulPaymentEvent(payload)) {
    const email = getBuyerEmail(payload)
    const purchasedAt = new Date().toISOString()
    const eventId = headerValue(request.headers, 'webhook-id') || payload.data?.payment_id || payload.payment_id || 'unknown'

    if (email) {
      await logPurchase({
        provider: 'dodo_payments',
        email,
        purchased_at: purchasedAt,
        dodo_event_id: eventId,
        payment_id: payload.data?.payment_id || payload.payment_id,
        checkout_session_id: payload.data?.checkout_session_id || payload.checkout_session_id,
        amount_total: payload.data?.total_amount || payload.total_amount,
        currency: payload.data?.currency || payload.currency,
        status: payload.data?.status || payload.status,
        metadata: payload.data?.metadata || payload.metadata,
      })
      await sendDeliveryEmail({ email, eventId, purchasedAt })
    } else {
      console.warn('Dodo successful payment webhook did not include a buyer email.', { eventId })
    }
  }

  return NextResponse.json({ received: true })
}
