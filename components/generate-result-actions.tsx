// components/generate-result-actions.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function GenerateResultActions({
  seed,
  prd,
}: {
  seed: string
  prd: string
}) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  // Clean up any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(prd)
      } else {
        // Fallback for older browsers
        const el = document.createElement('textarea')
        el.value = prd
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      setCopied(true)
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // no-op
    }
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2" aria-live="polite">
      <Link
        href={`/product/builder?seed=${encodeURIComponent(seed)}`}
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
        onClick={handleCopy}
        className="btn text-sm text-slate-300 hover:text-white"
        aria-label="Copy the generated PRD to clipboard"
        data-copy-state={copied ? 'copied' : 'idle'}
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
