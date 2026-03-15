import type { Metadata } from 'next'
import Link from 'next/link'
import AuthLogo from '../auth-logo'
import OAuthButtons from '../oauth-buttons'

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
        <OAuthButtons mode="signup" />
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
