'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function OAuthButtons({ mode }: { mode: 'signin' | 'signup' }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleOAuth(provider: 'github' | 'google') {
    setLoading(provider)
    setError(null)
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(null)
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setLoading('magic')
    setError(null)
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(null)
    } else {
      setMagicLinkSent(true)
      setLoading(null)
    }
  }

  if (magicLinkSent) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 text-center">
        <div className="text-3xl mb-3">✉️</div>
        <h3 className="text-base font-semibold text-[var(--ls-text)] mb-1">Check your email</h3>
        <p className="text-sm text-[var(--ls-text-muted)] mb-3">
          We sent a sign-in link to <strong className="text-[var(--ls-text-secondary)]">{email}</strong>
        </p>
        <p className="text-xs text-[var(--ls-text-muted)]">
          Click the link in the email to sign in. It expires in 24 hours.
        </p>
        <button
          onClick={() => { setMagicLinkSent(false); setEmail(''); }}
          className="text-xs text-[var(--ls-accent-text)] hover:underline mt-3 inline-block"
        >
          Use a different email
        </button>
      </div>
    )
  }

  const label = mode === 'signin' ? 'Sign in' : 'Sign up'

  return (
    <div className="space-y-3">
      {/* Magic link */}
      <form onSubmit={handleMagicLink}>
        <label className="block text-sm font-medium text-[var(--ls-text-secondary)] mb-1.5">
          Email
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="form-input flex-1 rounded-lg text-sm"
          />
          <button
            type="submit"
            disabled={loading !== null}
            className="btn-sm text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] transition shrink-0 disabled:opacity-50 px-4"
          >
            {loading === 'magic' ? 'Sending...' : 'Send link'}
          </button>
        </div>
        <p className="text-xs text-[var(--ls-text-muted)] mt-1.5">
          We&apos;ll email you a magic link to sign in — no password needed.
        </p>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="border-t border-[var(--ls-border)] grow mr-3" aria-hidden="true" />
        <div className="text-xs text-[var(--ls-text-muted)]">or continue with</div>
        <div className="border-t border-[var(--ls-border)] grow ml-3" aria-hidden="true" />
      </div>

      {/* OAuth buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleOAuth('github')}
          disabled={loading !== null}
          className="btn text-[var(--ls-text)] border border-[var(--ls-border)] bg-[var(--ls-card-bg)] hover:bg-[var(--ls-bg-alt)] transition h-10 text-sm disabled:opacity-50"
        >
          <svg className="w-4 h-4 fill-current mr-2 shrink-0" viewBox="0 0 16 16">
            <path d="M8 .2C3.6.2 0 3.8 0 8.2c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V14c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6C16 3.8 12.4.2 8 .2z" />
          </svg>
          {loading === 'github' ? '...' : 'GitHub'}
        </button>

        <button
          onClick={() => handleOAuth('google')}
          disabled={loading !== null}
          className="btn text-[var(--ls-text)] border border-[var(--ls-border)] bg-[var(--ls-card-bg)] hover:bg-[var(--ls-bg-alt)] transition h-10 text-sm disabled:opacity-50"
        >
          <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {loading === 'google' ? '...' : 'Google'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 text-center mt-2">{error}</p>
      )}

      {/* Legal */}
      <p className="text-center text-xs text-[var(--ls-text-muted)] mt-4">
        By continuing, you agree to our{' '}
        <a href="/legal/terms" className="underline hover:text-[var(--ls-text-secondary)]">Terms</a>{' '}
        and{' '}
        <a href="/legal/privacy" className="underline hover:text-[var(--ls-text-secondary)]">Privacy Policy</a>.
      </p>
    </div>
  )
}
