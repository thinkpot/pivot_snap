import Link from 'next/link'

export function CTA({ variant = 'trial' }: { variant?: 'trial' | 'pricing' }) {
  const href = variant === 'pricing' ? '/pricing' : '/free-trial'
  const label = variant === 'pricing' ? 'View pricing' : 'Start free trial'
  return (
    <div className="rounded-3xl bg-ink p-8 text-white shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Next step</p>
      <h2 className="mt-3 text-3xl font-bold">Test the indicator on your own TradingView charts.</h2>
      <p className="mt-3 max-w-2xl text-slate-300">
        Validate reversal, entry, exit, and buy/sell signal workflows before making it part of your process.
      </p>
      <Link href={href} className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-ink hover:bg-sky-300">
        {label}
      </Link>
    </div>
  )
}
