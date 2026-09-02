# Dodo Payments Integration Status

## Summary

Integrated Dodo Payments for the PivotSnap $10 one-time purchase using the official Next.js adaptor.

Installed packages:

```bash
npm install @dodopayments/nextjs standardwebhooks
```

## Files Added

- `app/checkout/route.ts`
- `app/api/webhooks/dodo/route.ts`
- `dodo_integration_status.md`

## Files Updated

- `package.json`
- `package-lock.json`
- `.env.example`
- `.gitignore`
- `components/CheckoutButton.tsx`

## Checkout Route

Created:

```text
app/checkout/route.ts
```

Implementation:

```ts
import { Checkout } from '@dodopayments/nextjs'

export const runtime = 'nodejs'

export const POST = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode' | undefined,
  type: 'dynamic',
})
```

The `/pricing` purchase button now posts to:

```text
/checkout
```

and redirects the customer to the returned Dodo checkout URL.

## Pricing Button

Updated `components/CheckoutButton.tsx`:

- Uses Dodo checkout endpoint `/checkout`.
- Sends a dynamic checkout payload with:
  - `product_id` from `NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID`
  - quantity `1`
  - metadata for PivotSnap one-time purchase and email delivery
- Tracks GA4 `checkout_started` with:
  - `payment_provider: dodo_payments`
  - `purchase_type: one_time`
  - `value: 10`
  - `currency: USD`

## Dodo Webhook Route

Created:

```text
app/api/webhooks/dodo/route.ts
```

Behavior:

- Uses `standardwebhooks` to verify Dodo webhook signatures.
- Reads webhook headers:
  - `webhook-id`
  - `webhook-timestamp`
  - `webhook-signature`
- Uses `DODO_PAYMENTS_WEBHOOK_KEY` for verification.
- Handles successful payment-style events.
- Extracts buyer email from common Dodo webhook payload locations.
- Logs purchase data to `/tmp/pivotsnap-dodo-purchases.jsonl` at runtime.
- Sends a delivery payload to `EMAIL_CAPTURE_WEBHOOK_URL` so a transactional email provider/automation can deliver the Pine Script code or secure delivery link.

Important: `/tmp` is ephemeral on Vercel/serverless. Replace with durable storage before relying on logs for support/refunds. Recommended options: Supabase, Neon, Airtable, a CRM, or a proper transactional email platform event log.

## Email Provider Status

No specific transactional email provider has been confirmed yet.

Current implementation uses the existing generic webhook handoff:

```env
EMAIL_CAPTURE_WEBHOOK_URL=
```

You still need to confirm the provider/automation endpoint, for example:

- Resend
- SendGrid
- Postmark
- Mailgun
- ConvertKit
- Zapier/Make webhook that sends the email

Once confirmed, replace or point `EMAIL_CAPTURE_WEBHOOK_URL` to that provider/automation.

## Environment Variables Added

`.env.example` now includes placeholder-only Dodo variables:

```env
DODO_PAYMENTS_API_KEY=replace_me_dodo_payments_api_key
DODO_PAYMENTS_WEBHOOK_KEY=replace_me_dodo_webhook_key
DODO_PAYMENTS_RETURN_URL=https://pivotsnap.tech/free-trial?checkout=success
DODO_PAYMENTS_ENVIRONMENT=test_mode
NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_replace_me
```

Existing delivery variables:

```env
EMAIL_CAPTURE_WEBHOOK_URL=
PINE_SCRIPT_DELIVERY_URL=https://pivotsnap.tech/tradingview-script
```

## Secret Safety

Confirmed:

- No real Dodo API key was added.
- `.env` is ignored in `.gitignore`.
- `.env.*` is ignored, with `!.env.example` explicitly allowed.
- Secret-pattern scan found no committed real-looking Stripe/Dodo/webhook secrets.

`.gitignore` includes:

```gitignore
.env
.env.*
!.env.example
```

## Validation

Ran successfully:

```bash
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run typecheck
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- `/checkout` route builds.
- `/api/webhooks/dodo` route builds.
- `/pricing` builds and now triggers Dodo checkout flow.

## Manual Input Needed

You still need to add real values in Vercel/project environment variables:

```env
DODO_PAYMENTS_API_KEY=your_rotated_real_key
DODO_PAYMENTS_WEBHOOK_KEY=your_real_dodo_webhook_key
DODO_PAYMENTS_RETURN_URL=https://pivotsnap.tech/free-trial?checkout=success
DODO_PAYMENTS_ENVIRONMENT=live_mode
NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=your_dodo_product_id
EMAIL_CAPTURE_WEBHOOK_URL=your_confirmed_transactional_email_endpoint
PINE_SCRIPT_DELIVERY_URL=your_secure_delivery_url_or_page
```

Also needed:

1. Confirm the exact Dodo product ID for the $10 PivotSnap one-time product.
2. Configure the Dodo webhook endpoint to point to:

```text
https://pivotsnap.tech/api/webhooks/dodo
```

3. Confirm which Dodo event name(s) are emitted for successful one-time payments in your dashboard/test mode and adjust `isSuccessfulPaymentEvent()` if needed.
4. Confirm transactional email provider: Resend, SendGrid, Postmark, Mailgun, Zapier/Make, etc.
5. Replace `/tmp` logging with durable database/log storage.
6. Consider removing legacy Stripe routes after Dodo is fully verified.

## Redeploy

Changes have been committed and pushed to GitHub using the `shahid_git` SSH key. If Vercel is connected to the repo, it should redeploy automatically.
