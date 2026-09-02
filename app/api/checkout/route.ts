import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email().optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid checkout request' }, { status: 400 })

  const secretKey = process.env.STRIPE_SECRET_KEY
  const priceId = process.env.STRIPE_PRICE_ID
  if (!secretKey || !priceId) {
    return NextResponse.json({ error: 'Stripe test keys are not configured' }, { status: 500 })
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion })
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://pivotsnap.tech'
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: parsed.data.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/free-trial?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=cancelled`,
  })

  return NextResponse.json({ url: session.url })
}
