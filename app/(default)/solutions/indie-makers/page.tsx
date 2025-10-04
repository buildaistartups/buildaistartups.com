// app/(default)/solutions/indie-makers/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

const siteUrl = 'https://www.buildaistartups.com'
const ogImage = '/og/solutions-indie-makers.png' // Updated to match new folder name

export const metadata: Metadata = {
  title: 'Indie Makers — Ship a real product this weekend | Build AI Startups',
  description:
    'Build AI Startups for Indie Makers: go from intent to live micro-SaaS in a weekend. Spec, repo, UI, docs, pricing, deploy — you own the code and revenue.',
  alternates: { canonical: `${siteUrl}/solutions/indie-makers` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/solutions/indie-makers`,
    title: 'Indie Makers — Ship a real product this weekend | Build AI Startups',
    description:
      'From one-sentence brief to live micro-SaaS. Solo-friendly, no lock-in, growth packs included.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Build AI Startups — Indie Makers' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indie Makers — Ship a real product this weekend | Build AI Startups',
    description:
      'Spec → repo → UI → docs → pricing → deploy. Solo-friendly, no lock-in. Ship this weekend.',
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
    { '@type': 'ListItem', position: 3, name: 'Indie Makers', item: `${siteUrl}/solutions/indie-makers` },
  ],
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Weekend to Launch (Indie Maker plan)',
  description:
    'A 2-day plan to ship a real micro-SaaS using Build AI Startups: intent to deploy with growth basics wired.',
  totalTime: 'P2D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '0',
  },
  step: [
    {
      '@type': 'HowToStep',
      name: 'Friday night — Set intent & connect',
      text: 'Describe your niche, pick constraints, connect GitHub/Vercel/Stripe.',
      url: `${siteUrl}/generate`,
    },
    {
      '@type': 'HowToStep',
      name: 'Saturday AM — Spec & scaffold',
      text: 'Review Spec DSL, adjust features, generate repo with CI/tests/docs.',
    },
    {
      '@type': 'HowToStep',
      name: 'Saturday PM — UI & copy',
      text: 'Tune the landing, onboarding, and pricing. Add your brand kit.',
    },
    {
      '@type': 'HowToStep',
      name: 'Sunday AM — Go live',
      text: 'Deploy preview, wire analytics, run sanity tests, connect domain.',
    },
    {
      '@type': 'HowToStep',
      name: 'Sunday PM — Growth basics',
      text: 'Enable SEO pack, post the one-pager, schedule launch tweets & emails.',
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I really own the code and revenue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Projects live in your GitHub and deploy to your infrastructure. You own code, infra, and revenue.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I ship in a weekend?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Builder compresses the loop from intent to deploy. Many indie makers ship a live MVP in 1–2 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What stack do I get?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js + TypeScript + Tailwind + shadcn/ui, with tests, CI, docs, pricing, and analytics wiring.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there lock-in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Everything uses your accounts (GitHub, Vercel, Stripe, DB). Disable anytime.',
      },
    },
  ],
}

export default function IndieMakersPage() {
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
              <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Indie Makers — ship this weekend</h1>
              <p className="mt-4 text-lg text-slate-300">
                Go from a one-sentence idea to a live micro-SaaS — spec, repo, UI, docs, pricing, deploy. You own the code,
                infra, and revenue. No lock-in.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/generate"
                  className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
                >
                  Generate my app
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
                >
                  See starter kits
                </Link>
              </div>
              <p className="mt-3 text-sm text-slate-400">Solo-friendly · Predictable builds · Deploy to Vercel</p>
            </div>
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-8">
                <img 
                  src="/images/solutions/indie-makers/hero.svg" 
                  alt="Indie maker weekend build journey from idea to live product" 
                  className="h-full w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">Intent → Spec → Repo → UI → Pricing → Deploy</p>
            </div>
          </div>
        </section>

        {/* Why Indie Makers love this */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Why Indie Makers love Build AI Startups</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Solo-friendly', d: 'Everything from spec to deploy handled. You focus on the problem & users.' },
              { t: 'No lock-in', d: 'Your GitHub, your Vercel, your Stripe, your DB. Export anytime.' },
              { t: 'Production-ready', d: 'Tests, CI, analytics, docs, and pricing wired from day one.' },
              { t: 'Growth basics', d: 'SEO pages, emails, and social posts generated to get first users.' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-base font-medium">{c.t}</div>
                <p className="mt-1 text-sm text-slate-400">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solo Workflow */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Built for solo builders</h2>
            <p className="mt-2 text-slate-300">One person, one weekend, one shipped product</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8">
              <img 
                src="/images/solutions/indie-makers/solo-workflow.svg" 
                alt="Solo developer workflow showing independence and efficiency" 
                className="h-48 w-auto mx-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* How it works for Indie Makers */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: 'Set intent', d: 'Describe your niche and constraints. Or let Build AI Startups scout trends.' },
              { t: 'Pick a starter kit', d: 'Choose SaaS, API, or Content kit. Swap anytime.' },
              { t: 'Autobuild', d: 'Spec → repo → UI → docs → pricing → landing.' },
              { t: 'Go live', d: 'Preview, domain, analytics. Flip to production when ready.' },
              { t: 'First users', d: 'Enable Ecosystem cross-promos and schedule launch posts.' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="text-sm uppercase tracking-wide text-slate-400">Step {i + 1}</div>
                <div className="mt-1 text-base font-medium">{s.t}</div>
                <p className="mt-1 text-sm text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Build Speed */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Weekend to launch speed</h3>
              <p className="mt-2 text-slate-300">
                Traditional development takes months. Build AI Startups compresses the entire cycle into a single weekend.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Friday: Set intent and connect accounts</li>
                <li>Saturday: Build, test, and design</li>
                <li>Sunday: Deploy and launch</li>
                <li>Monday: Talk to real users</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/solutions/indie-makers/build-speed.svg" 
                alt="Weekend to launch speed indicator" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Starter kits */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Starter kits (swap anytime)</h2>
              <p className="mt-2 text-slate-300">
                The fastest path to value. Each kit comes with routes, components, and content tailored to your use-case.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>SaaS Kit:</strong> Auth, billing, onboarding, settings, pricing, docs.</li>
                <li><strong>API Kit:</strong> Public docs, keys, usage metering, examples.</li>
                <li><strong>Content Kit:</strong> Blog/docs engine, programmatic SEO, email capture.</li>
                <li><strong>Growth Pack:</strong> Landing variants, email sequences, social posts.</li>
              </ul>
              <div className="mt-5 flex gap-3">
                <Link href="/templates" className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5">
                  Browse templates
                </Link>
                <Link href="/generate" className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400">
                  Generate now
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/solutions/indie-makers/starter-kits.svg" 
                alt="Starter kits overview showing SaaS, API, and Content options" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* No Lock-in */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/solutions/indie-makers/no-lockin.svg" 
                alt="No lock-in diagram showing ownership of all accounts and services" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">You own everything</h3>
              <p className="mt-2 text-slate-300">
                No vendor lock-in. Everything lives in your accounts. Export, modify, or migrate anytime.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li><strong>Your GitHub:</strong> All code and repositories</li>
                <li><strong>Your Vercel:</strong> Hosting and deployments</li>
                <li><strong>Your Stripe:</strong> Payments and revenue</li>
                <li><strong>Your Database:</strong> All user data and content</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What you own */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">What you own on day one</h2>
            <p className="mt-2 text-slate-300">Production-ready from the start</p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/solutions/indie-makers/production-ready.svg" 
                alt="Production-ready features checklist" 
                className="h-32 w-auto mx-auto"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'GitHub repo with CI, tests, and docs',
              'Live landing, pricing, onboarding flows',
              'Docs, FAQ, changelog scaffolds',
              'Brand kit & social assets (OGs)',
              'Analytics wiring & basic funnels',
              'SEO pages + email capture',
            ].map((t, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-slate-300">
                {t}
              </div>
            ))}
          </div>
        </section>

        {/* Weekend plan (visual + matches HowTo schema) */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Weekend to Launch</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/solutions/indie-makers/weekend-timeline.svg" 
                alt="Weekend launch timeline from Friday to Sunday" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <ol className="list-decimal space-y-2 pl-5 text-slate-300">
              <li><strong>Friday night:</strong> Set intent, connect GitHub/Vercel/Stripe, generate Spec.</li>
              <li><strong>Saturday AM:</strong> Scaffold repo, run tests, review PR. Adjust features.</li>
              <li><strong>Saturday PM:</strong> Tune landing, copy, pricing. Add brand kit.</li>
              <li><strong>Sunday AM:</strong> Deploy preview, wire analytics, connect domain.</li>
              <li><strong>Sunday PM:</strong> Enable SEO pack, schedule launch posts & emails.</li>
            </ol>
          </div>
        </section>

        {/* Growth Pack */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Growth basics included</h3>
              <p className="mt-2 text-slate-300">
                Don't just build and hope. Get the marketing fundamentals wired from day one.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>SEO-optimized landing pages</li>
                <li>Email capture and sequences</li>
                <li>Social media post templates</li>
                <li>Analytics and conversion tracking</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/solutions/indie-makers/growth-pack.svg" 
                alt="Growth basics pack with SEO, email, and social tools" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Example indie builds */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-2xl font-semibold">Example indie builds</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Creator Metrics', vp: 'Micro-analytics for YouTube creators', tags: ['Analytics', 'SaaS'] },
              { name: 'FormPilot', vp: 'Forms + automations for indie apps', tags: ['Automation', 'Forms'] },
              { name: 'DocsCraft', vp: 'Docs & changelog generator', tags: ['DevTools', 'Content'] },
            ].map((p, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 flex items-center justify-center p-4">
                  <img 
                    src="/images/solutions/indie-makers/example-projects.svg" 
                    alt={`${p.name} indie project example`} 
                    className="max-h-full max-w-full h-auto w-auto object-contain opacity-80"
                    loading="lazy"
                    style={{ maxHeight: '120px', maxWidth: '200px' }}
                  />
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

        {/* Success Story */}
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-slate-900/50 p-6">
              <img 
                src="/images/solutions/indie-makers/success-story.svg" 
                alt="Weekend indie maker success story from idea to users" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold">Weekend success stories</h3>
              <p className="mt-2 text-slate-300">
                Real indie makers shipping real products in record time. From idea to paying customers in days, not months.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                <li>Friday: "I have an idea for creators"</li>
                <li>Saturday: Building and testing</li>
                <li>Sunday: Live product with users</li>
                <li>Monday: First customer feedback</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Indie-friendly pricing teaser */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/images/solutions/indie-makers/pricing-tiers.svg" 
                alt="Indie-friendly pricing tiers" 
                className="h-8 w-auto"
                loading="lazy"
              />
              <h2 className="text-2xl font-semibold">Indie-friendly pricing</h2>
            </div>
            <p className="mt-2 text-slate-300">
              Start free. Upgrade when you're ready for Autopilot, Ecosystem, and Marketplace.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { plan: 'Starter', price: '$0', note: 'Try the Builder and ship your first MVP' },
                { plan: 'Builder', price: '$49', note: 'Autopilot builds, SEO pack, growth basics' },
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
          <h2 className="text-2xl font-semibold">Indie Makers FAQ</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium">Who owns the code?</h3>
              <p className="mt-1 text-sm text-slate-300">You do. Repos are created under your GitHub account or org.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Which integrations are supported?</h3>
              <p className="mt-1 text-sm text-slate-300">GitHub, Vercel, Supabase, Stripe, Plausible/PostHog — user-owned tokens.</p>
            </div>
            <div>
              <h3 className="text-base font-medium">Do I need to code?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Basic dev literacy helps, but the Builder handles scaffolding and wiring. You can tweak after launch.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Can I monetize on day one?</h3>
              <p className="mt-1 text-sm text-slate-300">Yes. Stripe test mode by default; flip to live when you're ready.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-slate-900/40 py-14">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-semibold">Make this weekend count</h2>
            <p className="mt-2 text-slate-300">
              Generate your app, deploy, and talk to real users. Worst case: you learn. Best case: you launch.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
              >
                Generate my app
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                Browse templates
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
