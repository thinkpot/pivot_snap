# Build Status

## Completed

- Scaffolded a Next.js 14 App Router project targeting Vercel.
- Added `/app` route structure for `/`, `/how-it-works`, `/pricing`, `/free-trial`, `/tradingview-script`, `/faq`, `/blog/[slug]`, `/compare/[slug]`, and `/legal/[slug]`.
- Generated one MDX scaffold per scheduled post in `content_calendar.csv` under `/content/blog/*.mdx`.
- Added required MDX frontmatter fields: `title`, `meta_description`, `primary_keyword`, and `publish_date`.
- Added `/lib/seo.ts` that reads `site_architecture.csv` and centralizes metadata for architecture pages.
- Added custom `/app/sitemap.ts` to generate `sitemap.xml` from `site_architecture.csv`, MDX blog posts, legal pages, and comparison pages.
- Added `/app/robots.ts` with crawler rules for public pages and blocked staging/admin/private/API routes.
- Built priority pages first with H1/meta content from `site_architecture.csv`: homepage, how-it-works, pricing, and free-trial.
- Added placeholder chart/image slots using `next/image` through `components/PlaceholderImage.tsx`.
- Added four legal template pages: risk disclaimer, terms, privacy, and refund policy.
- Added API route scaffolds for Stripe Checkout test-mode subscriptions and email capture.
- Added shared layout, header, footer, breadcrumbs, JSON-LD helper, CTA component, Tailwind setup, TypeScript config, and environment variable example.

## Needs Your Input

- **Stripe test keys:** add `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` to Vercel/project env vars.
- **Email capture provider:** add `EMAIL_CAPTURE_WEBHOOK_URL` or replace `/api/subscribe` with your ESP integration.
- **Vercel account/project:** connect this repo/directory to Vercel and configure build settings.
- **Real chart screenshots/GIFs:** replace placeholder image slots with compressed TradingView screenshots/GIF demos.
- **Legal review:** risk disclaimer, terms, privacy, and refund policy are standard templates and require legal review.
- **Final pricing:** update plan names, prices, and Stripe price IDs.
- **Full article drafts:** MDX files are scaffolds; expand each to the target word count in `content_calendar.csv`.

## Local Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Current Production Domain

- `NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech`
