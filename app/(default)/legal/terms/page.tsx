import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Build AI Startups.',
}

export default function TermsPage() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="h2 bg-clip-text text-transparent bg-linear-to-r from-[var(--ls-text-heading)]/60 via-[var(--ls-text-heading)] to-[var(--ls-text-heading)]/60 pb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-[var(--ls-text-muted)] mb-8">Last updated: March 2026</p>
            <div className="space-y-4 text-[var(--ls-text-secondary)] text-sm leading-relaxed">
              <p>
                These Terms of Service govern your use of Build AI Startups (&quot;the Service&quot;),
                operated as an open project at buildaistartups.com.
              </p>
              <p>
                This page is a placeholder. The full legal text will be published before the product launches publicly.
                If you have questions about our terms, please{' '}
                <Link href="/contact" className="text-[var(--ls-accent-text)] hover:underline">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
