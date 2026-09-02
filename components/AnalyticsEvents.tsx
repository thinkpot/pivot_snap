'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/gtag'

export function PricingViewEvent() {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    trackEvent('pricing_view', {
      page_path: '/pricing',
      page_title: 'TradingView Indicator Pricing',
    })
  }, [])

  return null
}

export function PurchaseCompleteEvent() {
  const searchParams = useSearchParams()
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    if (searchParams.get('checkout') !== 'success') return
    fired.current = true
    trackEvent('purchase_complete', {
      page_path: '/demo',
      checkout_status: 'success',
    })
  }, [searchParams])

  return null
}
