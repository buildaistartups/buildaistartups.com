// components/generate-form.tsx
'use client'

import { useState, useTransition, FormEvent } from 'react'
import Link from 'next/link'

import GenerateResultCard from './generate-result-card'
import type { GenerateResult as GeneratedProject } from './generate-result-types'

type Mode = 'autopilot' | 'copilot'

export default function GenerateForm() {
  const [isPending, startTransition] = useTransition()
  const [mode, setMode] = useState<Mode>('autopilot')
  const [result, setResult] = useState<GeneratedProject | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)

    const intent = String(fd.get('intent') || '').trim()
    const audience = String(fd.get('audience') || '').trim()
    const niche = String(fd.get('niche') || '').trim()
    const complexity = String(fd.get('complexity') || 'm')

    if (!intent) {
      setError('Please describe what you want to build.')
      return
    }

    startTransition(async () => {
      // In the real implementation, call your /api/generate endpoint here.
      // For now, synthesize a deterministic preview object.
      const name = suggestName(intent, niche)
      const oneLiner = buildOneLiner(intent, audience)
      const description = buildDesc(intent, audience, niche, complexity)

      const generated: GeneratedProject = {
        id: cryptoRandomId(),
        name,
        oneLiner,
        description,
        niche: niche || 'Indie makers / early-stage SaaS',
        tags: ['SaaS', 'AI', 'MVP'],
        stack: 'Next.js · Supabase · Stripe · Vercel',
        prd: buildPRD(name, oneLiner, audience, niche, complexity, mode),
      }

      setResult(generated)
    })
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1.1fr,1.5fr]">
      {/* Left: Form */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-slate-100">Describe your startup</h2>
        <p className="mt-1 text-sm text-slate-400">
          One sentence is enough. We’ll generate the PRD, repo plan, and go-to-market.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="intent" className="block text-sm font-medium text-slate-300">
              What do you want to build? *
            </label>
            <textarea
              id="intent"
              name="intent"
              required
              rows={3}
              placeholder="Example: An AI tool that summarizes customer interviews and pushes action items to Notion."
              className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-purple-500/60"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="audience" className="block text-sm font-medium text-slate-300">
                Who is it for?
              </label>
              <input
                type="text"
                id="audience"
                name="audience"
                placeholder="e.g., Product Managers, Indie hackers"
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-purple-500/60"
              />
            </div>

            <div>
              <label htmlFor="niche" className="block text-sm font-medium text-slate-300">
                Niche (optional)
              </label>
              <input
                type="text"
                id="niche"
                name="niche"
                placeholder="e.g., Sales ops, EdTech, SEO tools"
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-purple-500/60"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <fieldset>
              <legend className="mb-2 block text-sm font-medium text-slate-300">
                Mode
              </legend>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode('autopilot')}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${
                    mode === 'autopilot'
                      ? 'border-purple-500 bg-purple-500/10 text-slate-100'
                      : 'border-white/10 bg-slate-900/60 text-slate-300 hover:text-white'
                  }`}
                >
                  Autopilot
                </button>
                <button
                  type="button"
                  onClick={() => setMode('copilot')}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${
                    mode === 'copilot'
                      ? 'border-purple-500 bg-purple-500/10 text-slate-100'
                      : 'border-white/10 bg-slate-900/60 text-slate-300 hover:text-white'
                  }`}
                >
                  Copilot (review)
                </button>
              </div>
            </fieldset>

            <div>
              <label htmlFor="complexity" className="block text-sm font-medium text-slate-300">
                Complexity
              </label>
              <select
                id="complexity"
                name="complexity"
                defaultValue="m"
                className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-purple-500/60"
              >
                <option value="s">Small MVP</option>
                <option value="m">Medium</option>
                <option value="l">Large</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 shadow-xs disabled:opacity-70"
            >
              {isPending ? 'Generating…' : 'Generate'}
            </button>
            <Link href="/pricing" className="text-sm text-slate-300 hover:text-white">
              See pricing
            </Link>
          </div>
        </form>
      </div>

      {/* Right: Result */}
      <div>
        {!result ? (
          <EmptyState />
        ) : (
          <GenerateResultCard result={result} />
        )}
      </div>
    </div>
  )
}

/* ---------- helpers ---------- */

function cryptoRandomId() {
  // Safe fallback if Web Crypto isn't available for some reason
  try {
    return Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    return Math.random().toString(36).slice(2, 10)
  }
}

function suggestName(intent: string, niche?: string) {
  const base = (niche || intent).trim().split(/\s+/)[0] || 'Nova'
  const suffixes = ['Forge', 'Pilot', 'Flow', 'Spark', 'Kit', 'Loop', 'Lens', 'Mate', 'Dash']
  return `${capitalize(base)} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`.trim()
}

function buildOneLiner(intent: string, audience?: string) {
  const who = audience?.trim() ? ` for ${audience.trim()}` : ''
  return `${intent.replace(/\.$/, '')}${who}.`
}

function buildDesc(intent: string, audience?: string, niche?: string, complexity?: string) {
  const size =
    complexity === 's' ? 'a focused MVP'
      : complexity === 'l' ? 'a full-featured product'
      : 'a solid, production-ready MVP'

  const who = audience?.trim() ? ` for ${audience.trim()}` : ''
  const seg = niche?.trim() ? ` in ${niche.trim()}` : ''
  return `HyperNova will plan and build ${size}${who}${seg}. You’ll get a repo, UI, docs, pricing, a landing page, and initial growth experiments wired automatically.`
}

function buildPRD(
  name: string,
  oneLiner: string,
  audience?: string,
  niche?: string,
  complexity?: string,
  mode: Mode = 'autopilot',
) {
  return [
    `# PRD — ${name}`,
    ``,
    `## One-liner`,
    oneLiner,
    ``,
    `## Target`,
    `Audience: ${audience || 'General early adopters'}`,
    `Niche: ${niche || 'SaaS / Automation'}`,
    ``,
    `## Scope`,
    complexity === 's'
      ? `Small MVP: core value, minimal onboarding, simple billing.`
      : complexity === 'l'
        ? `Large scope: multi-tenant, roles, advanced analytics, integrations.`
        : `Medium scope: core value + onboarding, billing, and analytics.`,
    ``,
    `## Build Mode`,
    mode === 'autopilot'
      ? `Autopilot — ship when all gates are green.`
      : `Copilot — require review approvals for merges and deploys.`,
    ``,
    `## Stack`,
    `- Next.js (App Router), Tailwind`,
    `- API routes, Postgres (Supabase)`,
    `- Auth (provider TBD)`,
    `- Stripe billing`,
    `- Vercel deploy`,
    ``,
    `## Gates`,
    `- Lint + TypeCheck`,
    `- Unit tests`,
    `- Basic e2e smoke`,
    `- Security & license scan`,
  ].join('\n')
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-400">
      <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-slate-900/60">
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" className="text-slate-500">
          <path
            fill="currentColor"
            d="M12 2a1 1 0 0 1 .894.553l2.382 4.764 5.259.764a1 1 0 0 1 .554 1.705l-3.8 3.704.898 5.234a1 1 0 0 1-1.451 1.054L12 18.897l-4.686 2.462a1 1 0 0 1-1.45-1.054l.898-5.234-3.8-3.704a1 1 0 0 1 .554-1.705l5.259-.764L11.106 2.553A1 1 0 0 1 12 2Z"
          />
        </svg>
      </div>
      <p className="text-sm">Your generated project will appear here.</p>
      <p className="mt-1 text-xs text-slate-500">Describe your idea on the left and click Generate.</p>
    </div>
  )
}
