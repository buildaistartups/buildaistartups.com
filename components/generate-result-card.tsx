// components/generate-result-card.tsx
import type { GenerateResult } from './generate-result-types'
import GenerateResultHeader from './generate-result-header'
import GenerateResultActions from './generate-result-actions'
import GenerateResultPreview from './generate-result-preview'

function buildFallbackPRD(result: GenerateResult) {
  const { name, oneLiner, niche, stack } = result
  return [
    `# Product Requirement (Auto-generated)`,
    ``,
    `## Working Name`,
    `${name || 'Untitled Project'}`,
    ``,
    `## One-liner`,
    `${oneLiner || 'N/A'}`,
    ``,
    `## Target Niche`,
    `${niche || 'General builders / early adopters'}`,
    ``,
    `## Core Features`,
    `- Onboarding to capture use-case`,
    `- Core value feature (MVP)`,
    `- Minimal analytics & feedback loop`,
    `- Simple pricing & checkout (Stripe)`,
    ``,
    `## Suggested Stack`,
    `${stack || 'Next.js + Postgres/Supabase + Vercel'}`,
    ``,
    `## Success Criteria`,
    `- Time-to-first-value < 3 minutes`,
    `- Conversion to sign-up > 5%`,
    `- Weekly retention > 20%`,
  ].join('\n')
}

export default function GenerateResultCard({
  result,
  className,
}: {
  result: GenerateResult
  className?: string
}) {
  const {
    id,
    name,
    oneLiner,
    description,
    niche,
    tags = [],
    stack,
    image,
  } = result

  const prd = (result.prd && result.prd.trim().length > 0)
    ? result.prd!
    : buildFallbackPRD(result)

  const seed = encodeURIComponent(id || name || 'seed')

  return (
    <article
      className={[
        'rounded-2xl border border-white/10 bg-slate-900/40 p-5 md:p-6',
        'backdrop-blur supports-[backdrop-filter]:bg-slate-900/30',
        className || '',
      ].join(' ')}
    >
      {/* Cover / Thumbnail */}
      <div className="mb-4 overflow-hidden rounded-xl border border-white/5 bg-slate-800/40 aspect-[16/9] grid place-items-center">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 400 225"
            className="h-full w-full text-slate-600"
          >
            <defs>
              <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="400" height="225" fill="url(#grad)" />
            <g fill="none" stroke="currentColor" strokeOpacity="0.2">
              <path d="M0 160 C 120 120, 280 200, 400 140" />
              <path d="M0 120 C 100 180, 300 60, 400 180" />
            </g>
          </svg>
        )}
      </div>

      {/* Header */}
      <GenerateResultHeader name={name} oneLiner={oneLiner} />

      {/* Meta */}
      <dl className="mt-4 grid gap-2 text-sm">
        {niche && (
          <div className="flex justify-between">
            <dt className="text-slate-500">Niche</dt>
            <dd className="text-slate-300">{niche}</dd>
          </div>
        )}
        {stack && (
          <div className="flex justify-between">
            <dt className="text-slate-500">Suggested Stack</dt>
            <dd className="text-slate-300">{stack}</dd>
          </div>
        )}
      </dl>

      {/* Tags */}
      {Array.isArray(tags) && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-slate-800/50 px-2.5 py-0.5 text-xs text-slate-300"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="mt-4 text-sm leading-6 text-slate-300">{description}</p>
      )}

      {/* Actions */}
      <GenerateResultActions seed={seed} prd={prd} />

      {/* PRD preview */}
      <GenerateResultPreview prd={prd} />
    </article>
  )
}
