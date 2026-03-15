import type { Metadata } from 'next'
import Link from 'next/link'
import AuthLogo from '../auth-logo'
import OAuthButtons from '../oauth-buttons'

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
        <h1 className="h2 text-[var(--ls-text)]">
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
        <OAuthButtons mode="signin" />
      </div>
    </>
  )
}
