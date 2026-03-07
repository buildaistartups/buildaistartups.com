'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close when clicking outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }) => {
      if (!mobileNav.current || !trigger.current) return
      if (!mobileNavOpen) return
      if (mobileNav.current.contains(target as Node)) return
      if (trigger.current.contains(target as Node)) return
      setMobileNavOpen(false)
      trigger.current?.focus()
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [mobileNavOpen])

  // Close on Escape
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!mobileNavOpen || key !== 'Escape') return
      setMobileNavOpen(false)
      trigger.current?.focus()
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [mobileNavOpen])

  // Close when the route changes
  useEffect(() => {
    if (mobileNavOpen) setMobileNavOpen(false)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent body scroll when menu is open
  useEffect(() => {
    const html = document.documentElement
    if (mobileNavOpen) {
      const prev = html.style.overflow
      html.style.overflow = 'hidden'
      return () => {
        html.style.overflow = prev
      }
    }
  }, [mobileNavOpen])

  const closeMenu = () => setMobileNavOpen(false)

  return (
    <div className="md:hidden ml-4 flex items-center">
      {/* Hamburger */}
      <button
        ref={trigger}
        className="group inline-flex h-8 w-8 items-center justify-center text-slate-300 transition hover:text-white"
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMobileNavOpen((o) => !o)}
      >
        <span className="sr-only">Menu</span>
        <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
          {mobileNavOpen ? (
            <path d="M4.222 4.222a1 1 0 0 1 1.414 0L10 8.586l4.364-4.364a1 1 0 0 1 1.414 1.414L11.414 10l4.364 4.364a1 1 0 0 1-1.414 1.414L10 11.414l-4.364 4.364a1 1 0 1 1-1.414-1.414L8.586 10 4.222 5.636a1 1 0 0 1 0-1.414Z" />
          ) : (
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          )}
        </svg>
      </button>

      {/* Panel */}
      <nav
        id="mobile-nav"
        ref={mobileNav}
        className={`absolute left-0 top-full z-20 w-full px-4 transition-all duration-300 ease-in-out sm:px-6 ${
          mobileNavOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-80'
        } overflow-hidden`}
        style={
          mobileNavOpen
            ? { maxHeight: mobileNav.current?.scrollHeight || 999, opacity: 1 }
            : { maxHeight: 0, opacity: 0.8 }
        }
      >
        <ul className="rounded-lg border border-transparent px-4 py-1.5 [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box]">
          {/* Primary CTA */}
          <li className="pt-2">
            <Link
              href="/generate"
              onClick={closeMenu}
              className="btn group relative w-full whitespace-nowrap text-center text-slate-300 transition hover:text-white [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/30"
            >
              <span className="relative inline-flex items-center justify-center">
                Generate Startup
                <span className="ml-1 translate-x-0 text-purple-500 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                  -&gt;
                </span>
              </span>
            </Link>
          </li>

          {/* Product */}
          <Section title="Product" />
          <Item href="/product/builder" onClick={closeMenu}>Builder</Item>
          <Item href="/product/ecosystem" onClick={closeMenu}>Ecosystem</Item>
          <Item href="/product/marketplace" onClick={closeMenu}>Marketplace</Item>
          <Item href="/product/api" onClick={closeMenu}>API</Item>

          {/* Solutions */}
          <Section title="Solutions" />
          <Item href="/solutions/indie" onClick={closeMenu}>Indie Makers</Item>
          <Item href="/solutions/startups" onClick={closeMenu}>Product Teams</Item>
          <Item href="/solutions/investors" onClick={closeMenu}>Investors</Item>
          <Item href="/solutions/accelerators" onClick={closeMenu}>Accelerators &amp; Universities</Item>

          {/* Resources */}
          <Section title="Resources" />
          <Item href="/resources/docs" onClick={closeMenu}>Docs</Item>
          <Item href="/resources/templates" onClick={closeMenu}>Templates</Item>
          <Item href="/resources/roadmap" onClick={closeMenu}>Roadmap</Item>
          <Item href="/resources/blog" onClick={closeMenu}>Blog</Item>
          <Item href="/changelog" onClick={closeMenu}>Changelog</Item>
          <Item href="/resources/press" onClick={closeMenu}>Press Kit</Item>

          {/* Pricing */}
          <Section title="Pricing" />
          <Item href="/pricing" onClick={closeMenu}>Pricing &amp; Plans</Item>

          {/* Company */}
          <Section title="Company" />
          <Item href="/about" onClick={closeMenu}>About</Item>
          <Item href="/contact" onClick={closeMenu}>Contact</Item>

          {/* Theme (mobile-only) */}
          <li className="flex py-2 md:hidden">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  )
}

/** Small helpers */
function Section({ title }: { title: string }) {
  return <li className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</li>
}
function Item({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex py-2 text-lg font-medium text-slate-300 transition hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}
