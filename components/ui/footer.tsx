import Link from 'next/link'
import Logo from './logo'

export default function Footer() {
  return (
    <footer className="bg-[var(--ls-footer-bg)] border-t border-[var(--ls-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">

          {/* Brand block */}
          <div className="sm:col-span-12 lg:col-span-4 order-1 lg:order-none">
            <div className="h-full flex flex-col sm:flex-row lg:flex-col justify-between">
              <div className="mb-4 sm:mb-0">
                <div className="mb-4">
                  <Logo />
                </div>
                <div className="text-sm text-[var(--ls-text-muted)]">
                  &copy; {new Date().getFullYear()} Build AI Startups. All rights reserved.
                </div>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Project links */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-[var(--ls-text)] font-medium mb-2">Project</h6>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="text-[var(--ls-text-muted)] hover:text-[var(--ls-accent)] transition duration-150 ease-in-out" href="/pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="text-[var(--ls-text-muted)] hover:text-[var(--ls-accent)] transition duration-150 ease-in-out" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-[var(--ls-text-muted)] hover:text-[var(--ls-accent)] transition duration-150 ease-in-out" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-[var(--ls-text)] font-medium mb-2">Legal</h6>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="text-[var(--ls-text-muted)] hover:text-[var(--ls-accent)] transition duration-150 ease-in-out" href="/legal/terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="text-[var(--ls-text-muted)] hover:text-[var(--ls-accent)] transition duration-150 ease-in-out" href="/legal/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-[var(--ls-text-muted)] hover:text-[var(--ls-accent)] transition duration-150 ease-in-out" href="/legal/cookies">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-[var(--ls-text)] font-medium mb-2">Resources</h6>
            <ul className="text-sm space-y-2">
              <li>
                <Link className="text-[var(--ls-text-muted)] hover:text-[var(--ls-accent)] transition duration-150 ease-in-out" href="/signup">
                  Get Started
                </Link>
              </li>
              <li>
                <Link className="text-[var(--ls-text-muted)] hover:text-[var(--ls-accent)] transition duration-150 ease-in-out" href="/contact?reason=support">
                  Support
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
