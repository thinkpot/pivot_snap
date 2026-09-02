import type { MetadataRoute } from 'next'
import { getArchitecturePages } from '@/lib/seo'
import { getAllBlogPosts } from '@/lib/blog'
import { legalPages } from '@/lib/legal'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const architectureUrls = getArchitecturePages().map((page) => ({
    url: absoluteUrl(page.slug),
    lastModified: new Date('2026-09-01'),
    changeFrequency: page.slug.startsWith('/blog/') ? 'monthly' as const : 'weekly' as const,
    priority: page.slug === '/' ? 1 : page.slug.startsWith('/blog/') ? 0.7 : 0.9,
  }))

  const calendarBlogUrls = getAllBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publish_date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const legalUrls = Object.keys(legalPages).map((slug) => ({
    url: absoluteUrl(`/legal/${slug}`),
    lastModified: new Date('2026-09-01'),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  const compareUrls = ['trendspider-vs-tradingview', 'luxalgo-vs-pivotsnap'].map((slug) => ({
    url: absoluteUrl(`/compare/${slug}`),
    lastModified: new Date('2026-09-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const byUrl = new Map([...architectureUrls, ...calendarBlogUrls, ...legalUrls, ...compareUrls].map((entry) => [entry.url, entry]))
  return Array.from(byUrl.values())
}
