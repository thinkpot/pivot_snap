import { promises as fs } from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function logPurchase(record: Record<string, unknown>) {
  const line = `${JSON.stringify(record)}\n`

  // On Vercel/serverless, /tmp is ephemeral. Replace this with durable storage
  // such as Supabase, Neon, Airtable, or a CRM once selected.
  const runtimeLogPath = path.join('/tmp', 'pivotsnap-purchases.jsonl')
  await fs.appendFile(runtimeLogPath, line, 'utf-8')
}

async function sendDeliveryEmail(payload: { email: string; sessionId: string; purchasedAt: string }) {
  const webhookUrl = process.env.EMAIL_CAPTURE_WEBHOOK_URL
  const deliveryUrl = process.env.PINE_SCRIPT_DELIVERY_URL || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://pivotsnap.tech'}/tradingview-script`

  if (!webhookUrl) {
    console.warn('EMAIL_CAPTURE_WEBHOOK_URL is not configured; purchase delivery email was not sent automatically.', payload)
    return
  }

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_type: 'pivotsnap_purchase_completed',
      to: payload.email,
      subject: 'Your PivotSnap TradingView Indicator access',
      message: `Thanks for purchasing PivotSnap. Access your Pine Script code or setup instructions here: ${deliveryUrl}`,
      delivery_url: deliveryUrl,
      stripe_checkout_session_id: payload.sessionId,
      purchased_at: payload.purchasedAt,
    }),
  })
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 500 })
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion })
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
  }

  const rawBody = await request.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid webhook signature'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const buyerEmail = session.customer_details?.email || session.customer_email
    const purchasedAt = new Date().toISOString()

    if (buyerEmail) {
      const record = {
        email: buyerEmail,
        purchased_at: purchasedAt,
        stripe_checkout_session_id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
        product: session.metadata?.product || 'PivotSnap TradingView Indicator',
      }

      await logPurchase(record)
      await sendDeliveryEmail({ email: buyerEmail, sessionId: session.id, purchasedAt })
    } else {
      console.warn('Stripe checkout.session.completed did not include a buyer email.', { sessionId: session.id })
    }
  }

  return NextResponse.json({ received: true })
}
