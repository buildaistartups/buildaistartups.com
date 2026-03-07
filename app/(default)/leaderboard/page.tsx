// app/(default)/leaderboard/page.tsx
import type { Metadata } from 'next'
import { Suspense } from 'react'
import LeaderboardClient from './LeaderboardClient'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/leaderboard`

export const metadata: Metadata = {
  title: 'Build Score Leaderboard — Build AI Startups',
  description: 'Top-ranked AI startup projects by Build Score. See leading projects by vertical, tech stack, and overall performance.',
  alternates: { canonical: CANON },
  openGraph: {
    type: 'website',
    url: CANON,
    title: 'Build Score Leaderboard — Build AI Startups',
    description: 'Top-ranked AI startup projects by Build Score across verticals and tech stacks.',
    siteName: 'Build AI Startups',
  },
}

export default function LeaderboardPage() {
  return (
    <main className="bg-slate-950 text-slate-200 min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Build Score Leaderboard</h1>
          <p className="text-slate-300 max-w-2xl">
            Top AI startup projects ranked by Build Score. Scores combine product quality, 
            traction metrics, AI evaluations, and financial readiness.
          </p>
        </div>
        
        <Suspense fallback={<LeaderboardSkeleton />}>
          <LeaderboardClient />
        </Suspense>
      </section>
    </main>
  )
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Tab skeleton */}
      <div className="flex gap-2 border-b border-white/10">
        {Array.from({length: 3}).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-slate-800/50 rounded-t animate-pulse" />
        ))}
      </div>
      
      {/* Table skeleton */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="bg-slate-900/60 p-4">
          <div className="grid grid-cols-6 gap-4">
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="h-4 bg-slate-700/50 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="divide-y divide-white/10">
          {Array.from({length: 10}).map((_, i) => (
            <div key={i} className="p-4">
              <div className="grid grid-cols-6 gap-4">
                {Array.from({length: 6}).map((_, j) => (
                  <div key={j} className="h-4 bg-slate-800/50 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
