import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { SuccessBody } from './success-body'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const PAGE_URL = `${SITE_URL}/contact/success`
const OG = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Message received — Build AI Startups',
  description:
    'Thanks for reaching out. We’ve received your message and will get back to you.',
  robots: { index: false, follow: true }, // keep thank-you pages out of the index
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Message received — Build AI Startups',
    description:
      'Thanks for reaching out. We’ll reply shortly.',
    images: [{ url: OG, width: 1200, height: 630, alt: 'Build AI Startups — Contact Success' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Message received — Build AI Startups',
    description: 'We’ll reply shortly.',
    images: [OG],
  },
}

export default function ContactSuccessPage() {
  return (
    <main className="bg-slate-950 text-slate-200">
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-24 sm:pt-32">
        <h1 className="text-4xl font-bold">Thanks — we got your message</h1>
        <p className="mt-3 text-lg text-slate-300">
          We’ll get back to you within 1–2 business days. In the meantime, here are some helpful links:
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          <li>
            <Link href="/resources/docs" className="block rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 hover:bg-white/5">
              Read the Docs
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="block rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 hover:bg-white/5">
              See Pricing
            </Link>
          </li>
          <li>
            <Link href="/resources/templates" className="block rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 hover:bg-white/5">
              Explore Templates
            </Link>
          </li>
          <li>
            <Link href="/generate" className="block rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 hover:bg-white/5">
              Generate a Startup
            </Link>
          </li>
        </ul>

        {/* Reason-aware guidance */}
        <Suspense fallback={null}>
          <SuccessBody />
        </Suspense>
      </section>
    </main>
  )
}
