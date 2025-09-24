'use client'

import { useEffect, useState } from 'react'

type Competitor = {
  id: string
  name: string
  url?: string
  description?: string
  pricing?: string
  strengths?: string[]
  weaknesses?: string[]
  marketShare?: string
  funding?: string
  employees?: string
  category: 'direct' | 'indirect' | 'substitute'
  threat: 'high' | 'medium' | 'low'
  ts: number
}

type CompetitorTilesProps = {
  projectId: string
}

type NewCompetitorForm = {
  name: string
  url: string
  description: string
  pricing: string
  strengths: string
  weaknesses: string
  marketShare: string
  funding: string
  employees: string
  category: 'direct' | 'indirect' | 'substitute'
  threat: 'high' | 'medium' | 'low'
}

export default function CompetitorTiles({ projectId }: CompetitorTilesProps) {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCompetitor, setNewCompetitor] = useState<NewCompetitorForm>({
    name: '',
    url: '',
    description: '',
    pricing: '',
    strengths: '',
    weaknesses: '',
    marketShare: '',
    funding: '',
    employees: '',
    category: 'direct',
    threat: 'medium'
  })

  useEffect(() => {
    if (projectId) {
      fetchCompetitors()
    }
  }, [projectId])

  const fetchCompetitors = async () => {
    try {
      const response = await fetch(`/api/market/competitors?projectId=${encodeURIComponent(projectId)}`)
      if (response.ok) {
        const data = await response.json()
        setCompetitors(data.competitors || [])
      }
    } catch (error) {
      console.error('Failed to fetch competitors:', error)
    } finally {
      setLoading(false)
    }
  }

  const addCompetitor = async () => {
    if (!newCompetitor.name.trim()) {
      alert('Competitor name is required')
      return
    }

    try {
      const response = await fetch('/api/market/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          ...newCompetitor,
          strengths: newCompetitor.strengths.split(',').map(s => s.trim()).filter(Boolean),
          weaknesses: newCompetitor.weaknesses.split(',').map(s => s.trim()).filter(Boolean)
        })
      })

      if (response.ok) {
        await fetchCompetitors()
        setShowAddForm(false)
        setNewCompetitor({
          name: '', url: '', description: '', pricing: '', strengths: '', weaknesses: '',
          marketShare: '', funding: '', employees: '', category: 'direct', threat: 'medium'
        })
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add competitor')
      }
    } catch (error) {
      console.error('Failed to add competitor:', error)
      alert('Failed to add competitor')
    }
  }

  const deleteCompetitor = async (competitorId: string) => {
    if (!confirm('Are you sure you want to delete this competitor?')) return

    try {
      const response = await fetch(`/api/market/competitors?id=${competitorId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchCompetitors()
      } else {
        alert('Failed to delete competitor')
      }
    } catch (error) {
      console.error('Failed to delete competitor:', error)
      alert('Failed to delete competitor')
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'direct': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'indirect': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'substitute': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-slate-400'
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-800 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/40 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">Competitive Landscape</h2>
          <p className="text-sm text-slate-400">Track direct and indirect competitors</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded transition-colors"
        >
          {showAddForm ? 'Cancel' : '+ Add Competitor'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 rounded-lg border border-white/10 bg-slate-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newCompetitor.name}
              onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
              placeholder="Competitor Name *"
              className="bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
            <input
              type="url"
              value={newCompetitor.url}
              onChange={(e) => setNewCompetitor({ ...newCompetitor, url: e.target.value })}
              placeholder="Website URL"
              className="bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
            <textarea
              value={newCompetitor.description}
              onChange={(e) => setNewCompetitor({ ...newCompetitor, description: e.target.value })}
              placeholder="Description"
              rows={2}
              className="bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
            />
            <input
              type="text"
              value={newCompetitor.pricing}
              onChange={(e) => setNewCompetitor({ ...newCompetitor, pricing: e.target.value })}
              placeholder="Pricing (e.g., $99/month)"
              className="bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
            <input
              type="text"
              value={newCompetitor.strengths}
              onChange={(e) => setNewCompetitor({ ...newCompetitor, strengths: e.target.value })}
              placeholder="Strengths (comma-separated)"
              className="bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
            <input
              type="text"
              value={newCompetitor.weaknesses}
              onChange={(e) => setNewCompetitor({ ...newCompetitor, weaknesses: e.target.value })}
              placeholder="Weaknesses (comma-separated)"
              className="bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
            <select
              value={newCompetitor.category}
              onChange={(e) => setNewCompetitor({ ...newCompetitor, category: e.target.value as NewCompetitorForm['category'] })}
              className="bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="direct">Direct Competitor</option>
              <option value="indirect">Indirect Competitor</option>
              <option value="substitute">Substitute</option>
            </select>
            <select
              value={newCompetitor.threat}
              onChange={(e) => setNewCompetitor({ ...newCompetitor, threat: e.target.value as NewCompetitorForm['threat'] })}
              className="bg-slate-800 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="low">Low Threat</option>
              <option value="medium">Medium Threat</option>
              <option value="high">High Threat</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={addCompetitor}
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
            >
              Add Competitor
            </button>
          </div>
        </div>
      )}

      {competitors.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <div className="text-4xl mb-2">🏢</div>
          <div className="text-sm">No competitors tracked yet</div>
          <div className="text-xs mt-1">Add competitors to analyze the competitive landscape</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitors.map((competitor) => (
            <div key={competitor.id} className="rounded-lg border border-white/10 bg-slate-800/50 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white text-sm">{competitor.name}</h3>
                    {competitor.url && (
                      <a
                        href={competitor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:text-violet-300 text-xs"
                      >
                        🔗
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getCategoryColor(competitor.category)}`}>
                      {competitor.category}
                    </span>
                    <span className={`text-xs font-medium ${getThreatColor(competitor.threat)}`}>
                      {competitor.threat} threat
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteCompetitor(competitor.id)}
                  className="text-slate-400 hover:text-red-400 text-xs transition-colors"
                >
                  ✕
                </button>
              </div>

              {competitor.description && (
                <p className="text-xs text-slate-300 mb-3 line-clamp-2">{competitor.description}</p>
              )}

              <div className="space-y-2">
                {competitor.pricing && (
                  <div>
                    <span className="text-xs text-slate-400">Pricing: </span>
                    <span className="text-xs text-slate-300">{competitor.pricing}</span>
                  </div>
                )}

                {competitor.strengths && competitor.strengths.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Strengths:</div>
                    <div className="flex flex-wrap gap-1">
                      {competitor.strengths.slice(0, 3).map((strength, idx) => (
                        <span key={idx} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {competitor.weaknesses && competitor.weaknesses.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Weaknesses:</div>
                    <div className="flex flex-wrap gap-1">
                      {competitor.weaknesses.slice(0, 3).map((weakness, idx) => (
                        <span key={idx} className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                          {weakness}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
