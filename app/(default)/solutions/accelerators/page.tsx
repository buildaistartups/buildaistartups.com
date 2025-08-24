// app/(default)/solutions/accelerators/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Accelerators & Universities — Cohort-in-a-Box for venture creation | Build AI Startups',
  description:
    'Run an AI venture program in days, not months. Cohort-in-a-Box: intake, structured specs, autobuilds, live demos, growth experiments, and a transfer-ready Marketplace.',
  alternates: { canonical: `${siteUrl}/solutions/accelerators` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/accelerators`,
    title: 'Accelerators & Universities — Cohort-in-a-Box | Build AI Startups',
    description:
      'A turnkey program: from intent → spec → repo → UI → pricing → deploy → experiments. Dashboards for mentors, IP clarity for teams.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Accelerators & Universities' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accelerators & Universities — Cohort-in-a-Box | Build AI Startups',
    description:
      'Spin up a modern AI venture track with autobuilds, quality gates, and a ready Marketplace for demos, licensing, or exits.',
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
    { '@type': 'ListItem', position: 3, name: 'Accelerators & Universities', item: `${siteUrl}/solutions/accelerators` },
  ],
}

const programJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOccupationalProgram',
  name: 'AI Venture Creation Sprint',
  description:
    'A turnkey 2–6 week program where teams go from intent to live micro-SaaS with quality gates, experiments, and a transfer-ready checklist.',
  provider: { '@type': 'Organization', name: 'Build AI Startups', url: siteUrl },
  timeToComplete: 'P28D',
  occupationalCategory: 'Entrepreneurship / Product Management / Software',
  educationalProgramMode: ['online', 'asynchronous', 'blended'],
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    startDate: '2025-01-01',
    endDate: '2025-02-01',
    location: { '@type': 'VirtualLocation', url: siteUrl },
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who owns the IP for student or cohort projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Organizations choose. Default: teams own their repos and deploy to their infra; institution can request a contributor or attribution license. Marketplace transfers are handled per agreement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you ensure academic integrity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide audit logs, prompt history, and code provenance. The program includes an Integrity Pack with citation guidance and model-use policies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can mentors and staff review gates before shipping?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use Copilot mode to require approvals at Spec, Code, Pricing, and Deploy gates. Autopilot can be enabled selectively.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you support FERPA/GDPR requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We minimize PII, keep tokens user-scoped, and support EU hosting options. A FERPA/GDPR supplement is available for partner agreements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we run this as a for-credit course or accelerator track?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide a syllabus, rubrics, weekly milestones, and assessment templates that map to course outcomes or accelerator KPIs.',
      },
    },
  ],
}

export default function AcceleratorsUniversitiesPage() {
  return (
    <>
      {/* Structured data */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ld-program" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(programJsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Solutions</p>
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Accelerators & Universities — Cohort-in-a-Box</h1>
              <p className="mt-4 text-lg text-slate-300">
                Run a modern AI venture track in days. Intake to demo day: structured specs, autobuilds, quality gates,
                live demos, growth experiments, and a transfer-ready Marketplace.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Request partner kit
                </Link>
                <Link href="#syllabus" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  See sample syllabus
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Mentor dashboards · Integrity pack · IP clarity · Optional EU hosting</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img src="/media/screens/accelerator-hero.png" alt="Cohort overview — teams, milestones, demos" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Cohort console with teams, gates, demos, and readiness</p>
            </div>
          </div>
        </section>

        {/* Why programs choose this */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Why programs choose Build AI Startups</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Turnkey delivery', d: 'A complete venture track: from intake to demo day with minimal setup.' },
              { t: 'Quality & integrity', d: 'Build Score, gates, audit logs, and an Integrity Pack for citations and provenance.' },
              { t: 'Ownership clarity', d: 'Default: teams own code and revenue. Institution options via addenda.' },
              { t: 'Real outcomes', d: 'Live demos, growth experiments, and optional Marketplace listings or licenses.' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Program models */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Program models</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              {
                t: 'Cohort-in-a-Box',
                d: '2–6 weeks. Intake, team formation, structured specs, autobuilds, demos, and growth experiments. Easy to run every semester.',
              },
              {
                t: 'Studio-in-a-Week',
                d: 'Intensive 5-day sprint: from idea to live MVP and public demo night. Great for hackathons and accelerators.',
              },
              {
                t: 'Venture Studio Automation',
                d: 'Always-on backlog. HyperNova scouts niches, seeds PRDs, and ships prototypes behind flags for partner review.',
              },
            ].map((m, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
                <div className="text-base font-semibold">{m.t}</div>
                <p className="mt-2 text-sm text-slate-400">{m.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works for cohorts */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">How a cohort runs</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {[
              { t: 'Intake', d: 'Collect intents, interests, and constraints. Auto-group by theme or skill mix.' },
              { t: 'Spec Studio', d: 'Teams draft the structured PRD (Spec DSL). Mentors comment in-line.' },
              { t: 'Repo Forge', d: 'Autobuild repo with CI/tests/docs, pricing, and analytics wiring.' },
              { t: 'UI & Copy', d: 'Landing, onboarding, and docs scaffolded; brand kits generated.' },
              { t: 'Ship & Learn', d: 'Deploy previews, run A/Bs, and gather signals weekly.' },
              { t: 'Demo Day', d: 'Live demos with Build Score and readiness. List on Marketplace if desired.' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">Step {i + 1}</div>
                <div className="mt-1 text-base font-medium">{s.t}</div>
                <p className="mt-1 text-sm text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mentor & admin console */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Mentor & admin console</h3>
              <p className="mt-2 text-slate-300">
                Track progress, approvals, and Build Scores across teams. Keep humans in the loop with Copilot gates, or
                allow Autopilot when everything’s green.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Cohort dashboard: teams, gates, demos, readiness badges</li>
                <li>Approval queues: Spec, Code, Pricing, Deploy</li>
                <li>Audit logs and integrity reports</li>
                <li>Rubrics and milestone exports (CSV/JSON)</li>
              </ul>
              <div className="mt-5 flex gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Request a walkthrough
                </Link>
                <Link href="/product/builder" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  See the Builder
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/cohort-console.png" alt="Mentor & admin console view" className="rounded-lg" />
            </div>
          </div>
        </section>

        {/* Syllabus (matches partner materials) */}
        <section id="syllabus" className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Sample syllabus (4-week)</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">Weeks 1–2: From intent to repo</div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
                <li>Trends & problem discovery, picking constraints</li>
                <li>Spec DSL: scope, ICP, UX outline, data/billing</li>
                <li>Repo Forge: CI, tests, docs, license checks</li>
                <li>UI workshop: landing, onboarding, pricing</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <div className="text-lg font-semibold">Weeks 3–4: Ship & learn</div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
                <li>Deploy previews, feature flags, health checks</li>
                <li>Experiments: hero/pricing/onboarding A/Bs</li>
                <li>Readiness checklist: domain, env, Stripe, analytics</li>
                <li>Demo day prep, Marketplace listing (optional)</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Rubrics and assessment templates included. Map to course outcomes or accelerator KPIs.
          </p>
        </section>

        {/* Outcomes & KPIs */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Program outcomes & KPIs</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { k: 'Median time-to-MVP', v: '1–7 days' },
              { k: 'Build success rate (gates green)', v: '≥ 80%' },
              { k: 'Teams shipping experiments in 2 weeks', v: '≥ 70%' },
              { k: 'Transfer-ready at demo day', v: '≥ 60%' },
              { k: 'Marketplace listings created', v: 'Cohort-dependent' },
              { k: 'IP clarity compliance', v: '100% (with templates)' },
            ].map((x, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-sm text-slate-400">{x.k}</div>
                <div className="text-base font-medium text-slate-200">{x.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Integrity & compliance */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <img src="/media/screens/integrity-pack.png" alt="Integrity & compliance pack" className="rounded-lg" />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Integrity & compliance by design</h3>
              <p className="mt-2 text-slate-300">
                Every project includes audit logs, prompt history, and code provenance. The Integrity Pack provides policy templates,
                citation guidance, and an instructor view for reviews.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Audit logs and provenance reports</li>
                <li>License and dependency checks</li>
                <li>FERPA/GDPR supplement available</li>
                <li>Institution-specific IP templates</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Partner tiers */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-2xl font-semibold">Partner tiers</h2>
            <p className="mt-2 text-slate-300">Start small and scale to full venture studio automation.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { plan: 'Cohort', price: 'Contact', note: 'Up to N teams · mentor console · Integrity Pack' },
                { plan: 'Program', price: 'Contact', note: 'Cohorts per year · API/webhooks · custom domains' },
                { plan: 'Studio', price: 'Contact', note: 'Always-on venture backlog · private Marketplace' },
              ].map((x, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3">
                  <div className="text-base font-semibold">{x.plan}</div>
                  <div className="text-lg">{x.price}</div>
                  <div className="text-sm text-slate-400">{x.note}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <Link href="/contact" className="text-sky-300 hover:underline">Talk to partnerships →</Link>
              <span className="text-slate-600">•</span>
              <Link href="/product/api" className="text-sky-300 hover:underline">API & webhooks →</Link>
            </div>
          </div>
        </section>

        {/* Case snapshots */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Snapshots (sample)</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Campus X', vp: '15 teams, 11 MVPs, 8 transfer-ready demos', tags: ['University', 'Cohort'] },
              { name: 'Accelerator Y', vp: 'Demo night with 10 live products and 3 listings', tags: ['Accelerator'] },
              { name: 'Studio Z', vp: 'Always-on backlog with monthly handoffs', tags: ['Venture Studio'] },
            ].map((p, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50">
                  <img src={`/media/projects/acc-${i + 1}.png`} alt={p.name} className="h-full w-full object-cover" />
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

        {/* FAQ (mirrors JSON-LD) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Accelerators & Universities FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">How fast can we launch a cohort?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Most partners go live within 1–2 weeks. We provide onboarding checklists and a partner success session.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">What stacks do teams use?</h3>
              <p className="mt-1 text-sm text-slate-300">Next.js + TypeScript + Tailwind + shadcn/ui, with tests, CI, docs, pricing, analytics.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can we grade or score teams objectively?</h3>
              <p className="mt-1 text-sm text-slate-300">Yes. Use Build Score, gate results, and rubric exports to support consistent evaluation.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Do you provide guest lectures or materials?</h3>
              <p className="mt-1 text-sm text-slate-300">Yes. Partner kit includes decks, demos, and optional guest sessions.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Spin up your next cohort</h2>
            <p className="mt-2 text-slate-300">
              Launch an AI venture track with real products, real demos, and clear IP. Worst case: everyone learns. Best case: companies launch.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">
                Request partner kit
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
