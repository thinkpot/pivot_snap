'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/gtag'

type CheckoutButtonProps = {
  label?: string
  planName?: string
}

export function CheckoutButton({ label = 'Start checkout', planName = 'default' }: CheckoutButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  async function startCheckout() {
    setStatus('loading')
    trackEvent('checkout_started', {
      plan_name: planName,
        purchase_type: 'one_time',
        value: 10,
        currency: 'USD',
      page_path: '/pricing',
    })

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const data = (await response.json()) as { url?: string; error?: string }
      if (!response.ok || !data.url) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <button onClick={startCheckout} disabled={status === 'loading'} className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'loading' ? 'Starting checkout...' : label}
      </button>
      {status === 'error' ? <p className="mt-3 text-sm text-red-600">Checkout is not configured yet. Please contact support or try again later.</p> : null}
    </div>
  )
}
