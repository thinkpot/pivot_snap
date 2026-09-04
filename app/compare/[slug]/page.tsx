import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CTA } from '@/components/CTA'
import { PlaceholderImage } from '@/components/PlaceholderImage'

const comparePages = {
  'trendspider-vs-tradingview': {
    title: 'TrendSpider vs TradingView Indicators',
    description: 'Compare TrendSpider and TradingView indicator workflows for reversal alerts and trade planning.',
    h1: 'TrendSpider vs TradingView Indicators',
  },
  'luxalgo-vs-pivotsnap': {
    title: 'LuxAlgo vs PivotSnap',
    description: 'Compare LuxAlgo-style charting workflows with PivotSnap TradingView reversal signals.',
    h1: 'LuxAlgo vs PivotSnap',
  },
} as const

type CompareSlug = keyof typeof comparePages

export function generateStaticParams() {
  return Object.keys(comparePages).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = comparePages[params.slug as CompareSlug]
  if (!page) return {}
  return { title: page.title, description: page.description, alternates: { canonical: `/compare/${params.slug}` } }
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const page = comparePages[params.slug as CompareSlug] || comparePages['trendspider-vs-tradingview']
  return (
    <main>
      <Breadcrumbs items={[{ name: 'Compare', href: '/compare/trendspider-vs-tradingview' }, { name: page.h1, href: `/compare/${params.slug}` }]} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-black text-white md:text-5xl">{page.h1}</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-400">{page.description}</p>
        <div className="mt-10"><PlaceholderImage label="Comparison table screenshot" alt={`${page.h1} comparison placeholder`} /></div>
        <div className="mt-12"><CTA variant="pricing" /></div>
      </section>
    </main>
  )
}
