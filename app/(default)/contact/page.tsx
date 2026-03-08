import type { Metadata } from 'next'
import ContactForm from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Build AI Startups team. Questions, feedback, partnerships — we read every message.',
}

export default function ContactPage() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="h2 bg-clip-text text-transparent bg-linear-to-r from-[var(--ls-text-heading)]/60 via-[var(--ls-text-heading)] to-[var(--ls-text-heading)]/60 pb-4">
                Get in touch
              </h1>
              <p className="text-[var(--ls-text-muted)]">
                Questions, feedback, or partnership ideas — we read every message and respond within 24 hours.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--ls-card-border)] bg-[var(--ls-card-bg)] p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
