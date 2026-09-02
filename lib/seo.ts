import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { parseCsv } from './csv'
import { absoluteUrl, siteConfig } from './site'

export type ArchitecturePage = {
  slug: string
  pageType: string
  primaryKeyword: string
  secondaryKeywords: string[]
  searchIntent: string
  h1: string
  title: string
  description: string
  internalTargets: string[]
  internalAnchors: string[]
}

const architecturePath = path.join(process.cwd(), 'site_architecture.csv')

function normalizeSlug(slug: string) {
  if (!slug || slug === '/') return '/'
  return slug.endsWith('/') ? slug.slice(0, -1) : slug
}

export function getArchitecturePages(): ArchitecturePage[] {
  const csv = fs.readFileSync(architecturePath, 'utf-8')
  return parseCsv(csv).map((row) => ({
    slug: normalizeSlug(row['page URL slug']),
    pageType: row['page type (homepage/core page/blog post)'],
    primaryKeyword: row['primary target keyword'],
    secondaryKeywords: row['2-3 secondary keywords'].split(';').map((item) => item.trim()).filter(Boolean),
    searchIntent: row['search intent'],
    h1: row['suggested H1'],
    title: row['suggested meta title (under 60 chars)'],
    description: row['suggested meta description (under 155 chars)'],
    internalTargets: row['internal link target core page(s)'].split(';').map((item) => item.trim()).filter(Boolean),
    internalAnchors: row['internal link anchor text'].split(';').map((item) => item.trim()).filter(Boolean),
  }))
}

export function getArchitecturePage(slug: string) {
  const normalized = normalizeSlug(slug)
  return getArchitecturePages().find((page) => page.slug === normalized)
}

export function generateSeoMetadata(slug: string, overrides: Partial<Metadata> = {}): Metadata {
  const page = getArchitecturePage(slug)
  const title = String(overrides.title || page?.title || siteConfig.name)
  const description = String(overrides.description || page?.description || siteConfig.description)
  const url = absoluteUrl(normalizeSlug(slug))

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: page?.slug.startsWith('/blog/') ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...overrides,
  }
}
