import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-black text-ink">PivotSnap</p>
          <p className="mt-2 text-sm text-slate-600">TradingView reversal, entry, exit, and buy/sell signal indicator.</p>
        </div>
        <div className="grid gap-2 text-sm">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/free-trial">Free trial</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="grid gap-2 text-sm">
          <Link href="/legal/risk-disclaimer">Risk disclaimer</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/refund-policy">Refund policy</Link>
        </div>
      </div>
    </footer>
  )
}
