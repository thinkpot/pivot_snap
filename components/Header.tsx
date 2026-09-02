import Link from 'next/link'

const nav = [
  ['How it works', '/how-it-works'],
  ['Pricing', '/pricing'],
  ['Watch demo', '/demo'],
  ['TradingView script', '/tradingview-script'],
  ['Blog', '/blog'],
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-black tracking-tight text-ink">PivotSnap</Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {nav.map(([label, href]) => <Link key={href} href={href} className="hover:text-ink">{label}</Link>)}
        </nav>
        <Link href="/pricing" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          Buy for $10
        </Link>
      </div>
    </header>
  )
}
