# Demo Page Migration Status

## Summary

Replaced the old `/free-trial` page/concept with a new `/demo` page across the site.

## Route Changes

### Added

```text
app/demo/page.tsx
```

The new `/demo` page includes:

- H1/meta content from `site_architecture.csv`.
- Placeholder embedded demo video slot.
- Optional email capture form: `Get the demo + a launch discount code`.
- Purchase completion tracking support for `?checkout=success`.
- Breadcrumb navigation.

### Removed

```text
app/free-trial/page.tsx
components/FreeTrialForm.tsx
```

### Redirect Added

Updated `next.config.mjs` with a permanent redirect:

```text
/free-trial → /demo
```

This preserves old inbound/internal URLs while moving the active concept to `/demo`.

## Demo Video

Added:

```text
components/DemoVideo.tsx
```

Current behavior:

- Displays a clear demo video placeholder.
- Button says `Play demo preview`.
- Tracks GA4 `demo_view` the first time the placeholder is played/clicked.

Real video URL still needs to be provided later.

## Email Capture

Added:

```text
components/DemoEmailForm.tsx
```

The form:

- Posts to existing `/api/subscribe`.
- Uses source: `demo`.
- Keeps existing GA4 `email_signup` tracking.
- Uses event metadata:

```ts
method: 'demo_discount_form'
page_path: '/demo'
```

## GA4 Updates

Added GA4 event:

```text
demo_view
```

Fires from:

```text
components/DemoVideo.tsx
```

Existing `email_signup` remains wired through the demo form.

`purchase_complete` now uses:

```text
page_path: /demo
```

## Site-Wide Link Updates

Replaced `/free-trial` with `/demo` across active app/source/content/planning files:

- Blog MDX files
- `site_architecture.csv`
- `content_calendar.csv`
- Homepage
- How-it-works page
- Header navigation
- Footer navigation
- CTA component
- Dodo return URL in `.env.example`
- Legacy Stripe success URL fallback
- Public sitemap static artifact

## CTA Text Updates

Updated old free-trial CTA variants to demo-oriented wording:

- `Watch the demo`
- `Watch demo`

## SEO / Planning Updates

Updated `site_architecture.csv`:

```text
/demo
```

with:

- Primary keyword: `TradingView indicator demo`
- H1: `Watch PivotSnap in Action on a TradingView Chart`
- Meta title: `PivotSnap TradingView Demo`
- Meta description focused on watching PivotSnap identify reversal, entry, exit, and buy/sell signal zones.

Updated `content_calendar.csv` CTA column from `/free-trial` references to `/demo` and renamed the CTA column to:

```text
CTA (link to /demo or /pricing)
```

## Build Validation

Ran successfully:

```bash
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run typecheck
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- `/demo` generated successfully.
- `/free-trial` no longer generates as a page.
- `/free-trial` exists only as a permanent redirect source in `next.config.mjs`.

## Stale Link Scan

Scanned source/content files excluding build/dependency folders and redirect config.

Result:

```text
No active `/free-trial` links remain outside the intended redirect source/documentation.
```

## Redeploy

Changes were committed and pushed to GitHub using the `shahid_git` SSH key. If Vercel is connected to the repository, it should redeploy automatically.
