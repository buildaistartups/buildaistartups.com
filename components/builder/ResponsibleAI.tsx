'use client'

export default function ResponsibleAI({
  enabled,
  ai,
}: {
  enabled: boolean
  ai?: {
    providers?: string[]
    guardrails?: string[]
    data?: { privacy?: string; retentionDays?: number; sources?: string[] }
    confidenceThreshold?: number
    evals?: { name: string; metric: string; target: number }[]
  }
}) {
  if (!enabled) return null

  const providers = ai?.providers?.length ? ai.providers.join(' · ') : 'Configurable'
  const rails = ai?.guardrails?.length ? ai.guardrails.join(' · ') : 'PII-scrub · toxicity-filter · escalation-on-low-confidence'
  const privacy = ai?.data?.privacy ?? 'no-pii'
  const retention = ai?.data?.retentionDays ?? 30
  const sources = ai?.data?.sources?.length ? ai.data.sources.join(', ') : 'docs'
  const conf = ai?.confidenceThreshold ?? 0.75
  const evals = ai?.evals?.length ? ai.evals : [
    { name: 'response_quality', metric: 'gpt-judge-5pt', target: 4.2 },
    { name: 'hallucination_rate_pct', metric: 'fact-check-pct', target: 5 }
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-200">Responsible AI</h2>
        </div>
        <p className="mt-2 text-slate-300 mb-6">
          Evals, guardrails, and data controls are built in for AI projects.
        </p>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card title="Providers">{providers}</Card>
          <Card title="Guardrails">{rails}</Card>
          <Card title="Data Posture">{`${privacy}, retention ${retention}d`}</Card>
          <Card title="Confidence Threshold">{conf.toFixed(2)}</Card>
        </div>
        
        <div className="mb-6">
          <h3 className="text-base font-medium text-slate-200 mb-2">Eval Targets</h3>
          <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
            {evals.map((e, i) => (
              <li key={i}>
                <span className="font-medium text-slate-200">{e.name}</span> — {e.metric}, target {e.target}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Configure in <code className="bg-slate-800 px-1 rounded">bass.json</code> → <code className="bg-slate-800 px-1 rounded">ai</code>. 
            Run quick checks via <code className="bg-slate-800 px-1 rounded">/api/evals/run</code>.
          </span>
        </div>
      </div>
    </section>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">{title}</div>
      <div className="text-sm text-slate-200">{children}</div>
    </div>
  )
}
