'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return
      setMobileNavOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return
      setMobileNavOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className="md:hidden flex items-center ml-4">
      <button
        ref={trigger}
        className={`group inline-flex w-8 h-8 text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] text-center items-center justify-center transition`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-4 h-4 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <rect
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] group-aria-expanded:rotate-[315deg] group-aria-expanded:translate-y-0"
            y="7" width="16" height="2" rx="1"
          />
          <rect
            className="origin-center group-aria-expanded:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]"
            y="7" width="16" height="2" rx="1"
          />
          <rect
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px] group-aria-expanded:rotate-[135deg] group-aria-expanded:translate-y-0"
            y="7" width="16" height="2" rx="1"
          />
        </svg>
      </button>

      <nav
        id="mobile-nav"
        ref={mobileNav}
        className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
        style={mobileNavOpen ? { maxHeight: mobileNav.current?.scrollHeight ?? 0, opacity: 1 } : { maxHeight: 0, opacity: 0.8 }}
      >
        <ul className="rounded-lg border border-[var(--ls-border)] bg-[var(--ls-bg-alt)] px-4 py-1.5 shadow-lg">
          <li>
            <Link className="flex font-medium text-sm text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] py-1.5" href="/pricing" onClick={() => setMobileNavOpen(false)}>
              Pricing
            </Link>
          </li>
          <li>
            <Link className="flex font-medium text-sm text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] py-1.5" href="/about" onClick={() => setMobileNavOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link className="flex font-medium text-sm text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] py-1.5" href="/contact" onClick={() => setMobileNavOpen(false)}>
              Contact
            </Link>
          </li>
          <li className="border-t border-[var(--ls-border)] my-1.5"></li>
          <li>
            <Link className="flex font-medium text-sm text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] py-1.5" href="/signin" onClick={() => setMobileNavOpen(false)}>
              Sign in
            </Link>
          </li>
          <li>
            <Link className="flex font-medium text-sm text-[var(--ls-accent)] hover:text-[var(--ls-accent-hover)] py-1.5" href="/signup" onClick={() => setMobileNavOpen(false)}>
              Start Free &rarr;
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
