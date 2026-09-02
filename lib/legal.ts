export const legalPages = {
  'risk-disclaimer': {
    title: 'Risk Disclaimer',
    description: 'Important trading risk disclosures for PivotSnap Trading Indicator users.',
  },
  terms: {
    title: 'Terms of Service',
    description: 'Terms of service for using PivotSnap Trading Indicator.',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How PivotSnap Trading Indicator collects, uses, and protects information.',
  },
  'refund-policy': {
    title: 'Refund Policy',
    description: 'Refund policy for PivotSnap Trading Indicator subscriptions and purchases.',
  },
} as const

export type LegalSlug = keyof typeof legalPages
