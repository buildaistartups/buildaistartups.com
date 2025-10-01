// app/(auth)/reset-password/page.tsx
import type { Metadata } from 'next'
import AuthLogo from '../auth-logo'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'
const CANON = `${SITE}/reset-password`
const OG = '/brand/og-default.png'

export const metadata: Metadata = {
  title: 'Reset password — Build AI Startups',
  description:
    'Forgot your password? Request a secure reset link to regain access to your Build AI Startups account.',
  alternates: { canonical: CANON },
  robots: { index: false, follow: true }, // auth recovery pages should not be indexed
  openGraph: {
    type: 'website',
    url: CANON,
    title: 'Reset password — Build AI Startups',
    description:
      'Request a secure reset link to regain access to your Build AI Startups account.',
    images: [{ url: OG, width: 1200, height: 630, alt: 'Build AI Startups' }],
    siteName: 'Build AI Startups',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reset password — Build AI Startups',
    description:
      'Request a secure reset link to regain access to your Build AI Startups account.',
    images: [OG],
  },
}

export default function ResetPassword() {
  return (
    <>
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        {/* Logo */}
        <AuthLogo />
        {/* Page title */}
        <h1 className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Reset your password
        </h1>
        <p className="mt-3 text-slate-400">
          Enter the email associated with your account and we’ll send you a reset link.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-sm mx-auto">
        <form method="POST" action="/api/auth/reset-password" className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="form-input w-full"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-xs group"
              type="submit"
            >
              Reset password
              <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            If an account exists for this email, you’ll receive a message with instructions to reset your password.
          </p>
        </form>
      </div>
    </>
  )
}
