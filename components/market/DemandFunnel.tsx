// components/market/DemandFunnel.tsx

'use client'

import { useEffect, useState } from 'react'

type DemandData = {
  lois: { count: number }
  waitlist: { count: number }
  total: number
}

type FunnelMetrics = {
  landingViews: number
  signups: number
  ctaClicks: number
  shareCount: number
  period: string
}

type LOIForm = {
  email: string
  company: string
  useCase: string
  budget: string
  timeline: string
}

type WaitlistForm = {
  email: string
  referral: string
}

export default function DemandFunnel({ projectId }: { projectId: string }) {
  const [demandData, setDemandData] = useState<DemandData>({ lois: { count: 0 }, waitlist: { count: 0 }, total: 0 })
  const [loading, setLoading] = useState(true)
  const [activeForm, setActiveForm] = useState<'loi' | 'waitlist' | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [loiForm, setLoiForm] = useState<LOIForm>({
    email: '', company: '', useCase: '', budget: '', timeline: ''
  })
  const [waitlistForm, setWaitlistForm] = useState<WaitlistForm>({
    email: '', referral: ''
  })
  const [funnelMetrics, setFunnelMetrics] = useState<FunnelMetrics>({
    landingViews: 0, signups: 0, ctaClicks: 0, shareCount: 0, period: 'month'
  })
  const [showMetricsForm, setShowMetricsForm] = useState(false)

  useEffect(() => {
    fetchDemandData()
  }, [projectId])

  const fetchDemandData = async () => {
    try {
      const response = await fetch(`/api/market/loi?projectId=${encodeURIComponent(projectId)}`)
      if (response.ok) {
        const result = await response.json()
        setDemandData(result)
      }
    } catch (error) {
      console.error('Failed to fetch demand data:', error)
    } finally {
      setLoading(false)
    }
  }

  const submitEntry = async (type: 'loi' | 'waitlist') => {
    const form = type === 'loi' ? loiForm : waitlistForm
    if (!form.email.trim()) {
      alert('Email is required')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/market/loi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          type,
          ...form
        })
      })

      if (response.ok) {
        await fetchDemandData()
        if (type === 'loi') {
          setLoiForm({ email: '', company: '', useCase: '', budget: '', timeline: '' })
        } else {
          setWaitlistForm({ email: '', referral: '' })
        }
        setActiveForm(null)
      } else {
        const error = await response.json()
        alert(error.error || `Failed to add ${type}`)
      }
    } catch (error) {
      console.error(`Failed to add ${type}:`, error)
      alert(`Failed to add ${type}`)
    } finally {
      setSubmitting(false)
    }
  }

  const updateMetrics = async () => {
    try {
      const response = await fetch('/api/score/market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          demandMetrics: funnelMetrics
        })
      })

      if (response.ok) {
        setShowMetricsForm(false)
        // Could trigger a refresh of market score here
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update metrics')
      }
    } catch (error) {
      console.error('Failed to update metrics:', error)
      alert('Failed to update metrics')
    }
  }

  const calculateCTR = () => {
    if (funnelMetrics.landingViews === 0) return 0
    return ((funnelMetrics.ctaClicks / funnelMetrics.landingViews) * 100).toFixed(1)
  }

  const calculateConversion = () => {
    if (funnelMetrics.landingViews === 0) return 0
    return ((funnelMetrics.signups / funnelMetrics.landingViews) * 100).toFixed(1)
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
        <div className="text-sm uppercase tracking-wider text-slate-400 mb-4">DEMAND SIGNALS</div>
        <div className="animate-pulse">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="h-16 bg-slate-700 rounded"></div>
            <div className="h-16 bg-slate-700 rounded"></div>
          </div>
          <div className="h-32 bg-slate-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm uppercase tracking-wider text-slate-400">DEMAND SIGNALS</div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowMetricsForm(!showMetricsForm)}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            📊 Update Metrics
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
          <div className="text-2xl font-bold text-violet-400">{demandData.lois.count}</div>
          <div className="text-xs text-slate-400">Letters of Intent</div>
        </div>
        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
          <div className="text-2xl font-bold text-green-400">{demandData.waitlist.count}</div>
          <div className="text-xs text-slate-400">Waitlist Signups</div>
        </div>
        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
          <div className="text-2xl font-bold text-blue-400">{calculateCTR()}%</div>
          <div className="text-xs text-slate-400">Landing CTR</div>
        </div>
        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-400">{calculateConversion()}%</div>
          <div className="text-xs text-slate-400">Conversion Rate</div>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="mb-6">
        <div className="text-sm font-medium text-slate-300 mb-3">Demand Funnel</div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-24 text-xs text-slate-400">Visits</div>
            <div className="flex-1 bg-slate-800 rounded-full h-6 relative">
              <div className="bg-blue-500 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium" style={{ width: '100%' }}>
                {funnelMetrics.landingViews.toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-24 text-xs text-slate-400">CTA Clicks</div>
            <div className="flex-1 bg-slate-800 rounded-full h-6 relative">
              <div 
                className="bg-yellow-500 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium" 
                style={{ width: funnelMetrics.landingViews > 0 ? `${(funnelMetrics.ctaClicks / funnelMetrics.landingViews) * 100}%` : '0%' }}
              >
                {funnelMetrics.ctaClicks.toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-24 text-xs text-slate-400">Signups</div>
            <div className="flex-1 bg-slate-800 rounded-full h-6 relative">
              <div 
                className="bg-green-500 h-6 rounded-full flex items-center justify-center text-xs text-white font-medium" 
                style={{ width: funnelMetrics.landingViews > 0 ? `${(funnelMetrics.signups / funnelMetrics.landingViews) * 100}%` : '0%' }}
              >
                {funnelMetrics.signups.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveForm(activeForm === 'loi' ? null : 'loi')}
          className="flex-1 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 text-sm font-medium py-2 px-4 rounded border border-violet-600/30 transition-colors"
        >
          + Add LOI
        </button>
        <button
          onClick={() => setActiveForm(activeForm === 'waitlist' ? null : 'waitlist')}
          className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-300 text-sm font-medium py-2 px-4 rounded border border-green-600/30 transition-colors"
        >
          + Add to Waitlist
        </button>
      </div>

      {/* LOI Form */}
      {activeForm === 'loi' && (
        <div className="mb-4 p-4 border border-violet-500/30 rounded-lg bg-violet-500/5">
          <div className="text-sm font-medium text-violet-300 mb-3">Add Letter of Intent</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              type="email"
              value={loiForm.email}
              onChange={(e) => setLoiForm({ ...loiForm, email: e.target.value })}
              placeholder="Email address *"
              className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
            <input
              type="text"
              value={loiForm.company}
              onChange={(e) => setLoiForm({ ...loiForm, company: e.target.value })}
              placeholder="Company name"
              className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              value={loiForm.budget}
              onChange={(e) => setLoiForm({ ...loiForm, budget: e.target.value })}
              placeholder="Budget range"
              className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
            <input
              type="text"
              value={loiForm.timeline}
              onChange={(e) => setLoiForm({ ...loiForm, timeline: e.target.value })}
              placeholder="Timeline (e.g., Q1 2025)"
              className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
          <textarea
            value={loiForm.useCase}
            onChange={(e) => setLoiForm({ ...loiForm, useCase: e.target.value })}
            placeholder="Use case or requirements"
            rows={3}
            className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none mb-3"
          />
          <div className="flex gap-2">
            <button
              onClick={() => submitEntry('loi')}
              disabled={submitting}
              className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded transition-colors"
            >
              {submitting ? 'Adding...' : 'Add LOI'}
            </button>
            <button
              onClick={() => setActiveForm(null)}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Waitlist Form */}
      {activeForm === 'waitlist' && (
        <div className="mb-4 p-4 border border-green-500/30 rounded-lg bg-green-500/5">
          <div className="text-sm font-medium text-green-300 mb-3">Add to Waitlist</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              type="email"
              value={waitlistForm.email}
              onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
              placeholder="Email address *"
              className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              value={waitlistForm.referral}
              onChange={(e) => setWaitlistForm({ ...waitlistForm, referral: e.target.value })}
              placeholder="How did they hear about you?"
              className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => submitEntry('waitlist')}
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded transition-colors"
            >
              {submitting ? 'Adding...' : 'Add to Waitlist'}
            </button>
            <button
              onClick={() => setActiveForm(null)}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Metrics Update Form */}
      {showMetricsForm && (
        <div className="p-4 border border-blue-500/30 rounded-lg bg-blue-500/5">
          <div className="text-sm font-medium text-blue-300 mb-3">Update Landing Page Metrics</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Landing Views</label>
              <input
                type="number"
                value={funnelMetrics.landingViews}
                onChange={(e) => setFunnelMetrics({ ...funnelMetrics, landingViews: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">CTA Clicks</label>
              <input
                type="number"
                value={funnelMetrics.ctaClicks}
                onChange={(e) => setFunnelMetrics({ ...funnelMetrics, ctaClicks: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Signups</label>
              <input
                type="number"
                value={funnelMetrics.signups}
                onChange={(e) => setFunnelMetrics({ ...funnelMetrics, signups: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Shares</label>
              <input
                type="number"
                value={funnelMetrics.shareCount}
                onChange={(e) => setFunnelMetrics({ ...funnelMetrics, shareCount: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-xs text-slate-400 mb-1">Period</label>
            <select
              value={funnelMetrics.period}
              onChange={(e) => setFunnelMetrics({ ...funnelMetrics, period: e.target.value })}
              className="bg-slate-700 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={updateMetrics}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
            >
              Update Metrics
            </button>
            <button
              onClick={() => setShowMetricsForm(false)}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {demandData.total === 0 && (
        <div className="text-center py-4 text-slate-400 text-sm">
          No demand signals yet. Add LOIs or waitlist entries to track interest.
        </div>
      )}
    </div>
  )
}
