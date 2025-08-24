// components/contact-form.tsx
'use client'

import { useState } from 'react'

type Reason =
  | 'sales'
  | 'support'
  | 'partnerships'
  | 'press'
  | 'billing'
  | 'security'
  | 'other'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setStatus('sending')

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    // Honeypot check (if filled, assume bot)
    if (payload['company_website']) {
      setStatus('ok')
      form.reset()
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('ok')
      form.reset()
    } catch (err: any) {
      setStatus('error')
      setError(err?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm text-slate-300" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-200 outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Your full name"
        />
      </div>

      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm text-slate-300" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-200 outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="you@company.com"
        />
      </div>

      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm text-slate-300" htmlFor="company">
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-200 outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Company name"
        />
      </div>

      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm text-slate-300" htmlFor="website">
          Website (optional)
        </label>
        <input
          id="website"
          name="website"
          type="url"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-200 outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="https://"
        />
      </div>

      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm text-slate-300" htmlFor="reason">
          Reason
        </label>
        <select
          id="reason"
          name="reason"
          defaultValue="sales"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-200 outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="sales">Sales</option>
          <option value="support">Support</option>
          <option value="partnerships">Partnerships</option>
          <option value="press">Press</option>
          <option value="billing">Billing</option>
          <option value="security">Security</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="sm:col-span-1">
        <label className="mb-1 block text-sm text-slate-300" htmlFor="topic">
          Topic (optional)
        </label>
        <input
          id="topic"
          name="topic"
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-200 outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="What is this about?"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm text-slate-300" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-200 outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Tell us a bit more…"
        />
      </div>

      {/* Honeypot (hidden from humans) */}
      <div className="hidden">
        <label htmlFor="company_website">Company Website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2 flex items-start gap-2">
        <input id="agree" name="agree" type="checkbox" required className="mt-1 h-4 w-4" />
        <label htmlFor="agree" className="text-sm text-slate-300">
          I agree to the processing of my data to respond to this inquiry.
        </label>
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center rounded-lg bg-violet-500 px-5 py-3 font-medium text-white hover:bg-violet-400 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>

      {status === 'ok' && (
        <p className="sm:col-span-2 text-sm text-teal-400">Thanks — your message has been sent.</p>
      )}
      {status === 'error' && (
        <p className="sm:col-span-2 text-sm text-rose-400">Error: {error}</p>
      )}
    </form>
  )
}
