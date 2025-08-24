// app/(default)/pricing/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Pricing from '@/components/pricing'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const PAGE_URL = `${SITE_URL}/pricing`
const OG = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Pricing — Build AI Startups (HyperNova)',
  description:
    'Simple, transparent plans. From idea to live product with ownership kept: Indie, Startup, and Scale.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Pricing — Build AI Startups',
    description:
      'Choose a plan that matches your stage. 20% off yearly. You own repos, infra, and revenue.',
    images: [{ url: OG, width: 1200, height: 630, alt: 'Build AI Startups — Pricing' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Build AI Startups',
    description:
      'Indie, Startup, and Scale plans for HyperNova. Simple, transparent, and scalable.',
    images: [OG],
  },
}

// JSON-LD: OfferCatalog
const offersJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Build AI Startups Pricing',
  url: PAGE_URL,
  itemListElement: [
    {
      '@type': 'Offer',
      name: 'Indie',
      url: `${PAGE_URL}#indie`,
      price: '29.00',
      priceCurrency: 'USD',
      description: 'Launch solo with ownership intact.',
      category: 'SoftwareSubscription',
      availability: 'https://schema.org/InStock',
      eligibleQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    },
    {
      '@type': 'Offer',
      name: 'Startup',
      url: `${PAGE_URL}#startup`,
      price: '79.00',
      priceCurrency: 'USD',
      description: 'Everything to ship and grow a product team.',
      category: 'SoftwareSubscription',
      availability: 'https://schema.org/InStock',
      eligibleQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    },
    {
      '@type': 'Offer',
      name: 'Scale',
      url: `${PAGE_URL}#scale`,
      price: '149.00',
      priceCurrency: 'USD',
      description: 'Advanced controls, SLA and priority distribution.',
      category: 'SoftwareSubscription',
      availability: 'https://schema.org/InStock',
      eligibleQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    },
  ],
}

// JSON-LD: FAQPage
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What do I own when I use Build AI Startups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'You own the code (private GitHub), infra (Vercel/DB/Stripe), and revenue. HyperNova powers the build engine—no lock-in.',
      },
    },
    {
      '@type': 'Question',
      name: 'What’s included in every plan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Builder pipeline (spec → repo → UI → docs → pricing → deploy), quality gates, marketplace listing, and ecosystem visibility. Limits vary by plan.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer yearly discounts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. Yearly billing applies a 20% discount and unlocks higher usage on some limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upgrade or downgrade anytime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. Plan changes are pro-rated to your next billing cycle. Usage limits adjust immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Ecosystem cross-promotions work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Generated startups get shared surfaces (widgets, emails, feed placements) that drive traffic to each other. Visibility tiers depend on plan.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there an SLA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'The Scale plan includes a 99.9% SLA and priority incident response.',
      },
    },
    {
      '@type': 'Question',
      name: 'What about security and compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Quality gates include tests, dependency/license checks, and basic security scans. Compliance packs (standard/advanced) add templates and checks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you charge marketplace fees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. Marketplace transaction fees vary by plan (Indie 10%, Startup 7%, Scale 5%).',
      },
    },
  ],
}

const faqItems = [
  {
    q: 'What do I own when I use Build AI Startups?',
    a: (
      <p>
        Everything that matters: the code (your private GitHub), infra (your Vercel/DB/Stripe),
        domains, and revenue. HyperNova powers the build engine—there’s no lock-in.
      </p>
    ),
  },
  {
    q: 'What’s included in every plan?',
    a: (
      <ul className="list-disc pl-5">
        <li>Builder pipeline (spec → repo → UI → docs → pricing → deploy)</li>
        <li>Quality gates (tests, security scans, license checks)</li>
        <li>Marketplace listing + basic diligence pack</li>
        <li>Ecosystem visibility (varies by plan)</li>
      </ul>
    ),
  },
  {
    q: 'Do you offer yearly discounts?',
    a: <p>Yes—yearly billing applies a 20% discount and increases some usage caps.</p>,
  },
  {
    q: 'Can I change plans later?',
    a: <p>Yes. Upgrades/downgrades are pro-rated to your next billing cycle; limits adjust immediately.</p>,
  },
  {
    q: 'How do Ecosystem cross-promotions work?',
    a: (
      <p>
        Generated startups feature each other via shared surfaces (widgets, emails, feeds). Visibility tiers increase from Indie →
        Startup → Scale.
      </p>
    ),
  },
  {
    q: 'Do you charge marketplace fees?',
    a: <p>Yes: Indie 10%, Startup 7%, Scale 5% per transaction.</p>,
  },
  {
    q: 'Is there an SLA?',
    a: <p>The Scale plan includes a 99.9% SLA and priority incident response.</p>,
  },
  {
    q: 'What about security & compliance?',
    a: (
      <p>
        Quality gates cover tests, dependency health, license guardrails, basic security scans. Compliance packs (Standard/Advanced)
        are available on Startup/Scale.
      </p>
    ),
  },
]

export default function PricingPage() {
  return (
    <>
      <Script
        id="ld-offers"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-slate-400">Pricing</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Simple, transparent, and scalable</h1>
            <p className="mt-4 text-lg text-slate-300">
              From intent to live product—choose a plan that matches your stage.{' '}
              <span className="text-slate-200 font-medium">20% off yearly.</span> No lock-in; you own your
              repos, infra, and revenue.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
              >
                Start free
              </Link>
              <Link
                href="/contact?topic=sales"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto max-w-6xl px-6 pb-6">
          <Pricing />
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold">Pricing FAQ</h2>
            <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-slate-900/40">
              {faqItems.map((f) => (
                <details key={f.q} className="group open:bg-slate-900/60">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-slate-200 hover:bg-white/5">
                    <span className="text-base font-medium">{f.q}</span>
                    <span className="ml-4 rounded-full border border-white/10 p-1 text-slate-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-slate-300">{f.a}</div>
                </details>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Still have questions?{' '}
              <Link href="/contact" className="text-sky-300 hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Launch your next product today</h2>
            <p className="mt-2 text-slate-300">
              Open the Builder and go from idea to live preview in minutes.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Generate now
              </Link>
              <Link
                href="/resources/templates"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                Use a template
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
