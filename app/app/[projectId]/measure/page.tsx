'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { IconCurrency, IconChart, IconMeasure, IconChecklist } from '@/components/app/icons'

type RevenueEntry = { id: string; month: string; mrr: number; customers: number; churn_count: number; expenses: number; notes: string }
type EvidenceEntry = { id: string; evidence_type: string; category: string; title: string; description: string; source: string; logged_at: string }

export default function MeasurePage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [tab, setTab] = useState<'revenue' | 'pmf' | 'evidence'>('revenue')
  const [revenue, setRevenue] = useState<RevenueEntry[]>([])
  const [evidence, setEvidence] = useState<EvidenceEntry[]>([])
  const [pmfScore, setPmfScore] = useState<number | null>(null)
  const [pmfTotal, setPmfTotal] = useState(0)
  const [pmfDisappointed, setPmfDisappointed] = useState(0)
  const [newRev, setNewRev] = useState({ month: new Date().toISOString().slice(0, 7), mrr: '', customers: '', churn_count: '', expenses: '', notes: '' })
  const [newEvidence, setNewEvidence] = useState({ evidence_type: 'positive', category: 'customer', title: '', description: '', source: '' })

  const inputClasses = "form-input w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"

  const fetchData = useCallback(async () => {
    const [rev, evi, proj] = await Promise.all([
      fetch(`/api/projects/${projectId}/revenue`).then(r => r.json()),
      fetch(`/api/projects/${projectId}/evidence`).then(r => r.json()),
      fetch(`/api/projects/${projectId}`).then(r => r.json()),
    ])
    if (Array.isArray(rev)) setRevenue(rev)
    if (Array.isArray(evi)) setEvidence(evi)
    if (proj?.pmf_score !== undefined && proj?.pmf_score !== null) setPmfScore(proj.pmf_score)
  }, [projectId])

  useEffect(() => { fetchData() }, [fetchData])

  async function addRevenue(e: React.FormEvent) {
    e.preventDefault()
    await fetch(`/api/projects/${projectId}/revenue`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newRev, mrr: parseFloat(newRev.mrr) || 0, customers: parseInt(newRev.customers) || 0, churn_count: parseInt(newRev.churn_count) || 0, expenses: parseFloat(newRev.expenses) || 0 }),
    })
    setNewRev({ month: new Date().toISOString().slice(0, 7), mrr: '', customers: '', churn_count: '', expenses: '', notes: '' })
    fetchData()
    fetch(`/api/projects/${projectId}/score`)
  }

  async function deleteRevenue(id: string) {
    await fetch(`/api/projects/${projectId}/revenue?entryId=${id}`, { method: 'DELETE' })
    setRevenue(prev => prev.filter(r => r.id !== id))
  }

  async function savePMF() {
    if (pmfTotal <= 0) return
    const score = Math.round((pmfDisappointed / pmfTotal) * 100)
    await fetch(`/api/projects/${projectId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pmf_score: score }),
    })
    setPmfScore(score)
    fetch(`/api/projects/${projectId}/score`)
  }

  async function addEvidence(e: React.FormEvent) {
    e.preventDefault()
    if (!newEvidence.title.trim()) return
    await fetch(`/api/projects/${projectId}/evidence`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvidence),
    })
    setNewEvidence({ evidence_type: 'positive', category: 'customer', title: '', description: '', source: '' })
    fetchData()
  }

  async function deleteEvidence(id: string) {
    await fetch(`/api/projects/${projectId}/evidence?entryId=${id}`, { method: 'DELETE' })
    setEvidence(prev => prev.filter(e => e.id !== id))
  }

  const latestMRR = revenue.length > 0 ? revenue[0].mrr : 0
  const latestCustomers = revenue.length > 0 ? revenue[0].customers : 0
  const latestExpenses = revenue.length > 0 ? revenue[0].expenses : 0
  const runway = latestExpenses > 0 && latestMRR < latestExpenses ? Math.round(((latestMRR * 3) / latestExpenses) * 10) / 10 : null

  const evidenceTypeColor: Record<string, string> = {
    positive: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    negative: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    neutral: 'bg-gray-100 text-gray-600 dark:bg-gray-600/30 dark:text-gray-300',
  }

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto no-scrollbar gap-1 bg-gray-100 dark:bg-gray-800/80 rounded-xl p-1">
        {[
          { key: 'revenue', label: 'Revenue & Runway', Icon: IconCurrency },
          { key: 'pmf', label: `PMF Score${pmfScore !== null ? ` (${pmfScore}%)` : ''}`, Icon: IconChart },
          { key: 'evidence', label: `Evidence (${evidence.length})`, Icon: IconChecklist },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition ${tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
            <t.Icon className={`w-4 h-4 ${tab === t.key ? 'text-violet-500' : ''}`} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Revenue & Runway */}
      {tab === 'revenue' && (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">MRR</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">&euro;{latestMRR.toLocaleString()}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Customers</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{latestCustomers}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Expenses</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">&euro;{latestExpenses.toLocaleString()}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Runway</div>
              <div className={`text-2xl font-bold ${runway !== null && runway < 6 ? 'text-red-500' : 'text-gray-800 dark:text-gray-100'}`}>
                {runway !== null ? `${runway} mo` : '∞'}
              </div>
            </div>
          </div>

          {/* Revenue table */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Monthly Revenue</h2>
            {revenue.length > 0 && (
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700/60">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Month</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">MRR</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Customers</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Churn</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Expenses</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Profit</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenue.map(r => (
                      <tr key={r.id} className="border-b border-gray-100 dark:border-gray-700/30">
                        <td className="py-2 px-3 text-gray-800 dark:text-gray-200 font-medium">{r.month}</td>
                        <td className="py-2 px-3 text-right text-gray-700 dark:text-gray-300">&euro;{Number(r.mrr).toLocaleString()}</td>
                        <td className="py-2 px-3 text-right text-gray-700 dark:text-gray-300">{r.customers}</td>
                        <td className="py-2 px-3 text-right text-gray-700 dark:text-gray-300">{r.churn_count}</td>
                        <td className="py-2 px-3 text-right text-gray-700 dark:text-gray-300">&euro;{Number(r.expenses).toLocaleString()}</td>
                        <td className={`py-2 px-3 text-right font-medium ${Number(r.mrr) - Number(r.expenses) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                          &euro;{(Number(r.mrr) - Number(r.expenses)).toLocaleString()}
                        </td>
                        <td className="py-2 px-1"><button onClick={() => deleteRevenue(r.id)} className="text-xs text-red-400 hover:text-red-500">✕</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <form onSubmit={addRevenue} className="space-y-3 border-t border-gray-200 dark:border-gray-700/60 pt-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add month</div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input type="month" value={newRev.month} onChange={e => setNewRev(p => ({ ...p, month: e.target.value }))} className={inputClasses} />
                <input value={newRev.mrr} onChange={e => setNewRev(p => ({ ...p, mrr: e.target.value }))} placeholder="MRR (€)" type="number" step="0.01" className={inputClasses} />
                <input value={newRev.customers} onChange={e => setNewRev(p => ({ ...p, customers: e.target.value }))} placeholder="Customers" type="number" className={inputClasses} />
                <input value={newRev.churn_count} onChange={e => setNewRev(p => ({ ...p, churn_count: e.target.value }))} placeholder="Churned" type="number" className={inputClasses} />
                <input value={newRev.expenses} onChange={e => setNewRev(p => ({ ...p, expenses: e.target.value }))} placeholder="Expenses (€)" type="number" step="0.01" className={inputClasses} />
                <input value={newRev.notes} onChange={e => setNewRev(p => ({ ...p, notes: e.target.value }))} placeholder="Notes" className={inputClasses} />
              </div>
              <button type="submit" className="btn bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-xl px-5 py-2.5">Add Entry</button>
            </form>
          </div>
        </div>
      )}

      {/* PMF Score */}
      {tab === 'pmf' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><IconChart className="w-5 h-5 text-amber-500" /></div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Product-Market Fit Score</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">The Sean Ellis test: "How would you feel if you could no longer use this product?"</p>
            </div>
          </div>

          {pmfScore !== null && (
            <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/30">
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`text-4xl font-bold ${pmfScore >= 40 ? 'text-emerald-500' : pmfScore >= 25 ? 'text-amber-500' : 'text-red-500'}`}>{pmfScore}%</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">would be "very disappointed"</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${pmfScore >= 40 ? 'bg-emerald-500' : pmfScore >= 25 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pmfScore}%` }} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {pmfScore >= 40 ? 'Strong PMF signal! 40%+ is the benchmark.' : pmfScore >= 25 ? 'Getting closer. Keep iterating on the core value proposition.' : 'Not yet PMF. Focus on finding users who desperately need your product.'}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ask your users: "How would you feel if you could no longer use [product]?" with options: Very disappointed, Somewhat disappointed, Not disappointed.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total survey responses</label>
                <input type="number" value={pmfTotal || ''} onChange={e => setPmfTotal(parseInt(e.target.value) || 0)} placeholder="e.g., 50" className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">"Very disappointed" responses</label>
                <input type="number" value={pmfDisappointed || ''} onChange={e => setPmfDisappointed(parseInt(e.target.value) || 0)} placeholder="e.g., 22" className={inputClasses} />
              </div>
            </div>
            <button onClick={savePMF} disabled={pmfTotal <= 0}
              className="btn bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-xl px-5 py-2.5 disabled:opacity-50">
              Calculate PMF Score
            </button>
          </div>
        </div>
      )}

      {/* Evidence Ledger */}
      {tab === 'evidence' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Evidence Ledger</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Log evidence for and against your startup's progress. Build a decision trail.</p>

          {evidence.length > 0 && (
            <div className="space-y-2 mb-6">
              {evidence.map(e => (
                <div key={e.id} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-lg capitalize ${evidenceTypeColor[e.evidence_type]}`}>{e.evidence_type}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 capitalize">{e.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(e.logged_at).toLocaleDateString()}</span>
                      <button onClick={() => deleteEvidence(e.id)} className="text-xs text-red-400 hover:text-red-500">✕</button>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100">{e.title}</h4>
                  {e.description && <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{e.description}</p>}
                  {e.source && <p className="text-xs text-violet-500 mt-1">{e.source}</p>}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={addEvidence} className="space-y-3 border-t border-gray-200 dark:border-gray-700/60 pt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Log evidence</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <select value={newEvidence.evidence_type} onChange={e => setNewEvidence(p => ({ ...p, evidence_type: e.target.value }))} className={inputClasses.replace('form-input', 'form-select')}>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
              </select>
              <select value={newEvidence.category} onChange={e => setNewEvidence(p => ({ ...p, category: e.target.value }))} className={inputClasses.replace('form-input', 'form-select')}>
                <option value="customer">Customer</option>
                <option value="revenue">Revenue</option>
                <option value="product">Product</option>
                <option value="market">Market</option>
                <option value="growth">Growth</option>
              </select>
            </div>
            <input value={newEvidence.title} onChange={e => setNewEvidence(p => ({ ...p, title: e.target.value }))} placeholder="Title *" required className={inputClasses} />
            <textarea value={newEvidence.description} onChange={e => setNewEvidence(p => ({ ...p, description: e.target.value }))} placeholder="Description (optional)" rows={2} className={inputClasses.replace('form-input', 'form-textarea')} />
            <input value={newEvidence.source} onChange={e => setNewEvidence(p => ({ ...p, source: e.target.value }))} placeholder="Source (optional — e.g., user interview, analytics)" className={inputClasses} />
            <button type="submit" className="btn bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-xl px-5 py-2.5">Log Evidence</button>
          </form>
        </div>
      )}
    </div>
  )
}
