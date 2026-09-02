# Resend Integration Status

## Summary

Integrated **Resend** for transactional post-purchase PivotSnap delivery emails.

The Dodo Payments webhook now sends the buyer an email after a verified successful payment event.

## Installed

```bash
npm install resend
```

Added dependency:

```json
"resend": "^6.25.0"
```

## Files Updated

- `app/api/webhooks/dodo/route.ts`
- `.env.example`
- `package.json`
- `package-lock.json`
- `dodo_integration_status.md`

## Environment Variables Added

`.env.example` now includes placeholders only:

```env
RESEND_API_KEY=replace_me_resend_api_key
RESEND_FROM_EMAIL=code@pivotsnap.tech
SUPPORT_EMAIL=support@pivotsnap.tech
PINE_SCRIPT_DELIVERY_URL=https://pivotsnap.tech/tradingview-script
PINE_SCRIPT_CODE=replace_me_with_actual_pine_script_or_use_delivery_url
```

No real API keys should be committed. Add real values directly in Vercel and/or your local `.env` file.

## Webhook Email Flow

Route:

```text
app/api/webhooks/dodo/route.ts
```

On a verified successful Dodo payment event, the route now:

1. Verifies the incoming Dodo webhook with `standardwebhooks` and `DODO_PAYMENTS_WEBHOOK_KEY`.
2. Extracts the buyer email from the Dodo payload.
3. Logs purchase metadata to `/tmp/pivotsnap-dodo-purchases.jsonl`.
4. Sends a transactional email via Resend.

## Email Template Includes

The Resend email includes:

- Thank-you message for purchasing PivotSnap.
- Product context: PivotSnap is a TradingView reversal, entry, exit, and buy/sell signal indicator.
- Pine Script delivery:
  - If `PINE_SCRIPT_CODE` is set to the real code, the email includes the code directly in plain text and HTML.
  - Otherwise, it sends the `PINE_SCRIPT_DELIVERY_URL` link/instructions.
- Setup instructions:
  - Open TradingView.
  - Go to Pine Editor.
  - Paste code or follow secure access-link instructions.
  - Save and add to chart.
- Support contact using `SUPPORT_EMAIL`.
- Purchase reference/event ID and timestamp.
- Trading risk note.

## Sender

Default sender:

```text
PivotSnap <code@pivotsnap.tech>
```

This requires domain/sender verification inside the Resend dashboard.

## Manual Input Needed

You still need to complete:

1. Add your rotated Resend API key in Vercel:

```env
RESEND_API_KEY=your_real_resend_key
```

2. Verify `pivotsnap.tech` in Resend so this sender can send:

```env
RESEND_FROM_EMAIL=code@pivotsnap.tech
```

3. Confirm the support inbox:

```env
SUPPORT_EMAIL=support@pivotsnap.tech
```

4. Choose delivery method:

Option A — email code directly:

```env
PINE_SCRIPT_CODE=your_actual_pine_script_code
```

Option B — email a secure/private delivery link:

```env
PINE_SCRIPT_DELIVERY_URL=https://pivotsnap.tech/your-secure-delivery-page
```

5. Confirm the exact Dodo success event name from live/test webhooks and adjust event detection if needed.

6. Replace `/tmp` purchase logging with durable storage before relying on it for support/refund records.

## Security Notes

- Real API keys were not intentionally committed.
- `.env` and `.env.*` are ignored by Git, except `.env.example`.
- `.env.example` contains placeholders only.
- If any real Dodo/Resend key was ever placed in a tracked file before this update, rotate it before going live.

## Validation

The following checks were run after integration:

```bash
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run typecheck
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- `/api/webhooks/dodo` builds with Resend delivery.
- `/checkout` Dodo adapter route builds.
