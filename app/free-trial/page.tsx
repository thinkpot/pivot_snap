import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata('/free-trial')

export default function FreeTrialPage() {
  const page = getArchitecturePage('/free-trial')!
  return (
    <main>
      <Breadcrumbs items={[{ name: 'Free trial', href: '/free-trial' }]} />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-black text-ink md:text-5xl">{page.h1}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{page.description}</p>
          <form action="/api/subscribe" method="post" className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700" htmlFor="email">Email address</label>
            <div className="mt-2 flex gap-2">
              <input id="email" name="email" type="email" required placeholder="you@example.com" className="min-w-0 flex-1 rounded-full border border-slate-300 px-4 py-3" />
              <button className="rounded-full bg-ink px-5 py-3 font-semibold text-white">Join trial</button>
            </div>
          </form>
        </div>
        <PlaceholderImage label="Free trial onboarding screenshot" alt="free TradingView indicator trial setup screenshot placeholder" />
      </section>
    </main>
  )
}
