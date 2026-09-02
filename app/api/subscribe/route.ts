import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
})

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || ''
  const body = contentType.includes('application/json')
    ? await request.json().catch(() => ({}))
    : Object.fromEntries(Array.from((await request.formData()).entries()).map(([key, value]) => [key, String(value)]))

  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })

  const webhook = process.env.EMAIL_CAPTURE_WEBHOOK_URL
  if (webhook) {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...parsed.data, createdAt: new Date().toISOString() }),
    })
  }

  return NextResponse.json({ ok: true })
}
