import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-4xl font-black text-ink">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you requested does not exist.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 font-semibold text-white">Return home</Link>
    </main>
  )
}
