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

type FirstDollarState = {
  items: ChecklistItem[]
  completedCount: number
  lastUpdated: number
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'setup-landing',
    title: 'Set up landing page with value prop',
    detail: 'Clear headline, benefits, social proof, and CTA above the fold',
    href: '/product/builder'
  },
  {
    id: 'add-capture-form',
    title: 'Add lead capture form',
    detail: 'Name, email, company size, and use case fields with validation',
  },
  {
    id: 'setup-analytics',
    title: 'Install analytics tracking',
    detail: 'Google Analytics, conversion tracking, and user behavior monitoring',
  },
  {
    id: 'create-pricing',
    title: 'Create pricing page with clear tiers',
    detail: 'Free trial, starter ($29), pro ($99), enterprise (custom)',
    href: '/pricing'
  },
  {
    id: 'setup-stripe',
    title: 'Set up Stripe payment processing',
    detail: 'Test mode enabled, webhook configured, subscription products created',
  },
  {
    id: 'build-onboarding',
    title: 'Build user onboarding flow',
    detail: '5-step guided setup that gets users to first value in < 5 minutes',
  },
  {
    id: 'launch-marketing',
    title: 'Launch initial marketing push',
    detail: 'Product Hunt, Twitter, LinkedIn, relevant communities',
  },
  {
    id: 'collect-feedback',
    title: 'Set up feedback collection',
    detail: 'User interviews, surveys, and support channel for early users',
  },
  {
    id: 'optimize-conversion',
    title: 'Optimize conversion funnel',
    detail: 'A/B test landing page, pricing, and onboarding flow',
  },
  {
    id: 'first-sale',
    title: 'Complete first paid conversion',
    detail: 'Document the entire customer journey and success metrics',
  }
]

interface Props {
  projectId: string
}

export default function FirstDollar({ projectId }: Props) {
  const [state, setState] = useState<FirstDollarState>({
    items: DEFAULT_CHECKLIST,
    completedCount: 0,
    lastUpdated: Date.now()
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`firstDollar-${projectId}`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setState(parsed)
      } catch (error) {
        console.warn('Failed to parse saved FirstDollar state:', error)
      }
    }
  }, [projectId])

  // Save state to localStorage
  const saveState = (newState: FirstDollarState) => {
    setState(newState)
    localStorage.setItem(`firstDollar-${projectId}`, JSON.stringify(newState))
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

  const postEvidence = async (item: ChecklistItem) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          type: 'milestone',
          title: `First $ Milestone: ${item.title}`,
          detail: item.detail || '',
          url: item.href || '',
          meta: {
            checklistType: 'first-dollar',
            itemId: item.id,
            notes: item.notes
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

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">First Dollar Checklist</h3>
          <div className="text-sm text-slate-400">
            {state.completedCount}/{state.items.length} complete
          </div>
        </div>
        
        <p className="text-slate-300 text-sm mb-4">
          Systematic path to your first paid customer. Each step builds toward revenue.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs text-slate-400 mb-4">
          {progressPercent}% complete • Target: First paying customer within 30 days
        </div>
      </div>

      <div className="space-y-3">
        {state.items.map((item, index) => (
          <div
            key={item.id}
            className={`rounded-lg border p-4 transition-all ${
              item.done 
                ? 'border-green-500/30 bg-green-950/20' 
                : 'border-white/10 bg-slate-900/40 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleItem(item.id)}
                className={`mt-1 h-5 w-5 rounded border-2 flex items-center justify-center transition-all ${
                  item.done
                    ? 'border-green-500 bg-green-500'
                    : 'border-slate-400 hover:border-green-400'
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
                        <span className="text-xs text-green-400">
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
                    placeholder="Add notes, progress updates, or links..."
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
      {state.completedCount === state.items.length && (
        <div className="mt-6 p-4 rounded-lg bg-green-950/30 border border-green-500/30">
          <div className="flex items-center gap-2 text-green-400 font-medium">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Congratulations! First Dollar path complete!
          </div>
          <p className="text-sm text-green-300 mt-1">
            You've completed all steps toward your first paying customer. Time to scale!
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
