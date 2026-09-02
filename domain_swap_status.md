# Domain Swap Status

## Summary

Completed the production domain swap from `https://example.com` to:

```text
https://pivotsnap.tech
```

Also re-checked legacy brand strings and confirmed runtime/source code branding is consistently `PivotSnap`.

## Files Updated

The domain replacement touched these files:

- `.env.example`
- `lib/site.ts`
- `app/api/checkout/route.ts`
- `public/sitemap.xml`
- `public/robots.txt`
- `seo_technical_spec.md`
- `build_status.md`
- `rename_status.md`
- `brand_name_research.csv`

## Key Updates Confirmed

- `.env.example` now contains:

```text
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech
```

- `lib/site.ts` now falls back to:

```ts
baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://pivotsnap.tech'
```

- Stripe checkout fallback origin in `app/api/checkout/route.ts` now uses:

```text
https://pivotsnap.tech
```

- `public/robots.txt` now points to:

```text
Sitemap: https://pivotsnap.tech/sitemap.xml
```

- `public/sitemap.xml` canonical URLs now use:

```text
https://pivotsnap.tech/...
```

- `seo_technical_spec.md` now identifies `https://pivotsnap.tech` as the production base URL rather than a placeholder.

## Brand Consistency Check

Searched for old brand variants across the project, excluding `node_modules`, `.next`, and `.git`:

- `GammaOne`
- `Gamma One`
- `gammaone`
- `gamma-one`
- `Gammaone`
- `GAMMAONE`

No matches remain after the swap.

## Manual Review / Confidence Notes

- The only remaining `example.com` occurrence is the generic email input placeholder `you@example.com` on `/free-trial`. I intentionally kept that because it is a standard placeholder email address, not a site URL, canonical, sitemap, robots, JSON-LD, or metadata reference.
- `brand_name_research.csv` is historical research/reference data. The previous old-brand candidate rows were normalized during the brand rename/domain cleanup so old brand strings do not remain. If you want that CSV to preserve historical naming research exactly, review it manually; it is not used by the Next.js app runtime.
- The parent folder path still contains `/GammaOne/` because that is outside the codebase content and moving the parent directory was not requested.

## Validation

Ran successfully after the domain swap:

```bash
npm run typecheck
npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- Static generation completed successfully.
- Generated routes include `/robots.txt` and `/sitemap.xml`.

## Remaining Launch Inputs

Domain is now finalized. Remaining non-domain launch inputs are:

- Stripe test/live keys.
- Email capture provider or webhook.
- Real TradingView screenshots/GIFs.
- Final pricing.
- Legal review.
- Full MDX article drafts.
