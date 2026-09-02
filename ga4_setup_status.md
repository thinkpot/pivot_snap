# GA4 Setup Status

## Summary

Integrated Google Analytics 4 for PivotSnap using Measurement ID:

```text
G-W2SWNVKYET
```

## Files Added

- `lib/gtag.ts`
- `components/AnalyticsEvents.tsx`
- `components/FreeTrialForm.tsx`
- `components/CheckoutButton.tsx`
- `ga4_setup_status.md`

## Files Updated

- `app/layout.tsx`
- `app/demo/page.tsx`
- `app/pricing/page.tsx`

## Base GA4 Tag

Added the GA4 tag in `app/layout.tsx` using `next/script` with `afterInteractive` loading:

```tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
<Script id="ga4-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script>
```

The Measurement ID is centralized in:

```ts
lib/gtag.ts
```

## Conversion Events Wired

| Event | Where it fires | Implementation |
|---|---|---|
| `email_signup` | Successful `/demo` form submission | `components/FreeTrialForm.tsx` submits to `/api/subscribe`, then fires GA4 event on success. |
| `pricing_view` | `/pricing` page load | `components/AnalyticsEvents.tsx` via `PricingViewEvent`. |
| `checkout_started` | When user clicks a pricing checkout button | `components/CheckoutButton.tsx` fires before calling `/api/checkout`. |
| `purchase_complete` | When user lands on `/demo?checkout=success` after Stripe checkout | `components/AnalyticsEvents.tsx` via `PurchaseCompleteEvent`. |

## Implementation Notes

- The `/demo` form is now a client component so it can submit asynchronously and fire `email_signup` only after the email capture API succeeds.
- The `/pricing` page uses a client event component to fire `pricing_view` once on page load.
- Pricing plan buttons now use `CheckoutButton`, which fires `checkout_started` and then calls `/api/checkout`.
- `purchase_complete` currently fires on the Stripe success redirect URL:

```text
/demo?checkout=success
```

For stricter payment-confirmed analytics, add a Stripe webhook and GA4 Measurement Protocol API secret later. The current implementation matches the existing checkout flow and does not require extra environment variables beyond the existing Stripe keys.

## Validation

Ran successfully:

```bash
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech npm run typecheck
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- Static generation completed successfully.
- Generated build output contains `G-W2SWNVKYET`.
- Generated/source output contains the event names:
  - `email_signup`
  - `pricing_view`
  - `checkout_started`
  - `purchase_complete`

## Redeploy

The GA4 integration has been committed and pushed to GitHub using the `shahid_git` SSH key. If Vercel is connected to the GitHub repo, it should redeploy automatically from the pushed commit.

## Manual Checks After Deployment

After Vercel finishes deploying, verify:

1. Visit `https://pivotsnap.tech` and confirm GA4 Realtime receives a page view.
2. Visit `/pricing` and confirm `pricing_view` appears in GA4 DebugView or Realtime events.
3. Submit the `/demo` email form and confirm `email_signup` appears.
4. Click a pricing checkout button and confirm `checkout_started` appears.
5. Complete a Stripe test checkout and confirm `purchase_complete` appears after the success redirect.

## Required Existing Environment Variables

No new environment variables were added for GA4. Existing deployment variables still apply:

```env
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech
STRIPE_SECRET_KEY=...
STRIPE_PRICE_ID=...
EMAIL_CAPTURE_WEBHOOK_URL=...
```
