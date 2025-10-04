'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [signedIn, setSignedIn] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hasSid = document.cookie.split('; ').some((c) => c.startsWith('sid='))
    setSignedIn(hasSid)
    const refresh = () => {
      const has = document.cookie.split('; ').some((c) => c.startsWith('sid='))
      setSignedIn(has)
    }
    window.addEventListener('visibilitychange', refresh)
    window.addEventListener('focus', refresh)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenDropdown(null) }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('visibilitychange', refresh)
      window.removeEventListener('focus', refresh)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenDropdown(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const focusFirstItem = useCallback((btn: HTMLButtonElement | null) => {
    if (!btn) return
    const panel = btn.nextElementSibling as HTMLElement | null
    const firstLink = panel?.querySelector('a') as HTMLAnchorElement | null
    firstLink?.focus()
  }, [])

  const onMenuKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      focusFirstItem(e.currentTarget)
      setOpenDropdown(e.currentTarget.dataset.dropdown || null)
    }
  }, [focusFirstItem])

  const toggleDropdown = (name: string) => setOpenDropdown((cur) => (cur === name ? null : name))
  const closeDropdown = () => setOpenDropdown(null)

  return (
    <header className="absolute z-30 w-full" ref={headerRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center md:h-20">
          <div><Logo /></div>

          <nav className="hidden md:flex md:grow">
            <ul className="flex grow flex-wrap items-center justify-center">
              {/* Product */}
              <li className="relative mx-2 lg:mx-3" onMouseLeave={closeDropdown}>
                <button
                  type="button"
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:text-white focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === 'product'}
                  aria-controls="menu-product"
                  data-dropdown="product"
                  onKeyDown={onMenuKeyDown}
                  onMouseEnter={() => setOpenDropdown('product')}
                  onClick={() => toggleDropdown('product')}
                >
                  Product
                  <svg className="ml-1 h-4 w-4 transition-transform duration-150" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>
                <div
                  id="menu-product"
                  role="menu"
                  className={`absolute left-1/2 z-40 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-xl backdrop-blur transition-all duration-150 ${openDropdown === 'product' ? 'visible opacity-100' : 'invisible opacity-0'}`}
                  onMouseEnter={() => setOpenDropdown('product')}
                >
                  <MenuItem href="/product/builder" title="Builder" desc="From brief to repo on demand" onClose={closeDropdown} />
                  <MenuItem href="/product/ecosystem" title="Ecosystem" desc="Network effects" onClose={closeDropdown} />
                  <MenuItem href="/product/marketplace" title="Marketplace" desc="Buy & sell startups" onClose={closeDropdown} />
                  <MenuItem href="/product/api" title="API" desc="Developer tools" onClose={closeDropdown} />
                </div>
              </li>

              {/* Solutions */}
              <li className="relative mx-2 lg:mx-3" onMouseLeave={closeDropdown}>
                <button
                  type="button"
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:text-white focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === 'solutions'}
                  aria-controls="menu-solutions"
                  data-dropdown="solutions"
                  onKeyDown={onMenuKeyDown}
                  onMouseEnter={() => setOpenDropdown('solutions')}
                  onClick={() => toggleDropdown('solutions')}
                >
                  Solutions
                  <svg className="ml-1 h-4 w-4 transition-transform duration-150" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>
                <div
                  id="menu-solutions"
                  role="menu"
                  className={`absolute left-1/2 z-40 mt-3 w-[680px] -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-4 shadow-xl backdrop-blur transition-all duration-150 ${openDropdown === 'solutions' ? 'visible opacity-100' : 'invisible opacity-0'}`}
                  onMouseEnter={() => setOpenDropdown('solutions')}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4">
                      <div className="text-slate-400 text-[11px] mb-2 tracking-wider">BY ROLE</div>
                      <ul className="space-y-3">
                        <MenuItem href="/solutions/indie-makers" title="Indie Makers" desc="Solo founders" onClose={closeDropdown} />
                        <MenuItem href="/solutions/startups" title="Product Teams" desc="Enterprise teams" onClose={closeDropdown} />
                        <MenuItem href="/solutions/investors" title="Investors" desc="Portfolio tools" onClose={closeDropdown} />
                        <MenuItem href="/solutions/accelerators" title="Accelerators & Universities" desc="Cohort management" onClose={closeDropdown} />
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4">
                      <div className="text-slate-400 text-[11px] mb-2 tracking-wider">BY USE CASE</div>
                      <ul className="space-y-3">
                        <MenuItem href="/vertical/ai-leadgen" title="Lead Gen Pipeline" desc="AI sales" onClose={closeDropdown} />
                        <MenuItem href="/vertical/ai-support" title="Support Copilot" desc="AI support" onClose={closeDropdown} />
                      </ul>
                      <div className="text-[11px] text-slate-500 mt-4">Examples, not limits.</div>
                    </div>
                  </div>
                </div>
              </li>

              {/* Resources */}
              <li className="relative mx-2 lg:mx-3" onMouseLeave={closeDropdown}>
                <button
                  type="button"
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:text-white focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === 'resources'}
                  aria-controls="menu-resources"
                  data-dropdown="resources"
                  onKeyDown={onMenuKeyDown}
                  onMouseEnter={() => setOpenDropdown('resources')}
                  onClick={() => toggleDropdown('resources')}
                >
                  Resources
                  <svg className="ml-1 h-4 w-4 transition-transform duration-150" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>
                <div
                  id="menu-resources"
                  role="menu"
                  className={`absolute left-1/2 z-40 mt-3 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-xl backdrop-blur transition-all duration-150 ${openDropdown === 'resources' ? 'visible opacity-100' : 'invisible opacity-0'}`}
                  onMouseEnter={() => setOpenDropdown('resources')}
                >
                  <MenuItem href="/resources/docs" title="Docs" desc="Documentation" onClose={closeDropdown} />
                  <MenuItem href="/resources/templates" title="Templates" desc="Starter kits" onClose={closeDropdown} />
                  <MenuItem href="/resources/roadmap" title="Roadmap" desc="What's next" onClose={closeDropdown} />
                  <MenuItem href="/resources/blog" title="Blog" desc="Updates & guides" onClose={closeDropdown} />
                  <MenuItem href="/resources/changelog" title="Changelog" desc="Release notes" onClose={closeDropdown} />
                  <MenuItem href="/resources/press" title="Press Kit" desc="Media resources" onClose={closeDropdown} />
                </div>
              </li>

              {/* Pricing */}
              <li className="mx-2 lg:mx-3">
                <Link className="mx-1 whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/pricing" onMouseEnter={closeDropdown}>
                  Pricing
                </Link>
              </li>

              {/* About */}
              <li className="mx-2 lg:mx-3">
                <Link className="mx-1 whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/about" onMouseEnter={closeDropdown}>
                  About
                </Link>
              </li>

              {/* Contact */}
              <li className="mx-2 lg:mx-3">
                <Link className="mx-1 whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/contact" onMouseEnter={closeDropdown}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-x-3 md:gap-x-4">
            <Link className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white" href={signedIn ? '/app' : '/signin'} onMouseEnter={closeDropdown}>
              {signedIn ? 'Dashboard' : 'Sign in'}
            </Link>

            <Link
              className="btn-sm group relative w-full whitespace-nowrap text-slate-300 transition duration-150 ease-in-out hover:text-white [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/30"
              href="/generate"
              onMouseEnter={closeDropdown}
            >
              <span className="relative inline-flex items-center">
                Generate Startup
                <span className="ml-1 translate-x-0 text-purple-500 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">-&gt;</span>
              </span>
            </Link>

            <span className="hidden md:block" onMouseEnter={closeDropdown}>
              <ThemeToggle />
            </span>

            <div onMouseEnter={closeDropdown}>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function MenuItem({ href, title, desc, onClose }: { href: string; title: string; desc: string; onClose: () => void }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5 focus:bg-white/5 focus:outline-none"
      role="menuitem"
      tabIndex={0}
      onClick={onClose}
    >
      <div className="text-sm font-medium text-slate-100">{title}</div>
      <div className="text-xs text-slate-400">{desc}</div>
    </Link>
  )
}
