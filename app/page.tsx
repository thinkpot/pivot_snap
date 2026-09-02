import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = generateSeoMetadata('/')

export default function HomePage() {
  const page = getArchitecturePage('/')!
  return (
    <main>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.baseUrl,
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.baseUrl,
      }} />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">TradingView Indicator</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-ink md:text-6xl">{page.h1}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{page.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/free-trial" className="rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-slate-700">Start free trial</Link>
            <Link href="/how-it-works" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-ink hover:bg-slate-50">See how it works</Link>
          </div>
        </div>
        <PlaceholderImage priority label="Hero chart screenshot" alt="TradingView reversal indicator chart screenshot placeholder" />
      </section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {page.secondaryKeywords.map((keyword) => (
            <div key={keyword} className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-ink">{keyword}</h2>
              <p className="mt-3 text-slate-600">Build content and product proof around {keyword} without overpromising trading outcomes.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
