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
                <p className="text-sm text-[var(--ls-text-muted)] max-w-xs">
                  Helping indie makers validate, build, and grow AI-powered micro-SaaS with structured evidence.
                </p>
                <div className="text-sm text-[var(--ls-text-muted)] mt-3">
                  &copy; {new Date().getFullYear()} Build AI Startups. All rights reserved.
                </div>
              </div>
              {/* Social links */}
              <ul className="flex gap-2 mt-4 lg:mt-0">
                <li>
                  <a
                    className="flex justify-center items-center w-8 h-8 rounded-full text-[var(--ls-accent)] hover:text-[var(--ls-accent-hover)] transition duration-150 ease-in-out"
                    href="https://x.com/buildaistartups"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                      <path d="m6.532 4.5 1.747 2.238L11.3 4.5h1.227l-3.679 4.071L13.714 14H9.741L7.668 11.38 4.823 14H3.595l3.917-4.335L3.5 4.5h4.032Zm-.37.673H5.434l5.397 8.327h.68L6.162 5.173Z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="flex justify-center items-center w-8 h-8 rounded-full text-[var(--ls-accent)] hover:text-[var(--ls-accent-hover)] transition duration-150 ease-in-out"
                    href="https://github.com/buildaistartups"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                      <path d="M8 .2C3.6.2 0 3.8 0 8.2c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V14c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6C16 3.8 12.4.2 8 .2z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="flex justify-center items-center w-8 h-8 rounded-full text-[var(--ls-accent)] hover:text-[var(--ls-accent-hover)] transition duration-150 ease-in-out"
                    href="https://linkedin.com/company/buildaistartups"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                      <path d="M13.6 1H2.4C1.6 1 1 1.6 1 2.4v11.2c0 .8.6 1.4 1.4 1.4h11.2c.8 0 1.4-.6 1.4-1.4V2.4c0-.8-.6-1.4-1.4-1.4zM5.3 13H3.1V6.5h2.2V13zM4.2 5.6c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3zM13 13h-2.2V9.8c0-.8 0-1.8-1.1-1.8-1.1 0-1.3.9-1.3 1.7V13H6.2V6.5h2.1v.9c.3-.6 1-1.1 2.1-1.1 2.2 0 2.6 1.5 2.6 3.4V13z" />
                    </svg>
                  </a>
                </li>
              </ul>
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

          {/* Resources (future) */}
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
