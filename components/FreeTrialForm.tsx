'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/gtag'

export function FreeTrialForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') || '')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'free-trial' }),
      })

      if (!response.ok) throw new Error('Subscribe failed')

      trackEvent('email_signup', {
        method: 'free_trial_form',
        page_path: '/free-trial',
      })
      setStatus('success')
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="block text-sm font-semibold text-slate-700" htmlFor="email">Email address</label>
      <div className="mt-2 flex gap-2">
        <input id="email" name="email" type="email" required placeholder="you@example.com" className="min-w-0 flex-1 rounded-full border border-slate-300 px-4 py-3" />
        <button disabled={status === 'submitting'} className="rounded-full bg-ink px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
          {status === 'submitting' ? 'Joining...' : 'Join trial'}
        </button>
      </div>
      {status === 'success' ? <p className="mt-3 text-sm font-medium text-success">You are on the trial list. Check your inbox for next steps.</p> : null}
      {status === 'error' ? <p className="mt-3 text-sm font-medium text-red-600">Something went wrong. Please try again.</p> : null}
    </form>
  )
}
