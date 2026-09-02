import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { legalPages, type LegalSlug } from '@/lib/legal'
import { absoluteUrl } from '@/lib/site'

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = legalPages[params.slug as LegalSlug]
  if (!page) return {}
  return { title: page.title, description: page.description, alternates: { canonical: absoluteUrl(`/legal/${params.slug}`) } }
}

const content: Record<LegalSlug, string[]> = {
  'risk-disclaimer': [
    'Trading involves substantial risk and is not suitable for every investor or trader.',
    'PivotSnap provides software and educational information only. It does not provide financial, investment, tax, or legal advice.',
    'Signals, indicators, examples, screenshots, and historical illustrations do not guarantee future results.',
    'You are responsible for your own trading decisions, risk controls, position sizing, and compliance with applicable laws.',
  ],
  terms: [
    'These terms govern access to and use of PivotSnap software, content, and related services.',
    'You agree not to resell, redistribute, reverse engineer, or misuse the TradingView indicator or related materials.',
    'Service availability may depend on third-party platforms including TradingView, Stripe, Vercel, and email providers.',
    'We may update these terms as the product evolves. Continued use means you accept the updated terms.',
  ],
  privacy: [
    'We collect information you provide, such as email address, subscription status, and support messages.',
    'We use this information to provide product access, process payments, send product updates, and improve the service.',
    'Payment details are processed by Stripe and are not stored directly on our servers.',
    'Contact us to request access, correction, or deletion of your personal information where legally required.',
  ],
  'refund-policy': [
    'Refund eligibility depends on the subscription plan, promotional offer, and time since purchase.',
    'If a free trial is offered, please use it to evaluate whether the indicator fits your workflow before purchasing.',
    'Refund requests may be denied for abuse, excessive use, or violations of the terms of service.',
    'This template should be reviewed by counsel before launch and updated with your final commercial policy.',
  ],
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const page = legalPages[params.slug as LegalSlug]
  if (!page) notFound()
  return (
    <main>
      <Breadcrumbs items={[{ name: 'Legal', href: '/legal/terms' }, { name: page.title, href: `/legal/${params.slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-4xl font-black text-ink md:text-5xl">{page.title}</h1>
        <p className="mt-4 text-slate-500">Last updated: September 1, 2026</p>
        <div className="prose mt-8 max-w-none">
          {content[params.slug as LegalSlug].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <h2>Template notice</h2>
          <p>This page is template content for a SaaS/trading-tool website and should be reviewed by qualified legal counsel before launch.</p>
        </div>
      </article>
    </main>
  )
}
