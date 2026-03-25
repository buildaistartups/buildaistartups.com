'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { IconChecklist, IconLaunch, IconAI, IconTrend, IconDownload } from '@/components/app/icons'
import { TabInfo } from '@/components/app/tab-info'

type ChecklistItem = { id: string; label: string; completed: boolean; sort_order: number }
type LaunchLink = { id: string; platform: string; url: string; title: string; posted_at: string; notes: string }
type LaunchPlan = { preLaunch: { title: string; tasks: { task: string; details: string }[] }; launchDay: { title: string; hours: { time: string; action: string; details: string }[] }; postLaunch: { title: string; tasks: { task: string; details: string }[] }; platforms: { name: string; why: string; template: string }[]; tips: string[] }

const PLATFORMS = ['Product Hunt', 'Indie Hackers', 'Hacker News', 'Reddit', 'X / Twitter', 'LinkedIn', 'Blog', 'YouTube', 'TikTok', 'Newsletter', 'Other']

export default function LaunchPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [tab, setTab] = useState<'checklist' | 'plan' | 'links'>('checklist')
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [links, setLinks] = useState<LaunchLink[]>([])
  const [aiPlan, setAiPlan] = useState<LaunchPlan | null>(null)
  const [aiPlanRaw, setAiPlanRaw] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [projectName, setProjectName] = useState('')
  const [projectOneLiner, setProjectOneLiner] = useState('')
  const [newLink, setNewLink] = useState({ platform: 'Product Hunt', url: '', title: '', notes: '' })
  const [editingLink, setEditingLink] = useState<string | null>(null)
  const [editLink, setEditLink] = useState({ platform: '', url: '', title: '', notes: '' })

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
        body: JSON.stringify({ type: 'launch-plan', input: `Startup: "${projectName}" — ${projectOneLiner}`, projectId }) })
      const data = await res.json()
      if (!res.ok) { setAiError(data.error); return }
      if (data.result?.preLaunch) { setAiPlan(data.result); setAiPlanRaw(null) }
      else { setAiPlanRaw(typeof data.result === 'string' ? data.result : JSON.stringify(data.result, null, 2)); setAiPlan(null) }
    } catch { setAiError('Failed to generate plan') }
    finally { setAiLoading(false) }
  }

  function downloadLaunchPDF() {
    if (!aiPlan && !aiPlanRaw) return
    const w = window.open('', '_blank'); if (!w) return
    let body = ''
    if (aiPlan) {
      body = `<h2>${aiPlan.preLaunch.title}</h2>${aiPlan.preLaunch.tasks.map(t => `<div class="item"><div class="label">${t.task}</div><p>${t.details}</p></div>`).join('')}
      <h2>${aiPlan.launchDay.title}</h2>${aiPlan.launchDay.hours.map(h => `<div class="item"><div class="time">${h.time}</div><div class="label">${h.action}</div><p>${h.details}</p></div>`).join('')}
      <h2>${aiPlan.postLaunch.title}</h2>${aiPlan.postLaunch.tasks.map(t => `<div class="item"><div class="label">${t.task}</div><p>${t.details}</p></div>`).join('')}
      <h2>Best Platforms</h2>${aiPlan.platforms.map(p => `<div class="platform"><div class="label">${p.name}</div><p><strong>Why:</strong> ${p.why}</p><div class="template">${p.template}</div></div>`).join('')}
      <h2>Tips</h2>${aiPlan.tips.map(t => `<p class="tip">• ${t}</p>`).join('')}`
    } else {
      body = `<pre>${aiPlanRaw}</pre>`
    }
    w.document.write(`<!DOCTYPE html><html><head><title>Launch Plan — ${projectName}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1e293b;padding:48px;max-width:800px;margin:0 auto}h1{font-size:28px;margin-bottom:4px}h2{font-size:16px;margin:28px 0 14px;color:#7c3aed;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #ede9fe;padding-bottom:8px}p{font-size:13px;line-height:1.7;color:#475569;margin-bottom:8px}.subtitle{font-size:13px;color:#94a3b8;margin-bottom:24px}.item{margin-bottom:16px;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px}.label{font-weight:600;font-size:14px;color:#1e293b;margin-bottom:4px}.time{font-size:11px;color:#7c3aed;font-weight:600;margin-bottom:2px}.platform{margin-bottom:16px;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px}.template{margin-top:8px;padding:10px;background:#f1f5f9;border-radius:8px;font-size:12px;font-style:italic;color:#64748b}.tip{font-size:13px;color:#475569;margin-bottom:6px}.footer{margin-top:40px;padding-top:16px;border-top:2px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center}pre{white-space:pre-wrap;font-size:13px;line-height:1.7;color:#475569}@media print{body{padding:24px}}</style></head><body>
    <h1>Launch Plan: ${projectName}</h1><p class="subtitle">Generated by LaunchScore &middot; ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>${body}<div class="footer">LaunchScore &middot; buildaistartups.com</div></body></html>`)
    w.document.close(); setTimeout(() => w.print(), 500)
  }

  async function addLink(e: React.FormEvent) {
    e.preventDefault()
    if (!newLink.url.trim()) return
    await fetch(`/api/projects/${projectId}/links`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newLink) })
    setNewLink({ platform: 'Product Hunt', url: '', title: '', notes: '' }); fetchData()
  }

  async function deleteLink(id: string) {
    await fetch(`/api/projects/${projectId}/links?linkId=${id}`, { method: 'DELETE' })
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  function startEdit(link: LaunchLink) {
    setEditingLink(link.id); setEditLink({ platform: link.platform, url: link.url, title: link.title || '', notes: link.notes || '' })
  }

  async function saveEdit(id: string) {
    await fetch(`/api/projects/${projectId}/links?linkId=${id}`, { method: 'DELETE' })
    await fetch(`/api/projects/${projectId}/links`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editLink) })
    setEditingLink(null); fetchData()
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
            <t.Icon className={`w-4 h-4 ${tab === t.key ? 'text-violet-500' : ''}`} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'checklist' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <TabInfo title="Launch Checklist" description="Complete these before going live. A successful launch isn't just building — it's making sure payments work, analytics track, and people know you exist. Each item checked feeds into your LaunchScore." />
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Progress</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completedCount}<span className="text-gray-400 text-base font-normal">/{checklist.length}</span></div>
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1"><div className="h-full bg-violet-500 rounded-full transition-all" style={{ width: checklist.length > 0 ? `${(completedCount / checklist.length) * 100}%` : '0%' }} /></div>
            </div>
          </div>
          <div className="space-y-1">{checklist.map(item => (
            <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition">
              <input type="checkbox" checked={item.completed} onChange={() => toggleChecklist(item.id, item.completed)} className="form-checkbox rounded text-violet-500 w-5 h-5 border-gray-300 dark:border-gray-600" />
              <span className={`text-sm ${item.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>{item.label}</span>
            </label>
          ))}</div>
          {checklist.length === 0 && <p className="text-sm text-gray-400 py-4 text-center">Loading checklist...</p>}
        </div>
      )}

      {tab === 'plan' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
            <TabInfo title="AI Launch Plan" description="Get a personalized, step-by-step launch strategy for your startup. The plan covers pre-launch preparation, launch day timeline, post-launch follow-up, best platforms, and post templates you can copy." />
            <div className="flex items-center gap-3">
              <button onClick={generateLaunchPlan} disabled={aiLoading} className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl px-6 py-2.5 shadow-sm shadow-violet-500/25 disabled:opacity-50">
                {aiLoading ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Generating...</span> : 'Generate Launch Plan'}
              </button>
              {(aiPlan || aiPlanRaw) && (
                <button onClick={downloadLaunchPDF} className="btn border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-violet-300 text-sm rounded-xl px-4 py-2.5 flex items-center gap-2"><IconDownload className="w-4 h-4" /> Download PDF</button>
              )}
            </div>
            {aiError && <p className="text-sm text-red-500 mt-3">{aiError}</p>}
          </div>

          {aiPlan && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> {aiPlan.preLaunch.title}</h3>
                <div className="space-y-3">{aiPlan.preLaunch.tasks.map((t, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-1">{t.task}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.details}</p>
                  </div>
                ))}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> {aiPlan.launchDay.title}</h3>
                <div className="space-y-3">{aiPlan.launchDay.hours.map((h, i) => (
                  <div key={i} className="flex gap-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                    <div className="text-xs font-bold text-violet-500 w-16 shrink-0 pt-0.5">{h.time}</div>
                    <div><div className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-1">{h.action}</div><p className="text-xs text-gray-600 dark:text-gray-400">{h.details}</p></div>
                  </div>
                ))}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> {aiPlan.postLaunch.title}</h3>
                <div className="space-y-3">{aiPlan.postLaunch.tasks.map((t, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-1">{t.task}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.details}</p>
                  </div>
                ))}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Best Platforms</h3>
                <div className="grid sm:grid-cols-2 gap-3">{aiPlan.platforms.map((p, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-gray-100 dark:border-gray-700/30">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-1">{p.name}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{p.why}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600/30 rounded-lg p-2 italic">{p.template}</div>
                  </div>
                ))}</div>
              </div>
              {aiPlan.tips?.length > 0 && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Pro Tips</h3>
                  <div className="space-y-2">{aiPlan.tips.map((t, i) => (
                    <div key={i} className="flex items-start gap-2"><div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5"><span className="text-white text-[10px] font-bold">{i + 1}</span></div><p className="text-sm text-gray-600 dark:text-gray-300">{t}</p></div>
                  ))}</div>
                </div>
              )}
            </div>
          )}

          {aiPlanRaw && !aiPlan && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{aiPlanRaw}</pre>
            </div>
          )}
        </div>
      )}

      {tab === 'links' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <TabInfo title="Launch Links" description="Track everywhere you posted about your launch. Add links to Product Hunt, Indie Hackers, Twitter/X, Reddit, blogs, and anywhere else. This helps you measure which channels drive results." />
          {links.length > 0 && (
            <div className="space-y-2 mb-6">
              {links.map(link => editingLink === link.id ? (
                <div key={link.id} className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 border border-violet-200 dark:border-violet-500/30 space-y-2">
                  <div className="grid sm:grid-cols-2 gap-2">
                    <select value={editLink.platform} onChange={e => setEditLink(p => ({ ...p, platform: e.target.value }))} className={inputClasses.replace('form-input', 'form-select')}>{PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}</select>
                    <input value={editLink.url} onChange={e => setEditLink(p => ({ ...p, url: e.target.value }))} className={inputClasses} />
                    <input value={editLink.title} onChange={e => setEditLink(p => ({ ...p, title: e.target.value }))} placeholder="Title" className={inputClasses} />
                    <input value={editLink.notes} onChange={e => setEditLink(p => ({ ...p, notes: e.target.value }))} placeholder="Notes" className={inputClasses} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(link.id)} className="text-xs text-violet-500 hover:text-violet-600 font-medium">Save</button>
                    <button onClick={() => setEditingLink(null)} className="text-xs text-gray-400 hover:text-gray-500 font-medium">Cancel</button>
                  </div>
                </div>
              ) : (
                <div key={link.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/40 rounded-xl p-3 border border-gray-100 dark:border-gray-700/30">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400">{link.platform}</span>
                    <div>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-500 hover:text-violet-600 font-medium">{link.title || link.url}</a>
                      {link.notes && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{link.notes}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(link.posted_at).toLocaleDateString()}</span>
                    <button onClick={() => startEdit(link)} className="text-xs text-blue-400 hover:text-blue-500">Edit</button>
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
