import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getAllBlogPosts } from '@/lib/blog'
import { generateSeoMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSeoMetadata('/blog', {
  title: 'Trading Indicator Blog',
  description: 'Guides for TradingView reversal indicators, entries, exits, buy/sell signals, and trading strategy.',
})

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()
  return (
    <main>
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }]} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-black text-white md:text-5xl">Trading Indicator Blog</h1>
        <p className="mt-4 max-w-2xl text-slate-400">Educational guides and comparisons for reversal trading workflows.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <p className="text-sm text-slate-500">{post.publish_date} · {post.content_silo}</p>
              <h2 className="mt-3 text-2xl font-bold text-white"><Link href={`/blog/${post.slug}`} className="hover:text-bull">{post.title}</Link></h2>
              <p className="mt-3 text-slate-400">{post.meta_description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
