'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/gtag'

export function DemoVideo() {
  const [played, setPlayed] = useState(false)

  function handlePlay() {
    if (!played) {
      trackEvent('demo_view', {
        page_path: '/demo',
        video_name: 'PivotSnap TradingView demo placeholder',
      })
      setPlayed(true)
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-ink shadow-xl">
      <div className="aspect-video bg-gradient-to-br from-ink via-slate-900 to-teal-900 p-8 text-white">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Demo video placeholder</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-black md:text-4xl">Watch PivotSnap identify reversal and entry/exit zones on a TradingView chart.</h2>
          <p className="mt-4 max-w-xl text-slate-300">Replace this placeholder with the real embedded video URL when ready.</p>
          <button onClick={handlePlay} className="mt-8 rounded-full bg-accent px-6 py-3 font-semibold text-ink hover:bg-sky-300">
            {played ? 'Demo view tracked' : 'Play demo preview'}
          </button>
        </div>
      </div>
    </div>
  )
}
