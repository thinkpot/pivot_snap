import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PurchaseCompleteEvent } from '@/components/AnalyticsEvents'
import { FreeTrialForm } from '@/components/FreeTrialForm'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata('/free-trial')

export default function FreeTrialPage() {
  const page = getArchitecturePage('/free-trial')!
  return (
    <main>
      <Suspense fallback={null}>
        <PurchaseCompleteEvent />
      </Suspense>
      <Breadcrumbs items={[{ name: 'Get access', href: '/free-trial' }]} />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-black text-ink md:text-5xl">{page.h1}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{page.description}</p>
          <FreeTrialForm />
        </div>
        <PlaceholderImage label="Purchase delivery onboarding screenshot" alt="PivotSnap TradingView indicator email delivery setup placeholder" />
      </section>
    </main>
  )
}
