// app/(default)/solutions/enterprises/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/og/product-ecosystem.svg' // safe existing OG

export const metadata: Metadata = {
  title: 'Enterprises — Launch an AI Venture Lab that ships | Build AI Startups',
  description:
    'For innovation labs: create venture‑grade apps at startup speed with governance. Private templates, SSO, audit trails, feature flags, and measurable GTM loops.',
  alternates: { canonical: `${siteUrl}/solutions/enterprises` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/enterprises`,
    title: 'Enterprises — Launch an AI Venture Lab that ships | Build AI Startups',
    description:
      'From problem framing to live pilots in weeks. White‑label builder, partner integrations, and secure data guardrails.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Enterprises' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprises — Launch an AI Venture Lab that ships',
    description: 'Startup speed with enterprise guardrails.',
    images: [ogImage],
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Build AI Startups',
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-light.svg`,
  sameAs: ['https://x.com/buildaistartups', 'https://github.com/buildaistartups'],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 3, name: 'Enterprises', item: `${siteUrl}/solutions/enterprises` },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do we get private templates and governance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can maintain a private template catalog, enforce code owners, and require approvals and quality gates before deploy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can this run in our environment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bring your own VPC and providers. Works with Vercel/Netlify, Render/Railway, and Supabase. Data stays in your accounts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What about security & access?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SSO (SAML/OIDC), role‑based access, audit trails, feature flags, and environment‑scoped secrets are supported.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      {/* Structured data */}
      <Script id="org-jsonld" type="application/ld+json">{JSON.stringify(orgJsonLd)}</Script>
      <Script id="breadcrumb-jsonld" type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</Script>
      <Script id="faq-jsonld" type="application/ld+json">{JSON.stringify(faqJsonLd)}</Script>

      <main className="relative">
        {/* Decorative backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[20%] top-[-15%] h-[40rem] w-[60rem] rounded-full blur-3xl"
               style={{background: 'radial-gradient(50% 50% at 50% 50%, rgba(79,70,229,0.25) 0%, rgba(0,0,0,0) 70%)'}}/>
          <div className="absolute right-[-10%] bottom-[-20%] h-[35rem] w-[55rem] rounded-full blur-3xl"
               style={{background: 'radial-gradient(50% 50% at 50% 50%, rgba(16,185,129,0.15) 0%, rgba(0,0,0,0) 70%)'}}/>
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="mx-auto max-w-6xl px-6 pt-12 pb-6 text-center">
            <div className="mx-auto max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
                Enterprise innovation that actually ships
              </h1>
              <p className="mt-4 text-slate-300">
                Create venture‑grade apps at startup speed — with enterprise guardrails. Private templates, SSO, audit trails, feature
                flags, and measurable GTM loops built‑in.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link href="/contact" className="inline-flex items-center rounded-xl bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                  Talk to us
                </Link>
                <Link href="/product/ecosystem" className="inline-flex items-center rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                  See the Ecosystem
                </Link>
              </div>
              <div className="mt-4 text-xs text-slate-400">White‑label • You own the repos • Works in your cloud</div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="mx-auto max-w-6xl px-6 pb-12">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 ring-1 ring-white/5">
              <Image
                src="/images/product/builder/hero.svg"
                alt="Enterprise venture lab — white‑label builder overview"
                width={1360}
                height={768}
                priority
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Business outcomes in 90‑day cycles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: 'New revenue tracks', d: 'Spin out internal ideas into market‑tested pilots and new P&L lines.' },
              { t: 'Time‑to‑signal', d: 'Weeks, not quarters — ship behind flags and get real telemetry from day one.' },
              { t: 'Partner leverage', d: 'Co‑build and co‑sell with ISVs and SIs via a structured ecosystem motion.' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Governance & architecture with visual */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 ring-1 ring-white/5 order-2 md:order-1">
              <Image
                src="/images/product/builder/shell-preview.svg"
                alt="Governance and architecture — shell preview with flags, roles and telemetry"
                width={1200}
                height={720}
                className="w-full h-auto rounded-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
                <div className="text-lg font-medium">Governance by default</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-300 space-y-1">
                  <li>SSO (SAML/OIDC), RBAC, and scoped environments</li>
                  <li>Audit trails, code owners, approval workflows</li>
                  <li>Feature flags, dark launches, rollout policies</li>
                  <li>Policy packs for logging, PII handling, and secrets</li>
                </ul>
              </div>
              <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/40 p-6">
                <div className="text-lg font-medium">Architecture options</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-300 space-y-1">
                  <li>Run in your cloud (Vercel/Netlify + Render/Railway + Supabase)</li>
                  <li>Private template catalog and internal component library</li>
                  <li>Sovereign/regulated paths with partner‑operated controls</li>
                  <li>Optional air‑gapped builds via offline runners</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Program model */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Program model we recommend</h2>
            <p className="mt-2 text-slate-300">Quarterly cadence with pass/fail gates to keep momentum</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { s: '1', t: 'Intake', d: 'Problem framing + guardrails. Define ROI, risks, KPIs.' },
              { s: '2', t: 'Build', d: 'Generate repo, instrument telemetry, and launch behind flags.' },
              { s: '3', t: 'Prove', d: 'Pilot with design partners; measure activation/retention/$$.' },
              { s: '4', t: 'Scale', d: 'Go market‑wide with partners and internal champions.' },
            ].map((x) => (
              <div key={x.s} className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
                <div className="text-3xl font-semibold">{x.s}</div>
                <div className="mt-2 text-lg font-medium">{x.t}</div>
                <p className="mt-1 text-sm text-slate-400">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example solution areas */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Where we see fastest proof</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: 'AI Lead Gen Pipeline', d: 'Marketing & Sales ops — predictable pipeline with attribution.' },
              { t: 'Support Copilot', d: 'Contact center automation with quality gates and deflection.' },
              { t: 'Ops Intelligence', d: 'Telemetry‑driven automation across back‑office workflows.' },
            ].map((x,i)=> (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{x.t}</div>
                <p className="mt-1 text-sm text-slate-400">{x.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-16 text-center">
          <h2 className="text-2xl font-semibold">Ready to launch your lab?</h2>
          <p className="mt-2 text-slate-300">We’ll align on outcomes, set the cadence, and ship the first pilot in weeks.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center rounded-xl bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
              Book a working session
            </Link>
            <Link href="/resources/press" className="inline-flex items-center rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
              See materials
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
