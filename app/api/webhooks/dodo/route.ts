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
  console.log('Dodo purchase logged for PivotSnap fulfillment.', {
    email: record.email,
    purchased_at: record.purchased_at,
    product: record.metadata || record.product || 'PivotSnap TradingView Indicator',
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

async function sendDeliveryEmail(payload: { email: string; eventId: string; purchasedAt: string }) {
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'code@pivotsnap.tech'
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@pivotsnap.tech'

  if (!resendApiKey || resendApiKey === 'replace_me_resend_api_key') {
    console.warn('RESEND_API_KEY is not configured; Dodo purchase welcome email was not sent automatically.', payload)
    return
  }

  const resend = new Resend(resendApiKey)
  const subject = 'Welcome to PivotSnap — setup instructions'

  await resend.emails.send({
    from: `PivotSnap <${fromEmail}>`,
    to: payload.email,
    subject,
    text: [
      'Thank you for purchasing PivotSnap.',
      '',
      'Your PivotSnap Pine Script/code file is delivered separately by Dodo Payments as a product attachment. Please check your inbox for an email from Dodo Payments, and check spam/promotions if you do not see it.',
      '',
      'Setup instructions:',
      '1. Download the PivotSnap code file from the Dodo Payments delivery email.',
      '2. Open TradingView in your browser.',
      '3. Open a chart, then open the Pine Editor panel at the bottom of TradingView.',
      '4. Open the downloaded file, copy the Pine Script code, and paste it into Pine Editor.',
      '5. Click Save, then click Add to chart.',
      '6. Configure alerts/settings based on your own trading workflow and risk rules.',
      '',
      `If you have any issues, contact support at ${supportEmail}.`,
      '',
      `Purchase reference: ${payload.eventId}`,
      `Purchase time: ${payload.purchasedAt}`,
      '',
      'Trading involves risk. PivotSnap is software and educational content only, not financial advice.',
    ].join('\n'),
    html: `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:640px;margin:0 auto;">
        <h1 style="font-size:24px;margin-bottom:12px;">Thank you for purchasing PivotSnap</h1>
        <p>Your PivotSnap Pine Script/code file is delivered separately by <strong>Dodo Payments</strong> as a product attachment.</p>
        <p>Please check your inbox for an email from Dodo Payments. If you do not see it, check spam, promotions, or any filtered folders.</p>
        <h2 style="font-size:18px;margin-top:24px;">Setup instructions</h2>
        <ol>
          <li>Download the PivotSnap code file from the Dodo Payments delivery email.</li>
          <li>Open TradingView in your browser.</li>
          <li>Open a chart, then open the Pine Editor panel at the bottom of TradingView.</li>
          <li>Open the downloaded file, copy the Pine Script code, and paste it into Pine Editor.</li>
          <li>Click Save, then click Add to chart.</li>
          <li>Configure alerts/settings based on your own trading workflow and risk rules.</li>
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
    console.log('Dodo webhook signature verification passed.', {
      event_id: headerValue(request.headers, 'webhook-id') || 'unknown',
      event_type: getEventType(payload) || 'unknown',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid Dodo webhook signature'
    console.warn('Dodo webhook signature verification failed; fulfillment skipped.', { error: message })
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
      console.log('PivotSnap Dodo welcome/setup email triggered.', {
        email,
        event_id: eventId,
        purchased_at: purchasedAt,
        product: 'PivotSnap TradingView Indicator',
      })
    } else {
      console.warn('Dodo successful payment webhook did not include a buyer email.', { eventId })
    }
  }

  return NextResponse.json({ received: true })
}
