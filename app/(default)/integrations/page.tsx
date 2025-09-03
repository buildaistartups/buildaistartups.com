// app/(default)/integrations/page.tsx
import type { Metadata } from 'next'
import IntegrationsSection from './integrations-section'
import IntegrationsList from './integrations-list'

const BRAND = 'Build AI Starups'
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/integrations`
const OG = '/brand/og-default.png'
const DESC =
  'Connect your own GitHub, Vercel, database, Stripe, and more. No lock-in — your accounts, your keys.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: `Integrations — ${BRAND}`,
  description: DESC,
  alternates: { canonical: CANON },
  openGraph: {
    type: 'website',
    url: CANON,
    title: `Integrations — ${BRAND}`,
    description: DESC,
    images: [{ url: OG, width: 1200, height: 630, alt: BRAND }],
    siteName: BRAND,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Integrations — ${BRAND}`,
    description: DESC,
    images: [OG],
  },
}

export default function Integrations() {
  return (
    <>
      <IntegrationsSection />
      <IntegrationsList />
    </>
  )
}
