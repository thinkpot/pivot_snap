export const GA_MEASUREMENT_ID = 'G-W2SWNVKYET'

type GtagCommand = 'config' | 'event' | 'js'

type Gtag = (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

export function trackEvent(eventName: string, parameters: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', eventName, {
    event_category: 'conversion',
    ...parameters,
  })
}
