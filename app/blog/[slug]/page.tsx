import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CTA } from '@/components/CTA'
import { JsonLd } from '@/components/JsonLd'
import { getAllBlogPosts, getBlogPost } from '@/lib/blog'
import { absoluteUrl, siteConfig } from '@/lib/site'

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    title: post.title,
    description: post.meta_description,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.meta_description, url, type: 'article' },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()
  return (
    <main>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description,
        datePublished: post.publish_date,
        dateModified: post.publish_date,
        author: { '@type': 'Organization', name: siteConfig.name },
        publisher: { '@type': 'Organization', name: siteConfig.name },
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
      }} />
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }, { name: post.title, href: `/blog/${post.slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">{post.content_silo}</p>
        <h1 className="mt-4 text-4xl font-black text-ink md:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{post.meta_description}</p>
        <div className="prose mt-10 max-w-none">
          <p><strong>Primary keyword:</strong> {post.primary_keyword}</p>
          <p>This MDX scaffold is ready for a full article draft. Expand it to match the target word count in the content calendar, add real chart screenshots, and include the planned silo links.</p>
          <h2>Trading Context</h2>
          <p>Explain how this topic fits into reversal, entry, exit, and TradingView signal workflows.</p>
          <h2>Signal Workflow</h2>
          <p>Show practical examples using screenshots once available. Use next/image for each optimized visual.</p>
          <h2>Risk Management</h2>
          <p>Remind readers that indicators support decision-making but do not guarantee profitable trades.</p>
        </div>
        <div className="mt-12"><CTA variant={post.cta === '/pricing' ? 'pricing' : 'trial'} /></div>
      </article>
    </main>
  )
}
