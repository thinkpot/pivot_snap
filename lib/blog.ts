import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type BlogPost = {
  slug: string
  title: string
  meta_description: string
  primary_keyword: string
  publish_date: string
  content_silo?: string
  cta?: string
  body: string
}

const blogDir = path.join(process.cwd(), 'content', 'blog')

export function getBlogSlugs() {
  if (!fs.existsSync(blogDir)) return []
  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)
  return {
    slug,
    title: String(data.title || slug),
    meta_description: String(data.meta_description || ''),
    primary_keyword: String(data.primary_keyword || ''),
    publish_date: String(data.publish_date || ''),
    content_silo: data.content_silo ? String(data.content_silo) : undefined,
    cta: data.cta ? String(data.cta) : undefined,
    body: content,
  }
}

export function getAllBlogPosts() {
  return getBlogSlugs()
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => a.publish_date.localeCompare(b.publish_date))
}
