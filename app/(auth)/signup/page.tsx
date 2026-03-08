import type { Metadata } from 'next'
import Link from 'next/link'
import AuthLogo from '../auth-logo'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your free Build AI Startups account.',
  robots: { index: false, follow: true },
}

export default function SignUp() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <AuthLogo />
        <h1 className="h2 text-[var(--ls-text)]">
          Create your free account
        </h1>
        <p className="mt-3 text-[var(--ls-text-muted)]">
          Start tracking your startup with evidence, not vibes.
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        <form className="rounded-2xl border border-[var(--ls-card-border)] bg-[var(--ls-card-bg)] p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--ls-text-secondary)] font-medium mb-1" htmlFor="name">Name <span className="text-red-500">*</span></label>
              <input id="name" className="form-input w-full" type="text" required placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm text-[var(--ls-text-secondary)] font-medium mb-1" htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input id="email" className="form-input w-full" type="email" required placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm text-[var(--ls-text-secondary)] font-medium mb-1" htmlFor="password">Password <span className="text-red-500">*</span></label>
              <input id="password" className="form-input w-full" type="password" autoComplete="new-password" required />
            </div>
          </div>
          <div className="mt-6">
            <button className="btn text-sm text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] w-full shadow-xs group">
              Create Account <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <div className="text-sm text-[var(--ls-text-muted)]">
            Already have an account?{' '}
            <Link className="font-medium text-[var(--ls-accent-text)] hover:text-[var(--ls-accent-hover)] transition" href="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
