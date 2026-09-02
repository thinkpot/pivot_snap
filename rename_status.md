# Rename Status: PivotSnap → PivotSnap

## Summary

Completed a codebase-wide brand rename from the old brand variants to `PivotSnap`.

Replaced variants searched:

- `PivotSnap`
- `PivotSnap`
- `pivotsnap`
- `pivotsnap`
- `PivotSnap`
- `PIVOTSNAP`
- `luxalgo-vs-pivotsnap`

Replacement conventions used:

- Display brand: `PivotSnap`
- Package/project slug: `pivotsnap-trading-indicator`
- Comparison slug: `/compare/luxalgo-vs-pivotsnap`

## Files Touched

The automated rename touched these files:

- `brand_name_research.csv`
- `package.json`
- `package-lock.json`
- `app/sitemap.ts`
- `app/layout.tsx`
- `components/Footer.tsx`
- `components/Header.tsx`
- `lib/site.ts`
- `lib/legal.ts`
- `app/tradingview-script/page.tsx`
- `app/faq/page.tsx`
- `app/pricing/page.tsx`
- `app/compare/[slug]/page.tsx`
- `app/legal/[slug]/page.tsx`
- `rename_status.md`

## Key Updates Confirmed

- `package.json` name is now `pivotsnap-trading-indicator`.
- `lib/site.ts` now uses `PivotSnap Trading Indicator`.
- Header/footer branding now uses `PivotSnap`.
- Product JSON-LD on `/pricing` now references `PivotSnap`.
- Legal template references now use `PivotSnap`.
- Comparison page route changed from:
  - `/compare/luxalgo-vs-pivotsnap`
  - to `/compare/luxalgo-vs-pivotsnap`
- `app/sitemap.ts` now includes `/compare/luxalgo-vs-pivotsnap`.
- Build output confirms the generated comparison route is `/compare/luxalgo-vs-pivotsnap`.

## Files Checked With No Old-Brand Matches Found

These requested files were checked and did not contain old-brand variants after the rename scan:

- `site_architecture.csv`
- `content_calendar.csv`
- `keyword_research.csv`
- `seo_technical_spec.md`
- all files under `app/`
- all files under `components/`
- all files under `content/blog/`
- all files under `lib/`

## Confidence / Manual Review Notes

- No old-brand string matches remain in source/content files, excluding `node_modules`, `.next`, and `.git`.
- One context-sensitive replacement was made inside `brand_name_research.csv`: a historical note for the `GammaSignal` candidate was updated by the global rename. This file is research/reference material, not app runtime code. The old brand string is removed, but you may want to manually revise that row later if you keep the brand-name research file as a historical artifact.
- Placeholder image alt text did not contain old-brand variants, so no uncertain image-alt replacements were needed.
- The parent folder path still contains `PivotSnap` (`/Users/apple/Documents/PivotSnap/...`). I did not rename the parent directory because the request was to rename across the codebase, not move the project folder.

## Validation

Commands run successfully:

```bash
npm run typecheck
npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- Static generation completed successfully.
- Generated route now includes `/compare/luxalgo-vs-pivotsnap`.

## Remaining Input Needed

The rename does not change previously identified launch inputs:

- Production domain to replace `https://pivotsnap.tech` / `NEXT_PUBLIC_SITE_URL`.
- Stripe test/live keys.
- Email capture provider or webhook.
- Real TradingView screenshots/GIFs.
- Final pricing and legal review.
