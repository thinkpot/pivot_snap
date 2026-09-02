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
    'We collect information you provide, such as email address, purchase status, and support messages.',
    'We use this information to provide product access, process payments, send product updates, and improve the service.',
    'Payment details are processed by Stripe and are not stored directly on our servers.',
    'Contact us to request access, correction, or deletion of your personal information where legally required.',
  ],
  'refund-policy': [
    'Thank you for purchasing PivotSnap. Please read this policy carefully before completing your purchase, as it explains how refunds are handled for our product.',
  ],
}

const refundPolicySections = [
  {
    heading: 'Digital Product Delivery',
    body: [
      'PivotSnap is a digital product. Upon successful payment, you will receive the indicator source code via email to the address provided at checkout. Because the product is delivered electronically and immediately, our refund policy differs from policies typical of physical goods.',
    ],
  },
  {
    heading: 'Refund Eligibility',
    list: [
      'Before delivery: If, for any reason, you do not receive your purchase confirmation or the code delivery email within 24 hours of payment, contact us at support@pivotsnap.tech and we will either resend it or issue a full refund, at your choice.',
      'After delivery: Because the product source code is delivered directly to you upon purchase, all sales are final once the code has been delivered, except as described below. This is standard practice for digital products where the item itself cannot be returned once received.',
      'Technical issues: If PivotSnap does not function as described due to a genuine technical defect, not simply a difference in trading outcomes or personal preference, contact us within 7 days of purchase at support@pivotsnap.tech. We will attempt to resolve the issue; if we cannot, a refund may be issued at our discretion.',
    ],
  },
  {
    heading: 'What Is Not Covered',
    list: [
      'Trading losses, missed trades, or dissatisfaction with the indicator performance in live market conditions. PivotSnap is an analytical tool, not a guarantee of profitable trades — see our Risk Disclaimer for more detail.',
      'Change of mind after the code has been delivered.',
      'Requests made outside the 7-day technical issue window described above.',
    ],
  },
  {
    heading: 'How to Request a Refund',
    body: [
      'Email support@pivotsnap.tech with your order confirmation and a description of the issue. We aim to respond within 3 business days.',
    ],
  },
  {
    heading: 'Chargebacks',
    body: [
      'We ask that you contact us directly before initiating a chargeback with your payment provider — most issues can be resolved faster this way, and unresolved chargebacks may result in restricted access to future purchases.',
    ],
  },
  {
    heading: 'Changes to This Policy',
    body: [
      'We may update this policy from time to time. The version in effect at the time of your purchase applies to that purchase.',
    ],
  },
]

/*
Legal review checklist before publishing:
- Confirm the 7-day technical-issue window is appropriate for your jurisdiction and payment processor's (Dodo Payments) dispute policies.
- Confirm support@pivotsnap.tech is the real support email address.
- Confirm this complies with consumer protection law in the jurisdictions you're selling into, including digital goods refund rules.
- Confirm wording aligns with Dodo Payments' merchant-of-record refund/chargeback policies.
- Have an actual lawyer review final wording — this draft is a reasonable starting point, not a substitute for legal advice.
*/

export default function LegalPage({ params }: { params: { slug: string } }) {
  const page = legalPages[params.slug as LegalSlug]
  if (!page) notFound()
  return (
    <main>
      <Breadcrumbs items={[{ name: 'Legal', href: '/legal/terms' }, { name: page.title, href: `/legal/${params.slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-4xl font-black text-ink md:text-5xl">{page.title}</h1>
        <p className="mt-4 text-slate-500">Last updated: {params.slug === 'refund-policy' ? 'September 2, 2026' : 'September 1, 2026'}</p>
        <div className="prose mt-8 max-w-none">
          {params.slug === 'refund-policy' ? (
            <p><strong>DRAFT — requires legal review before publishing.</strong> This is reasonable placeholder language, not legal advice.</p>
          ) : null}
          {content[params.slug as LegalSlug].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {params.slug === 'refund-policy' ? refundPolicySections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list ? <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
            </section>
          )) : null}
          <h2>Template notice</h2>
          <p>This page is template content for a SaaS/trading-tool website and should be reviewed by qualified legal counsel before launch.</p>
        </div>
      </article>
    </main>
  )
}
