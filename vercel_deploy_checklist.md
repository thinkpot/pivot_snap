# Vercel Deployment Checklist

## Deployment Readiness Summary

The PivotSnap Next.js project is ready for Vercel import as a standard zero-config Next.js 14 App Router application.

## 1. Next.js / Package Compatibility

### `package.json`

Ready for Vercel.

Important scripts are present:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "typecheck": "tsc --noEmit"
}
```

Vercel will auto-detect the project as Next.js and use:

```bash
npm run build
```

Package name is already updated to:

```json
"name": "pivotsnap-trading-indicator"
```

### `next.config.mjs`

Ready for Vercel.

Current config is standard Next.js-compatible config with MDX support and `next/image` formats:

```js
pageExtensions: ['ts', 'tsx', 'mdx']
images: {
  formats: ['image/avif', 'image/webp']
}
```

No Vercel-specific changes are required.

## 2. `vercel.json`

No `vercel.json` was added.

Reason: no custom redirects, rewrites, headers, regions, functions config, or build overrides are currently required. Vercel auto-detects this Next.js project with zero config.

If you later need security headers, redirects, or custom function settings, add `vercel.json` at that time.

## 3. Required Vercel Environment Variables

Add these in the Vercel dashboard under:

```text
Project → Settings → Environment Variables
```

| Variable | Required? | Example / Value | Notes |
|---|---:|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://pivotsnap.tech` | Used for canonical URLs, sitemap, robots, Stripe return URLs, and metadata. |
| `STRIPE_SECRET_KEY` | Before checkout launch | `sk_test_...` or `sk_live_...` | Keep secret. Use test key during testing and live key only when ready. |
| `STRIPE_PRICE_ID` | Before checkout launch | `price_...` | Stripe one-time $10 Price ID used by `/api/checkout`. |
| `STRIPE_WEBHOOK_SECRET` | Before webhook launch | `whsec_...` | Required for `/api/stripe-webhook` signature verification. |
| `PINE_SCRIPT_DELIVERY_URL` | Before delivery launch | `https://pivotsnap.tech/tradingview-script` | Link sent to buyers after payment. |
| `EMAIL_CAPTURE_WEBHOOK_URL` | Optional but recommended | Provider webhook URL | Used by `/api/subscribe`; leave blank only if you do not need forwarding yet. |

Current `.env.example` already includes:

```env
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech
STRIPE_SECRET_KEY=sk_test_replace_me
STRIPE_PRICE_ID=price_replace_me_for_one_time_10_usd_product
STRIPE_WEBHOOK_SECRET=whsec_replace_me
EMAIL_CAPTURE_WEBHOOK_URL=
PINE_SCRIPT_DELIVERY_URL=https://pivotsnap.tech/tradingview-script
```

## 4. GitHub Repository Status

### Local Git

A local Git repository has been initialized and committed.

Current local commit:

```text
Initial PivotSnap Next.js site scaffold
```

### GitHub Remote

A GitHub remote is **not configured yet**.

GitHub CLI (`gh`) is not installed/authenticated in this environment, so I could not create or push a GitHub repository automatically.

You need to do one of the following manually.

### Option A — GitHub website

1. Go to GitHub.
2. Create a new repository, for example:

```text
pivotsnap-trading-indicator
```

3. Do not initialize it with README/license/gitignore because this local repo already has files.
4. Run these commands locally:

```bash
cd /Users/apple/Documents/GammaOne/trading_indicator
git remote add origin https://github.com/YOUR_USERNAME/pivotsnap-trading-indicator.git
git branch -M main
git push -u origin main
```

### Option B — GitHub CLI

If you install and authenticate GitHub CLI:

```bash
cd /Users/apple/Documents/GammaOne/trading_indicator
gh auth login
gh repo create pivotsnap-trading-indicator --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` if you want a public repo.

## 5. Vercel Deployment Steps

After the GitHub repo is pushed:

1. Create or log into your Vercel account.
2. Click **Add New → Project**.
3. Import the GitHub repo.
4. Confirm framework preset is **Next.js**.
5. Keep default build settings:

```text
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

Usually Vercel auto-fills these; no custom settings should be needed.

6. Add the environment variables listed above.
7. Deploy.
8. Add the custom domain:

```text
pivotsnap.tech
www.pivotsnap.tech
```

9. After DNS is verified, confirm these URLs load:

```text
https://pivotsnap.tech/
https://pivotsnap.tech/how-it-works
https://pivotsnap.tech/pricing
https://pivotsnap.tech/demo
https://pivotsnap.tech/faq
https://pivotsnap.tech/sitemap.xml
https://pivotsnap.tech/robots.txt
```

## 6. Validation Completed Locally

The project was validated locally with:

```bash
npm run typecheck
npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- Static generation completed successfully.
- `/sitemap.xml` and `/robots.txt` routes are generated.
- Blog, comparison, legal, API, and core routes build successfully.

## 7. Manual Launch Items Still Needed

Before public launch, you still need to provide or finalize:

- Vercel account/project connection.
- GitHub repo creation and push.
- Vercel environment variables.
- DNS/custom domain connection for `pivotsnap.tech`.
- Stripe test/live keys and the final one-time $10 Stripe Price ID.
- Email capture provider/webhook.
- Real TradingView screenshots/GIFs.
- Stripe one-time $10 Price ID.
- Full MDX article drafts.
- Legal review of risk disclaimer, terms, privacy, and refund policy.

## 8. Notes

- `vercel.json` was intentionally skipped because the app does not require custom Vercel config.
- The project uses `app/sitemap.ts` and `app/robots.ts` for dynamic Next.js metadata routes.
- The existing `public/sitemap.xml` and `public/robots.txt` are static artifacts from earlier planning. The Next.js App Router metadata routes are the deployment source of truth when the app runs on Vercel.
- `tsconfig.tsbuildinfo` was removed from Git tracking and added to `.gitignore` because it is a local TypeScript cache file.
