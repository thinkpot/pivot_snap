# Pricing Update Status

## Summary

Updated PivotSnap from placeholder monthly Starter/Pro pricing to a single one-time-purchase offer:

```text
PivotSnap — $10 one-time purchase
```

## Completed

### Pricing Page

Updated `/pricing` to remove the old placeholder tiers:

- Removed `Starter — $29/mo`
- Removed `Pro — $59/mo`
- Added one offer: `PivotSnap — $10 USD one-time purchase`
- Added copy confirming:
  - One-time payment
  - No subscription
  - No recurring billing
  - TradingView Pine Script/access instructions are delivered by email after purchase

### Stripe Checkout

Updated `/app/api/checkout/route.ts`:

- Changed Stripe Checkout mode from `subscription` to `payment`.
- Continues to require:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PRICE_ID`
- Assumes `STRIPE_PRICE_ID` points to a Stripe one-time $10 USD product/price.
- Adds metadata:
  - `product: PivotSnap TradingView Indicator`
  - `purchase_type: one_time`
  - `delivery: email`

### Stripe Webhook

Added:

```text
/app/api/stripe-webhook/route.ts
```

Webhook behavior:

- Verifies Stripe webhook signatures using `STRIPE_WEBHOOK_SECRET`.
- Listens for `checkout.session.completed`.
- Extracts buyer email from the Checkout Session.
- Logs purchase details to `/tmp/pivotsnap-purchases.jsonl` at runtime.
- Sends a delivery payload to `EMAIL_CAPTURE_WEBHOOK_URL` containing:
  - buyer email
  - purchase timestamp
  - Stripe Checkout Session ID
  - Pine Script delivery URL

Important: `/tmp` logging is ephemeral on Vercel/serverless. Replace it with durable storage later, such as Supabase, Neon, Airtable, a CRM, or another database.

### Email Delivery

No specific email provider was provided in the task, so the implementation uses the existing generic webhook variable:

```env
EMAIL_CAPTURE_WEBHOOK_URL=
```

The webhook route sends a JSON payload to that URL. You still need to connect/confirm the actual email provider or automation endpoint.

Optional delivery URL variable added:

```env
PINE_SCRIPT_DELIVERY_URL=https://pivotsnap.tech/tradingview-script
```

### Refund Policy

Updated `/legal/refund-policy` template copy to reflect a digital product/Pine Script delivered by email.

Current draft position:

- PivotSnap is a digital TradingView indicator/Pine Script product delivered by email after purchase.
- Refunds are generally not available after code/access-link delivery.
- If delivery has not occurred, users can contact support for case-by-case review.
- Final wording still requires legal review.

### Site-Wide Copy Updates

Updated active page/component references away from old monthly/demo wording where relevant:

- Homepage CTA now says `Buy for $10`.
- Header CTA now says `Buy for $10`.
- Footer `/demo` label now says `Watch demo`.
- FAQ now says PivotSnap is a `$10 one-time purchase` with email delivery.
- `site_architecture.csv` pricing/demo metadata was updated for the new $10 one-time offer.
- `.env.example` now includes one-time payment/webhook variables.

### GA4 Event Context

Updated checkout tracking to include:

- `purchase_type: one_time`
- `value: 10`
- `currency: USD`

## Environment Variables Needed

Set these in Vercel:

```env
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech
STRIPE_SECRET_KEY=sk_test_or_live_key
STRIPE_PRICE_ID=price_id_for_one_time_10_usd_product
STRIPE_WEBHOOK_SECRET=whsec_from_stripe_webhook_endpoint
EMAIL_CAPTURE_WEBHOOK_URL=your_email_provider_or_automation_webhook
PINE_SCRIPT_DELIVERY_URL=https://pivotsnap.tech/tradingview-script
```

## Manual Input Needed

You still need to manually complete:

1. Create the Stripe product and one-time $10 USD Price in the Stripe dashboard.
2. Add the resulting `price_...` value to `STRIPE_PRICE_ID` in Vercel.
3. Create a Stripe webhook endpoint pointing to:

```text
https://pivotsnap.tech/api/stripe-webhook
```

4. Subscribe that webhook endpoint to:

```text
checkout.session.completed
```

5. Add the webhook signing secret to Vercel as:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

6. Confirm which email provider/automation webhook will send the Pine Script delivery email.
7. Replace the placeholder `/tradingview-script` delivery page with the actual protected code/access page if you do not want the code public.
8. Replace ephemeral `/tmp` logging with a durable purchase database/log.
9. Finalize refund-policy wording with legal review.

## Validation

Ran successfully:

```bash
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech npm run typecheck
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- `/api/checkout` builds.
- `/api/stripe-webhook` builds.
- `/pricing` builds with the new $10 one-time offer.

## Redeploy

The pricing update has been committed and pushed to GitHub using the `shahid_git` SSH key. If Vercel is connected to the GitHub repo, it should redeploy automatically.
