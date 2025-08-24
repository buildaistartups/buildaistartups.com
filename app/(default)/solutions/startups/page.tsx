// app/(default)/solutions/startups/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Product Teams — compress roadmap from months to days | Build AI Startups',
  description:
    'HyperNova for Product Teams: align PM, design, and engineering on a structured spec, generate repo-ready code, wire billing & analytics, and ship behind flags with quality gates.',
  alternates: { canonical: `${siteUrl}/solutions/startups` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/startups`,
    title: 'Product Teams — compress roadmap from months to days | Build AI Startups',
    description:
      'Go from intent to validated shipping artifacts: Spec DSL, repo + tests, pricing, docs, deploy & experiments — with review gates and audit logs.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Product Teams' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Teams — compress roadmap from months to days | Build AI Startups',
    description:
      'Spec → repo → UI → docs → pricing → deploy & experiments. Review gates, audit logs, and team controls.',
    images: [ogImage],
  },
}

// ---- JSON-LD Schemas ----
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
    { '@type': 'ListItem', position: 3, name: 'Product Teams', item: `${siteUrl}/solutions/startups` },
  ],
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '30-Day Pilot Rollout (Product Teams)',
  description:
    'A four-week plan to evaluate HyperNova with review gates, feature flags, and measurable outcomes.',
  totalTime: 'P30D',
  step: [
    { '@type': 'HowToStep', name: 'Week 1: Kickoff & Spec', text: 'Choose a pilot scope, connect GitHub/Vercel/Stripe, draft Spec DSL, align PM/Design/Eng.' },
    { '@type': 'HowToStep', name: 'Week 2: Repo & UI', text: 'Generate repo with CI/tests, scaffold UI + copy, and review PRs in Copilot mode.' },
    { '@type': 'HowToStep', name: 'Week 3: Deploy & Flags', text: 'Ship to preview, wire analytics, enable feature flags, validate performance & quality gates.' },
    { '@type': 'HowToStep', name: 'Week 4: Experiments & Readout', text: 'Run 2–3 A/Bs (hero/pricing/onboarding), publish a readout with metrics and next steps.' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can we keep our existing stack and workflows?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. HyperNova outputs a standard Next.js/TypeScript repo with CI/tests and integrates with your GitHub/Vercel/Stripe/analytics. You can keep Jira/Linear/Notion/Slack for planning and comms.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do we control quality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Copilot mode to pause at Spec, Code, Pricing, and Deploy gates. Builds must pass lint, tests, security scans, Lighthouse budgets, and license checks before shipping.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who owns the code and data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do. Repos live under your GitHub org and deploy to your infrastructure. We use user-scoped tokens and short-lived secrets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you support SSO and audit logs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Org-level audit logs are available today; SSO/SAML and SCIM provisioning are on our near-term roadmap.',
      },
    },
  ],
}

export default function ProductTeamsPage() {
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
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Product Teams — compress roadmap from months to days</h1>
              <p className="mt-4 text-lg text-slate-300">
                Align PM, Design, and Engineering on a structured spec. Generate repo-ready code, wire billing & analytics,
                ship behind flags, and run experiments — with review gates and audit logs.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Start a pilot
                </Link>
                <Link href="/templates" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Browse templates
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Spec DSL · Review gates · Feature flags · Analytics wiring</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/screens/product-teams-hero.png" alt="Product Teams overview — Spec to Deploy" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Intent → Spec → Repo → UI → Pricing → Flags → Deploy</p>
            </div>
          </div>
        </section>

        {/* Why Product Teams use HyperNova */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Why product teams use HyperNova</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Cross-functional alignment', d: 'Spec DSL replaces vague docs. Everyone comments on the same structured plan.' },
              { t: 'Predictable outputs', d: 'Repo + CI/tests + docs + pricing + analytics — generated consistently each time.' },
              { t: 'Governed autonomy', d: 'Copilot/Autopilot modes, quality gates, and audit logs for safe velocity.' },
              { t: 'Faster validation', d: 'Ship behind flags, run A/Bs, and get signal before big bets.' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works for teams */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">How it works (team flow)</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: 'Kickoff', d: 'Set goals, constraints, ICP. Connect GitHub/Vercel/Stripe.' },
              { t: 'Spec Studio', d: 'Draft Spec DSL. PM/Design/Eng suggest changes; PRD stays structured.' },
              { t: 'Repo Forge', d: 'Generate repo with CI, tests, docs, and feature flags.' },
              { t: 'UI Workshop', d: 'Landing, onboarding, pricing, and docs scaffolded to your audience.' },
              { t: 'Ship & Learn', d: 'Deploy preview, enable experiments, and review readouts weekly.' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-sm uppercase tracking-wide text-slate-400">Step {i + 1}</div>
                <div className="mt-1 text-base font-medium">{s.t}</div>
                <p className="mt-1 text-sm text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Collaboration & controls */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Collaboration & controls</h3>
              <p className="mt-2 text-slate-300">
                Two operating modes give you speed with safety. Keep humans in the loop, or let Autopilot ship when all gates are green.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>Copilot:</strong> pauses at Spec, Code PR, Pricing, and Deploy for approvals.</li>
                <li><strong>Autopilot:</strong> ships automatically when gates pass a Build Score threshold.</li>
                <li><strong>Audit logs:</strong> who approved what, when, with diffs.</li>
                <li><strong>Flags:</strong> gradual rollouts, canaries, and fast rollbacks.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/team-approvals.png" alt="Team approvals and audit logs" className="rounded-lg" />
            </div>
          </div>
        </section>

        {/* Quality & governance */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/quality-gates.png" alt="Quality gates and Build Score" className="rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Quality you can trust</h3>
              <p className="mt-2 text-slate-300">
                Builds must pass lint/types, unit/smoke tests, security scans, Lighthouse budgets, and license checks before shipping.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Build Score threshold configurable per org</li>
                <li>Gate failures pause Autopilot and request review</li>
                <li>Performance budgets enforced on key routes</li>
                <li>Dependency license status surfaced in PR</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Integrations</h2>
          <p className="mt-2 text-slate-300">User-owned tokens. Short-lived secrets. Keep your stack.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-slate-300">
            {['GitHub', 'Vercel', 'Supabase', 'Stripe', 'Plausible/PostHog', 'Slack', 'Linear/Jira', 'Notion'].map((n) => (
              <span key={n} className="rounded-md border border-white/10 bg-slate-900/40 px-3 py-1.5 text-sm">
                {n}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-500">Note: Slack/Linear/Jira/Notion integrations roll out gradually.</p>
        </section>

        {/* Starter kits for teams */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Team-ready starter kits</h2>
              <p className="mt-2 text-slate-300">
                Pick SaaS, API, or Content. Each kit includes routes, components, docs, analytics, and pricing scaffolds.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>SaaS:</strong> auth, teams, billing, entitlements, onboarding.</li>
                <li><strong>API:</strong> keys, usage metering, public docs, examples.</li>
                <li><strong>Content:</strong> docs engine, changelog, programmatic SEO.</li>
                <li><strong>Growth:</strong> landing variants, emails, social posts.</li>
              </ul>
              <div className="mt-5 flex gap-3">
                <Link href="/templates" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Browse templates
                </Link>
                <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Start a pilot
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/team-starterkits.png" alt="Team starter kits" className="rounded-lg" />
            </div>
          </div>
        </section>

        {/* 30-Day Pilot Plan (matches HowTo schema) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">30-Day Pilot Rollout</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/pilot-plan.png" alt="30-day pilot plan timeline" className="rounded-lg" />
            </div>
            <ol className="list-decimal space-y-2 pl-5 text-slate-300">
              <li><strong>Week 1:</strong> Kickoff, connect integrations, draft Spec, align stakeholders.</li>
              <li><strong>Week 2:</strong> Generate repo + UI, run CI, review PRs, set flags.</li>
              <li><strong>Week 3:</strong> Deploy to preview, wire analytics, start A/Bs.</li>
              <li><strong>Week 4:</strong> Readout: wins, metrics, backlog, next rollouts.</li>
            </ol>
          </div>
        </section>

        {/* Case studies (placeholders) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Team snapshots</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Atlas CRM', vp: 'Shipped a pricing overhaul behind flags in 6 days', tags: ['SaaS', 'Pricing'] },
              { name: 'NovaDocs', vp: 'Docs & changelog system in a week, with SEO cluster', tags: ['Content', 'SEO'] },
              { name: 'SignalAPI', vp: 'Public API with keys, quotas, and docs in 9 days', tags: ['API'] },
            ].map((p, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50">
                  <img src={`/media/projects/team-${i + 1}.png`} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <div className="mt-3 text-base font-medium">{p.name}</div>
                <p className="text-sm text-slate-400">{p.vp}</p>
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

        {/* Pricing teaser for teams */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-2xl font-semibold">Team-friendly plans</h2>
            <p className="mt-2 text-slate-300">
              Start small; scale with confidence. Enable Autopilot, Ecosystem, and Marketplace as you grow.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { plan: 'Starter', price: '$0', note: 'Spec & Builder for pilots' },
                { plan: 'Builder', price: '$49', note: 'Autopilot builds, SEO pack, experiments' },
                { plan: 'Studio', price: '$149', note: 'Ecosystem, Marketplace listing, webhooks' },
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
          <h2 className="text-2xl font-semibold">Product Teams FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">Will this replace our engineers?</h3>
              <p className="mt-1 text-sm text-slate-300">
                No — it removes boilerplate and wires best practices so your engineers focus on differentiated work.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can we review changes before deploy?</h3>
              <p className="mt-1 text-sm text-slate-300">Yes. Use Copilot mode and required reviewers at each gate.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">How do rollbacks work?</h3>
              <p className="mt-1 text-sm text-slate-300">Automatic rollback on failed health checks; one-click revert from the dashboard.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Does it work with our ticketing system?</h3>
              <p className="mt-1 text-sm text-slate-300">You can keep Jira/Linear; link issues to specs and PRs. Slack notifications optional.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Pilot it with a real initiative</h2>
            <p className="mt-2 text-slate-300">
              Pick a scoped problem, run the 30-day plan, and read out results. Worst case: you learn. Best case: you unlock a new velocity.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Start a pilot
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
