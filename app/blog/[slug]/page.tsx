import type { Metadata } from 'next'
import Link from 'next/link'
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

function InlineMarkdown({ text }: { text: string }) {
  const linkedSegments = text.split(/(\[[^\]]+\]\([^)]+\))/g)

  return (
    <>
      {linkedSegments.map((segment, segmentIndex) => {
        const link = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
          return <Link key={segmentIndex} className="font-semibold text-sky-400 underline" href={link[2]}>{link[1]}</Link>
        }

        const boldParts = segment.split(/(\*\*[^*]+\*\*)/g)
        return boldParts.map((part, index) => {
          const key = `${segmentIndex}-${index}`
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={key}>{part.slice(2, -2)}</strong>
          }
          return <span key={key}>{part}</span>
        })
      })}
    </>
  )
}

function RenderMarkdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/)

  return (
    <div className="prose mt-10 max-w-none">
      {blocks.map((block, index) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        if (trimmed.startsWith('## ')) {
          return <h2 key={index}>{trimmed.replace(/^##\s+/, '')}</h2>
        }

        if (/^\d+\.\s/m.test(trimmed)) {
          return (
            <ol key={index} className="list-decimal space-y-2 pl-6">
              {trimmed.split('\n').map((item) => (
                <li key={item}><InlineMarkdown text={item.replace(/^\d+\.\s+/, '')} /></li>
              ))}
            </ol>
          )
        }

        if (trimmed.startsWith('- ')) {
          return (
            <ul key={index}>
              {trimmed.split('\n').map((item) => (
                <li key={item}><InlineMarkdown text={item.replace(/^-\s+/, '')} /></li>
              ))}
            </ul>
          )
        }

        const linkOnly = trimmed.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (linkOnly) {
          return (
            <p key={index}>
              <Link className="font-semibold text-sky-400 underline" href={linkOnly[2]}>{linkOnly[1]}</Link>
            </p>
          )
        }

        return <p key={index}><InlineMarkdown text={trimmed} /></p>
      })}
    </div>
  )
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
        <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-400">{post.meta_description}</p>
        <RenderMarkdown source={post.body} />
        <div className="mt-12"><CTA variant={post.cta === '/pricing' ? 'pricing' : 'trial'} /></div>
      </article>
    </main>
  )
}
