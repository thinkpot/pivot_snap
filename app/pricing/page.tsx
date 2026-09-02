import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = generateSeoMetadata('/pricing')

const plans = [
  { name: 'Starter', price: '$29/mo', features: ['TradingView access', 'Core reversal signals', 'Email support'] },
  { name: 'Pro', price: '$59/mo', features: ['All Starter features', 'Advanced alerts', 'Priority support'] },
]

export default function PricingPage() {
  const page = getArchitecturePage('/pricing')!
  return (
    <main>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'PivotSnap TradingView Indicator',
        description: page.description,
        brand: { '@type': 'Brand', name: 'PivotSnap' },
        offers: { '@type': 'AggregateOffer', lowPrice: '29', highPrice: '59', priceCurrency: 'USD', url: absoluteUrl('/pricing') },
      }} />
      <Breadcrumbs items={[{ name: 'Pricing', href: '/pricing' }]} />
      <section className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h1 className="text-4xl font-black text-ink md:text-5xl">{page.h1}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">{page.description}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.name} className="rounded-3xl border border-slate-200 p-8 text-left shadow-sm">
              <h2 className="text-2xl font-bold text-ink">{plan.name}</h2>
              <p className="mt-4 text-4xl font-black">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-slate-600">{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
              <Link href="/free-trial" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-semibold text-white">Start free trial</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
