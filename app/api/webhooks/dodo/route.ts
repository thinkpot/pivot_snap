import { promises as fs } from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
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

async function sendDeliveryEmail(payload: { email: string; eventId: string; purchasedAt: string }) {
  const webhookUrl = process.env.EMAIL_CAPTURE_WEBHOOK_URL
  const deliveryUrl = process.env.PINE_SCRIPT_DELIVERY_URL || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://pivotsnap.tech'}/tradingview-script`

  if (!webhookUrl) {
    console.warn('EMAIL_CAPTURE_WEBHOOK_URL is not configured; Dodo purchase delivery email was not sent automatically.', payload)
    return
  }

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_type: 'pivotsnap_dodo_purchase_completed',
      provider: 'dodo_payments',
      to: payload.email,
      subject: 'Your PivotSnap TradingView Indicator access',
      message: `Thanks for purchasing PivotSnap. Access your Pine Script code or setup instructions here: ${deliveryUrl}`,
      delivery_url: deliveryUrl,
      dodo_event_id: payload.eventId,
      purchased_at: payload.purchasedAt,
    }),
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
