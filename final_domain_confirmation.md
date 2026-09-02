# Final Domain Confirmation

## Production Domain

Confirmed production domain:

```text
https://pivotsnap.tech
```

## Source Files Confirmed

The following source files/configs use `https://pivotsnap.tech` or derive URLs from `siteConfig.baseUrl`:

- `.env.example`
- `lib/site.ts`
- `lib/seo.ts`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/api/checkout/route.ts`
- `seo_technical_spec.md`
- `public/sitemap.xml`
- `public/robots.txt`

## Important Implementation Details

- `NEXT_PUBLIC_SITE_URL` is set in `.env.example` to:

```env
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech
```

- `lib/site.ts` uses:

```ts
baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://pivotsnap.tech'
```

- `lib/seo.ts` uses `absoluteUrl()` from `lib/site.ts` for canonical URLs and Open Graph URLs, so metadata resolves to `https://pivotsnap.tech` when `NEXT_PUBLIC_SITE_URL` is set correctly.

- `app/sitemap.ts` uses `absoluteUrl()` from `lib/site.ts`, so generated sitemap URLs resolve to `https://pivotsnap.tech`.

- `app/robots.ts` uses `siteConfig.baseUrl`, so robots sitemap reference resolves to:

```text
https://pivotsnap.tech/sitemap.xml
```

## Forbidden Domain Scan

Searched source files excluding `node_modules`, `.next`, and `.git` for:

- `https://example.com`
- `pivot-snap-p2s1nfdoe-thinkpots-projects.vercel.app`

No forbidden production URL/canonical/sitemap/robots references remain.

Note: `you@example.com` remains intentionally as a generic email input placeholder on `/demo`; it is not a canonical, sitemap, robots, metadata, JSON-LD, or deployment URL.

## Production Build Verification

Ran a clean production build with:

```bash
rm -rf .next
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech npm run build
```

Result:

- Next.js production build passed.
- Static generation completed successfully.
- Generated routes include `/sitemap.xml` and `/robots.txt`.
- Generated `.next` output contains `https://pivotsnap.tech`.
- Generated `.next` output does **not** contain:
  - `https://example.com`
  - `pivot-snap-p2s1nfdoe-thinkpots-projects.vercel.app`

## Redeploy Status

Vercel CLI is not installed in this local environment and the project is not linked via `.vercel/`, so I could not trigger a direct local `vercel --prod` redeploy.

I committed this confirmation file locally. To redeploy, push the latest commit to GitHub and Vercel should redeploy automatically if GitHub integration is connected. If automatic deployment is not enabled, trigger **Redeploy** manually in the Vercel dashboard after setting this environment variable:

```env
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech
```

## Required Vercel Environment Variable

Make sure Vercel Project → Settings → Environment Variables has:

```env
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech
```

Set it for Production, Preview, and Development if you want all deployments to emit the production canonical domain.
