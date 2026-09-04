import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080b12]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Image src="/logo.png" alt="PivotSnap Logo" width={24} height={24} className="h-6 w-auto" />
            <p className="font-extrabold text-white">PivotSnap</p>
          </div>
          <p className="mt-2 text-sm text-slate-500">TradingView reversal, entry, exit, and buy/sell signal indicator.</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-400">
          <Link href="/how-it-works" className="transition hover:text-white">How it works</Link>
          <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
          <Link href="/demo" className="transition hover:text-white">Watch demo</Link>
          <Link href="/faq" className="transition hover:text-white">FAQ</Link>
        </div>
        <div className="grid gap-2 text-sm text-slate-400">
          <Link href="/legal/risk-disclaimer" className="transition hover:text-white">Risk disclaimer</Link>
          <Link href="/legal/terms" className="transition hover:text-white">Terms</Link>
          <Link href="/legal/privacy" className="transition hover:text-white">Privacy</Link>
          <Link href="/legal/refund-policy" className="transition hover:text-white">Refund policy</Link>
        </div>
      </div>
    </footer>
  )
}
