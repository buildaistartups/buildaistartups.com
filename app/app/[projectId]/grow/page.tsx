'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { IconGrow, IconAI, IconChecklist, IconChart } from '@/components/app/icons'

type Experiment = { id: string; name: string; hypothesis: string; channel: string; status: string; result: string | null; metric_target: string; metric_actual: string; learnings: string; started_at: string | null; completed_at: string | null }
type Retro = { id: string; month: string; went_well: string; went_wrong: string; next_actions: string; energy_level: number }

const CHANNELS = ['organic', 'paid', 'social', 'email', 'referral', 'content', 'partnerships', 'other']

export default function GrowPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [tab, setTab] = useState<'experiments' | 'advisor' | 'retro'>('experiments')
  const [experiments, setExperiments] = useState<Experiment[]>([])
  const [retros, setRetros] = useState<Retro[]>([])
  const [aiAdvice, setAiAdvice] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [projectName, setProjectName] = useState('')
  const [projectOneLiner, setProjectOneLiner] = useState('')
  const [showNewExp, setShowNewExp] = useState(false)
  const [newExp, setNewExp] = useState({ name: '', hypothesis: '', channel: 'organic', metric_target: '' })
  const [newRetro, setNewRetro] = useState({ month: new Date().toISOString().slice(0, 7), went_well: '', went_wrong: '', next_actions: '', energy_level: 3 })

  const inputClasses = "form-input w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"

  const fetchData = useCallback(async () => {
    const [exp, ret, proj] = await Promise.all([
      fetch(`/api/projects/${projectId}/experiments`).then(r => r.json()),
      fetch(`/api/projects/${projectId}/retros`).then(r => r.json()),
      fetch(`/api/projects/${projectId}`).then(r => r.json()),
    ])
    if (Array.isArray(exp)) setExperiments(exp)
    if (Array.isArray(ret)) setRetros(ret)
    if (proj) { setProjectName(proj.name || ''); setProjectOneLiner(proj.one_liner || '') }
  }, [projectId])

  useEffect(() => { fetchData() }, [fetchData])

  async function addExperiment(e: React.FormEvent) {
    e.preventDefault()
    if (!newExp.name.trim()) return
    await fetch(`/api/projects/${projectId}/experiments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newExp) })
    setNewExp({ name: '', hypothesis: '', channel: 'organic', metric_target: '' })
    setShowNewExp(false)
    fetchData()
    fetch(`/api/projects/${projectId}/score`)
  }

  async function updateExperiment(id: string, updates: Record<string, unknown>) {
    await fetch(`/api/projects/${projectId}/experiments`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...updates }) })
    fetchData()
    fetch(`/api/projects/${projectId}/score`)
  }

  async function deleteExperiment(id: string) {
    await fetch(`/api/projects/${projectId}/experiments?expId=${id}`, { method: 'DELETE' })
    setExperiments(prev => prev.filter(e => e.id !== id))
  }

  async function generateAdvice() {
    setAiLoading(true); setAiError(null)
    const expSummary = experiments.map(e => `${e.name} (${e.status}${e.result ? `, ${e.result}` : ''})`).join(', ')
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'analyze-idea', input: `My startup "${projectName}" — ${projectOneLiner}. Current experiments: ${expSummary || 'none yet'}. Based on this, suggest: 1) Should I pivot, persevere, or expand? 2) 5 specific growth experiments to try next, 3) Adjacent products or services I could build, 4) What to stop doing. Be direct and honest.`, projectId }) })
      const data = await res.json()
      if (!res.ok) { setAiError(data.error); return }
      setAiAdvice(typeof data.result === 'string' ? data.result : JSON.stringify(data.result, null, 2))
    } catch { setAiError('Failed to generate advice') }
    finally { setAiLoading(false) }
  }

  async function addRetro(e: React.FormEvent) {
    e.preventDefault()
    if (!newRetro.went_well.trim() && !newRetro.went_wrong.trim()) return
    await fetch(`/api/projects/${projectId}/retros`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newRetro) })
    setNewRetro({ month: new Date().toISOString().slice(0, 7), went_well: '', went_wrong: '', next_actions: '', energy_level: 3 })
    fetchData()
  }

  async function deleteRetro(id: string) {
    await fetch(`/api/projects/${projectId}/retros?retroId=${id}`, { method: 'DELETE' })
    setRetros(prev => prev.filter(r => r.id !== id))
  }

  const statusColor: Record<string, string> = {
    planned: 'bg-gray-100 text-gray-600 dark:bg-gray-600/30 dark:text-gray-300',
    running: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    abandoned: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
  }

  const resultColor: Record<string, string> = {
    success: 'text-emerald-500',
    failure: 'text-red-500',
    inconclusive: 'text-amber-500',
  }

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto no-scrollbar gap-1 bg-gray-100 dark:bg-gray-800/80 rounded-xl p-1">
        {[
          { key: 'experiments', label: `Experiments (${experiments.length})`, Icon: IconGrow },
          { key: 'advisor', label: 'AI Growth Advisor', Icon: IconAI },
          { key: 'retro', label: `Monthly Retro (${retros.length})`, Icon: IconChart },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition ${tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
            <t.Icon className={`w-4 h-4 ${tab === t.key ? 'text-violet-500' : ''}`} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Experiments */}
      {tab === 'experiments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Growth Experiments</h2>
            <button onClick={() => setShowNewExp(!showNewExp)} className="btn bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-xl px-4 py-2">+ New Experiment</button>
          </div>

          {showNewExp && (
            <form onSubmit={addExperiment} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6 space-y-3">
              <input value={newExp.name} onChange={e => setNewExp(p => ({ ...p, name: e.target.value }))} placeholder="Experiment name *" required className={inputClasses} />
              <textarea value={newExp.hypothesis} onChange={e => setNewExp(p => ({ ...p, hypothesis: e.target.value }))} placeholder="Hypothesis: If we do X, then Y will happen because Z" rows={2} className={inputClasses.replace('form-input', 'form-textarea')} />
              <div className="grid sm:grid-cols-2 gap-3">
                <select value={newExp.channel} onChange={e => setNewExp(p => ({ ...p, channel: e.target.value }))} className={inputClasses.replace('form-input', 'form-select')}>
                  {CHANNELS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
                <input value={newExp.metric_target} onChange={e => setNewExp(p => ({ ...p, metric_target: e.target.value }))} placeholder="Target metric (e.g., 50 signups)" className={inputClasses} />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-xl px-5 py-2.5">Add Experiment</button>
                <button type="button" onClick={() => setShowNewExp(false)} className="btn border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm rounded-xl px-4 py-2.5">Cancel</button>
              </div>
            </form>
          )}

          {experiments.length === 0 && !showNewExp && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4"><IconGrow className="w-7 h-7 text-emerald-500" /></div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">No experiments yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Start testing growth channels. Each experiment increases your Growth score.</p>
            </div>
          )}

          {experiments.map(exp => (
            <div key={exp.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{exp.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-lg capitalize ${statusColor[exp.status]}`}>{exp.status}</span>
                    {exp.result && <span className={`text-xs font-medium capitalize ${resultColor[exp.result]}`}>{exp.result}</span>}
                  </div>
                  {exp.hypothesis && <p className="text-xs text-gray-500 dark:text-gray-400">{exp.hypothesis}</p>}
                </div>
                <button onClick={() => deleteExperiment(exp.id)} className="text-xs text-red-400 hover:text-red-500 shrink-0">✕</button>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-gray-400 capitalize">{exp.channel}</span>
                {exp.metric_target && <span className="text-xs text-gray-400">Target: {exp.metric_target}</span>}
                {exp.metric_actual && <span className="text-xs text-gray-400">Actual: {exp.metric_actual}</span>}
              </div>
              <div className="flex gap-2 mt-3">
                {exp.status === 'planned' && <button onClick={() => updateExperiment(exp.id, { status: 'running' })} className="text-xs text-blue-500 hover:text-blue-600 font-medium">Start</button>}
                {exp.status === 'running' && (
                  <>
                    <button onClick={() => { const actual = prompt('Actual result:'); if (actual) updateExperiment(exp.id, { status: 'completed', result: 'success', metric_actual: actual }) }} className="text-xs text-emerald-500 hover:text-emerald-600 font-medium">Complete (Success)</button>
                    <button onClick={() => { const actual = prompt('Actual result:'); if (actual) updateExperiment(exp.id, { status: 'completed', result: 'failure', metric_actual: actual }) }} className="text-xs text-red-500 hover:text-red-600 font-medium">Complete (Failure)</button>
                    <button onClick={() => updateExperiment(exp.id, { status: 'abandoned' })} className="text-xs text-gray-400 hover:text-gray-500 font-medium">Abandon</button>
                  </>
                )}
              </div>
              {exp.learnings && <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700/30 text-xs text-gray-600 dark:text-gray-400"><strong>Learnings:</strong> {exp.learnings}</div>}
            </div>
          ))}
        </div>
      )}

      {/* AI Growth Advisor */}
      {tab === 'advisor' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><IconAI className="w-5 h-5 text-emerald-500" /></div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">AI Growth Advisor</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get AI advice on whether to pivot, persevere, or expand — based on your project data.</p>
              </div>
            </div>
            <button onClick={generateAdvice} disabled={aiLoading}
              className="btn bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-xl px-6 py-2.5 shadow-sm disabled:opacity-50">
              {aiLoading ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Analyzing...</span> : 'Get Growth Advice'}
            </button>
            {aiError && <p className="text-sm text-red-500 mt-3">{aiError}</p>}
          </div>
          {aiAdvice && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Growth Recommendations</h3>
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{aiAdvice}</pre>
            </div>
          )}
        </div>
      )}

      {/* Monthly Retro */}
      {tab === 'retro' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Monthly Retrospective</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Reflect on what happened this month. Builds your decision trail over time.</p>
            <form onSubmit={addRetro} className="space-y-4">
              <input type="month" value={newRetro.month} onChange={e => setNewRetro(p => ({ ...p, month: e.target.value }))} className={inputClasses} />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What went well?</label>
                <textarea value={newRetro.went_well} onChange={e => setNewRetro(p => ({ ...p, went_well: e.target.value }))} rows={3} placeholder="Wins, progress, milestones..." className={inputClasses.replace('form-input', 'form-textarea')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What didn't go well?</label>
                <textarea value={newRetro.went_wrong} onChange={e => setNewRetro(p => ({ ...p, went_wrong: e.target.value }))} rows={3} placeholder="Failures, blockers, surprises..." className={inputClasses.replace('form-input', 'form-textarea')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Next month actions</label>
                <textarea value={newRetro.next_actions} onChange={e => setNewRetro(p => ({ ...p, next_actions: e.target.value }))} rows={2} placeholder="What will you focus on next month?" className={inputClasses.replace('form-input', 'form-textarea')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Energy level (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} type="button" onClick={() => setNewRetro(p => ({ ...p, energy_level: n }))}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition ${newRetro.energy_level === n ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-xl px-5 py-2.5">Save Retro</button>
            </form>
          </div>

          {retros.map(retro => (
            <div key={retro.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{retro.month}</span>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">Energy: {retro.energy_level}/5</span>
                </div>
                <button onClick={() => deleteRetro(retro.id)} className="text-xs text-red-400 hover:text-red-500">✕</button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs font-semibold text-emerald-500 uppercase mb-1">Went well</div>
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">{retro.went_well}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-red-400 uppercase mb-1">Didn't go well</div>
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">{retro.went_wrong}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-violet-500 uppercase mb-1">Next actions</div>
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed whitespace-pre-wrap">{retro.next_actions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
