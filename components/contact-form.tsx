'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    // Placeholder — wire to /api/contact when backend is ready
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('ok')
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-8 text-center">
        <div className="text-2xl mb-2">&#10003;</div>
        <h3 className="text-lg font-semibold text-[var(--ls-text)] mb-1">Message sent</h3>
        <p className="text-sm text-[var(--ls-text-muted)]">We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--ls-text-secondary)] mb-1" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-[var(--ls-input-border)] bg-[var(--ls-input-bg)] text-[var(--ls-text)] text-sm px-3 py-2 focus:border-[var(--ls-input-focus)] focus:ring-0 placeholder:text-[var(--ls-text-muted)]"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ls-text-secondary)] mb-1" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-[var(--ls-input-border)] bg-[var(--ls-input-bg)] text-[var(--ls-text)] text-sm px-3 py-2 focus:border-[var(--ls-input-focus)] focus:ring-0 placeholder:text-[var(--ls-text-muted)]"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ls-text-secondary)] mb-1" htmlFor="reason">
          Reason
        </label>
        <select
          id="reason"
          name="reason"
          className="w-full rounded-lg border border-[var(--ls-input-border)] bg-[var(--ls-input-bg)] text-[var(--ls-text)] text-sm px-3 py-2 focus:border-[var(--ls-input-focus)] focus:ring-0"
        >
          <option value="general">General inquiry</option>
          <option value="support">Support</option>
          <option value="partnerships">Partnerships</option>
          <option value="press">Press</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ls-text-secondary)] mb-1" htmlFor="message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-[var(--ls-input-border)] bg-[var(--ls-input-bg)] text-[var(--ls-text)] text-sm px-3 py-2 focus:border-[var(--ls-input-focus)] focus:ring-0 placeholder:text-[var(--ls-text-muted)]"
          placeholder="How can we help?"
        />
      </div>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn w-full text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] transition disabled:opacity-50 shadow-sm"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
