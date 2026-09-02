export const siteConfig = {
  name: 'PivotSnap Trading Indicator',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://pivotsnap.tech',
  description: 'TradingView reversal, entry, exit, and buy/sell signal indicator for active traders.',
}

export function absoluteUrl(path = '/') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.baseUrl.replace(/\/$/, '')}${cleanPath}`
}
