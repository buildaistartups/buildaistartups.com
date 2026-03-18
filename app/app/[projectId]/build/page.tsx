'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { IconChecklist, IconDocument, IconBuild, IconSettings } from '@/components/app/icons'

type ChecklistItem = { id: string; label: string; completed: boolean; sort_order: number }
type StackItem = { id: string; category: string; name: string; url: string; notes: string }

const CATEGORIES = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'hosting', label: 'Hosting' },
  { value: 'auth', label: 'Auth' },
  { value: 'payments', label: 'Payments' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'other', label: 'Other' },
]

export default function BuildPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [tab, setTab] = useState<'checklist' | 'spec' | 'stack' | 'github'>('checklist')
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [stack, setStack] = useState<StackItem[]>([])
  const [spec, setSpec] = useState('')
  const [specSaving, setSpecSaving] = useState(false)
  const [specSaved, setSpecSaved] = useState(false)
  const [githubUrl, setGithubUrl] = useState('')
  const [githubSaved, setGithubSaved] = useState(false)
  const [newStack, setNewStack] = useState({ category: 'frontend', name: '', url: '', notes: '' })

  const inputClasses = "form-input w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"

  const fetchData = useCallback(async () => {
    const [cl, st, sp, proj] = await Promise.all([
      fetch(`/api/projects/${projectId}/checklist?stage=build`).then(r => r.json()),
      fetch(`/api/projects/${projectId}/stack`).then(r => r.json()),
      fetch(`/api/projects/${projectId}/spec`).then(r => r.json()),
      fetch(`/api/projects/${projectId}`).then(r => r.json()),
    ])
    if (Array.isArray(cl)) setChecklist(cl)
    if (Array.isArray(st)) setStack(st)
    if (sp && sp.content) setSpec(sp.content)
    if (proj && proj.github_url) setGithubUrl(proj.github_url)
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

  async function saveSpec() {
    setSpecSaving(true)
    await fetch(`/api/projects/${projectId}/spec`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: spec }),
    })
    setSpecSaving(false)
    setSpecSaved(true)
    setTimeout(() => setSpecSaved(false), 2000)
  }

  async function addStackItem(e: React.FormEvent) {
    e.preventDefault()
    if (!newStack.name.trim()) return
    await fetch(`/api/projects/${projectId}/stack`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStack),
    })
    setNewStack({ category: 'frontend', name: '', url: '', notes: '' })
    fetchData()
  }

  async function deleteStackItem(id: string) {
    await fetch(`/api/projects/${projectId}/stack?itemId=${id}`, { method: 'DELETE' })
    setStack(prev => prev.filter(s => s.id !== id))
  }

  async function saveGithub() {
    await fetch(`/api/projects/${projectId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ github_url: githubUrl }),
    })
    setGithubSaved(true)
    setTimeout(() => setGithubSaved(false), 2000)
  }

  const completedCount = checklist.filter(i => i.completed).length
  const groupedStack = CATEGORIES.map(c => ({
    ...c,
    items: stack.filter(s => s.category === c.value),
  })).filter(g => g.items.length > 0)

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto no-scrollbar gap-1 bg-gray-100 dark:bg-gray-800/80 rounded-xl p-1">
        {[
          { key: 'checklist', label: `Checklist (${completedCount}/${checklist.length})`, Icon: IconChecklist },
          { key: 'spec', label: 'Spec Notes', Icon: IconDocument },
          { key: 'stack', label: `Tech Stack (${stack.length})`, Icon: IconBuild },
          { key: 'github', label: 'GitHub', Icon: IconSettings },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition ${tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
            <t.Icon className={`w-4 h-4 ${tab === t.key ? 'text-violet-500' : ''}`} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Checklist */}
      {tab === 'checklist' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Build Checklist</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your build progress. Completing items increases your Product score.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completedCount}<span className="text-gray-400 text-base font-normal">/{checklist.length}</span></div>
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: checklist.length > 0 ? `${(completedCount / checklist.length) * 100}%` : '0%' }} />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            {checklist.map(item => (
              <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition">
                <input type="checkbox" checked={item.completed} onChange={() => toggleChecklist(item.id, item.completed)}
                  className="form-checkbox rounded text-blue-500 w-5 h-5 border-gray-300 dark:border-gray-600" />
                <span className={`text-sm ${item.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>{item.label}</span>
              </label>
            ))}
          </div>
          {checklist.length === 0 && <p className="text-sm text-gray-400 py-4 text-center">Loading checklist...</p>}
        </div>
      )}

      {/* Spec Notes */}
      {tab === 'spec' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <IconDocument className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Spec Notes</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Write your product spec: problem, solution, user stories, data model.</p>
            </div>
          </div>
          <textarea
            value={spec}
            onChange={e => setSpec(e.target.value)}
            rows={20}
            placeholder={"# Product Spec\n\n## Problem\nWhat problem are you solving?\n\n## Solution\nHow does your product solve it?\n\n## User Stories\n- As a [user], I want to [action] so that [benefit]\n\n## Data Model\nWhat data does the app store?\n\n## MVP Scope\nWhat's the minimum you need to launch?"}
            className="form-textarea w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 font-mono mb-4"
          />
          <button onClick={saveSpec} disabled={specSaving}
            className="btn bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-xl px-5 py-2.5 disabled:opacity-50">
            {specSaved ? '✓ Saved!' : specSaving ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
      )}

      {/* Tech Stack */}
      {tab === 'stack' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Tech Stack</h2>

          {groupedStack.length > 0 && (
            <div className="space-y-4 mb-6">
              {groupedStack.map(group => (
                <div key={group.value}>
                  <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{group.label}</div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {group.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/40 rounded-xl p-3 border border-gray-100 dark:border-gray-700/30">
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{item.name}</div>
                          {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-500 hover:text-violet-600">{item.url}</a>}
                          {item.notes && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.notes}</div>}
                        </div>
                        <button onClick={() => deleteStackItem(item.id)} className="text-xs text-red-400 hover:text-red-500 shrink-0 ml-2">✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={addStackItem} className="space-y-3 border-t border-gray-200 dark:border-gray-700/60 pt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add to stack</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <select value={newStack.category} onChange={e => setNewStack(p => ({ ...p, category: e.target.value }))} className={inputClasses.replace('form-input', 'form-select')}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <input value={newStack.name} onChange={e => setNewStack(p => ({ ...p, name: e.target.value }))} placeholder="Name (e.g., Next.js) *" required className={inputClasses} />
              <input value={newStack.url} onChange={e => setNewStack(p => ({ ...p, url: e.target.value }))} placeholder="URL (optional)" className={inputClasses} />
              <input value={newStack.notes} onChange={e => setNewStack(p => ({ ...p, notes: e.target.value }))} placeholder="Notes (optional)" className={inputClasses} />
            </div>
            <button type="submit" className="btn bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-xl px-5 py-2.5">Add to Stack</button>
          </form>
        </div>
      )}

      {/* GitHub */}
      {tab === 'github' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">GitHub Repository</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Link your code repository for quick access.</p>
          <div className="flex gap-3">
            <input
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className={inputClasses + " flex-1"}
            />
            <button onClick={saveGithub} className="btn bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-xl px-5 py-2.5 shrink-0">
              {githubSaved ? '✓ Saved!' : 'Save'}
            </button>
          </div>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-violet-500 hover:text-violet-600">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 .2C3.6.2 0 3.8 0 8.2c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V14c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6C16 3.8 12.4.2 8 .2z" /></svg>
              Open Repository →
            </a>
          )}
        </div>
      )}
    </div>
  )
}
