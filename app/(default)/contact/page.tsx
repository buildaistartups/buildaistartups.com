// app/(default)/contact/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import ContactForm from '@/components/contact-form'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const PAGE_URL = `${SITE_URL}/contact`
const OG = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Contact — Build AI Startups (HyperNova)',
  description:
    'Talk to sales, partnerships, press, or support. We help you go from intent to live product with ownership kept.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Contact — Build AI Startups',
    description:
      'Reach the team behind HyperNova: sales, partnerships, press, billing, and technical support.',
    images: [{ url: OG, width: 1200, height: 630, alt: 'Build AI Startups — Contact' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Build AI Startups',
    description:
      'We’re here to help you launch and grow autonomous products.',
    images: [OG],
  },
}

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  about: {
    '@type': 'SoftwareApplication',
    name: 'Build AI Startups',
    applicationCategory: 'BusinessApplication',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Build AI Startups',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-light.svg`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'sales@buildaistartups.com',
        url: `${PAGE_URL}?topic=sales`,
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@buildaistartups.com',
        url: `${PAGE_URL}?topic=support`,
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'press',
        email: 'press@buildaistartups.com',
        url: `${PAGE_URL}?topic=press`,
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'partnerships',
        email: 'partners@buildaistartups.com',
        url: `${PAGE_URL}?topic=partnerships`,
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'billing',
        email: 'billing@buildaistartups.com',
        url: `${PAGE_URL}?topic=billing`,
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'security',
        email: 'security@buildaistartups.com',
        url: `${PAGE_URL}?topic=security`,
        availableLanguage: ['en'],
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <>
      <Script
        id="ld-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-widest text-slate-400">Contact</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Talk to the Build AI Startups team</h1>
            <p className="mt-4 text-lg text-slate-300">
              Sales, partnerships, press, billing, or product support—we’re here to help. You can also
              email us directly at{' '}
              <a className="text-sky-300 hover:underline" href="mailto:hello@buildaistartups.com">
                hello@buildaistartups.com
              </a>.
            </p>
          </div>
        </section>

        {/* Quick cards */}
        <section className="mx-auto max-w-6xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickCards.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 hover:bg-white/5 transition"
              >
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-slate-300">{c.copy}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {c.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/5"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                {c.email && (
                  <p className="mt-3 text-sm text-slate-400">
                    Email:{' '}
                    <a className="text-sky-300 hover:underline" href={`mailto:${c.email}`}>
                      {c.email}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8">
                <h2 className="text-2xl font-semibold">Send us a message</h2>
                <p className="mt-2 text-slate-300">
                  Fill out the form and we’ll get back to you. We typically respond within 1–2 business days.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  By submitting, you agree to our{' '}
                  <Link href="/legal/terms" className="text-sky-300 hover:underline">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/legal/privacy" className="text-sky-300 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Side panel */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-lg font-semibold">Headquarters</h3>
                <p className="mt-2 text-slate-300">
                  Fully remote, operating across EU & US time zones.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  For legal notices, contact{' '}
                  <a className="text-sky-300 hover:underline" href="mailto:legal@buildaistartups.com">
                    legal@buildaistartups.com
                  </a>
                  .
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-lg font-semibold">Status & Docs</h3>
                <ul className="mt-2 space-y-2 text-slate-300">
                  <li>
                    <Link href="/resources/changelog" className="text-sky-300 hover:underline">
                      Changelog
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/docs" className="text-sky-300 hover:underline">
                      Docs
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/roadmap" className="text-sky-300 hover:underline">
                      Roadmap
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-lg font-semibold">Social</h3>
                <ul className="mt-2 space-y-2 text-slate-300">
                  <li>
                    <a href="https://x.com/buildaistartups" className="text-sky-300 hover:underline">
                      X / Twitter
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/buildaistartups" className="text-sky-300 hover:underline">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/buildaistartups" className="text-sky-300 hover:underline">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Prefer to start building?</h2>
            <p className="mt-2 text-slate-300">Open the Builder and go from intent to live preview in minutes.</p>
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

const quickCards = [
  {
    title: 'Sales',
    copy: 'Evaluate plans, usage, and procurement details.',
    email: 'sales@buildaistartups.com',
    links: [{ href: '/pricing', label: 'See pricing' }, { href: '/contact?topic=sales', label: 'Talk to sales' }],
  },
  {
    title: 'Support',
    copy: 'Questions on setup, integrations, or incidents.',
    email: 'support@buildaistartups.com',
    links: [{ href: '/resources/docs', label: 'Read docs' }, { href: '/contact?topic=support', label: 'Open ticket' }],
  },
  {
    title: 'Partnerships',
    copy: 'OEM, integrations, co-marketing, and distribution.',
    email: 'partners@buildaistartups.com',
    links: [{ href: '/integrations', label: 'Integrations' }, { href: '/contact?topic=partnerships', label: 'Propose a partnership' }],
  },
  {
    title: 'Press',
    copy: 'Media requests, founder bio, and brand assets.',
    email: 'press@buildaistartups.com',
    links: [{ href: '/resources/press', label: 'Press kit' }, { href: '/contact?topic=press', label: 'Contact press' }],
  },
  {
    title: 'Security',
    copy: 'Report vulnerabilities or request security info.',
    email: 'security@buildaistartups.com',
    links: [{ href: '/legal/security', label: 'Security policy' }, { href: '/contact?topic=security', label: 'Report an issue' }],
  },
  {
    title: 'Billing',
    copy: 'Invoices, refunds, or tax documentation.',
    email: 'billing@buildaistartups.com',
    links: [{ href: '/pricing', label: 'Plans & fees' }, { href: '/contact?topic=billing', label: 'Billing help' }],
  },
]
