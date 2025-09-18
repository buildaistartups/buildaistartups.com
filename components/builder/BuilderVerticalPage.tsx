// components/builder/BuilderVerticalPage.tsx
'use client'

import type { Vertical } from '@/lib/verticals'
import Link from 'next/link'

export default function BuilderVerticalPage({ vertical }: { vertical?: Vertical }) {
  if (!vertical) {
    return <GeneralBuilderPage />
  }

  return (
    <main className="bg-slate-950 text-slate-200">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-400">Builder Template</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{vertical.title}</h1>
            <p className="mt-4 text-lg text-slate-300">{vertical.tagline}</p>
            
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={vertical.ctaHref}
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
              >
                Generate this app
              </Link>
              <Link
                href="/product/builder"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                How Builder works
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-400">Your GitHub · Your revenue · No lock-in</p>
          </div>
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-8">
              <img 
                src={vertical.heroImg} 
                alt={`${vertical.title} - complete system overview`} 
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              {vertical.id === 'ai-leadgen' ? 'Capture → Score → Route → Convert' : 'Query → Analyze → Respond → Escalate'}
            </p>
          </div>
        </div>
      </section>

      {/* What you ship */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">What you ship</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vertical.bullets.map((bullet, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
              <div className="text-base font-medium text-slate-200">{bullet}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it builds */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">How it builds</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 p-4 mb-4">
              <img 
                src={vertical.flows.research} 
                alt="Research and specification phase" 
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Research → Spec</h3>
            <p className="text-slate-400 text-sm">
              {vertical.id === 'ai-leadgen' 
                ? 'Define your lead capture strategy, scoring criteria, and conversion funnels. Builder generates the complete spec.'
                : 'Map your support workflows, escalation rules, and knowledge sources. Builder structures the entire system.'
              }
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 p-4 mb-4">
              <img 
                src={vertical.flows.generate} 
                alt="Code and UI generation phase" 
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Generate → Repo</h3>
            <p className="text-slate-400 text-sm">
              {vertical.id === 'ai-leadgen'
                ? 'Complete lead management interface with forms, dashboards, CRM sync, and payment processing.'
                : 'Full support copilot with chat interface, knowledge base, ticket integration, and admin controls.'
              }
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-slate-900/50 p-4 mb-4">
              <img 
                src={vertical.flows.deploy} 
                alt="Deploy and optimization phase" 
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Deploy → Optimize</h3>
            <p className="text-slate-400 text-sm">
              {vertical.id === 'ai-leadgen'
                ? 'Live lead generation with A/B testing on forms, email sequences, and conversion optimization.'
                : 'Production support automation with deflection analytics, response quality monitoring, and continuous learning.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Why this template */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">
          Why {vertical.id === 'ai-leadgen' ? 'lead gen' : 'support copilot'} builders love this
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {getWhyLoveThis(vertical.id).map((reason, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
              <div className="text-base font-medium">{reason.title}</div>
              <p className="mt-1 text-sm text-slate-400">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 bg-slate-900/40 py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold">
            Ship your {vertical.id === 'ai-leadgen' ? 'lead gen pipeline' : 'support copilot'} this weekend
          </h2>
          <p className="mt-2 text-slate-300">
            {vertical.id === 'ai-leadgen'
              ? 'From capture to revenue in days, not months. Complete pipeline with your GitHub, your Stripe, your leads.'
              : 'From tickets to automation in days, not months. Complete copilot with your docs, your platform, your rules.'
            }
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href={vertical.ctaHref}
              className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400"
            >
              Generate this app
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-slate-200 hover:bg-white/5"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// Helper function aligned with your brand voice
function getWhyLoveThis(verticalId: string) {
  if (verticalId === 'ai-leadgen') {
    return [
      { title: 'Revenue-ready', desc: 'Stripe checkout and payment flows wired from day one.' },
      { title: 'CRM-native', desc: 'HubSpot, Salesforce sync without custom integration work.' },
      { title: 'Conversion-optimized', desc: 'A/B testing on forms, emails, and landing pages built-in.' },
      { title: 'Scale-ready', desc: 'Handle thousands of leads with automated scoring and routing.' },
    ]
  } else {
    return [
      { title: 'Deflection-focused', desc: 'Reduce ticket volume while improving response quality.' },
      { title: 'Platform-agnostic', desc: 'Works with Zendesk, Intercom, Freshdesk out of the box.' },
      { title: 'Safety-first', desc: 'Smart escalation prevents AI from handling complex issues.' },
      { title: 'Learning-enabled', desc: 'Gets smarter with every conversation and feedback loop.' },
    ]
  }
}

// Fallback general Builder page
function GeneralBuilderPage() {
  return (
    <main className="bg-slate-950 text-slate-200">
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-400">Product</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">From brief to repo in minutes</h1>
            <p className="mt-4 text-lg text-slate-300">
              The Builder turns a plain-language intent into a production-ready app—spec, repo, UI, copy,
              docs, pricing, and deploy. No boilerplate. No waiting.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400"
              >
                Try the Builder
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 px-5 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                See pricing
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-400">Autonomy Confidence 86/100 · 23 checks passed</p>
          </div>
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-8">
              <img 
                src="/images/product/builder/hero.svg" 
                alt="Build AI Startups Builder workflow" 
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
