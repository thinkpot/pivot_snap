# Dodo Webhook Verification Status

## Webhook Route

Current route file:

```text
app/api/webhooks/dodo/route.ts
```

Production webhook URL to paste into Dodo Payments:

```text
https://pivotsnap.tech/api/webhooks/dodo
```

## Confirmed in Code

### 1. Signature verification

The route imports and uses `standardwebhooks`:

```ts
import { Webhook } from 'standardwebhooks'
```

It verifies incoming requests against:

```ts
process.env.DODO_PAYMENTS_WEBHOOK_KEY
```

using headers:

```text
webhook-id
webhook-timestamp
webhook-signature
```

### 2. Failed verification is rejected

If signature verification fails, the route returns `401` and does not proceed to fulfillment:

```ts
return NextResponse.json({ error: message }, { status: 401 })
```

The code logs:

```text
Dodo webhook signature verification failed; fulfillment skipped.
```

### 3. Successful verified payment triggers welcome/setup email

After verification passes, the route checks for a successful payment-style event:

- `payment.succeeded`
- `payment_succeeded`
- or a payment event with `status === 'succeeded'`

Then it extracts buyer email from common Dodo payload locations and sends a Resend welcome/setup email.

Important: PivotSnap code delivery is now handled natively by Dodo Payments as the product attachment. Our webhook no longer sends the Pine Script code or a Pine Script delivery URL.

The Resend email uses:

```env
RESEND_API_KEY
RESEND_FROM_EMAIL=code@pivotsnap.tech
SUPPORT_EMAIL=support@pivotsnap.tech
```

The welcome/setup email includes:

- Thank-you message for purchasing PivotSnap
- A note that the code file arrives separately from Dodo Payments as a product attachment
- A reminder to check inbox/spam/promotions for the Dodo Payments delivery email
- Step-by-step TradingView setup instructions
- Support contact via `SUPPORT_EMAIL`
- Purchase reference and timestamp
- Trading risk note

### 4. Event logging

The route logs purchase details to:

```text
/tmp/pivotsnap-dodo-purchases.jsonl
```

Record includes:

- buyer email
- purchase timestamp
- Dodo event ID
- payment ID
- checkout session ID
- amount/currency/status when present
- metadata/product info

The route also writes console logs for local/Vercel verification:

```text
Dodo webhook signature verification passed.
Dodo purchase logged for PivotSnap fulfillment.
PivotSnap Dodo welcome/setup email triggered.
```

## `.env.example` Confirmed

`.env.example` lists the Dodo webhook key with a placeholder only:

```env
DODO_PAYMENTS_WEBHOOK_KEY=replace_me_dodo_webhook_key
```

Removed obsolete variables:

```text
PINE_SCRIPT_CODE
PINE_SCRIPT_DELIVERY_URL
```

They are no longer needed because Dodo Payments delivers the code file directly as the product attachment.

Secret scan passed: no real-looking Dodo, Resend, Stripe, or webhook secrets were found in tracked source files.

## Build Validation

Ran:

```bash
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run typecheck
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- `/api/webhooks/dodo` builds successfully.

## Manual Action Needed Before Testing

Add these real values locally and in Vercel:

```env
DODO_PAYMENTS_WEBHOOK_KEY=your_real_dodo_webhook_key
DODO_PAYMENTS_API_KEY=your_real_dodo_api_key
DODO_PAYMENTS_ENVIRONMENT=test_mode
DODO_PAYMENTS_RETURN_URL=https://pivotsnap.tech/demo?checkout=success
NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=your_real_dodo_product_id
RESEND_API_KEY=your_real_resend_api_key
RESEND_FROM_EMAIL=code@pivotsnap.tech
SUPPORT_EMAIL=support@pivotsnap.tech
```

Also configure the PivotSnap Pine Script file as the Dodo Payments product attachment in the Dodo dashboard.

Important: after adding or changing environment variables in Vercel, you must redeploy the Vercel project for the new env vars to take effect.

I will not redeploy automatically. Confirm after you have added the real webhook secret/API keys locally and in Vercel, then I can help test/redeploy.

## How to Trigger One Test Webhook Event

Option A — Dodo dashboard test webhook:

1. Open Dodo Payments dashboard.
2. Go to webhook settings.
3. Add endpoint:

```text
https://pivotsnap.tech/api/webhooks/dodo
```

4. Add/select the successful payment event.
5. Use Dodo's `Send test webhook` button if available.
6. Check Vercel function logs for:

```text
Dodo webhook signature verification passed.
Dodo purchase logged for PivotSnap fulfillment.
PivotSnap Dodo welcome/setup email triggered.
```

Option B — test-mode purchase:

1. Ensure Vercel env has:

```env
DODO_PAYMENTS_ENVIRONMENT=test_mode
```

2. Complete one test-mode purchase through the `/pricing` button.
3. Confirm the checkout redirects back to:

```text
https://pivotsnap.tech/demo?checkout=success
```

4. Check Vercel logs for the three confirmation messages above.
5. Confirm the buyer receives:
   - the Dodo Payments product-attachment email containing the code file
   - the PivotSnap Resend welcome/setup email

## Current Status

Confirmed locally:

- Webhook route exists.
- Signature verification is implemented with `standardwebhooks`.
- Failed verification returns `401` and skips fulfillment.
- Successful payment path triggers Resend welcome/setup email.
- Pine Script code/link delivery logic was removed from our webhook.
- Dodo Payments is expected to deliver the code file natively as a product attachment.
- Purchase logging exists via `/tmp` and console logs.
- `.env.example` has placeholder-only `DODO_PAYMENTS_WEBHOOK_KEY`.
- Build passes.

Still pending:

- Add real Dodo webhook key locally.
- Add real Dodo webhook key in Vercel.
- Add real Dodo API key/product ID in Vercel/local.
- Add real Resend API key in Vercel/local.
- Verify `code@pivotsnap.tech` sender/domain in Resend.
- Upload/attach the Pine Script file to the Dodo Payments product.
- Redeploy Vercel after env vars are added.
- Trigger one test webhook or test-mode purchase and confirm logs/email.
