'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconAI, IconDownload } from '@/components/app/icons'

type Idea = {
  name: string
  oneLiner: string
  targetCustomer: string
  revenueModel: string
  difficulty: string
  competition: string
  revenuePotential: string
  whyNow: string
  firstStep: string
}

export default function GenerateIdeasPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [input, setInput] = useState({
    interests: '',
    skills: '',
    budget: '',
    timeCommitment: '',
    riskTolerance: 'medium',
  })

  async function generate() {
    if (!input.interests.trim()) return
    setLoading(true)
    setError(null)

    const prompt = `
Interests and passions: ${input.interests}
Skills: ${input.skills || 'Not specified'}
Budget: ${input.budget || 'Not specified'}
Time commitment: ${input.timeCommitment || 'Not specified'}
Risk tolerance: ${input.riskTolerance}
`.trim()

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'generate-ideas', input: prompt }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      if (data.result?.ideas) setIdeas(data.result.ideas)
    } catch { setError('Failed to generate ideas') }
    finally { setLoading(false) }
  }

  async function createProjectFromIdea(idea: Idea) {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: idea.name, one_liner: idea.oneLiner }),
    })
    if (res.ok) {
      const project = await res.json()
      router.push(`/app/${project.id}/overview`)
    }
  }

  const difficultyColor: Record<string, string> = {
    easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    hard: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
  }

  const competitionColor: Record<string, string> = {
    low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    saturated: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
  }

  const inputClasses = "form-input w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">AI Idea Generator</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Tell us about yourself. AI will suggest 10 startup ideas tailored to your skills and interests.</p>

      {/* Input form */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What are your interests and passions? *</label>
            <textarea value={input.interests} onChange={e => setInput(p => ({ ...p, interests: e.target.value }))} rows={3}
              placeholder="e.g., I love productivity tools, automation, and helping small businesses. I'm interested in AI and data analytics."
              className={inputClasses.replace('form-input', 'form-textarea')} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your skills</label>
              <input value={input.skills} onChange={e => setInput(p => ({ ...p, skills: e.target.value }))}
                placeholder="e.g., React, Python, marketing, design" className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly budget for tools</label>
              <input value={input.budget} onChange={e => setInput(p => ({ ...p, budget: e.target.value }))}
                placeholder="e.g., €50-100/month" className={inputClasses} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time commitment</label>
              <input value={input.timeCommitment} onChange={e => setInput(p => ({ ...p, timeCommitment: e.target.value }))}
                placeholder="e.g., 10-20 hours/week" className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk tolerance</label>
              <select value={input.riskTolerance} onChange={e => setInput(p => ({ ...p, riskTolerance: e.target.value }))}
                className={inputClasses.replace('form-input', 'form-select')}>
                <option value="low">Low — safe, proven models</option>
                <option value="medium">Medium — some risk, higher reward</option>
                <option value="high">High — bold bets, big upside</option>
              </select>
            </div>
          </div>
          <button onClick={generate} disabled={loading || !input.interests.trim()}
            className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl px-6 py-2.5 shadow-sm shadow-violet-500/25 disabled:opacity-50">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Generating ideas...
              </span>
            ) : (
              <span className="flex items-center gap-2"><IconAI className="w-4 h-4" /> Generate 10 Ideas</span>
            )}
          </button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      {/* Results */}
      {ideas.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{ideas.length} Ideas Generated</h2>
          </div>

          <div className="grid gap-4">
            {ideas.map((idea, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">#{i + 1}</span>
                      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{idea.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{idea.oneLiner}</p>
                  </div>
                  <button onClick={() => createProjectFromIdea(idea)}
                    className="btn bg-violet-500 hover:bg-violet-600 text-white text-xs rounded-lg px-3 py-1.5 shrink-0">
                    Start Project →
                  </button>
                </div>

                <div className="grid sm:grid-cols-4 gap-3 mt-4">
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3 border border-gray-100 dark:border-gray-700/30">
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase mb-1">Target Customer</div>
                    <div className="text-xs text-gray-700 dark:text-gray-300">{idea.targetCustomer}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3 border border-gray-100 dark:border-gray-700/30">
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase mb-1">Revenue Model</div>
                    <div className="text-xs text-gray-700 dark:text-gray-300 capitalize">{idea.revenueModel}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3 border border-gray-100 dark:border-gray-700/30">
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase mb-1">Revenue Potential</div>
                    <div className="text-xs text-gray-700 dark:text-gray-300">{idea.revenuePotential}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3 border border-gray-100 dark:border-gray-700/30">
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase mb-1">Why Now</div>
                    <div className="text-xs text-gray-700 dark:text-gray-300">{idea.whyNow}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-lg capitalize ${difficultyColor[idea.difficulty] || difficultyColor.medium}`}>{idea.difficulty}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-lg capitalize ${competitionColor[idea.competition] || competitionColor.medium}`}>{idea.competition} competition</span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/30">
                  <div className="text-xs text-gray-400 dark:text-gray-500 uppercase mb-1">First Step</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{idea.firstStep}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
