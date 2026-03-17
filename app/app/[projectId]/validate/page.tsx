'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'

type Competitor = { id: string; name: string; url: string; pricing: string; strengths: string[]; weaknesses: string[]; market_share: string }
type ChecklistItem = { id: string; label: string; completed: boolean; sort_order: number }
type DemandSignal = { id: string; signal_type: string; email: string; company: string; created_at: string }
type ICP = { persona: string; job_title: string; company_type: string; pain_points: string; budget: string; decision_process: string }
type AIAnalysis = { marketAnalysis: { tam: string; growth: string; timing: string }; competitors: { name: string; strength: string; weakness: string }[]; icp: { persona: string; pain: string; budget: string }; risks: string[]; verdict: string; score: number; nextSteps: string[] }

export default function ValidatePage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [tab, setTab] = useState<'checklist' | 'ai' | 'competitors' | 'icp' | 'demand'>('checklist')
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [icp, setIcp] = useState<ICP>({ persona: '', job_title: '', company_type: '', pain_points: '', budget: '', decision_process: '' })
  const [demand, setDemand] = useState<DemandSignal[]>([])
  const [aiResult, setAiResult] = useState<AIAnalysis | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiInput, setAiInput] = useState('')
  const [aiError, setAiError] = useState<string | null>(null)
  const [newComp, setNewComp] = useState({ name: '', url: '', pricing: '', strengths: '', weaknesses: '', market_share: 'emerging' })
  const [newDemand, setNewDemand] = useState({ signal_type: 'waitlist', email: '', company: '' })

  const fetchData = useCallback(async () => {
    const [cl, co, ic, de] = await Promise.all([
      fetch(`/api/projects/${projectId}/checklist?stage=validate`).then(r => r.json()),
      fetch(`/api/projects/${projectId}/competitors`).then(r => r.json()),
      fetch(`/api/projects/${projectId}/icp`).then(r => r.json()),
      fetch(`/api/projects/${projectId}/demand`).then(r => r.json()),
    ])
    if (Array.isArray(cl)) setChecklist(cl)
    if (Array.isArray(co)) setCompetitors(co)
    if (ic && ic.persona) setIcp(ic)
    if (Array.isArray(de)) setDemand(de)
  }, [projectId])

  useEffect(() => { fetchData() }, [fetchData])

  async function toggleChecklist(id: string, completed: boolean) {
    await fetch(`/api/projects/${projectId}/checklist`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: !completed }),
    })
    setChecklist(prev => prev.map(i => i.id === id ? { ...i, completed: !completed } : i))
    fetch(`/api/projects/${projectId}/score`)
  }

  async function runAI() {
    if (!aiInput.trim()) return
    setAiLoading(true); setAiError(null)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'analyze-idea', input: aiInput, projectId }),
      })
      const data = await res.json()
      if (!res.ok) { setAiError(data.error); return }
      setAiResult(data.result)
    } catch { setAiError('Failed to run analysis') }
    finally { setAiLoading(false) }
  }

  async function addCompetitor(e: React.FormEvent) {
    e.preventDefault()
    if (!newComp.name.trim()) return
    await fetch(`/api/projects/${projectId}/competitors`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newComp,
        strengths: newComp.strengths.split(',').map(s => s.trim()).filter(Boolean),
        weaknesses: newComp.weaknesses.split(',').map(s => s.trim()).filter(Boolean),
      }),
    })
    setNewComp({ name: '', url: '', pricing: '', strengths: '', weaknesses: '', market_share: 'emerging' })
    fetchData()
  }

  async function deleteCompetitor(id: string) {
    await fetch(`/api/projects/${projectId}/competitors?competitorId=${id}`, { method: 'DELETE' })
    setCompetitors(prev => prev.filter(c => c.id !== id))
  }

  async function saveICP(e: React.FormEvent) {
    e.preventDefault()
    await fetch(`/api/projects/${projectId}/icp`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(icp),
    })
    fetch(`/api/projects/${projectId}/score`)
  }

  async function addDemandSignal(e: React.FormEvent) {
    e.preventDefault()
    if (!newDemand.email.trim()) return
    await fetch(`/api/projects/${projectId}/demand`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDemand),
    })
    setNewDemand({ signal_type: 'waitlist', email: '', company: '' })
    fetchData()
  }

  const completedCount = checklist.filter(i => i.completed).length

  const tabs = [
    { key: 'checklist', label: `Checklist (${completedCount}/${checklist.length})` },
    { key: 'ai', label: 'AI Analysis' },
    { key: 'competitors', label: `Competitors (${competitors.length})` },
    { key: 'icp', label: 'ICP Profile' },
    { key: 'demand', label: `Demand (${demand.length})` },
  ]

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition ${tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Checklist */}
      {tab === 'checklist' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Validation Checklist</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Complete these to validate your idea before building.</p>
          <div className="space-y-2">
            {checklist.map(item => (
              <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer">
                <input type="checkbox" checked={item.completed} onChange={() => toggleChecklist(item.id, item.completed)}
                  className="form-checkbox rounded text-violet-500 w-5 h-5" />
                <span className={`text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>{item.label}</span>
              </label>
            ))}
          </div>
          {checklist.length === 0 && <p className="text-sm text-gray-400">Loading checklist...</p>}
        </div>
      )}

      {/* AI Analysis */}
      {tab === 'ai' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">AI Idea Analyzer</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Describe your idea in your own words, in any language. AI gives you an honest market analysis.</p>
            <textarea value={aiInput} onChange={e => setAiInput(e.target.value)} rows={4} placeholder="Describe your startup idea here..."
              className="form-textarea w-full rounded-lg mb-3 text-sm" />
            <button onClick={runAI} disabled={aiLoading || !aiInput.trim()}
              className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm disabled:opacity-50">
              {aiLoading ? 'Analyzing... (15-30s)' : 'Analyze Idea'}
            </button>
            {aiError && <p className="text-sm text-red-500 mt-2">{aiError}</p>}
          </div>

          {aiResult && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Analysis Result</h3>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  aiResult.verdict === 'promising' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                  aiResult.verdict === 'niche-viable' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                  aiResult.verdict === 'risky' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                }`}>{aiResult.verdict} — {aiResult.score}/100</span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Market Analysis</h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {Object.entries(aiResult.marketAnalysis).map(([k, v]) => (
                    <div key={k} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                      <div className="text-xs text-gray-500 uppercase mb-1">{k}</div>
                      <div className="text-sm text-gray-800 dark:text-gray-200">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Competitors Found</h4>
                <div className="space-y-2">
                  {aiResult.competitors.map((c, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 text-sm">
                      <div className="font-medium text-gray-800 dark:text-gray-200">{c.name}</div>
                      <div className="text-green-600 dark:text-green-400">+ {c.strength}</div>
                      <div className="text-red-600 dark:text-red-400">- {c.weakness}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ideal Customer</h4>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 text-sm space-y-1">
                  <div><strong>Persona:</strong> {aiResult.icp.persona}</div>
                  <div><strong>Pain:</strong> {aiResult.icp.pain}</div>
                  <div><strong>Budget:</strong> {aiResult.icp.budget}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risks</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {aiResult.risks.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Next Steps</h4>
                <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {aiResult.nextSteps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Competitors */}
      {tab === 'competitors' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Competitors</h2>
          {competitors.length > 0 && (
            <div className="space-y-3 mb-6">
              {competitors.map(c => (
                <div key={c.id} className="flex items-start justify-between bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <div>
                    <div className="font-medium text-sm text-gray-800 dark:text-gray-200">{c.name}</div>
                    {c.url && <div className="text-xs text-gray-500 mt-0.5">{c.url}</div>}
                    {c.pricing && <div className="text-xs text-gray-500 mt-0.5">Pricing: {c.pricing}</div>}
                    {c.strengths?.length > 0 && <div className="text-xs text-green-600 mt-1">+ {c.strengths.join(', ')}</div>}
                    {c.weaknesses?.length > 0 && <div className="text-xs text-red-600 mt-0.5">- {c.weaknesses.join(', ')}</div>}
                    <div className="text-xs text-gray-400 capitalize mt-1">{c.market_share}</div>
                  </div>
                  <button onClick={() => deleteCompetitor(c.id)} className="text-xs text-red-500 hover:text-red-600 shrink-0">Remove</button>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={addCompetitor} className="space-y-3 border-t border-gray-200 dark:border-gray-700/60 pt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add competitor</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={newComp.name} onChange={e => setNewComp(p => ({ ...p, name: e.target.value }))} placeholder="Name *" required className="form-input rounded-lg text-sm" />
              <input value={newComp.url} onChange={e => setNewComp(p => ({ ...p, url: e.target.value }))} placeholder="URL" className="form-input rounded-lg text-sm" />
              <input value={newComp.pricing} onChange={e => setNewComp(p => ({ ...p, pricing: e.target.value }))} placeholder="Pricing" className="form-input rounded-lg text-sm" />
              <select value={newComp.market_share} onChange={e => setNewComp(p => ({ ...p, market_share: e.target.value }))} className="form-select rounded-lg text-sm">
                <option value="emerging">Emerging</option>
                <option value="niche">Niche</option>
                <option value="significant">Significant</option>
                <option value="dominant">Dominant</option>
              </select>
            </div>
            <input value={newComp.strengths} onChange={e => setNewComp(p => ({ ...p, strengths: e.target.value }))} placeholder="Strengths (comma separated)" className="form-input w-full rounded-lg text-sm" />
            <input value={newComp.weaknesses} onChange={e => setNewComp(p => ({ ...p, weaknesses: e.target.value }))} placeholder="Weaknesses (comma separated)" className="form-input w-full rounded-lg text-sm" />
            <button type="submit" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm">Add Competitor</button>
          </form>
        </div>
      )}

      {/* ICP */}
      {tab === 'icp' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Ideal Customer Profile</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Define who would pay for your product.</p>
          <form onSubmit={saveICP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Persona *</label>
              <input value={icp.persona} onChange={e => setIcp(p => ({ ...p, persona: e.target.value }))} required placeholder="e.g., Solo indie maker building SaaS" className="form-input w-full rounded-lg text-sm" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                <input value={icp.job_title} onChange={e => setIcp(p => ({ ...p, job_title: e.target.value }))} placeholder="e.g., Founder, CTO" className="form-input w-full rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Type</label>
                <input value={icp.company_type} onChange={e => setIcp(p => ({ ...p, company_type: e.target.value }))} placeholder="e.g., Solo, 2-5 person team" className="form-input w-full rounded-lg text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pain Points</label>
              <textarea value={icp.pain_points} onChange={e => setIcp(p => ({ ...p, pain_points: e.target.value }))} rows={3} placeholder="What problems do they face?" className="form-textarea w-full rounded-lg text-sm" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget</label>
                <input value={icp.budget} onChange={e => setIcp(p => ({ ...p, budget: e.target.value }))} placeholder="e.g., 20-50 per month" className="form-input w-full rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Decision Process</label>
                <input value={icp.decision_process} onChange={e => setIcp(p => ({ ...p, decision_process: e.target.value }))} placeholder="e.g., Single decision maker" className="form-input w-full rounded-lg text-sm" />
              </div>
            </div>
            <button type="submit" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm">Save ICP Profile</button>
          </form>
        </div>
      )}

      {/* Demand Signals */}
      {tab === 'demand' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Demand Signals</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Track evidence of demand: waitlist signups, LOIs, preorders.</p>
          {demand.length > 0 && (
            <div className="space-y-2 mb-6">
              {demand.map(d => (
                <div key={d.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 text-sm">
                  <div>
                    <span className="capitalize font-medium text-gray-800 dark:text-gray-200">{d.signal_type}</span>
                    <span className="text-gray-500 ml-2">{d.email}</span>
                    {d.company && <span className="text-gray-400 ml-2">({d.company})</span>}
                  </div>
                  <span className="text-xs text-gray-400">{new Date(d.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={addDemandSignal} className="space-y-3 border-t border-gray-200 dark:border-gray-700/60 pt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add signal</div>
            <div className="grid sm:grid-cols-3 gap-3">
              <select value={newDemand.signal_type} onChange={e => setNewDemand(p => ({ ...p, signal_type: e.target.value }))} className="form-select rounded-lg text-sm">
                <option value="waitlist">Waitlist</option>
                <option value="loi">Letter of Intent</option>
                <option value="preorder">Preorder</option>
                <option value="survey">Survey Response</option>
              </select>
              <input value={newDemand.email} onChange={e => setNewDemand(p => ({ ...p, email: e.target.value }))} placeholder="Email *" required className="form-input rounded-lg text-sm" />
              <input value={newDemand.company} onChange={e => setNewDemand(p => ({ ...p, company: e.target.value }))} placeholder="Company" className="form-input rounded-lg text-sm" />
            </div>
            <button type="submit" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm">Add Signal</button>
          </form>
        </div>
      )}
    </div>
  )
}
