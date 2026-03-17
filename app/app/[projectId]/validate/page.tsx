'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import { IconChecklist, IconAI, IconCompetitors, IconUser, IconChart, IconTarget, IconTrend, IconClock, IconFire, IconCurrency, IconArrowUp, IconArrowDown, IconDownload, IconWarning, IconRocket } from '@/components/app/icons'

type Competitor = { id: string; name: string; url: string; pricing: string; strengths: string[]; weaknesses: string[]; market_share: string }
type ChecklistItem = { id: string; label: string; completed: boolean; sort_order: number }
type DemandSignal = { id: string; signal_type: string; email: string; company: string; created_at: string }
type ICP = { persona: string; job_title: string; company_type: string; pain_points: string; budget: string; decision_process: string }
type AIAnalysis = { marketAnalysis: { tam: string; growth: string; timing: string }; competitors: { name: string; strength: string; weakness: string }[]; icp: { persona: string; pain: string; budget: string }; risks: string[]; verdict: string; score: number; nextSteps: string[] }

function VerdictBadge({ verdict, score }: { verdict: string; score: number }) {
  const config: Record<string, { bg: string; ring: string; text: string; glow: string }> = {
    'promising': { bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
    'niche-viable': { bg: 'bg-sky-500/10', ring: 'ring-sky-500/30', text: 'text-sky-400', glow: 'shadow-sky-500/20' },
    'risky': { bg: 'bg-amber-500/10', ring: 'ring-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
    'oversaturated': { bg: 'bg-red-500/10', ring: 'ring-red-500/30', text: 'text-red-400', glow: 'shadow-red-500/20' },
  }
  const c = config[verdict] || config['risky']
  return (
    <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl ${c.bg} ring-1 ${c.ring} shadow-lg ${c.glow}`}>
      <span className={`text-3xl font-bold ${c.text}`}>{score}</span>
      <div>
        <div className={`text-sm font-semibold ${c.text} capitalize`}>{verdict.replace('-', ' ')}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">out of 100</div>
      </div>
    </div>
  )
}

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
  const [aiProvider, setAiProvider] = useState<string | null>(null)
  const [newComp, setNewComp] = useState({ name: '', url: '', pricing: '', strengths: '', weaknesses: '', market_share: 'emerging' })
  const [newDemand, setNewDemand] = useState({ signal_type: 'waitlist', email: '', company: '' })
  const [icpSaved, setIcpSaved] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    async function loadCachedAnalysis() {
      try {
        const res = await fetch(`/api/projects/${projectId}/ai-cache`)
        if (res.ok) {
          const data = await res.json()
          if (data && data.result) {
            setAiResult(data.result)
            setAiInput(data.input || '')
          }
        }
      } catch { /* no cache */ }
    }
    loadCachedAnalysis()
    fetchData()
  }, [fetchData, projectId])

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
      setAiProvider(data.provider || null)
    } catch { setAiError('Failed to run analysis') }
    finally { setAiLoading(false) }
  }

  function downloadPDF() {
    if (!aiResult) return
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.write(`<!DOCTYPE html><html><head><title>AI Analysis Report</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; padding: 48px; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 28px; margin-bottom: 4px; }
        h2 { font-size: 16px; margin: 28px 0 14px; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #ede9fe; padding-bottom: 8px; }
        p, li { font-size: 13px; line-height: 1.7; color: #475569; }
        .subtitle { font-size: 13px; color: #94a3b8; margin-bottom: 24px; }
        .badge { display: inline-block; padding: 10px 20px; border-radius: 16px; font-weight: 700; font-size: 22px; margin: 16px 0 8px; }
        .badge.promising { background: #d1fae5; color: #059669; }
        .badge.niche-viable { background: #dbeafe; color: #2563eb; }
        .badge.risky { background: #fef3c7; color: #d97706; }
        .badge.oversaturated { background: #fee2e2; color: #dc2626; }
        .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin: 12px 0; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0; }
        .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
        .card-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 8px; font-weight: 600; }
        .competitor { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 8px; }
        .competitor-name { font-weight: 600; font-size: 14px; margin-bottom: 6px; color: #1e293b; }
        .pro { color: #059669; font-size: 12px; margin-bottom: 2px; }
        .con { color: #dc2626; font-size: 12px; }
        .item { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; }
        .num { width: 22px; height: 22px; background: #7c3aed; color: white; border-radius: 50%; text-align: center; line-height: 22px; font-size: 11px; font-weight: 700; flex-shrink: 0; }
        .num-amber { background: #f59e0b; }
        .footer { margin-top: 40px; padding-top: 16px; border-top: 2px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
        @media print { body { padding: 24px; } }
      </style></head><body>
      <h1>Startup Idea Analysis</h1>
      <p class="subtitle">Generated by BuildAIStartups LaunchScore &middot; ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <div class="badge ${aiResult.verdict}">${aiResult.verdict.replace('-', ' ').toUpperCase()} &mdash; ${aiResult.score}/100</div>
      <h2>Market Analysis</h2>
      <div class="grid">
        <div class="card"><div class="card-label">Total Addressable Market</div><p>${aiResult.marketAnalysis.tam}</p></div>
        <div class="card"><div class="card-label">Growth Trajectory</div><p>${aiResult.marketAnalysis.growth}</p></div>
        <div class="card"><div class="card-label">Market Timing</div><p>${aiResult.marketAnalysis.timing}</p></div>
      </div>
      <h2>Competitive Landscape</h2>
      <div class="grid-2">${aiResult.competitors.map(c => `<div class="competitor"><div class="competitor-name">${c.name}</div><div class="pro">&#9650; ${c.strength}</div><div class="con">&#9660; ${c.weakness}</div></div>`).join('')}</div>
      <h2>Ideal Customer Profile</h2>
      <div class="grid">
        <div class="card"><div class="card-label">Persona</div><p>${aiResult.icp.persona}</p></div>
        <div class="card"><div class="card-label">Pain Point</div><p>${aiResult.icp.pain}</p></div>
        <div class="card"><div class="card-label">Budget</div><p>${aiResult.icp.budget}</p></div>
      </div>
      <h2>Key Risks</h2>
      ${aiResult.risks.map((r, i) => `<div class="item"><span class="num num-amber">${i + 1}</span><p>${r}</p></div>`).join('')}
      <h2>Recommended Next Steps</h2>
      ${aiResult.nextSteps.map((s, i) => `<div class="item"><span class="num">${i + 1}</span><p>${s}</p></div>`).join('')}
      <div class="footer">BuildAIStartups.com &middot; AI-powered startup validation</div>
      </body></html>`)
    printWindow.document.close()
    setTimeout(() => { printWindow.print() }, 500)
  }

  async function addCompetitor(e: React.FormEvent) {
    e.preventDefault()
    if (!newComp.name.trim()) return
    await fetch(`/api/projects/${projectId}/competitors`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newComp, strengths: newComp.strengths.split(',').map(s => s.trim()).filter(Boolean), weaknesses: newComp.weaknesses.split(',').map(s => s.trim()).filter(Boolean) }),
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
    await fetch(`/api/projects/${projectId}/icp`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(icp) })
    fetch(`/api/projects/${projectId}/score`)
    setIcpSaved(true)
    setTimeout(() => setIcpSaved(false), 2000)
  }

  async function addDemandSignal(e: React.FormEvent) {
    e.preventDefault()
    if (!newDemand.email.trim()) return
    await fetch(`/api/projects/${projectId}/demand`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newDemand) })
    setNewDemand({ signal_type: 'waitlist', email: '', company: '' })
    fetchData()
  }

  const completedCount = checklist.filter(i => i.completed).length
  const inputClasses = "form-input w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-1 bg-gray-100 dark:bg-gray-800/80 rounded-xl p-1">
        {[
          { key: 'checklist', label: `Checklist (${completedCount}/${checklist.length})`, Icon: IconChecklist },
          { key: 'ai', label: 'AI Analysis', Icon: IconAI },
          { key: 'competitors', label: `Competitors (${competitors.length})`, Icon: IconCompetitors },
          { key: 'icp', label: 'ICP Profile', Icon: IconUser },
          { key: 'demand', label: `Demand (${demand.length})`, Icon: IconChart },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition ${tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
            <t.Icon className={`w-4 h-4 ${tab === t.key ? 'text-violet-500' : ''}`} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ══════ CHECKLIST ══════ */}
      {tab === 'checklist' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Validation Checklist</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Complete these to validate your idea before building.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completedCount}<span className="text-gray-400 text-base font-normal">/{checklist.length}</span></div>
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-violet-500 rounded-full transition-all" style={{ width: checklist.length > 0 ? `${(completedCount / checklist.length) * 100}%` : '0%' }} />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {checklist.map(item => (
              <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition">
                <input type="checkbox" checked={item.completed} onChange={() => toggleChecklist(item.id, item.completed)}
                  className="form-checkbox rounded text-violet-500 w-5 h-5 border-gray-300 dark:border-gray-600" />
                <span className={`text-sm ${item.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>{item.label}</span>
              </label>
            ))}
          </div>
          {checklist.length === 0 && <p className="text-sm text-gray-400 py-4 text-center">Loading checklist...</p>}
        </div>
      )}

      {/* ══════ AI ANALYSIS ══════ */}
      {tab === 'ai' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <IconAI className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">AI Idea Analyzer</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Describe your idea in your own words, in any language.</p>
              </div>
            </div>
            <textarea value={aiInput} onChange={e => setAiInput(e.target.value)} rows={4}
              placeholder="Describe your startup idea here... Be specific about what it does, who it's for, and how it makes money."
              className="form-textarea w-full rounded-xl mb-3 text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500" />
            <div className="flex items-center gap-3">
              <button onClick={runAI} disabled={aiLoading || !aiInput.trim()}
                className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm disabled:opacity-50 rounded-xl px-6 py-2.5 shadow-sm shadow-violet-500/25">
                {aiLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Analyzing...
                  </span>
                ) : 'Analyze Idea'}
              </button>
              {aiResult && (
                <button onClick={downloadPDF} className="btn border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-500/50 text-sm rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <IconDownload className="w-4 h-4" /> Download PDF
                </button>
              )}
            </div>
            {aiError && <p className="text-sm text-red-500 mt-3 flex items-center gap-2"><IconWarning className="w-4 h-4" />{aiError}</p>}
          </div>

          {aiResult && (
            <div ref={reportRef} className="space-y-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Analysis Result</div>
                    <VerdictBadge verdict={aiResult.verdict} score={aiResult.score} />
                  </div>
                  {aiProvider && <div className="text-xs text-gray-400 dark:text-gray-500">Powered by {aiProvider === 'gemini' ? 'Google Gemini' : 'Groq Llama'}</div>}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Market Analysis
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { key: 'tam', label: 'Total Addressable Market', Icon: IconTarget },
                    { key: 'growth', label: 'Growth Trajectory', Icon: IconTrend },
                    { key: 'timing', label: 'Market Timing', Icon: IconClock },
                  ].map(item => (
                    <div key={item.key} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                      <div className="flex items-center gap-2 mb-2">
                        <item.Icon className="w-4 h-4 text-violet-500" />
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{aiResult.marketAnalysis[item.key as keyof typeof aiResult.marketAnalysis]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Competitive Landscape
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {aiResult.competitors.map((c, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                      <div className="font-semibold text-sm text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                        <IconCompetitors className="w-4 h-4 text-gray-400" /> {c.name}
                      </div>
                      <div className="flex items-start gap-2 mb-1.5">
                        <IconArrowUp className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{c.strength}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <IconArrowDown className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{c.weakness}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Ideal Customer Profile
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                    <div className="flex items-center gap-2 mb-2"><IconUser className="w-4 h-4 text-violet-500" /><span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Persona</span></div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{aiResult.icp.persona}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                    <div className="flex items-center gap-2 mb-2"><IconFire className="w-4 h-4 text-orange-500" /><span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Pain Point</span></div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{aiResult.icp.pain}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                    <div className="flex items-center gap-2 mb-2"><IconCurrency className="w-4 h-4 text-emerald-500" /><span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Budget</span></div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{aiResult.icp.budget}</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Key Risks
                  </h3>
                  <div className="space-y-3">
                    {aiResult.risks.map((r, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <IconWarning className="w-3 h-3 text-amber-500" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Next Steps
                  </h3>
                  <div className="space-y-3">
                    {aiResult.nextSteps.map((s, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-[10px] font-bold">{i + 1}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════ COMPETITORS ══════ */}
      {tab === 'competitors' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Competitors</h2>
          {competitors.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {competitors.map(c => (
                <div key={c.id} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-sm text-gray-800 dark:text-gray-100">{c.name}</div>
                    <button onClick={() => deleteCompetitor(c.id)} className="text-xs text-red-400 hover:text-red-500">✕</button>
                  </div>
                  {c.url && <div className="text-xs text-violet-500 dark:text-violet-400 mb-1">{c.url}</div>}
                  {c.pricing && <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Pricing: {c.pricing}</div>}
                  {c.strengths?.length > 0 && <div className="flex items-start gap-1.5 text-xs text-emerald-600 dark:text-emerald-400"><IconArrowUp className="w-3 h-3 mt-0.5 shrink-0" />{c.strengths.join(', ')}</div>}
                  {c.weaknesses?.length > 0 && <div className="flex items-start gap-1.5 text-xs text-red-500 dark:text-red-400 mt-0.5"><IconArrowDown className="w-3 h-3 mt-0.5 shrink-0" />{c.weaknesses.join(', ')}</div>}
                  <div className="text-xs text-gray-400 dark:text-gray-500 capitalize mt-2 inline-block px-2 py-0.5 bg-gray-200/50 dark:bg-gray-600/30 rounded">{c.market_share}</div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={addCompetitor} className="space-y-3 border-t border-gray-200 dark:border-gray-700/60 pt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add competitor</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={newComp.name} onChange={e => setNewComp(p => ({ ...p, name: e.target.value }))} placeholder="Name *" required className={inputClasses} />
              <input value={newComp.url} onChange={e => setNewComp(p => ({ ...p, url: e.target.value }))} placeholder="URL" className={inputClasses} />
              <input value={newComp.pricing} onChange={e => setNewComp(p => ({ ...p, pricing: e.target.value }))} placeholder="Pricing" className={inputClasses} />
              <select value={newComp.market_share} onChange={e => setNewComp(p => ({ ...p, market_share: e.target.value }))} className={inputClasses.replace('form-input', 'form-select')}>
                <option value="emerging">Emerging</option><option value="niche">Niche</option><option value="significant">Significant</option><option value="dominant">Dominant</option>
              </select>
            </div>
            <input value={newComp.strengths} onChange={e => setNewComp(p => ({ ...p, strengths: e.target.value }))} placeholder="Strengths (comma separated)" className={inputClasses} />
            <input value={newComp.weaknesses} onChange={e => setNewComp(p => ({ ...p, weaknesses: e.target.value }))} placeholder="Weaknesses (comma separated)" className={inputClasses} />
            <button type="submit" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl px-5 py-2.5">Add Competitor</button>
          </form>
        </div>
      )}

      {/* ══════ ICP ══════ */}
      {tab === 'icp' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Ideal Customer Profile</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Define who would pay for your product.</p>
          <form onSubmit={saveICP} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Persona *</label><input value={icp.persona} onChange={e => setIcp(p => ({ ...p, persona: e.target.value }))} required placeholder="e.g., Solo indie maker building SaaS" className={inputClasses} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label><input value={icp.job_title} onChange={e => setIcp(p => ({ ...p, job_title: e.target.value }))} placeholder="e.g., Founder, CTO" className={inputClasses} /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Type</label><input value={icp.company_type} onChange={e => setIcp(p => ({ ...p, company_type: e.target.value }))} placeholder="e.g., Solo, 2-5 person team" className={inputClasses} /></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pain Points</label><textarea value={icp.pain_points} onChange={e => setIcp(p => ({ ...p, pain_points: e.target.value }))} rows={3} placeholder="What problems do they face?" className={inputClasses.replace('form-input', 'form-textarea')} /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget</label><input value={icp.budget} onChange={e => setIcp(p => ({ ...p, budget: e.target.value }))} placeholder="e.g., 20-50 per month" className={inputClasses} /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Decision Process</label><input value={icp.decision_process} onChange={e => setIcp(p => ({ ...p, decision_process: e.target.value }))} placeholder="e.g., Single decision maker" className={inputClasses} /></div>
            </div>
            <button type="submit" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl px-5 py-2.5">{icpSaved ? '✓ Saved!' : 'Save ICP Profile'}</button>
          </form>
        </div>
      )}

      {/* ══════ DEMAND ══════ */}
      {tab === 'demand' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Demand Signals</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Track evidence of demand: waitlist signups, LOIs, preorders.</p>
          {demand.length > 0 && (
            <div className="space-y-2 mb-6">
              {demand.map(d => (
                <div key={d.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/40 rounded-xl p-3 text-sm border border-gray-100 dark:border-gray-700/30">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-lg capitalize ${d.signal_type === 'preorder' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : d.signal_type === 'loi' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-600/30 dark:text-gray-300'}`}>{d.signal_type}</span>
                    <span className="text-gray-700 dark:text-gray-300">{d.email}</span>
                    {d.company && <span className="text-gray-400 dark:text-gray-500">({d.company})</span>}
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(d.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={addDemandSignal} className="space-y-3 border-t border-gray-200 dark:border-gray-700/60 pt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add signal</div>
            <div className="grid sm:grid-cols-3 gap-3">
              <select value={newDemand.signal_type} onChange={e => setNewDemand(p => ({ ...p, signal_type: e.target.value }))} className={inputClasses.replace('form-input', 'form-select')}>
                <option value="waitlist">Waitlist</option><option value="loi">Letter of Intent</option><option value="preorder">Preorder</option><option value="survey">Survey Response</option>
              </select>
              <input value={newDemand.email} onChange={e => setNewDemand(p => ({ ...p, email: e.target.value }))} placeholder="Email *" required className={inputClasses} />
              <input value={newDemand.company} onChange={e => setNewDemand(p => ({ ...p, company: e.target.value }))} placeholder="Company" className={inputClasses} />
            </div>
            <button type="submit" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl px-5 py-2.5">Add Signal</button>
          </form>
        </div>
      )}
    </div>
  )
}
