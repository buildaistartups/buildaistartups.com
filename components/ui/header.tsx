'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  // Lightweight client-side check: presence of 'sid' cookie === "signed in"
  const [signedIn, setSignedIn] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const hasSid = document.cookie.split('; ').some((c) => c.startsWith('sid='))
    setSignedIn(hasSid)

    // Refresh when the tab comes into focus in case auth changed elsewhere
    const refresh = () => {
      const has = document.cookie.split('; ').some((c) => c.startsWith('sid='))
      setSignedIn(has)
    }
    window.addEventListener('visibilitychange', refresh)
    window.addEventListener('focus', refresh)
    return () => {
      window.removeEventListener('visibilitychange', refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Keyboard open helper: focus first link in the dropdown panel
  const focusFirstItem = useCallback((btn: HTMLButtonElement | null) => {
    if (!btn) return
    const panel = btn.nextElementSibling as HTMLElement | null
    const firstLink = panel?.querySelector('a') as HTMLAnchorElement | null
    firstLink?.focus()
  }, [])

  // Handle Enter/ArrowDown to open menus for keyboard users
  const onMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        focusFirstItem(e.currentTarget)
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        focusFirstItem(e.currentTarget)
      }
    },
    [focusFirstItem],
  )

  const toggleDropdown = (dropdown: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setOpenDropdown(null)
  }

  return (
    <header className="absolute z-30 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center md:h-20">
          {/* Branding */}
          <div>
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow flex-wrap items-center justify-center">
              {/* Product */}
              <li className="relative mx-2 lg:mx-3">
                <button
                  type="button"
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:text-white focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === 'product'}
                  onKeyDown={onMenuKeyDown}
                  onClick={(e) => toggleDropdown('product', e)}
                >
                  Product
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-150"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className={`absolute left-1/2 z-40 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-xl backdrop-blur transition-all duration-150 ${
                  openDropdown === 'product' ? 'visible opacity-100' : 'invisible opacity-0'
                }`}>
                  <MenuItem href="/product/builder" title="Builder" desc="From brief to repo in minutes" onClose={closeDropdown} />
                  <MenuItem href="/product/ecosystem" title="Ecosystem" desc="Startups that help each other grow" onClose={closeDropdown} />
                  <MenuItem href="/product/marketplace" title="Marketplace" desc="Launch, list, license, exit" onClose={closeDropdown} />
                  <MenuItem href="/product/api" title="API" desc="Programmatic access to the engine" onClose={closeDropdown} />
                </div>
              </li>

              {/* Solutions */}
              <li className="relative mx-2 lg:mx-3">
                <button
                  type="button"
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:text-white focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === 'solutions'}
                  onKeyDown={onMenuKeyDown}
                  onClick={(e) => toggleDropdown('solutions', e)}
                >
                  Solutions
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-150"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className={`absolute left-1/2 z-40 mt-3 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-xl backdrop-blur transition-all duration-150 ${
                  openDropdown === 'solutions' ? 'visible opacity-100' : 'invisible opacity-0'
                }`}>
                  <MenuItem href="/solutions/indie" title="Indie Makers" desc="Weekend-to-launch kits" onClose={closeDropdown} />
                  <MenuItem href="/solutions/startups" title="Product Teams" desc="Validate ideas in parallel" onClose={closeDropdown} />
                  <MenuItem href="/solutions/investors" title="Investors" desc="Continuous deal flow" onClose={closeDropdown} />
                  <MenuItem href="/solutions/accelerators" title="Accelerators & Universities" desc="Autonomous incubator" onClose={closeDropdown} />
                </div>
              </li>

              {/* Resources */}
              <li className="relative mx-2 lg:mx-3">
                <button
                  type="button"
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:text-white focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === 'resources'}
                  onKeyDown={onMenuKeyDown}
                  onClick={(e) => toggleDropdown('resources', e)}
                >
                  Resources
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-150"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className={`absolute left-1/2 z-40 mt-3 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-xl backdrop-blur transition-all duration-150 ${
                  openDropdown === 'resources' ? 'visible opacity-100' : 'invisible opacity-0'
                }`}>
                  <MenuItem href="/resources/docs" title="Docs" desc="Build faster with HyperNova" onClose={closeDropdown} />
                  <MenuItem href="/resources/templates" title="Templates" desc="Jump-start with starters" onClose={closeDropdown} />
                  <MenuItem href="/resources/roadmap" title="Roadmap" desc="What's now, next, later" onClose={closeDropdown} />
                  <MenuItem href="/resources/blog" title="Blog" desc="Build-in-public & playbooks" onClose={closeDropdown} />
                  <MenuItem href="/resources/changelog" title="Changelog" desc="Ship notes & releases" onClose={closeDropdown} />
                  <MenuItem href="/resources/press" title="Press Kit" desc="Logos, shots, bio" onClose={closeDropdown} />
                </div>
              </li>

              {/* Pricing */}
              <li className="mx-2 lg:mx-3">
                <Link
                  className="mx-1 whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>

              {/* Company */}
              <li className="relative mx-2 lg:mx-3">
                <button
                  type="button"
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:text-white focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === 'company'}
                  onKeyDown={onMenuKeyDown}
                  onClick={(e) => toggleDropdown('company', e)}
                >
                  Company
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-150"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className={`absolute left-1/2 z-40 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-xl backdrop-blur transition-all duration-150 ${
                  openDropdown === 'company' ? 'visible opacity-100' : 'invisible opacity-0'
                }`}>
                  <MenuItem href="/about" title="About" desc="Mission & principles" onClose={closeDropdown} />
                  <MenuItem href="/contact" title="Contact" desc="Say hello" onClose={closeDropdown} />
                </div>
              </li>
            </ul>
          </nav>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-x-3 md:gap-x-4">
            {/* Swap: Sign in -> Dashboard (Generate always present) */}
            <Link
              className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white"
              href={signedIn ? '/app' : '/signin'}
            >
              {signedIn ? 'Dashboard' : 'Sign in'}
            </Link>

            {/* Primary CTA — always shown */}
            <Link
              className="btn-sm group relative w-full whitespace-nowrap text-slate-300 transition duration-150 ease-in-out hover:text-white [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/30"
              href="/generate"
            >
              <span className="relative inline-flex items-center">
                Generate Startup
                <span className="ml-1 translate-x-0 text-purple-500 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
                  -&gt;
                </span>
              </span>
            </Link>

            {/* Theme toggle (desktop only) */}
            <span className="hidden md:block">
              <ThemeToggle />
            </span>

            {/* Mobile menu button */}
            <MobileMenu />
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
