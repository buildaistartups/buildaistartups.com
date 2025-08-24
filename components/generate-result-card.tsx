// components/generate-result-card.tsx
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

export type GenerateResult = {
  id?: string
  name: string
  oneLiner: string
  description?: string
  niche?: string
  tags?: string[]
  stack?: string
  image?: string // optional cover/thumbnail url
  prd?: string   // optional Spec DSL / PRD text
}

type Props = {
  result: GenerateResult
  className?: string
}

/**
 * A polished card for a generated startup idea/MVP.
 * - "Launch with Autopilot" → /product/builder?seed=...
 * - "Save to dashboard" → /generate/saved (hits auth gate)
 * - "Copy PRD" copies provided `result.prd` (or a synthesized PRD)
 */
export default function GenerateResultCard({ result, className }: Props) {
  const [copied, setCopied] = useState(false)

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

  // Fallback PRD if none provided
  const prd = useMemo(() => {
    if (result.prd && result.prd.trim().length > 0) return result.prd
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
  }, [result.prd, name, oneLiner, niche, stack])

  const seed = encodeURIComponent(id || name || 'seed')

  async function handleCopyPRD() {
    try {
      await navigator.clipboard.writeText(prd)
      setCopied(true)
      const t = setTimeout(() => setCopied(false), 2000)
      // Avoid memory leak if unmounted quickly
      return () => clearTimeout(t)
    } catch {
      // no-op
    }
  }

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
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-slate-100">
            {name}
          </h3>
          <p className="text-sm text-slate-400">{oneLiner}</p>
        </div>
        <span className="inline-flex items-center rounded-full border border-emerald-400/30 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
          Generated • just now
        </span>
      </div>

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
      {tags.length > 0 && (
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
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={`/product/builder?seed=${seed}`}
          className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 shadow-xs"
        >
          Launch with Autopilot
        </Link>

        {/* Auth-gated via /generate/saved server page */}
        <Link
          href="/generate/saved"
          className="btn text-sm text-slate-300 hover:text-white"
        >
          Save to dashboard
        </Link>

        <button
          type="button"
          onClick={handleCopyPRD}
          className="btn text-sm text-slate-300 hover:text-white"
          aria-live="polite"
        >
          {copied ? 'PRD copied ✓' : 'Copy PRD'}
        </button>

        <button
          type="button"
          disabled
          title="Coming soon"
          className="btn text-sm text-slate-500 border border-white/10 cursor-not-allowed"
        >
          Export .zip (soon)
        </button>
      </div>

      {/* PRD preview */}
      <div className="mt-6 rounded-xl border border-white/10 bg-slate-950/40 p-4">
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Spec preview
        </div>
        <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-900/60 p-3 text-xs text-slate-200">
          {prd}
        </pre>
      </div>
    </article>
  )
}
