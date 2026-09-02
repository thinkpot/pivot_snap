import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/free-trial',
        destination: '/demo',
        permanent: true,
      },
      {
        source: '/blog/best-tradingview-indicator-for-crypto-reversal-signals',
        destination: '/blog/crypto-reversal-trading-strategy-for-tradingview-signals',
        permanent: true,
      },
      {
        source: '/blog/momentum-reversal-indicator-signals-filters-and-examples',
        destination: '/blog/trend-reversal-indicator-signals-confirmations-and-alerts',
        permanent: true,
      },
      {
        source: '/blog/swing-trading-indicator-strategy-for-reversal-entries',
        destination: '/blog/swing-trading-indicator',
        permanent: true,
      },
      {
        source: '/blog/trend-reversal-trading-strategy',
        destination: '/blog/what-is-a-reversal-trading-strategy-beginner-guide',
        permanent: true,
      },
    ]
  },

}

export default withMDX(nextConfig)
