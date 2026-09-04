import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PurchaseCompleteEvent } from '@/components/AnalyticsEvents'
import { DemoEmailForm } from '@/components/DemoEmailForm'
import { DemoVideo } from '@/components/DemoVideo'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata('/demo')

export default function DemoPage() {
  const page = getArchitecturePage('/demo')!
  return (
    <main>
      <Suspense fallback={null}>
        <PurchaseCompleteEvent />
      </Suspense>
      <Breadcrumbs items={[{ name: 'Demo', href: '/demo' }]} />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">PivotSnap demo</p>
          <h1 className="text-4xl font-black text-white md:text-5xl">{page.h1}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">{page.description}</p>
          <DemoEmailForm />
        </div>
        <DemoVideo />
      </section>
    </main>
  )
}
