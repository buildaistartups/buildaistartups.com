import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Build AI Startups.',
}

export default function PrivacyPage() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="h2 text-[var(--ls-text)] pb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-[var(--ls-text-muted)] mb-8">Last updated: March 2026</p>
            <div className="space-y-4 text-[var(--ls-text-secondary)] text-sm leading-relaxed">
              <p>
                This Privacy Policy explains how Build AI Startups collects, uses, and protects your personal information.
              </p>
              <p>
                This page is a placeholder. The full privacy policy will be published before the product launches publicly.
                If you have questions, please{' '}
                <Link href="/contact" className="text-[var(--ls-accent-text)] hover:underline">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
