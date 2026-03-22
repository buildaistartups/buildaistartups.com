'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconAI, IconLightbulb, IconCompetitors } from '@/components/app/icons'

type Idea = { name: string; oneLiner: string; targetCustomer: string; revenueModel: string; difficulty: string; competition: string; revenuePotential: string; whyNow: string; firstStep: string }

export default function GenerateIdeasPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'fresh' | 'expand'>('fresh')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ideas, setIdeas] = useState<Idea[]>([])

  // Fresh mode inputs
  const [fresh, setFresh] = useState({ interests: '', skills: '', budget: '', timeCommitment: '', riskTolerance: 'medium' })

  // Expand mode inputs
  const [expand, setExpand] = useState({ businessName: '', businessDesc: '', currentCustomers: '', currentRevenue: '', whatsWorking: '', whatsNot: '', goals: '' })

  const inputClasses = "form-input w-full rounded-xl text-sm bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"

  async function generate() {
    let prompt: string
    if (mode === 'fresh') {
      if (!fresh.interests.trim()) return
      prompt = `Interests and passions: ${fresh.interests}\nSkills: ${fresh.skills || 'Not specified'}\nBudget: ${fresh.budget || 'Not specified'}\nTime commitment: ${fresh.timeCommitment || 'Not specified'}\nRisk tolerance: ${fresh.riskTolerance}`
    } else {
      if (!expand.businessName.trim()) return
      prompt = `I already have an existing business and want to expand into adjacent products or services.\n\nExisting business: ${expand.businessName}\nWhat it does: ${expand.businessDesc}\nCurrent customers: ${expand.currentCustomers || 'Not specified'}\nCurrent revenue: ${expand.currentRevenue || 'Not specified'}\nWhat's working well: ${expand.whatsWorking || 'Not specified'}\nWhat's not working: ${expand.whatsNot || 'Not specified'}\nExpansion goals: ${expand.goals || 'Not specified'}\n\nSuggest 10 adjacent products, services, or business directions that leverage my existing audience, brand, expertise, and infrastructure. Focus on ideas that can share customers, cross-sell, or create synergies with my current business.`
    }

    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'generate-ideas', input: prompt }) })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      if (data.result?.ideas) setIdeas(data.result.ideas)
    } catch { setError('Failed to generate ideas') }
    finally { setLoading(false) }
  }

  async function createProjectFromIdea(idea: Idea) {
    const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: idea.name, one_liner: idea.oneLiner }) })
    if (res.ok) { const project = await res.json(); router.push(`/app/${project.id}/overview`) }
  }

  const difficultyColor: Record<string, string> = { easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400', medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400', hard: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' }
  const competitionColor: Record<string, string> = { low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400', medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400', high: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400', saturated: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">AI Idea Generator</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">AI will suggest 10 startup ideas tailored to your situation.</p>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => { setMode('fresh'); setIdeas([]) }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition border ${mode === 'fresh' ? 'bg-violet-500/10 border-violet-500/30 text-violet-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}>
          <IconLightbulb className="w-4 h-4" /> Starting Fresh
        </button>
        <button onClick={() => { setMode('expand'); setIdeas([]) }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition border ${mode === 'expand' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}>
          <IconCompetitors className="w-4 h-4" /> Expanding Existing Business
        </button>
      </div>

      {/* Fresh mode form */}
      {mode === 'fresh' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6 mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What are your interests and passions? *</label>
            <textarea value={fresh.interests} onChange={e => setFresh(p => ({ ...p, interests: e.target.value }))} rows={3}
              placeholder="e.g., I love productivity tools, automation, and helping small businesses." className={inputClasses.replace('form-input', 'form-textarea')} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your skills</label>
              <input value={fresh.skills} onChange={e => setFresh(p => ({ ...p, skills: e.target.value }))} placeholder="e.g., React, Python, marketing" className={inputClasses} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly budget</label>
              <input value={fresh.budget} onChange={e => setFresh(p => ({ ...p, budget: e.target.value }))} placeholder="e.g., €50-100/month" className={inputClasses} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time commitment</label>
              <input value={fresh.timeCommitment} onChange={e => setFresh(p => ({ ...p, timeCommitment: e.target.value }))} placeholder="e.g., 10-20 hours/week" className={inputClasses} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk tolerance</label>
              <select value={fresh.riskTolerance} onChange={e => setFresh(p => ({ ...p, riskTolerance: e.target.value }))} className={inputClasses.replace('form-input', 'form-select')}>
                <option value="low">Low — safe, proven models</option><option value="medium">Medium — some risk, higher reward</option><option value="high">High — bold bets, big upside</option>
              </select></div>
          </div>
          <button onClick={generate} disabled={loading || !fresh.interests.trim()}
            className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl px-6 py-2.5 shadow-sm shadow-violet-500/25 disabled:opacity-50">
            {loading ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Generating...</span>
              : <span className="flex items-center gap-2"><IconAI className="w-4 h-4" /> Generate 10 Ideas</span>}
          </button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* Expand mode form */}
      {mode === 'expand' && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business name *</label>
              <input value={expand.businessName} onChange={e => setExpand(p => ({ ...p, businessName: e.target.value }))} placeholder="e.g., FitTracker" className={inputClasses} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current revenue</label>
              <input value={expand.currentRevenue} onChange={e => setExpand(p => ({ ...p, currentRevenue: e.target.value }))} placeholder="e.g., €5K/month" className={inputClasses} /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What does your business do?</label>
            <textarea value={expand.businessDesc} onChange={e => setExpand(p => ({ ...p, businessDesc: e.target.value }))} rows={2}
              placeholder="Describe your current product/service in a few sentences" className={inputClasses.replace('form-input', 'form-textarea')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Who are your current customers?</label>
            <input value={expand.currentCustomers} onChange={e => setExpand(p => ({ ...p, currentCustomers: e.target.value }))} placeholder="e.g., Solo freelancers, 500 active users" className={inputClasses} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What's working well?</label>
              <textarea value={expand.whatsWorking} onChange={e => setExpand(p => ({ ...p, whatsWorking: e.target.value }))} rows={2}
                placeholder="Features users love, strong channels, etc." className={inputClasses.replace('form-input', 'form-textarea')} /></div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What's not working?</label>
              <textarea value={expand.whatsNot} onChange={e => setExpand(p => ({ ...p, whatsNot: e.target.value }))} rows={2}
                placeholder="Pain points, churn reasons, etc." className={inputClasses.replace('form-input', 'form-textarea')} /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expansion goals</label>
            <input value={expand.goals} onChange={e => setExpand(p => ({ ...p, goals: e.target.value }))} placeholder="e.g., Reach €20K MRR, enter new market, serve enterprise" className={inputClasses} />
          </div>
          <button onClick={generate} disabled={loading || !expand.businessName.trim()}
            className="btn bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-xl px-6 py-2.5 shadow-sm shadow-emerald-500/25 disabled:opacity-50">
            {loading ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Generating...</span>
              : <span className="flex items-center gap-2"><IconAI className="w-4 h-4" /> Generate 10 Expansion Ideas</span>}
          </button>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* Results */}
      {ideas.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{ideas.length} Ideas Generated</h2>
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
                  className="btn bg-violet-500 hover:bg-violet-600 text-white text-xs rounded-lg px-3 py-1.5 shrink-0">Start Project →</button>
              </div>
              <div className="grid sm:grid-cols-4 gap-3 mt-4">
                {[
                  { label: 'Target Customer', value: idea.targetCustomer },
                  { label: 'Revenue Model', value: idea.revenueModel },
                  { label: 'Revenue Potential', value: idea.revenuePotential },
                  { label: 'Why Now', value: idea.whyNow },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3 border border-gray-100 dark:border-gray-700/30">
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase mb-1">{item.label}</div>
                    <div className="text-xs text-gray-700 dark:text-gray-300 capitalize">{item.value}</div>
                  </div>
                ))}
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
      )}
    </div>
  )
}
