import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import { JsonLd } from './JsonLd'

type Crumb = {
  name: string
  href: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const allItems = [{ name: 'Home', href: '/' }, ...items]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
        <ol className="flex flex-wrap gap-2">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              <Link className="hover:text-slate-900" href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={schema} />
    </>
  )
}
