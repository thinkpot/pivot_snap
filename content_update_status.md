# Content Update Status

## Summary

Updated the breaker block blog draft and refund policy content.

## Blog Article

File added/updated:

```text
content/blog/breaker-block-trading-guide.mdx
```

Status:

- Uses the provided title: `Breaker Blocks Explained: How to Trade Them`
- Uses the provided meta description.
- Keeps required frontmatter fields:
  - `title`
  - `meta_description`
  - `primary_keyword`
  - `publish_date`
  - `content_silo`
  - `cta`
  - `target_word_count`
- Contains the full article draft content that was present in the attached file.
- CTA was adjusted from the old free-trial wording to current pricing flow: `Buy PivotSnap for $10` linking to `/pricing`.

Also updated `app/blog/[slug]/page.tsx` so blog posts render the actual MDX/Markdown body content instead of the previous generic placeholder scaffold text.

## Refund Policy

Updated:

```text
app/legal/[slug]/page.tsx
```

The `/legal/refund-policy` page now renders the provided refund policy draft content, including:

- Digital Product Delivery
- Refund Eligibility
- What Is Not Covered
- How to Request a Refund
- Chargebacks
- Changes to This Policy

The rendered page is clearly marked:

```text
DRAFT — requires legal review before publishing.
```

The legal-review checklist from the provided `refund_policy.md` is preserved only inside code comments and is not rendered to users.

## Security Cleanup

A real-looking Resend API key appeared in `.env.example` before this update. It was immediately removed and replaced with:

```env
RESEND_API_KEY=replace_me_resend_api_key
```

Secret scan passed after cleanup.

## Validation

Ran successfully:

```bash
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run typecheck
NEXT_PUBLIC_SITE_URL=https://pivotsnap.tech NEXT_PUBLIC_DODO_PAYMENTS_PRODUCT_ID=prod_placeholder npm run build
```

Result:

- TypeScript check passed.
- Next.js production build passed.
- `/legal/refund-policy` generated successfully.
- `/blog/breaker-block-trading-guide` source MDX exists and is included in blog static params.

## Redeploy

Changes have been committed and pushed to GitHub using the `shahid_git` SSH key. If Vercel is connected to the repo, it should redeploy automatically.
