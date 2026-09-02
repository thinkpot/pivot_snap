import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CTA } from '@/components/CTA'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata('/tradingview-script')

export default function Page() {
  const page = getArchitecturePage('/tradingview-script')!
  return (
    <main>
      <Breadcrumbs items={[{ name: page.h1, href: page.slug }]} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-black text-ink md:text-5xl">{page.h1}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{page.description}</p>
        <div className="mt-10"><PlaceholderImage label="{page.h1} screenshot" alt="{page.primaryKeyword} placeholder screenshot" /></div>
        <div className="prose mt-10 max-w-none">
          {page.secondaryKeywords.map((keyword) => <section key={keyword}><h2>{keyword}</h2><p>Use this section to answer common questions and connect the topic back to the PivotSnap indicator workflow.</p></section>)}
        </div>
        <div className="mt-12"><CTA /></div>
      </section>
    </main>
  )
}
