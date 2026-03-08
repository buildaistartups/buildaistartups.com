import type { Metadata } from 'next'
import Link from 'next/link'
import AuthLogo from '../auth-logo'

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your Build AI Startups password.',
  robots: { index: false, follow: true },
}

export default function ResetPassword() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <AuthLogo />
        <h1 className="h2 bg-clip-text text-transparent bg-linear-to-r from-[var(--ls-text-heading)]/60 via-[var(--ls-text-heading)] to-[var(--ls-text-heading)]/60">
          Reset your password
        </h1>
        <p className="mt-3 text-[var(--ls-text-muted)]">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        <form className="rounded-2xl border border-[var(--ls-card-border)] bg-[var(--ls-card-bg)] p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--ls-text-secondary)] font-medium mb-1" htmlFor="email">Email</label>
              <input id="email" className="form-input w-full" type="email" required placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-6">
            <button className="btn text-sm text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] w-full shadow-xs group">
              Send Reset Link
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <Link className="text-sm font-medium text-[var(--ls-accent-text)] hover:text-[var(--ls-accent-hover)] transition" href="/signin">
            &larr; Back to sign in
          </Link>
        </div>
      </div>
    </>
  )
}
