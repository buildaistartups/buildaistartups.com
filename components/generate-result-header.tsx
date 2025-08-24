// components/generate-result-header.tsx
import type { GenerateResult } from './generate-result-types'

export default function GenerateResultHeader({
  name,
  oneLiner,
  badge = 'Generated • just now',
}: Pick<GenerateResult, 'name' | 'oneLiner'> & { badge?: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-slate-100">{name}</h3>
        <p className="text-sm text-slate-400">{oneLiner}</p>
      </div>
      <span className="inline-flex items-center rounded-full border border-emerald-400/30 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
        {badge}
      </span>
    </div>
  )
}
