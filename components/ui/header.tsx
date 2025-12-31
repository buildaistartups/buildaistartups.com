'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  // PHASE 1: Auth state is not needed yet as there is no dashboard login
  /* const [signedIn, setSignedIn] = useState(false)
  useEffect(() => { ...auth logic... }, [])
  */
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Dropdown closing logic (Keep this for later when you re-enable dropdowns)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenDropdown(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard nav logic (Keep for accessibility later)
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
              
              {/* PHASE 1 HIDDEN: PRODUCT DROPDOWN
              <li className="relative mx-2 lg:mx-3" onMouseLeave={closeDropdown}>
                 ... Button & Dropdown Code ...
              </li>
              */}

              {/* PHASE 1 HIDDEN: SOLUTIONS DROPDOWN
              <li className="relative mx-2 lg:mx-3" onMouseLeave={closeDropdown}>
                 ... Button & Dropdown Code ...
              </li>
              */}

              {/* PHASE 1 HIDDEN: RESOURCES DROPDOWN
              <li className="relative mx-2 lg:mx-3" onMouseLeave={closeDropdown}>
                 ... Button & Dropdown Code ...
              </li>
              */}

              {/* Pricing - KEEP THIS */}
              <li className="mx-2 lg:mx-3">
                <Link
                  className="mx-1 whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white"
                  href="/pricing"
                  onMouseEnter={closeDropdown}
                >
                  Pricing
                </Link>
              </li>

              {/* About - KEEP THIS */}
              <li className="mx-2 lg:mx-3">
                <Link
                  className="mx-1 whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white"
                  href="/about"
                  onMouseEnter={closeDropdown}
                >
                  About
                </Link>
              </li>

            </ul>
          </nav>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-x-3 md:gap-x-4">
            
            {/* PHASE 1 HIDDEN: DASHBOARD/SIGN IN 
            <Link
              className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white"
              href={signedIn ? '/app' : '/signin'}
              onMouseEnter={closeDropdown}
            >
              {signedIn ? 'Dashboard' : 'Sign in'}
            </Link>
            */}

            {/* CTA BUTTON - Updated for Service */}
            <Link
              className="btn-sm group relative w-full whitespace-nowrap text-slate-300 transition duration-150 ease-in-out hover:text-white [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/30"
              href="/pricing" // Link directly to pricing/payment
              onMouseEnter={closeDropdown}
            >
              <span className="relative inline-flex items-center">
                Get Your Spec
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

// Helper component kept for future use (though currently unused in Phase 1 if dropdowns are hidden)
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
