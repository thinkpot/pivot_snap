import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: 'PivotSnap Trading Indicator',
    template: '%s | PivotSnap',
  },
  description: siteConfig.description,
  verification: {
    google: 'DoeUfCiKhCWg05mx2Q4xrDq38_IkJmbeP9_GReLQzY0',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
