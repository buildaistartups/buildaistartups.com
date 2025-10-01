'use client'

import { useState } from 'react'

const VERTICALS = ['ai-leadgen', 'ai-support', 'social-commerce', 'finance-ops', 'generic'] as const

type Meta = {
  projectId: string
  displayName?: string
  vertical?: (typeof VERTICALS)[number]
  stack?: string[]
  homepage?: string
  logoUrl?: string
}

export default function AdminMetaPage() {
  const [projectId, setProjectId] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [vertical, setVertical] = useState<(typeof VERTICALS)[number]>('generic')
  const [stackCsv, setStackCsv] = useState('')
  const [homepage, setHomepage] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function fetchMeta(id: string) {
    setMessage(null)
    setError(null)
    try {
      const res = await fetch(`/api/projects/meta?projectId=${encodeURIComponent(id)}`, { 
        cache: 'no-store' 
      })
      if (!res.ok) throw new Error('Not found')
      
      const { meta } = await res.json()
      setDisplayName(meta.displayName || '')
      setVertical((meta.vertical || 'generic') as any)
      setStackCsv((meta.stack || []).join(', '))
      setHomepage(meta.homepage || '')
      setLogoUrl(meta.logoUrl || '')
      setMessage('Loaded existing metadata.')
    } catch {
      setMessage('No existing metadata. You can create it.')
      setDisplayName('')
      setVertical('generic')
      setStackCsv('')
      setHomepage('')
      setLogoUrl('')
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!projectId.trim()) { 
      setError('projectId is required')
      return 
    }

    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const payload: Meta = {
        projectId: projectId.trim(),
        displayName: displayName.trim() || undefined,
        vertical,
        stack: stackCsv.split(',').map(s => s.trim()).filter(Boolean),
        homepage: homepage.trim() || undefined,
        logoUrl: logoUrl.trim() || undefined,
      }

      const res = await fetch('/api/projects/meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Save failed')

      setMessage('Saved ✔')
    } catch (e: any) {
      setError(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <section className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-3xl font-bold">Admin · Project Metadata</h1>
        <p className="mt-2 text-slate-400">
          Register <span className="text-slate-200 font-medium">vertical</span> and{' '}
          <span className="text-slate-200 font-medium">stack</span> for leaderboard filters.
        </p>

        <form onSubmit={handleSave} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project ID <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="flex-1 rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-500"
                placeholder="my-ai-project"
              />
              <button
                type="button"
                onClick={() => fetchMeta(projectId)}
                className="rounded-md bg-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-600"
              >
                Load
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-500"
              placeholder="My AI Project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Vertical
            </label>
            <select
              value={vertical}
              onChange={(e) => setVertical(e.target.value as any)}
              className="w-full rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200"
            >
              {VERTICALS.map(v => (
                <option key={v} value={v}>
                  {v.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Stack (comma-separated)
            </label>
            <input
              type="text"
              value={stackCsv}
              onChange={(e) => setStackCsv(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-500"
              placeholder="nextjs, supabase, stripe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Homepage
            </label>
            <input
              type="url"
              value={homepage}
              onChange={(e) => setHomepage(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Logo URL
            </label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-500"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            {message && <span className="text-sm text-green-400">{message}</span>}
            {error && <span className="text-sm text-rose-300">{error}</span>}
          </div>
        </form>

        <p className="mt-4 text-xs text-slate-500">
          Tip: register metadata <em>once</em> per project; Build Score posts will then show up under filters.
        </p>
      </section>
    </main>
  )
}
