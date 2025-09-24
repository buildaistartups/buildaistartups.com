// components/market/PMFMeter.tsx

'use client'

import { useEffect, useState } from 'react'

type PMFData = {
  pmfScore: number | null
  responses: number
  breakdown: {
    veryDisappointed: number
    somewhatDisappointed: number
    notDisappointed: number
  } | null
  lastUpdated: number | null
}

type PMFSurveyForm = {
  disappointment: 'very-disappointed' | 'somewhat-disappointed' | 'not-disappointed' | ''
  primaryBenefit: string
  improvement: string
}

export default function PMFMeter({ projectId }: { projectId: string }) {
  const [data, setData] = useState<PMFData>({ pmfScore: null, responses: 0, breakdown: null, lastUpdated: null })
  const [loading, setLoading] = useState(true)
  const [showSurvey, setShowSurvey] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<PMFSurveyForm>({
    disappointment: '',
    primaryBenefit: '',
    improvement: ''
  })

  useEffect(() => {
    fetchPMFData()
  }, [projectId])

  const fetchPMFData = async () => {
    try {
      const response = await fetch(`/api/market/pmf?projectId=${encodeURIComponent(projectId)}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Failed to fetch PMF data:', error)
    } finally {
      setLoading(false)
    }
  }

  const submitSurvey = async () => {
    if (!form.disappointment || !form.primaryBenefit.trim() || !form.improvement.trim()) {
      alert('Please complete all fields')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/market/pmf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          responses: {
            disappointment: form.disappointment,
            primaryBenefit: form.primaryBenefit.trim(),
            improvement: form.improvement.trim()
          }
        })
      })

      if (response.ok) {
        const result = await response.json()
        await fetchPMFData() // Refresh data
        setForm({ disappointment: '', primaryBenefit: '', improvement: '' })
        setShowSurvey(false)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to submit survey')
      }
    } catch (error) {
      console.error('Failed to submit survey:', error)
      alert('Failed to submit survey')
    } finally {
      setSubmitting(false)
    }
  }

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-slate-400'
    if (score >= 40) return 'text-green-400'
    if (score >= 25) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBackground = (score: number | null) => {
    if (score === null) return 'bg-slate-700'
    if (score >= 40) return 'bg-green-500'
    if (score >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
        <div className="text-sm uppercase tracking-wider text-slate-400 mb-4">PMF PULSE</div>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded mb-2"></div>
          <div className="h-8 bg-slate-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm uppercase tracking-wider text-slate-400">PMF PULSE</div>
        <button
          onClick={() => setShowSurvey(!showSurvey)}
          className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          + Add Response
        </button>
      </div>

      {/* PMF Score Display */}
      <div className="mb-6">
        <div className="flex items-end gap-2 mb-2">
          <span className={`text-3xl font-bold ${getScoreColor(data.pmfScore)}`}>
            {data.pmfScore !== null ? `${data.pmfScore}%` : '—'}
          </span>
          <span className="text-sm text-slate-400 mb-1">
            {data.responses} response{data.responses !== 1 ? 's' : ''}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getScoreBackground(data.pmfScore)}`}
            style={{ width: `${data.pmfScore || 0}%` }}
          />
        </div>

        {/* Interpretation */}
        <div className="text-sm text-slate-300">
          {data.pmfScore === null ? (
            'No responses yet'
          ) : data.pmfScore >= 40 ? (
            '🎉 Strong PMF signal - 40%+ would be very disappointed'
          ) : data.pmfScore >= 25 ? (
            '⚠️ On the edge - getting close to PMF threshold'
          ) : (
            '❌ Weak PMF - need to find better product-market fit'
          )}
        </div>
      </div>

      {/* Breakdown */}
      {data.breakdown && (
        <div className="grid grid-cols-3 gap-2 text-xs mb-6">
          <div className="text-center p-2 bg-red-500/20 rounded">
            <div className="font-medium text-red-300">{data.breakdown.veryDisappointed}</div>
            <div className="text-red-400">Very disappointed</div>
          </div>
          <div className="text-center p-2 bg-yellow-500/20 rounded">
            <div className="font-medium text-yellow-300">{data.breakdown.somewhatDisappointed}</div>
            <div className="text-yellow-400">Somewhat</div>
          </div>
          <div className="text-center p-2 bg-slate-500/20 rounded">
            <div className="font-medium text-slate-300">{data.breakdown.notDisappointed}</div>
            <div className="text-slate-400">Not disappointed</div>
          </div>
        </div>
      )}

      {/* Survey Form */}
      {showSurvey && (
        <div className="border-t border-white/10 pt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              How disappointed would you be if you could no longer use this product?
            </label>
            <select
              value={form.disappointment}
              onChange={(e) => setForm({ ...form, disappointment: e.target.value as any })}
              className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="">Select...</option>
              <option value="very-disappointed">Very disappointed</option>
              <option value="somewhat-disappointed">Somewhat disappointed</option>
              <option value="not-disappointed">Not disappointed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              What is the main benefit you get from this product?
            </label>
            <input
              type="text"
              value={form.primaryBenefit}
              onChange={(e) => setForm({ ...form, primaryBenefit: e.target.value })}
              placeholder="e.g., Saves me 2 hours daily on data analysis"
              className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              How can we improve this product for you?
            </label>
            <textarea
              value={form.improvement}
              onChange={(e) => setForm({ ...form, improvement: e.target.value })}
              placeholder="What features, fixes, or changes would make this more valuable?"
              rows={3}
              className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={submitSurvey}
              disabled={submitting}
              className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Response'}
            </button>
            <button
              onClick={() => setShowSurvey(false)}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {data.lastUpdated && (
        <div className="text-xs text-slate-500 mt-4">
          Last updated: {new Date(data.lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  )
}
