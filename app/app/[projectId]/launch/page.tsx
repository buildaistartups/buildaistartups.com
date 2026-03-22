'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { IconChecklist, IconLaunch, IconAI, IconTrend } from '@/components/app/icons'

type ChecklistItem = { id: string; label: string; completed: boolean; sort_order: number }
type LaunchLink = { id: string; platform: string; url: string; title: string; posted_at: string; notes: string }

const PLATFORMS = ['Product Hunt', 'Indie Hackers', 'Hacker News', 'Reddit', 'X / Twitter', 'LinkedIn', 'Blog', 'YouTube', 'TikTok', 'Newsletter', 'Other']

export default function LaunchPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [tab, setTab] = useState<'checklist' | 'plan' | 'links'>('checklist')
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [links, setLinks] = useState<LaunchLink[]>([])
  const [aiPlan, setAiPlan] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [projectName, setProjectName] = useState('')
  const [projectOneLiner, setProjectOneLiner] = useState('')
  const [newLink, setNewLink] = useState({ platform: 'Product Hunt', url: '', title: '', notes: '' })

  const inputClasses = "form-input w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"

  const fetchData = useCallback(async () => {
    const [cl, ln, proj] = await Promise.all([
      fetch(`/api/projects/${projectId}/checklist?stage=launch`).then(r => r.json()),
      fetch(`/api/projects/${projectId}/links`).then(r => r.json()),
      fetch(`/api/projects/${projectId}`).then(r => r.json()),
    ])
    if (Array.isArray(cl)) setChecklist(cl)
    if (Array.isArray(ln)) setLinks(ln)
    if (proj) { setProjectName(proj.name || ''); setProjectOneLiner(proj.one_liner || '') }
  }, [projectId])

  useEffect(() => { fetchData() }, [fetchData])

  async function toggleChecklist(id: string, completed: boolean) {
    await fetch(`/api/projects/${projectId}/checklist`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, completed: !completed }) })
    setChecklist(prev => prev.map(i => i.id === id ? { ...i, completed: !completed } : i))
    fetch(`/api/projects/${projectId}/score`)
  }

  async function generateLaunchPlan() {
    setAiLoading(true); setAiError(null)
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'analyze-idea', input: `Generate a detailed launch plan for "${projectName}" — ${projectOneLiner}. Include: 1) Pre-launch checklist (1 week before), 2) Launch day timeline (hour by hour), 3) Post-launch follow-up (first 48 hours), 4) Best platforms to launch on and why, 5) Template for the launch post. Be specific and actionable.`, projectId }) })
      const data = await res.json()
      if (!res.ok) { setAiError(data.error); return }
      setAiPlan(typeof data.result === 'string' ? data.result : JSON.stringify(data.result, null, 2))
    } catch { setAiError('Failed to generate plan') }
    finally { setAiLoading(false) }
  }

  async function addLink(e: React.FormEvent) {
    e.preventDefault()
    if (!newLink.url.trim()) return
    await fetch(`/api/projects/${projectId}/links`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newLink) })
    setNewLink({ platform: 'Product Hunt', url: '', title: '', notes: '' })
    fetchData()
  }

  async function deleteLink(id: string) {
    await fetch(`/api/projects/${projectId}/links?linkId=${id}`, { method: 'DELETE' })
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  const completedCount = checklist.filter(i => i.completed).length

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto no-scrollbar gap-1 bg-gray-100 dark:bg-gray-800/80 rounded-xl p-1">
        {[
          { key: 'checklist', label: `Checklist (${completedCount}/${checklist.length})`, Icon: IconChecklist },
          { key: 'plan', label: 'AI Launch Plan', Icon: IconAI },
          { key: 'links', label: `Launch Links (${links.length})`, Icon: IconTrend },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition ${tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
            <t.Icon className={`w-4 h-4 ${tab === t.key ? 'text-violet-500' : ''}`} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'checklist' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Launch Checklist</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Complete these before and during your launch.</p>
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

      {tab === 'plan' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center"><IconLaunch className="w-5 h-5 text-violet-500" /></div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">AI Launch Plan</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Generate a personalized launch strategy for {projectName || 'your startup'}.</p>
              </div>
            </div>
            <button onClick={generateLaunchPlan} disabled={aiLoading}
              className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl px-6 py-2.5 shadow-sm shadow-violet-500/25 disabled:opacity-50">
              {aiLoading ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Generating...</span> : 'Generate Launch Plan'}
            </button>
            {aiError && <p className="text-sm text-red-500 mt-3">{aiError}</p>}
          </div>
          {aiPlan && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Your Launch Plan</h3>
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{aiPlan}</pre>
            </div>
          )}
        </div>
      )}

      {tab === 'links' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Launch Links</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Track where you launched and posted about your product.</p>
          {links.length > 0 && (
            <div className="space-y-2 mb-6">
              {links.map(link => (
                <div key={link.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/40 rounded-xl p-3 border border-gray-100 dark:border-gray-700/30">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400">{link.platform}</span>
                    <div>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-500 hover:text-violet-600 font-medium">{link.title || link.url}</a>
                      {link.notes && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{link.notes}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(link.posted_at).toLocaleDateString()}</span>
                    <button onClick={() => deleteLink(link.id)} className="text-xs text-red-400 hover:text-red-500">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={addLink} className="space-y-3 border-t border-gray-200 dark:border-gray-700/60 pt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add launch link</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <select value={newLink.platform} onChange={e => setNewLink(p => ({ ...p, platform: e.target.value }))} className={inputClasses.replace('form-input', 'form-select')}>{PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}</select>
              <input value={newLink.url} onChange={e => setNewLink(p => ({ ...p, url: e.target.value }))} placeholder="URL *" required className={inputClasses} />
              <input value={newLink.title} onChange={e => setNewLink(p => ({ ...p, title: e.target.value }))} placeholder="Title (optional)" className={inputClasses} />
              <input value={newLink.notes} onChange={e => setNewLink(p => ({ ...p, notes: e.target.value }))} placeholder="Notes (optional)" className={inputClasses} />
            </div>
            <button type="submit" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl px-5 py-2.5">Add Link</button>
          </form>
        </div>
      )}
    </div>
  )
}
