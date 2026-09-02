import Link from 'next/link'

export function CTA({ variant = 'trial' }: { variant?: 'trial' | 'pricing' }) {
  const href = variant === 'pricing' ? '/pricing' : '/demo'
  const label = variant === 'pricing' ? 'Buy PivotSnap for $10' : 'Watch the demo'
  return (
    <div className="rounded-3xl bg-ink p-8 text-white shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Next step</p>
      <h2 className="mt-3 text-3xl font-bold">Test the indicator on your own TradingView charts.</h2>
      <p className="mt-3 max-w-2xl text-slate-300">
        Review the workflow, then buy PivotSnap once for $10 and receive delivery instructions by email.
      </p>
      <Link href={href} className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-ink hover:bg-sky-300">
        {label}
      </Link>
    </div>
  )
}
