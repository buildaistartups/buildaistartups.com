'use client'

import { useState, useEffect } from 'react'

type ChecklistItem = {
  id: string
  title: string
  detail?: string
  href?: string
  done?: boolean
  notes?: string
  completedAt?: number
}

type RetentionState = {
  items: ChecklistItem[]
  completedCount: number
  retentionRate: number
  lastUpdated: number
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'onboarding-audit',
    title: 'Audit and optimize onboarding flow',
    detail: 'Track drop-off points, simplify steps, add progress indicators',
  },
  {
    id: 'welcome-sequence',
    title: 'Create comprehensive welcome email sequence',
    detail: '7-day email series with tips, best practices, and success stories',
  },
  {
    id: 'in-app-guidance',
    title: 'Add in-app guidance and tooltips',
    detail: 'Progressive disclosure, contextual help, and feature discovery',
  },
  {
    id: 'usage-analytics',
    title: 'Set up detailed usage analytics',
    detail: 'Track feature adoption, session length, and engagement patterns',
  },
  {
    id: 'health-scores',
    title: 'Build user health score system',
    detail: 'Identify at-risk users based on activity and engagement',
  },
  {
    id: 'lifecycle-emails',
    title: 'Launch lifecycle email campaigns',
    detail: 'Re-engagement, feature announcements, and success tips',
  },
  {
    id: 'feedback-loops',
    title: 'Create continuous feedback loops',
    detail: 'NPS surveys, feature polls, and exit interviews',
  },
  {
    id: 'success-milestones',
    title: 'Define and celebrate user success milestones',
    detail: 'Achievement badges, progress tracking, and congratulations',
  },
  {
    id: 'customer-success',
    title: 'Implement proactive customer success outreach',
    detail: 'Check-ins with new users, usage reviews, and support',
  },
  {
    id: 'retention-experiments',
    title: 'Run retention optimization experiments',
    detail: 'A/B test different approaches to improve 30-day retention',
  }
]

interface Props {
  projectId: string
}

export default function Retention30({ projectId }: Props) {
  const [state, setState] = useState<RetentionState>({
    items: DEFAULT_CHECKLIST,
    completedCount: 0,
    retentionRate: 0,
    lastUpdated: Date.now()
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`retention30-${projectId}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setState(parsed)
      } catch (error) {
        console.warn('Failed to parse saved Retention30 state:', error)
      }
    }
  }, [projectId])

  // Save state to localStorage
  const saveState = (newState: RetentionState) => {
    setState(newState)
    localStorage.setItem(`retention30-${projectId}`, JSON.stringify(newState))
  }

  const toggleItem = async (itemId: string) => {
    const updatedItems = state.items.map(item => {
      if (item.id === itemId) {
        const isDone = !item.done
        return {
          ...item,
          done: isDone,
          completedAt: isDone ? Date.now() : undefined
        }
      }
      return item
    })

    const completedCount = updatedItems.filter(item => item.done).length
    const newState = {
      ...state,
      items: updatedItems,
      completedCount,
      lastUpdated: Date.now()
    }

    saveState(newState)

    // Post evidence to the Evidence Ledger
    const completedItem = updatedItems.find(item => item.id === itemId)
    if (completedItem?.done) {
      await postEvidence(completedItem)
    }
  }

  const updateNotes = (itemId: string, notes: string) => {
    const updatedItems = state.items.map(item =>
      item.id === itemId ? { ...item, notes } : item
    )

    const newState = {
      ...state,
      items: updatedItems,
      lastUpdated: Date.now()
    }

    saveState(newState)
  }

  const updateRetentionRate = (rate: number) => {
    const newState = {
      ...state,
      retentionRate: Math.max(0, Math.min(100, rate)),
      lastUpdated: Date.now()
    }
    saveState(newState)
  }

  const postEvidence = async (item: ChecklistItem) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          type: 'milestone',
          title: `Retention 30: ${item.title}`,
          detail: item.detail || '',
          url: item.href || '',
          meta: {
            checklistType: 'retention-30',
            itemId: item.id,
            notes: item.notes,
            retentionRate: state.retentionRate
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to log evidence')
      }
    } catch (error) {
      console.error('Failed to post evidence:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPercent = Math.round((state.completedCount / state.items.length) * 100)
  const retentionColor = state.retentionRate >= 70 ? 'green' : state.retentionRate >= 40 ? 'yellow' : 'red'

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">30-Day Retention</h3>
          <div className="text-sm text-slate-400">
            {state.completedCount}/{state.items.length} complete
          </div>
        </div>
        
        <p className="text-slate-300 text-sm mb-4">
          Keep users engaged and coming back. Focus on onboarding and lifecycle engagement.
        </p>

        {/* Retention Rate Tracker */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-slate-300">30-Day Retention Rate (%)</label>
            <input
              type="number"
              value={state.retentionRate}
              onChange={(e) => updateRetentionRate(parseFloat(e.target.value) || 0)}
              className="w-20 text-sm bg-slate-950/50 border border-white/10 rounded-md p-1 text
              className="w-20 text-sm bg-slate-950/50 border border-white/10 rounded-md p-1 text-slate-200"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                retentionColor === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                retentionColor === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
                'bg-gradient-to-r from-red-500 to-pink-400'
              }`}
              style={{ width: `${Math.min(state.retentionRate, 100)}%` }}
            />
          </div>
          <div className="text-xs text-slate-400">
            {state.retentionRate}% retention • Target: 60%+ (Good: 70%+, Excellent: 80%+)
          </div>
        </div>

        {/* Process Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs text-slate-400 mb-4">
          {progressPercent}% retention systems complete
        </div>
      </div>

      <div className="space-y-3">
        {state.items.map((item, index) => (
          <div
            key={item.id}
            className={`rounded-lg border p-4 transition-all ${
              item.done 
                ? 'border-purple-500/30 bg-purple-950/20' 
                : 'border-white/10 bg-slate-900/40 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleItem(item.id)}
                className={`mt-1 h-5 w-5 rounded border-2 flex items-center justify-center transition-all ${
                  item.done
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-slate-400 hover:border-purple-400'
                }`}
              >
                {item.done && (
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-white flex items-center gap-2">
                      <span className="text-xs text-slate-500">#{index + 1}</span>
                      {item.title}
                      {item.done && (
                        <span className="text-xs text-purple-400">
                          ✓ {new Date(item.completedAt!).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {item.detail && (
                      <p className="text-sm text-slate-400 mt-1">{item.detail}</p>
                    )}
                  </div>
                  
                  {item.href && (
                    
                      href={item.href}
                      className="text-xs text-violet-400 hover:text-violet-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open →
                    </a>
                  )}
                </div>

                {/* Notes Section */}
                <div className="mt-3">
                  <textarea
                    value={item.notes || ''}
                    onChange={(e) => updateNotes(item.id, e.target.value)}
                    placeholder="Add notes, metrics, experiment results..."
                    className="w-full text-sm bg-slate-950/50 border border-white/10 rounded-md p-2 text-slate-200 placeholder-slate-500"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Success Message */}
      {state.completedCount === state.items.length && state.retentionRate >= 60 && (
        <div className="mt-6 p-4 rounded-lg bg-purple-950/30 border border-purple-500/30">
          <div className="flex items-center gap-2 text-purple-400 font-medium">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Excellent retention achieved!
          </div>
          <p className="text-sm text-purple-300 mt-1">
            {state.retentionRate}% retention rate with complete retention system. Your users are sticking around!
          </p>
        </div>
      )}

      {isSubmitting && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-400">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-violet-400 border-t-transparent"></div>
            Logging progress...
          </div>
        </div>
      )}
    </div>
  )
}
