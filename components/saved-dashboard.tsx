// components/saved-dashboard.tsx
'use client'

import Link from 'next/link'
import { useMemo } from 'react'

type SavedItem = {
  id: string
  name: string
  oneLiner: string
  status: 'draft' | 'planned' | 'deployed'
  stack: string
  updatedAt: string
}

export default function SavedDashboard({ items }: { items: SavedItem[] }) {
  const hasItems = items && items.length > 0

  const statusBadge = (s: SavedItem['status']) => {
    const base =
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border'
    if (s === 'deployed') return `${base} border-teal-400/30 text-teal-300`
    if (s === 'planned') return `${base} border-amber-400/30 text-amber-300`
    return `${base} border-slate-400/30 text-slate-300`
  }

  const demo = useMemo<SavedItem[]>(
    () => [
      {
        id: 'demo-1',
        name: 'CallNote AI',
        oneLiner: 'Summarize sales calls & push action items to Notion',
        status: 'planned',
        stack: 'Next.js + Supabase',
        updatedAt: 'today',
      },
      {
        id: 'demo-2',
        name: 'ReplyPilot',
        oneLiner: 'Chrome extension to draft LinkedIn replies in your tone',
        status: 'draft',
        stack: 'Vite + Chrome MV3',
        updatedAt: 'yesterday',
      },
      {
        id: 'demo-3',
        name: 'CSV Clean API',
        oneLiner: 'Upload CSV → get clean data & inferred schema as JSON',
        status: 'deployed',
        stack: 'FastAPI + Postgres',
        updatedAt: '2 days ago',
      },
    ],
    [],
  )

  const list = hasItems ? items : demo // show demo until DB exists

  return (
    <main className="relative">
      <section className="pt-10 md:pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 pb-2">
              HyperNova Builder
            </div>
            <h1 className="h1 bg-clip-text text-transparent bg-linear-to-r from-slate-200/70 via-slate-200 to-slate-200/70">
              Your saved builds
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Review drafts, resume planning, or ship with Autopilot. You own
              the repo, infra, and revenue.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/generate"
                className="btn text-white bg-purple-500 hover:bg-purple-600 shadow-xs"
              >
                Generate new startup
              </Link>
              <Link href="/resources/templates" className="btn text-slate-300 hover:text-white">
                Browse templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-14 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {!hasItems && (
            <div className="mb-6 text-sm text-slate-500">
              Showing demo data until you wire storage.
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-slate-100 font-semibold">{item.name}</h3>
                    <p className="text-sm text-slate-400">{item.oneLiner}</p>
                  </div>
                  <span className={statusBadge(item.status)}>{item.status}</span>
                </div>

                <dl className="mt-4 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Stack</dt>
                    <dd>{item.stack}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Updated</dt>
                    <dd>{item.updatedAt}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={`/generate/${item.id}`} className="btn btn-sm text-slate-300 hover:text-white">
                    Open
                  </Link>
                  <Link href="/pricing" className="btn btn-sm text-slate-300 hover:text-white">
                    Upgrade
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Saving uses your account storage. Connect GitHub, Vercel, DB, and
            Stripe to enable Autopilot shipping.
          </p>
        </div>
      </section>
    </main>
  )
}
