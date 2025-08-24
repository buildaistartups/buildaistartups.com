// components/generate-result-actions.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GenerateResultActions({
  seed,
  prd,
}: {
  seed: string
  prd: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prd)
      setCopied(true)
      const t = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(t)
    } catch {
      // no-op
    }
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <Link
        href={`/product/builder?seed=${encodeURIComponent(seed)}`}
        className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 shadow-xs"
      >
        Launch with Autopilot
      </Link>

      {/* Auth-gated via /generate/saved server page */}
      <Link href="/generate/saved" className="btn text-sm text-slate-300 hover:text-white">
        Save to dashboard
      </Link>

      <button
        type="button"
        onClick={handleCopy}
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
  )
}
