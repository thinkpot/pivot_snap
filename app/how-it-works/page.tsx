import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata('/how-it-works')

export default function HowItWorksPage() {
  const page = getArchitecturePage('/how-it-works')!
  return (
    <main>
      <Breadcrumbs items={[{ name: 'How it works', href: '/how-it-works' }]} />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-black text-ink md:text-5xl">{page.h1}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{page.description}</p>
          <Link href="/free-trial" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-semibold text-white">Try the indicator free</Link>
        </div>
        <PlaceholderImage label="Signal logic walkthrough" alt="entry exit indicator signal logic chart placeholder" />
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border p-6"><h2 className="text-xl font-bold">Entry confirmations</h2><p className="mt-3 text-slate-600">Reversal context, reaction entries, and confirmation filters help traders avoid chasing every move.</p></article>
          <article className="rounded-2xl border p-6"><h2 className="text-xl font-bold">Exit planning</h2><p className="mt-3 text-slate-600">Use exit cues with your own risk rules, stops, and position management process.</p></article>
          <article className="rounded-2xl border p-6"><h2 className="text-xl font-bold">TradingView alerts</h2><p className="mt-3 text-slate-600">Configure TradingView alerts so signals fit your workflow without watching every candle.</p></article>
        </div>
      </section>
    </main>
  )
}
