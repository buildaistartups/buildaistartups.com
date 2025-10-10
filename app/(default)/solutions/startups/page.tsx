// app/(default)/solutions/startups/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/og/solutions-startups.png'

export const metadata: Metadata = {
  title: 'Startups — From idea to revenue in weeks | Build AI Startups',
  description:
    'Build AI Startups for Founding Teams: align on a structured spec, generate repo-ready code, wire billing & analytics, and ship with quality gates. Go from intent to paying customers fast.',
  alternates: { canonical: `${siteUrl}/solutions/startups` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/startups`,
    title: 'Startups — From idea to revenue in weeks | Build AI Startups',
    description:
      'Founding teams: spec → repo → UI → docs → pricing → deploy. Ship your AI startup with quality gates and growth basics wired.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Startups' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startups — From idea to revenue in weeks | Build AI Startups',
    description:
      'Founding teams: spec → repo → UI → pricing → deploy. Ship with quality gates and get to revenue fast.',
    images: [ogImage],
  },
}

// JSON-LD Schemas
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
    { '@type': 'ListItem', position: 3, name: 'Startups', item: `${siteUrl}/solutions/startups` },
  ],
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '12-Day Launch Plan (Founding Teams)',
  description:
    'A structured 12-day plan to take your founding team from idea to live product with paying customers.',
  totalTime: 'P12D',
  step: [
    { '@type': 'HowToStep', name: 'Days 1-3: Align & Spec', text: 'Define problem, align team on structured PRD, connect accounts.' },
    { '@type': 'HowToStep', name: 'Days 4-6: Build & Test', text: 'Generate repo with CI/tests, scaffold UI, run initial experiments.' },
    { '@type': 'HowToStep', name: 'Days 7-9: Launch Prep', text: 'Deploy preview, wire analytics, enable billing, run beta tests.' },
    { '@type': 'HowToStep', name: 'Days 10-12: Go Live', text: 'Public launch, gather feedback, iterate based on user signals.' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most founding teams ship a live MVP in 8-15 days. The Builder handles spec, repo, UI, docs, pricing, and deploy so you focus on validation and users.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do we need technical co-founders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Helpful but not required. The Builder generates production-ready code with tests and CI. Non-technical founders can ship and iterate with basic dev literacy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who owns the code and revenue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your team does. Everything lives in your GitHub, deploys to your infrastructure, and revenue flows through your Stripe account.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we customize after launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. You own the full codebase. Make changes directly or use the Builder to propose updates. No lock-in.',
      },
    },
  ],
}

export default function StartupsPage() {
  return (
    <>
      {/* Structured data */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-howto" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Solutions</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Startups — From idea to revenue in weeks</h1>
              <p className="mt-4 text-lg text-slate-300">
                Founding teams: align on a structured spec, generate production-ready code, wire billing & analytics,
                and ship behind flags with quality gates. Go from intent to paying customers—fast.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Generate startup
                </Link>
                <Link href="/templates" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Browse templates
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Team alignment · Quality gates · Growth experiments · 12-day launch</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-8">
                <img
                  src="/images/solutions/startups/hero.svg"
                  alt="Founding team collaboration from idea to launch"
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Intent → Spec → Repo → UI → Pricing → Launch</p>
            </div>
          </div>
        </section>

        {/* Why founding teams choose this */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Why founding teams choose Build AI Startups</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Team alignment', d: 'Structured Spec DSL replaces vague docs. Everyone works from the same plan.' },
              { t: 'Speed to validation', d: 'Ship a live MVP in 8-15 days. Get real user feedback while competitors plan.' },
              { t: 'Built-in best practices', d: 'Tests, CI, analytics, docs, pricing—wired from day one. No boilerplate.' },
              { t: 'Quality without slowdown', d: 'Build Score and gates ensure quality. Ship fast without breaking things.' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Launch Timeline */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">12-day launch timeline</h2>
            <p className="mt-2 text-slate-300">From founding team kickoff to paying customers</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8">
              <img
                src="/images/solutions/startups/launch-timeline.svg"
                alt="12-day launch timeline from alignment to revenue"
                className="h-48 w-auto mx-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* How it works for founding teams */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">How founding teams ship fast</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Align', d: 'Define problem, ICP, and scope. Draft Spec DSL with structured requirements.' },
              { t: 'Build', d: 'Generate repo with CI, tests, docs. Scaffold UI, pricing, and onboarding.' },
              { t: 'Validate', d: 'Deploy preview, wire analytics, run experiments. Get early signals.' },
              { t: 'Launch', d: 'Go live, enable billing, iterate based on real user feedback.' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-sm uppercase tracking-wide text-slate-400">Step {i + 1}</div>
                <div className="mt-1 text-base font-medium">{s.t}</div>
                <p className="mt-1 text-sm text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Collaboration */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Built for team collaboration</h3>
              <p className="mt-2 text-slate-300">
                No more misalignment between founders. The Spec DSL keeps everyone on the same page—from technical
                architecture to business model to user flows.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>Structured PRDs:</strong> Clear requirements that technical and non-technical founders understand</li>
                <li><strong>Inline comments:</strong> Discuss decisions directly in the spec, not scattered across Slack</li>
                <li><strong>Version history:</strong> Track how scope evolves and who approved what</li>
                <li><strong>Shared dashboard:</strong> Real-time view of build progress, gates, and experiments</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/startups/team-collaboration.svg"
                alt="Founding team collaboration dashboard"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Speed Without Compromise */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/startups/quality-gates.svg"
                alt="Quality gates ensure speed without breaking things"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Speed without compromise</h3>
              <p className="mt-2 text-slate-300">
                Quality gates ensure you ship fast without accumulating technical debt or security issues.
                Build Score keeps standards high automatically.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Automated lint, type checks, and unit tests</li>
                <li>Security vulnerability scanning</li>
                <li>Performance budgets and Lighthouse scores</li>
                <li>License compliance checks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Growth Experiments */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Built-in growth experiments</h3>
              <p className="mt-2 text-slate-300">
                Don't guess—test. Run A/B experiments on hero messaging, pricing tiers, and onboarding flows
                to find product-market fit faster.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Hero message variants to test value props</li>
                <li>Pricing experiments to optimize willingness to pay</li>
                <li>Onboarding flows to maximize activation</li>
                <li>Analytics wired automatically—no SDK hell</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/startups/growth-experiments.svg"
                alt="A/B testing and growth experimentation system"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Real Founding Teams */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Real founding teams, real results</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'AIChat Pro',
                vp: 'Customer service automation',
                team: '2 founders',
                time: '8 days to launch',
                revenue: '$2.4M ARR',
                tags: ['AI', 'Support'],
              },
              {
                name: 'DataInsight',
                vp: 'BI analytics for SMBs',
                team: '3 founders',
                time: '15 days to launch',
                revenue: '$1.8M ARR',
                tags: ['Analytics', 'SaaS'],
              },
              {
                name: 'SmartLead',
                vp: 'AI-powered lead generation',
                team: '2 founders',
                time: '6 days to launch',
                revenue: '$3.1M ARR',
                tags: ['Sales', 'AI'],
              },
            ].map((p, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 flex items-center justify-center p-4">
                  <div className="text-4xl">{['🤖', '📊', '🎯'][i]}</div>
                </div>
                <div className="mt-3 text-base font-medium">{p.name}</div>
                <p className="text-sm text-slate-400">{p.vp}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Team size:</span>
                    <span className="font-semibold">{p.team}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time to launch:</span>
                    <span className="font-semibold">{p.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current ARR:</span>
                    <span className="font-semibold text-green-600">{p.revenue}</span>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-slate-950/40 px-2 py-0.5 text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem Network Effects */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/startups/ecosystem-network.svg"
                alt="Ecosystem cross-promotion network for growth"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Network effects from day one</h3>
              <p className="mt-2 text-slate-300">
                Join the Ecosystem and get cross-promotion placements across other AI startups.
                Compound growth without spending on ads.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Opt-in cross-promotions with complementary products</li>
                <li>Shared components reduce build time</li>
                <li>Referral engine with credits and commissions</li>
                <li>More apps in network = more distribution for everyone</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Investor Ready */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Investor-ready from day one</h3>
              <p className="mt-2 text-slate-300">
                Clean docs, structured PRDs, quality metrics, and live demos make fundraising easier.
                Show traction, not slide decks.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Live product demos instead of mockups</li>
                <li>Build Score and quality gate history</li>
                <li>Structured PRDs and technical documentation</li>
                <li>Real usage metrics and experiment results</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img
                src="/images/solutions/startups/investor-ready.svg"
                alt="Investor-ready documentation and metrics"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-2xl font-semibold">Startup-friendly pricing</h2>
            <p className="mt-2 text-slate-300">
              Start free. Scale when you're ready for Autopilot builds, Ecosystem distribution, and Marketplace listings.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { plan: 'Starter', price: '$0', note: 'Perfect for validating your idea' },
                { plan: 'Builder', price: '$49', note: 'Autopilot builds, experiments, SEO pack' },
                { plan: 'Studio', price: '$149', note: 'Ecosystem, Marketplace, webhooks, API' },
              ].map((x, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3">
                  <div className="text-base font-semibold">{x.plan}</div>
                  <div className="text-lg">{x.price}</div>
                  <div className="text-sm text-slate-400">{x.note}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/pricing" className="text-sky-300 hover:underline">
                See full pricing →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Founding Teams FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">How long to first customer?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Most teams launch in 8-15 days and get first customers within days of going live. Billing is wired from day one.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Do we need a technical co-founder?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Helpful but not required. Non-technical founders can ship and iterate with basic dev literacy. The Builder handles the heavy lifting.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can we raise funding with this?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Absolutely. Show investors a live product with real traction, not slide decks. Many teams raise pre-seed/seed rounds after launching.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">What if we want to pivot?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Fast iteration is built-in. Update your spec, regenerate, and redeploy. Test new directions quickly without rewriting everything.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Launch your startup this month</h2>
            <p className="mt-2 text-slate-300">
              Join 2,847 founding teams who've already shipped. Generate your spec, build your product,
              and get to revenue—fast.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Generate startup
              </Link>
              <Link href="/templates" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">
                Browse templates
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
