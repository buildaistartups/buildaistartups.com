// components/generate-form.tsx
'use client'

import { useState, useTransition } from 'react'
import GenerateResultCard, { GeneratedProject } from './generate-result-card'
import Link from 'next/link'

type Mode = 'autopilot' | 'copilot'

const examplePrompts = [
  'AI that summarizes sales calls and pushes action items to Notion',
  'Chrome extension that auto-drafts LinkedIn replies in my tone',
  'API that cleans CSVs and returns tidy data & schema suggestions',
  'Micro-SaaS to track churn risk signals for Stripe subscriptions',
]

const stacks = [
  'Next.js + Supabase',
  'Next.js + Firebase',
  'FastAPI + Postgres',
  'Cloudflare Workers + D1',
]

const templates = [
  'SaaS App',
  'API Service',
  'Chrome Extension',
  'Discord Bot',
  'Data Dashboard',
]

export default function GenerateForm() {
  const [intent, setIntent] = useState('')
  const [audience, setAudience] = useState('')
  const [niche, setNiche] = useState('')
  const [monetization, setMonetization] = useState('subscription')
  const [mode, setMode] = useState<Mode>('copilot')
  const [template, setTemplate] = useState(templates[0])
  const [stack, setStack] = useState(stacks[0])
  const [connectGithub, setConnectGithub] = useState(false)
  const [connectVercel, setConnectVercel] = useState(false)
  const [connectDB, setConnectDB] = useState(false)
  const [connectStripe, setConnectStripe] = useState(false)

  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GeneratedProject | null>(null)

  function fill(p: string) {
    setIntent(p)
    window?.scrollTo?.({ top: document.getElementById('builder')?.offsetTop || 0, behavior: 'smooth' })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)

    startTransition(async () => {
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            intent,
            audience,
            niche,
            monetization,
            mode,
            template,
            stack,
            // in production: pass OAuth tokens / repo targets after the user connects
            integrations: {
              github: connectGithub,
              vercel: connectVercel,
              db: connectDB,
              stripe: connectStripe,
            },
          }),
        })
        const data = await res.json()
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || 'Generation failed')
        }
        setResult(data.project as GeneratedProject)
      } catch (err: any) {
        setError(err?.message || 'Something went wrong')
      }
    })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left: form */}
      <form onSubmit={onSubmit} className="lg:col-span-2 rounded-3xl border border-white/10 bg-slate-900/40 p-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="intent">
              Your intent <span className="text-slate-500 font-normal">(one sentence)</span>
            </label>
            <textarea
              id="intent"
              className="form-textarea w-full"
              rows={3}
              placeholder="E.g., Build an AI that turns customer calls into action items, drafts follow-ups, and syncs CRM."
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              required
            />
            <div className="mt-2 text-xs text-slate-500">Clear intent → better plans, repos, and UIs.</div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="audience">
              Target audience <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <input
              id="audience"
              className="form-input w-full"
              placeholder="Sales managers at B2B SaaS, indie creators, etc."
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="niche">
              Niche / Market <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <input
              id="niche"
              className="form-input w-full"
              placeholder="SaaS analytics, DevTools, HR, Design, Finance…"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="template">
              Template
            </label>
            <select
              id="template"
              className="form-select w-full"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              {templates.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="stack">
              Preferred stack
            </label>
            <select
              id="stack"
              className="form-select w-full"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
            >
              {stacks.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-sm text-slate-300 font-medium mb-2">Mode</span>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="radio"
                  name="mode"
                  value="copilot"
                  checked={mode === 'copilot'}
                  onChange={() => setMode('copilot')}
                />
                Copilot <span className="text-slate-500">(review gates)</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="radio"
                  name="mode"
                  value="autopilot"
                  checked={mode === 'autopilot'}
                  onChange={() => setMode('autopilot')}
                />
                Autopilot <span className="text-slate-500">(ships when green)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="monetization">
              Monetization
            </label>
            <select
              id="monetization"
              className="form-select w-full"
              value={monetization}
              onChange={(e) => setMonetization(e.target.value)}
            >
              <option value="subscription">Subscription</option>
              <option value="usage">Usage-based</option>
              <option value="one-time">One-time</option>
              <option value="freemium">Freemium</option>
              <option value="ads">Ads/Affiliate</option>
            </select>
          </div>

          {/* Integrations */}
          <div className="md:col-span-2">
            <div className="text-sm text-slate-300 font-medium mb-1">Integrations</div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={connectGithub}
                  onChange={(e) => setConnectGithub(e.target.checked)}
                />
                GitHub repo (private)
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={connectVercel}
                  onChange={(e) => setConnectVercel(e.target.checked)}
                />
                Vercel deploy
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={connectDB}
                  onChange={(e) => setConnectDB(e.target.checked)}
                />
                Database (Supabase / Postgres)
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={connectStripe}
                  onChange={(e) => setConnectStripe(e.target.checked)}
                />
                Stripe billing
              </label>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Not connected? We’ll still generate the full plan and repo outline. Connect
              accounts after sign-in to autopublish. <Link href="/signin" className="underline">Sign in</Link>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="btn text-white bg-purple-500 hover:bg-purple-600 shadow-xs disabled:opacity-60"
          >
            {pending ? 'Generating…' : 'Generate'}
          </button>
          <Link href="/resources/templates" className="btn text-slate-300 hover:text-white">
            Browse templates
          </Link>
        </div>

        {/* Examples */}
        <div className="mt-6">
          <div className="text-xs text-slate-500 mb-2">Examples</div>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => fill(p)}
                className="px-3 py-1.5 rounded-full border border-white/10 text-xs text-slate-300 hover:bg-white/5"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}
      </form>

      {/* Right: results */}
      <aside className="lg:col-span-1">
        {!result ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 h-full">
            <h3 className="text-slate-200 font-medium">Your build preview</h3>
            <p className="mt-2 text-sm text-slate-400">
              After generation, you’ll see the PRD summary, features, pricing,
              and launch checklist here.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Project name & one-liner</li>
              <li>• Problem → solution</li>
              <li>• Core features & data model</li>
              <li>• Stack, integration plan</li>
              <li>• Pricing & GTM</li>
              <li>• Next steps & launch tasks</li>
            </ul>
          </div>
        ) : (
          <GenerateResultCard project={result} />
        )}
      </aside>
    </div>
  )
}
