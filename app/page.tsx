import Link from 'next/link'
import Image from 'next/image'
import { SpecularButton } from '@/components/ui/specular-button'
import { GradientWaves } from '@/components/ui/gradient-waves'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = generateSeoMetadata('/')

const stats = [
  ['3-step', 'signal workflow'],
  ['$10', 'one-time purchase'],
  ['Email', 'Pine Script delivery'],
]

const featureCards = [
  {
    eyebrow: 'Reversal context',
    title: 'Spot structure shifts without cluttering your chart.',
    description:
      'PivotSnap is built for traders who want quick visual context around potential reversal zones, entries, exits, and buy/sell signals inside TradingView.',
  },
  {
    eyebrow: 'Entry discipline',
    title: 'Turn "maybe" setups into a repeatable checklist.',
    description:
      'Use signal conditions as a consistent prompt to review trend, market structure, invalidation, and risk before you take a trade.',
  },
  {
    eyebrow: 'Simple ownership',
    title: 'Buy once, receive the script, and keep your workflow lean.',
    description:
      'No bloated dashboard or subscription maze. Purchase once for $10 and follow the setup email to add PivotSnap to TradingView.',
  },
]

const workflow = [
  ['01', 'Load PivotSnap', 'Add the Pine Script indicator to your TradingView chart and choose the market/timeframe you already trade.'],
  ['02', 'Wait for alignment', 'Watch for reversal, entry, exit, and buy/sell conditions to line up with your own trading plan.'],
  ['03', 'Execute with rules', 'Use your risk model, stop placement, and confirmation checklist. PivotSnap supports decisions; it does not replace them.'],
]

const useCases = ['Forex reversals', 'Crypto swing entries', 'Indices sessions', 'Stock pullbacks']

export default function HomePage() {
  const page = getArchitecturePage('/')!

  return (
    <main className="overflow-hidden bg-[#080b12] text-slate-200">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.baseUrl,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.name,
          url: siteConfig.baseUrl,
        }}
      />

      {/* ── Hero (heading, copy, CTAs and chart all fit the viewport below the header — no scroll needed) ── */}
      <section className="relative flex min-h-[calc(100svh-72px)] flex-col justify-center overflow-hidden px-4 py-4">
        {/* Animated wave background */}
        <div className="pointer-events-none absolute inset-0">
          <GradientWaves className="h-full w-full" />
        </div>
        {/* Fade to page background at the edges so the wave doesn't hard-cut */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080b12]/10 via-transparent to-[#080b12]" />

        <div className="relative mx-auto grid w-full max-w-[90rem] items-center gap-5 md:grid-cols-[1fr_1.25fr] md:gap-8 lg:gap-12">
          {/* Copy */}
          <div className="mx-auto flex max-w-xl animate-fade-up flex-col items-center text-center md:mx-0 md:items-start md:text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur md:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bull opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-bull" />
              </span>
              TradingView reversal indicator for active traders
            </div>

            {/* Heading */}
            <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.08]">
              Spot reversals.{' '}
              <span className="text-bull">Enter with confidence.</span>
            </h1>

            {/* Subheading */}
            <p className="mt-3 text-balance text-sm font-medium leading-6 text-slate-400 md:text-base md:leading-7">
              {page.description} Built as a clean SaaS-quality product page for traders who want faster setup review without overpromised outcomes.
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <SpecularButton href="/pricing" variant="bull" size="md">
                Buy PivotSnap for $10
                <span aria-hidden="true">→</span>
              </SpecularButton>
              <SpecularButton href="/demo" variant="outline" size="md">
                ▶ Watch Demo
              </SpecularButton>
            </div>

            <p className="mt-3 hidden text-xs font-medium text-slate-500 sm:block md:text-sm">Educational trading tool. No profit guarantees. Always manage risk.</p>
          </div>

          {/* Chart screenshot */}
          <div className="relative mx-auto w-full max-w-[18rem] animate-fade-up animation-delay-200 sm:max-w-md md:max-w-none">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-b from-bull/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1017] p-1.5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] md:rounded-3xl md:p-2">
              <Image
                src="/chart/pivotsnap_indicator.png"
                alt="PivotSnap Indicator on TradingView"
                width={1600}
                height={900}
                className="w-full h-auto rounded-xl md:rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-white/[0.06] bg-[#0a0e15] px-4 py-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
              <p className="text-4xl font-extrabold tracking-tight text-bull">{value}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why PivotSnap ── */}
      <section className="relative px-4 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:260px_100%]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-end gap-8 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-bull">Why PivotSnap</p>
              <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.04em] text-white md:text-6xl">
                A polished trading tool page with real product substance.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-400">
              The homepage now presents PivotSnap like a focused SaaS product: clear positioning, visual proof, workflow, use cases, and risk-aware conversion paths to demo and pricing.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featureCards.map((feature, index) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition duration-300 hover:-translate-y-2 hover:border-bull/20 hover:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bull/10 text-lg font-extrabold text-bull">
                  {index + 1}
                </div>
                <p className="mt-7 text-sm font-bold uppercase tracking-[0.22em] text-bull">{feature.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white">{feature.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual system ── */}
      <section className="bg-[#0a0e15] px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c1017] p-1.5 shadow-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-bull/5 to-bear/5" />
            <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#080b12] p-5 text-white">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div>
                  <p className="text-sm font-bold text-white">PivotSnap chart preview</p>
                  <p className="text-xs text-slate-500">BTCUSD · 1H · TradingView</p>
                </div>
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-400">Replay</span>
              </div>
              <div className="relative mt-10 h-72">
                <div className="absolute inset-x-0 top-10 h-px bg-white/[0.04]" />
                <div className="absolute inset-x-0 top-28 h-px bg-white/[0.04]" />
                <div className="absolute inset-x-0 top-48 h-px bg-white/[0.04]" />
                <div className="absolute left-0 right-0 top-12 h-40 rounded-full bg-bull/5 blur-3xl" />
                <svg viewBox="0 0 620 260" className="relative h-full w-full overflow-visible" aria-hidden="true">
                  <path d="M5 180 C 70 130, 116 205, 180 150 S 295 67, 365 112 S 470 210, 610 80" fill="none" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
                  <path d="M5 205 C 80 170, 130 222, 196 172 S 312 94, 380 140 S 488 232, 610 111" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="10 12" strokeLinecap="round" opacity="0.7" />
                  {[52, 108, 174, 238, 302, 368, 438, 506, 574].map((x, index) => (
                    <g key={x} transform={`translate(${x} ${index % 2 ? 132 : 164})`}>
                      <rect x="-6" y="-34" width="12" height="68" rx="6" fill={index % 3 === 0 ? '#22c55e' : '#ef4444'} opacity="0.85" />
                      <line y1="-48" y2="48" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" />
                    </g>
                  ))}
                </svg>
                <div className="absolute left-14 top-6 animate-float rounded-xl border border-bull/30 bg-bull/10 px-4 py-2 text-sm font-bold text-bull">BUY</div>
                <div className="absolute bottom-8 right-16 animate-float animation-delay-300 rounded-xl border border-bear/30 bg-bear/10 px-4 py-2 text-sm font-bold text-bear">EXIT</div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {['Trend check', 'Reversal zone', 'Exit plan'].map((item) => (
                  <div key={item} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="h-2 w-16 rounded-full bg-bull/40" />
                    <p className="mt-3 text-sm font-semibold text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-bull">Visual system</p>
            <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.04em] text-white md:text-6xl">Charts should feel usable, not overwhelming.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              PivotSnap&apos;s website now supports the product story with dashboard-style visuals and custom UI motifs. These are SVG/CSS mockups today, and can later be replaced with real TradingView screenshots or generated product imagery.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {useCases.map((item) => (
                <div key={item} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 font-semibold text-slate-300">
                  <span className="text-bull">✓</span> {item}
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <SpecularButton href="/how-it-works" variant="bull">
                See how it works
              </SpecularButton>
              <SpecularButton href="/tradingview-script" variant="outline">
                TradingView script details
              </SpecularButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow ── */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-bull">Workflow</p>
            <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.04em] text-white md:text-6xl">From chart noise to a cleaner decision loop.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {workflow.map(([step, title, description]) => (
              <div key={step} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition hover:border-bull/20">
                <p className="text-5xl font-extrabold tracking-tight text-white/10">{step}</p>
                <h3 className="mt-8 text-2xl font-extrabold text-white">{title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Offer ── */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bull/20 to-bull/5 p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-bull/10 blur-3xl" />
            <p className="relative text-sm font-bold uppercase tracking-[0.24em] text-bull">Offer</p>
            <h2 className="relative mt-4 text-5xl font-extrabold tracking-[-0.05em] text-white">$10 once.</h2>
            <p className="relative mt-4 text-lg font-medium leading-8 text-slate-300">Get PivotSnap delivered by email and start testing it inside your own TradingView setup.</p>
            <SpecularButton href="/pricing" variant="bull" size="lg" className="mt-8">
              Buy now
            </SpecularButton>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Included', 'Pine Script delivery, setup email, and beginner-friendly instructions.'],
              ['Built for', 'Traders who want clearer reversal, entry, exit, and buy/sell signal context.'],
              ['Not included', 'No managed account, financial advice, or guaranteed trading performance.'],
              ['Next step', 'Watch the demo first if you want to preview the workflow before checkout.'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h3 className="text-xl font-extrabold text-white">{title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
