import type { Metadata } from 'next'
import { PricingViewEvent } from '@/components/AnalyticsEvents'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { WhopEmbed } from '@/components/WhopEmbed'
import { JsonLd } from '@/components/JsonLd'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = generateSeoMetadata('/pricing')

const included = [
  'PivotSnap TradingView Pine Script code delivered by email after purchase',
  'One-time $10 USD payment — no monthly subscription and no recurring billing',
  'Setup instructions for adding the indicator to your TradingView Pine Editor',
  'Reversal, entry, exit, and buy/sell signal logic for technical-analysis workflows',
  'Future setup notes and documentation updates while the product evolves',
]

export default function PricingPage() {
  const page = getArchitecturePage('/pricing')!
  return (
    <main>
      <PricingViewEvent />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'PivotSnap TradingView Indicator',
        description: 'PivotSnap is a TradingView reversal, entry, exit, and buy/sell signal indicator delivered by email after a one-time $10 purchase.',
        brand: { '@type': 'Brand', name: 'PivotSnap' },
        offers: {
          '@type': 'Offer',
          price: '10.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: absoluteUrl('/pricing'),
        },
      }} />
      <Breadcrumbs items={[{ name: 'Pricing', href: '/pricing' }]} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">One-time purchase</p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">{page.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Buy PivotSnap for a single $10 USD payment. No subscription, no recurring billing — the TradingView Pine Script access details are delivered by email after purchase.
          </p>
        </div>

        <article className="mx-auto mt-10 max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-3xl font-black text-ink">PivotSnap</h2>
              <p className="mt-2 text-slate-600">TradingView reversal and entry/exit indicator</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-6 py-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">One-time</p>
              <p className="text-5xl font-black text-ink">$10</p>
              <p className="text-sm text-slate-500">USD</p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-8">
            <h3 className="text-xl font-bold text-ink">What is included</h3>
            <ul className="mt-5 space-y-3 text-slate-700">
              {included.map((feature) => <li key={feature}>✓ {feature}</li>)}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            PivotSnap is technical-analysis software only. It does not provide financial advice, execute trades, manage funds, or guarantee trading results.
          </div>

          <WhopEmbed planId={process.env.NEXT_PUBLIC_WHOP_PLAN_ID || ''} returnUrl="https://pivotsnap.tech/demo?checkout=success" />
          <p className="mt-4 text-sm text-slate-500">
            After payment, check your email for delivery instructions and the Pine Script access link/code.
          </p>
        </article>
      </section>
    </main>
  )
}
