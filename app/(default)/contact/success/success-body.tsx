// app/(default)/contact/success/success-body.tsx
'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'

export function SuccessBody() {
  const qs = useSearchParams()
  const reason = (qs.get('reason') || 'general').toLowerCase()

  const byReason: Record<string, ReactNode> = {
    sales: (
      <p className="mt-8 text-slate-300">
        While you wait, you can compare plans on the{' '}
        <Link href="/pricing" className="text-sky-300 hover:underline">pricing page</Link> or
        start a free build in the{' '}
        <Link href="/generate" className="text-sky-300 hover:underline">Builder</Link>.
      </p>
    ),
    support: (
      <p className="mt-8 text-slate-300">
        You might find answers in our{' '}
        <Link href="/resources/docs" className="text-sky-300 hover:underline">Docs</Link> and{' '}
        <Link href="/resources/changelog" className="text-sky-300 hover:underline">Changelog</Link>. We’ll reply soon.
      </p>
    ),
    partnerships: (
      <p className="mt-8 text-slate-300">
        Thanks for your interest in partnering. Review our{' '}
        <Link href="/integrations" className="text-sky-300 hover:underline">Integrations</Link> and{' '}
        <Link href="/product/api" className="text-sky-300 hover:underline">API</Link> while we review your note.
      </p>
    ),
    press: (
      <p className="mt-8 text-slate-300">
        Our{' '}
        <Link href="/resources/press" className="text-sky-300 hover:underline">Press Kit</Link> includes brand assets and the 3-minute demo.
        We’ll get back to you shortly.
      </p>
    ),
    billing: (
      <p className="mt-8 text-slate-300">
        For common billing questions, see{' '}
        <Link href="/pricing" className="text-sky-300 hover:underline">Pricing</Link>. We’ll follow up if we need more info.
      </p>
    ),
    security: (
      <p className="mt-8 text-slate-300">
        Thanks for your report. Our security team will respond quickly. You can also review our{' '}
        <Link href="/legal/security" className="text-sky-300 hover:underline">Security policy</Link>.
      </p>
    ),
    other: <p className="mt-8 text-slate-300">Thanks for reaching out — we’ll be in touch soon.</p>,
    general: <p className="mt-8 text-slate-300">Thanks for reaching out — we’ll be in touch soon.</p>,
  }

  return byReason[reason] ?? byReason.general
}
