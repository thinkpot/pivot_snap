import { SpecularButton } from '@/components/ui/specular-button'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-4xl font-black text-white">Page not found</h1>
      <p className="mt-4 text-slate-400">The page you requested does not exist.</p>
      <SpecularButton href="/" variant="bull" className="mt-8">Return home</SpecularButton>
    </main>
  )
}
