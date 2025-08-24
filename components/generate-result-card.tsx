// components/generate-result-card.tsx
import Link from 'next/link'
import type { ReactNode } from 'react'

export type GeneratedProject = {
  name: string
  slug: string
  oneLiner: string
  summary: string
  problem: string
  solution: string
  features: string[]
  stack: string
  monetization: string
  domainSuggestion: string
  nextSteps: string[]
  links?: { repo?: string; landing?: string }
}

export default function GenerateResultCard({ project }: { project: GeneratedProject }) {
  const {
    name,
    oneLiner,
    summary,
    problem,
    solution,
    features,
    stack,
    monetization,
    domainSuggestion,
    nextSteps,
    links,
  } = project

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{name}</h3>
          <p className="text-sm text-slate-400">{oneLiner}</p>
        </div>
        {links?.repo ? (
          <a
            href={links.repo}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm text-white bg-purple-500 hover:bg-purple-600"
          >
            View repo
          </a>
        ) : null}
      </div>

      <p className="mt-4 text-sm text-slate-300">{summary}</p>

      <div className="mt-5 grid gap-4">
        <CardRow title="Problem">{problem}</CardRow>
        <CardRow title="Solution">{solution}</CardRow>
        <CardRow title="Core features">
          <ul className="list-disc pl-5 space-y-1">
            {features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </CardRow>
        <CardRow title="Stack">{stack}</CardRow>
        <CardRow title="Monetization">{monetization}</CardRow>
        <CardRow title="Suggested domain">{domainSuggestion}</CardRow>
        <CardRow title="Next steps">
          <ol className="list-decimal pl-5 space-y-1">
            {nextSteps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </CardRow>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/signin" className="btn btn-sm text-slate-300 hover:text-white">
          Save to dashboard
        </Link>
        <Link href="/pricing" className="btn btn-sm text-slate-300 hover:text-white">
          Compare plans
        </Link>
        <Link href="/resources/templates" className="btn btn-sm text-slate-300 hover:text-white">
          Try a template
        </Link>
      </div>
      <p className="mt-3 text-[11px] text-slate-500">
        Generated content is a starting point. Review licenses & compliance before launch.
      </p>
    </div>
  )
}

function CardRow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{title}</div>
      <div className="mt-1 text-sm text-slate-200">{children}</div>
    </div>
  )
}
