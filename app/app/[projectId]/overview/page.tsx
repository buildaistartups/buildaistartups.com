'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { scoreColor, scoreBgColor } from '@/lib/launch-score'
import { IconValidate, IconBuild, IconLaunch, IconTarget, IconMeasure, IconGrow } from '@/components/app/icons'
import type { ScoreResult } from '@/lib/launch-score'

export default function OverviewPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [score, setScore] = useState<ScoreResult | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchScore = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}/score`)
      if (res.ok) setScore(await res.json())
    } catch (err) { console.error('Failed to fetch score:', err) }
    finally { setLoading(false) }
  }, [projectId])

  useEffect(() => { fetchScore() }, [fetchScore])

  if (loading) {
    return <div className="flex items-center justify-center py-16"><div className="text-sm text-gray-400">Calculating LaunchScore...</div></div>
  }

  const components = [
    { key: 'market', label: 'Market', desc: 'Competitors, ICP, demand signals' },
    { key: 'product', label: 'Product', desc: 'Build checklist progress' },
    { key: 'pmf', label: 'PMF', desc: 'Product-market fit survey (Week 4)' },
    { key: 'finance', label: 'Finance', desc: 'Revenue, runway (Week 4)' },
    { key: 'growth', label: 'Growth', desc: 'Experiments, traction (Week 5)' },
  ]

  return (
    <div className="space-y-6">
      {/* LaunchScore card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">LaunchScore</h2>
          {score && <span className={`text-xs font-medium px-3 py-1 rounded-full ${scoreBgColor(score.overall)}`}>{score.label}</span>}
        </div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className={`text-5xl font-bold ${score ? scoreColor(score.overall) : 'text-gray-300'}`}>{score?.overall ?? '--'}</span>
          <span className="text-lg text-gray-400">/100</span>
        </div>
        {score && <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{score.recommendation}</p>}

        <div className="grid grid-cols-5 gap-3">
          {components.map(c => {
            const val = score?.components[c.key as keyof typeof score.components] ?? 0
            return (
              <div key={c.key} className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{c.label}</div>
                <div className={`text-lg font-bold ${scoreColor(val)}`}>{val}</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                  <div className={`h-1.5 rounded-full transition-all ${val <= 20 ? 'bg-red-500' : val <= 40 ? 'bg-orange-500' : val <= 60 ? 'bg-yellow-500' : val <= 80 ? 'bg-green-500' : 'bg-purple-500'}`} style={{ width: `${val}%` }} />
                </div>
                <div className="text-[10px] text-gray-400 mt-1">{c.desc}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href={`/app/${projectId}/validate`} className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 hover:border-violet-300 dark:hover:border-violet-500/50 transition group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:bg-emerald-500/20 transition">
            <IconValidate className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Validate your idea</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Run AI analysis, track competitors, define your ICP, collect demand signals.</p>
        </a>
        <a href={`/app/${projectId}/build`} className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 hover:border-violet-300 dark:hover:border-violet-500/50 transition group">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition">
            <IconBuild className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Start building</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Track your build progress with checklists and milestones.</p>
        </a>
        <a href={`/app/${projectId}/launch`} className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 hover:border-violet-300 dark:hover:border-violet-500/50 transition group">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3 group-hover:bg-violet-500/20 transition">
            <IconLaunch className="w-5 h-5 text-violet-500" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Plan your launch</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Launch checklist, AI launch plan, and event tracking.</p>
        </a>
      </div>

      {/* Score explanation */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">How LaunchScore works</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Your LaunchScore is a composite of 5 weighted components, each scored 0-100:</p>
        <div className="grid sm:grid-cols-5 gap-3">
          {[
            { label: 'Market (25%)', desc: 'Competitors, ICP, demand signals, validation checklist', Icon: IconTarget, color: 'text-violet-500' },
            { label: 'Product (20%)', desc: 'Build checklist completion', Icon: IconBuild, color: 'text-blue-500' },
            { label: 'PMF (25%)', desc: 'Product-market fit survey score', Icon: IconMeasure, color: 'text-amber-500' },
            { label: 'Finance (15%)', desc: 'MRR, runway months', Icon: IconGrow, color: 'text-emerald-500' },
            { label: 'Growth (15%)', desc: 'Experiments, traction signals', Icon: IconLaunch, color: 'text-rose-500' },
          ].map(item => (
            <div key={item.label} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <item.Icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">The score updates automatically as you add evidence. Complete the Validate stage to see your Market score rise.</p>
      </div>
    </div>
  )
}
