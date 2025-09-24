'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PMFMeter from '@/components/market/PMFMeter'
import CompetitorTiles from '@/components/market/CompetitorTiles'
import DemandFunnel from '@/components/market/DemandFunnel'

type ICPProfile = {
  projectId: string
  persona: string
  jobTitle?: string
  company?: string
  pain?: string
  budget?: string
  decisionProcess?: string
  ts: number
}

type MarketScore = {
  projectId: string
  score: number
  components: {
    pmf: number
    demand: number
    traction: number
  }
  weights: {
    pmf: number
    demand: number
    traction: number
  }
  evidence: {
    pmfScore?: number
    loiCount: number
    waitlistCount: number
    landingCTR?: number
  }
  ts: number
}

type ICPForm = {
  persona: string
  jobTitle: string
  company: string
  pain: string
  budget: string
  decisionProcess: string
}

export default function MarketPage() {
  const params = useParams()
  const projectId = params.id as string
  const [marketScore, setMarketScore] = useState<MarketScore | null>(null)
  const [icpProfile, setIcpProfile] = useState<ICPProfile | null>(null)
  const [showICPForm, setShowICPForm] = useState(false)
  const [icpForm, setIcpForm] = useState<ICPForm>({
    persona: '', jobTitle: '', company: '', pain: '', budget: '', decisionProcess: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (projectId) {
      fetchMarketData()
    }
  }, [projectId])

  const fetchMarketData = async () => {
    try {
      const [scoreResponse, icpResponse] = await Promise.all([
        fetch(`/api/score/market?projectId=${encodeURIComponent(projectId)}`),
        fetch(`/api/market/icp?projectId=${encodeURIComponent(projectId)}`)
      ])

      if (scoreResponse.ok) {
        const scoreData = await scoreResponse.json()
        setMarketScore(scoreData)
      }

      if (icpResponse.ok) {
        const icpData = await icpResponse.json()
        if (icpData.profile) {
          setIcpProfile(icpData.profile)
        }
      }
    } catch (error) {
      console.error('Failed to fetch market data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateICP = async () => {
    if (!icpForm.persona.trim()) {
      alert('Persona is required')
      return
    }

    try {
      const response = await fetch('/api/market/icp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          ...icpForm
        })
      })

      if (response.ok) {
        await fetchMarketData()
        setShowICPForm(false)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update ICP')
      }
    } catch (error) {
      console.error('Failed to update ICP:', error)
      alert('Failed to update ICP')
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-800 rounded w-48"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-64 bg-slate-800 rounded"></div>
              <div className="h-64 bg-slate-800 rounded"></div>
              <div className="h-64 bg-slate-800 rounded"></div>
            </div>
            <div className="h-96 bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Market Validation</h1>
            <p className="text-slate-400">Track PMF signals, competitive landscape, and demand metrics</p>
          </div>
          
          {/* Market Score Badge */}
          {marketScore && (
            <div className="text-right">
              <div className={`text-3xl font-bold ${getScoreColor(marketScore.score)} mb-1`}>
                {marketScore.score}/100
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Market Score</div>
              <div className="w-32 bg-slate-800 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getScoreBackground(marketScore.score)}`}
                  style={{ width: `${marketScore.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Top Row: ICP, PMF, Market Score Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ICP Profile */}
          <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm uppercase tracking-wider text-slate-400">IDEAL CUSTOMER</div>
              <button
                onClick={() => setShowICPForm(!showICPForm)}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                {icpProfile ? '✏️ Edit' : '+ Define'}
              </button>
            </div>

            {!icpProfile && !showICPForm ? (
              <div className="text-center py-8 text-slate-400">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-sm">No ICP defined yet</div>
                <div className="text-xs mt-1">Define your ideal customer profile</div>
              </div>
            ) : showICPForm ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={icpForm.persona}
                  onChange={(e) => setIcpForm({ ...icpForm, persona: e.target.value })}
                  placeholder="Persona (e.g., SaaS Founder)"
                  className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
                <input
                  type="text"
                  value={icpForm.jobTitle}
                  onChange={(e) => setIcpForm({ ...icpForm, jobTitle: e.target.value })}
                  placeholder="Job Title (e.g., CEO, Product Manager)"
                  className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
                <input
                  type="text"
                  value={icpForm.company}
                  onChange={(e) => setIcpForm({ ...icpForm, company: e.target.value })}
                  placeholder="Company Size (e.g., 10-50 employees)"
                  className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
                <textarea
                  value={icpForm.pain}
                  onChange={(e) => setIcpForm({ ...icpForm, pain: e.target.value })}
                  placeholder="Main Pain Point"
                  rows={2}
                  className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
                />
                <input
                  type="text"
                  value={icpForm.budget}
                  onChange={(e) => setIcpForm({ ...icpForm, budget: e.target.value })}
                  placeholder="Budget Range (e.g., $100-500/month)"
                  className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
                <textarea
                  value={icpForm.decisionProcess}
                  onChange={(e) => setIcpForm({ ...icpForm, decisionProcess: e.target.value })}
                  placeholder="Decision Process"
                  rows={2}
                  className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={updateICP}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                  >
                    Save ICP
                  </button>
                  <button
                    onClick={() => setShowICPForm(false)}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : icpProfile ? (
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-400 mb-1">PERSONA</div>
                  <div className="text-sm text-white font-medium">{icpProfile.persona}</div>
                </div>
                {icpProfile.jobTitle && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">ROLE</div>
                    <div className="text-sm text-slate-300">{icpProfile.jobTitle}</div>
                  </div>
                )}
                {icpProfile.company && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">COMPANY</div>
                    <div className="text-sm text-slate-300">{icpProfile.company}</div>
                  </div>
                )}
                {icpProfile.pain && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">MAIN PAIN</div>
                    <div className="text-sm text-slate-300">{icpProfile.pain}</div>
                  </div>
                )}
                {icpProfile.budget && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">BUDGET</div>
                    <div className="text-sm text-slate-300">{icpProfile.budget}</div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* PMF Meter */}
          <PMFMeter projectId={projectId} />

          {/* Market Score Breakdown */}
          {marketScore && (
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm uppercase tracking-wider text-slate-400 mb-4">SCORE BREAKDOWN</div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">PMF Signal ({Math.round(marketScore.weights.pmf * 100)}%)</span>
                  <span className="text-sm font-medium text-white">{marketScore.components.pmf}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-violet-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${marketScore.components.pmf}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Demand ({Math.round(marketScore.weights.demand * 100)}%)</span>
                  <span className="text-sm font-medium text-white">{marketScore.components.demand}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${marketScore.components.demand}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Traction ({Math.round(marketScore.weights.traction * 100)}%)</span>
                  <span className="text-sm font-medium text-white">{marketScore.components.traction}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${marketScore.components.traction}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs text-slate-400">EVIDENCE</div>
                <div className="text-sm text-slate-300 mt-1">
                  {marketScore.evidence.pmfScore !== undefined && (
                    <div>PMF: {marketScore.evidence.pmfScore}%</div>
                  )}
                  <div>LOIs: {marketScore.evidence.loiCount}</div>
                  <div>Waitlist: {marketScore.evidence.waitlistCount}</div>
                  {marketScore.evidence.landingCTR !== undefined && (
                    <div>CTR: {marketScore.evidence.landingCTR.toFixed(1)}%</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demand Funnel */}
        <DemandFunnel projectId={projectId} />

        {/* Competitor Landscape */}
        <CompetitorTiles projectId={projectId} />
      </div>
    </div>
  )
}
