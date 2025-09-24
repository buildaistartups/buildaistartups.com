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

type FirstTenState = {
  items: ChecklistItem[]
  completedCount: number
  currentUsers: number
  lastUpdated: number
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'user-research',
    title: 'Complete user interviews with first 3 customers',
    detail: 'Document pain points, use cases, and feature requests'
  },
  {
    id: 'referral-system',
    title: 'Build referral/sharing system',
    detail: 'Easy way for users to invite colleagues or share with network'
  },
  {
    id: 'onboarding-optimize',
    title: 'Optimize onboarding based on user feedback',
    detail: 'Reduce time-to-value, eliminate confusion points'
  },
  {
    id: 'content-marketing',
    title: 'Start content marketing engine',
    detail: 'Blog posts, case studies, tutorials that drive organic traffic'
  },
  {
    id: 'community-engagement',
    title: 'Engage in relevant communities',
    detail: 'Reddit, Discord, Slack groups where your users hang out'
  },
  {
    id: 'email-nurture',
    title: 'Set up automated email nurture sequence',
    detail: '5-email series for trial users to convert to paid'
  },
  {
    id: 'social-proof',
    title: 'Add social proof elements',
    detail: 'User count, testimonials, logos, reviews on key pages'
  },
  {
    id: 'analytics-dashboard',
    title: 'Build user analytics dashboard',
    detail: 'Track activation, engagement, and churn metrics'
  },
  {
    id: 'feature-requests',
    title: 'Implement top 2 feature requests',
    detail: 'Based on user feedback, build what they actually want'
  },
  {
    id: 'retention-campaign',
    title: 'Launch user retention campaign',
    detail: 'Email series, in-app messaging, and success check-ins'
  }
]

interface Props {
  projectId: string
}

export default function FirstTen({ projectId }: Props) {
  const [state, setState] = useState<FirstTenState>({
    items: DEFAULT_CHECKLIST,
    completedCount: 0,
    currentUsers: 0,
    lastUpdated: Date.now()
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(`firstTen-${projectId}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setState(parsed)
      } catch (error) {
        console.warn('Failed to parse saved FirstTen state:', error)
      }
    }
  }, [projectId])

  const saveState = (newState: FirstTenState) => {
    setState(newState)
    localStorage.setItem(`firstTen-${projectId}`, JSON.stringify(newState))
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

  const updateUserCount = (count: number) => {
    const newState = {
      ...state,
      currentUsers: count,
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
          title: `First 10 Users: ${item.title}`,
          detail: item.detail || '',
          url: item.href || '',
          meta: {
            checklistType: 'first-ten',
            itemId: item.id,
            notes: item.notes,
            currentUsers: state.currentUsers
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
  const userProgress = Math.min((state.currentUsers / 10) * 100, 100)

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">First 10 Users</h3>
          <div className="text-sm text-slate-400">
            {state.completedCount}/{state.items.length} complete
          </div>
        </div>
        
        <p className="text-slate-300 text-sm mb-4">
          Scale from 1 to 10 paying users through systematic growth tactics.
        </p>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-slate-300">Current Users</label>
            <input
              type="number"
              value={state.currentUsers}
              onChange={(e) => updateUserCount(parseInt(e.target.value) || 0)}
              className="w-20 text-sm bg-slate-950/50 border border-white/10 rounded-md p-1 text-slate-200"
              min="0"
              max="10"
            />
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${userProgress}%` }}
            />
          </div>
          <div className="text-xs text-slate-400">
            {state.currentUsers}/10 users • {Math.round(userProgress)}% to goal
          </div>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-violet-500 to-purple-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs text-slate-400 mb-4">
          {progressPercent}% process complete • Target: 10 users within 60 days
        </div>
      </div>

      <div className="space-y-3">
        {state.items.map((item, index) => (
          <div
            key={item.id}
            className={`rounded-lg border p-4 transition-all ${
              item.done 
                ? 'border-blue-500/30 bg-blue-950/20' 
                : 'border-white/10 bg-slate-900/40 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleItem(item.id)}
                className={`mt-1 h-5 w-5 rounded border-2 flex items-center justify-center transition-all ${
                  item.done
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-slate-400 hover:border-blue-400'
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
                        <span className="text-xs text-blue-400">
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

                <div className="mt-3">
                  <textarea
                    value={item.notes || ''}
                    onChange={(e) => updateNotes(item.id, e.target.value)}
                    placeholder="Add notes, metrics, lessons learned..."
                    className="w-full text-sm bg-slate-950/50 border border-white/10 rounded-md p-2 text-slate-200 placeholder-slate-500"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {state.completedCount === state.items.length && state.currentUsers >= 10 && (
        <div className="mt-6 p-4 rounded-lg bg-blue-950/30 border border-blue-500/30">
          <div className="flex items-center gap-2 text-blue-400 font-medium">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Milestone achieved: 10 users + complete process!
          </div>
          <p className="text-sm text-blue-300 mt-1">
            You've reached 10 users and completed all growth activities. Ready for 30-day retention!
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
