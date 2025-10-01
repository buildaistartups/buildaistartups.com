// components/generate-result-header.tsx
import type { GenerateResult } from './generate-result-types'

export default function GenerateResultHeader({
  name,
  oneLiner,
  badge = 'Generated • just now',
}: Pick<GenerateResult, 'name' | 'oneLiner'> & { badge?: string }) {
  const displayName = (name || '').trim() || 'Untitled Project'
  const displayOneLiner = (oneLiner || '').trim()

  return (
    <header className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-lg md:text-xl font-semibold leading-tight text-slate-100">
          {displayName}
        </h3>
        {displayOneLiner && (
          <p className="text-sm text-slate-400 truncate" title={displayOneLiner}>
            {displayOneLiner}
          </p>
        )}
      </div>
      <span
        className="inline-flex shrink-0 items-center rounded-full border border-emerald-400/30 px-2.5 py-0.5 text-xs font-medium text-emerald-300"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        title={badge}
      >
        {badge}
      </span>
    </header>
  )
}
