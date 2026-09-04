import Link from 'next/link'
import Image from 'next/image'
import { SpecularButton } from '@/components/ui/specular-button'

const nav = [
  ['How it works', '/how-it-works'],
  ['Pricing', '/pricing'],
  ['Watch demo', '/demo'],
  ['TradingView script', '/tradingview-script'],
  ['Blog', '/blog'],
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080b12]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white">
          <Image src="/logo.png" alt="PivotSnap Logo" width={28} height={28} className="h-7 w-auto" />
          PivotSnap
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
          {nav.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-white">{label}</Link>)}
        </nav>
        <SpecularButton href="/pricing" variant="bull" size="sm">
          Buy for $10
        </SpecularButton>
      </div>
    </header>
  )
}
