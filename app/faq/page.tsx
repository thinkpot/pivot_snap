import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CTA } from '@/components/CTA'
import { JsonLd } from '@/components/JsonLd'
import { PlaceholderImage } from '@/components/PlaceholderImage'
import { getArchitecturePage, generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata('/faq')

const faqs = [
  {
    question: 'What is a trading indicator?',
    answer:
      'A trading indicator is a chart-based tool that helps traders interpret market data such as price action, momentum, trend direction, volatility, or potential reversal areas. PivotSnap is designed as a TradingView reversal, entry, exit, and buy/sell signal indicator to support your trade planning workflow.',
  },
  {
    question: 'What is the best trading indicator for reversals?',
    answer:
      'The best reversal indicator is one that gives clear signals, includes confirmation logic, supports alerts, and fits your risk-management rules. PivotSnap focuses on reversal context, entry timing, and exit planning instead of promising guaranteed outcomes.',
  },
  {
    question: 'Does PivotSnap work on TradingView?',
    answer:
      'Yes. PivotSnap is being built for TradingView workflows. The final setup will depend on your access method, but the site includes a TradingView script setup page to help users add the indicator, configure settings, and understand alerts.',
  },
  {
    question: 'Why is my TradingView indicator not showing?',
    answer:
      'Common reasons include being logged into the wrong TradingView account, not having invite-only access yet, hiding the indicator in chart settings, using the wrong chart layout, or needing to refresh the browser after access is granted.',
  },
  {
    question: 'Can I automate TradingView indicator alerts?',
    answer:
      'TradingView alerts can often be connected to notifications or webhook-based workflows, depending on your TradingView plan and setup. You should test every alert workflow carefully and never rely on automation without risk controls.',
  },
  {
    question: 'Is PivotSnap financial advice?',
    answer:
      'No. PivotSnap is software and educational content only. It does not provide financial, investment, tax, or legal advice. Trading involves risk, and you are responsible for your own decisions, position sizing, and risk management.',
  },
  {
    question: 'Can I try PivotSnap before paying?',
    answer:
      'The site is structured around a free-trial flow so traders can test whether the indicator fits their TradingView workflow before choosing a paid plan. Use the free trial page to join the early access or trial list.',
  },
]

export default function Page() {
  const page = getArchitecturePage('/faq')!
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <main>
      <JsonLd data={faqSchema} />
      <Breadcrumbs items={[{ name: page.h1, href: page.slug }]} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-black text-ink md:text-5xl">{page.h1}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{page.description}</p>
        <div className="mt-10">
          <PlaceholderImage label="FAQ support and TradingView setup screenshot" alt="Trading indicator FAQ and PivotSnap setup placeholder screenshot" />
        </div>
        <div className="mt-10 grid gap-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm open:border-accent open:bg-sky-50/40"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-bold text-ink marker:hidden">
                <span>{faq.question}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-xl leading-none text-slate-600 transition group-open:rotate-45 group-open:bg-accent group-open:text-ink">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-12"><CTA /></div>
      </section>
    </main>
  )
}
