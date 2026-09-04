'use client'

import { WhopCheckoutEmbed } from '@whop/checkout/react'

export function WhopEmbed({ planId, returnUrl }: { planId: string; returnUrl: string }) {
  return <WhopCheckoutEmbed planId={planId} returnUrl={returnUrl} />
}
