import type { Metadata } from 'next'
import { SpecularButton } from '@/components/ui/specular-button'
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
          <h1 className="text-4xl font-black text-white md:text-5xl">{page.h1}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">{page.description}</p>
          <SpecularButton href="/demo" variant="bull" className="mt-8">Watch the demo</SpecularButton>
        </div>
        <PlaceholderImage label="Signal logic walkthrough" alt="entry exit indicator signal logic chart placeholder" />
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"><h2 className="text-xl font-bold text-white">Entry confirmations</h2><p className="mt-3 text-slate-400">Reversal context, reaction entries, and confirmation filters help traders avoid chasing every move.</p></article>
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"><h2 className="text-xl font-bold text-white">Exit planning</h2><p className="mt-3 text-slate-400">Use exit cues with your own risk rules, stops, and position management process.</p></article>
          <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"><h2 className="text-xl font-bold text-white">TradingView alerts</h2><p className="mt-3 text-slate-400">Configure TradingView alerts so signals fit your workflow without watching every candle.</p></article>
        </div>
      </section>
    </main>
  )
}
