import type { Metadata } from 'next'
import Link from 'next/link'
import AuthLogo from '../auth-logo'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Build AI Startups account.',
  robots: { index: false, follow: true },
}

export default function SignIn() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <AuthLogo />
        <h1 className="h2 bg-clip-text text-transparent bg-linear-to-r from-[var(--ls-text-heading)]/60 via-[var(--ls-text-heading)] to-[var(--ls-text-heading)]/60">
          Sign in to your account
        </h1>
        <p className="mt-3 text-[var(--ls-text-muted)]">
          New here?{' '}
          <Link href="/signup" className="font-medium text-[var(--ls-accent-text)] hover:text-[var(--ls-accent-hover)] transition">
            Create an account
          </Link>
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        <form className="rounded-2xl border border-[var(--ls-card-border)] bg-[var(--ls-card-bg)] p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--ls-text-secondary)] font-medium mb-1" htmlFor="email">Email</label>
              <input id="email" className="form-input w-full" type="email" required placeholder="you@example.com" />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="block text-sm text-[var(--ls-text-secondary)] font-medium mb-1" htmlFor="password">Password</label>
                <Link className="text-sm font-medium text-[var(--ls-accent-text)] hover:text-[var(--ls-accent-hover)] transition ml-2" href="/reset-password">
                  Forgot?
                </Link>
              </div>
              <input id="password" className="form-input w-full" type="password" autoComplete="on" required />
            </div>
          </div>
          <div className="mt-6">
            <button className="btn text-sm text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] w-full shadow-xs group">
              Sign In <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </button>
          </div>
        </form>

        <div className="flex items-center my-6">
          <div className="border-t border-[var(--ls-border)] grow mr-3" aria-hidden="true" />
          <div className="text-sm text-[var(--ls-text-muted)] italic">or</div>
          <div className="border-t border-[var(--ls-border)] grow ml-3" aria-hidden="true" />
        </div>

        {/* Social logins — to be wired with Auth.js */}
        <div className="flex space-x-3">
          <button className="btn text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] transition w-full border border-[var(--ls-border)] bg-[var(--ls-card-bg)] h-9" aria-label="Continue with GitHub">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 .2C3.6.2 0 3.8 0 8.2c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V14c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6C16 3.8 12.4.2 8 .2z" /></svg>
          </button>
          <button className="btn text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] transition w-full border border-[var(--ls-border)] bg-[var(--ls-card-bg)] h-9" aria-label="Continue with Google">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M15.68 8.18c0-.57-.05-1.12-.15-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.41v2h2.59A7.85 7.85 0 0015.68 8.18z" /><path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.98 4.98 0 01-7.42-2.63H.7v2.06A8 8 0 008 16z" /><path d="M3.28 9.43a4.82 4.82 0 010-2.86V4.51H.7a8 8 0 000 6.98l2.58-2.06z" /><path d="M8 3.18a4.33 4.33 0 013.06 1.2l2.3-2.3A7.72 7.72 0 008 0 8 8 0 00.7 4.51l2.58 2.06A4.77 4.77 0 018 3.18z" /></svg>
          </button>
        </div>
      </div>
    </>
  )
}
