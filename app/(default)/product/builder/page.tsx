// app/(default)/product/builder/page.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import { verticals } from '@/lib/verticals'
import BuilderVerticalPage from '@/components/builder/BuilderVerticalPage'

// --- Brand / SEO constants ---
const BRAND = 'Build AI Startups'
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/product/builder`
const OG = '/og/product-builder.svg'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: `Builder — From brief to repo in minutes | ${BRAND}`,
  description:
    'The Builder turns a plain-language intent into a production-ready Next.js app with repo, CI, tests, docs, pricing, and deploy. From idea to live preview—fast.',
  alternates: { canonical: CANON },
  openGraph: {
    type: 'website',
    url: CANON,
    title: `Builder — From brief to repo in minutes | ${BRAND}`,
    description:
      'Turn a one-sentence brief into a production-ready Next.js app with repo, CI, tests, docs, pricing, and deploy.',
    images: [{ url: OG, width: 1200, height: 630, alt: `${BRAND} — Builder` }],
    siteName: BRAND,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Builder — From brief to repo in minutes | ${BRAND}`,
    description:
      'Turn a one-sentence brief into a working app with CI, tests, docs, pricing, and deploy—automatically.',
    images: [OG],
  },
}

// ---- JSON-LD Schemas ----
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND,
  url: SITE,
  logo: `${SITE}/brand/logo-light.svg`,
  sameAs: ['https://x.com/buildaistartups', 'https://github.com/buildaistartups'],
}

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: `${BRAND} Builder`,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description:
    'Turn a plain-language intent into a production-ready app with repo, CI, tests, docs, pricing, and deploy.',
  offers: [
    { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Starter', url: `${SITE}/pricing` },
    { '@type': 'Offer', price: '49', priceCurrency: 'USD', name: 'Builder', url: `${SITE}/pricing` },
    { '@type': 'Offer', price: '149', priceCurrency: 'USD', name: 'Studio', url: `${SITE}/pricing` },
  ],
  brand: { '@type': 'Brand', name: BRAND },
  url: CANON,
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Product', item: `${SITE}/` },
    { '@type': 'ListItem', position: 3, name: 'Builder', item: CANON },
  ],
}

// Next.js 15 requires async handling of searchParams
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ vertical?: string }>
}) {
  // Await the searchParams promise
  const params = await searchParams
  const v = params?.vertical as keyof typeof verticals | undefined
  const vertical = v && verticals[v] ? verticals[v] : undefined

  return (
    <>
      {/* Structured data */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="ld-app" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Vertical-aware Builder */}
      <BuilderVerticalPage vertical={vertical} />
    </>
  )
}
