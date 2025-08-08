'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }) => {
      if (!mobileNav.current || !trigger.current) return
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return
      setMobileNavOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [mobileNavOpen])

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!mobileNavOpen || key !== 'Escape') return
      setMobileNavOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [mobileNavOpen])

  return (
    <div className="md:hidden flex items-center ml-4">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className="group inline-flex w-8 h-8 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white items-center justify-center transition"
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      {/* Mobile navigation */}
      <nav
        id="mobile-nav"
        ref={mobileNav}
        className={`absolute top-full left-0 w-full px-4 sm:px-6 z-20 transition-all duration-300 ease-in-out ${
          mobileNavOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-80'
        } overflow-hidden`}
        style={
          mobileNavOpen
            ? { maxHeight: mobileNav.current?.scrollHeight || 999, opacity: 1 }
            : { maxHeight: 0, opacity: 0.8 }
        }
      >
        <ul className="
          border border-slate-200 dark:border-transparent 
          bg-white/90 dark:[background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box]
          rounded-lg px-4 py-1.5
          shadow-xl
        ">
          <li>
            <Link className="flex font-medium text-lg text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white py-2 transition-colors" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="flex font-medium text-lg text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white py-2 transition-colors" href="/integrations">
              Integrations
            </Link>
          </li>
          <li>
            <Link className="flex font-medium text-lg text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white py-2 transition-colors" href="/pricing">
              Pricing
            </Link>
          </li>
          <li>
            <Link className="flex font-medium text-lg text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white py-2 transition-colors" href="/customers">
              Customers
            </Link>
          </li>
          <li>
            <Link className="flex font-medium text-lg text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white py-2 transition-colors" href="/changelog">
              Changelog
            </Link>
          </li>
          {/* Theme Toggle only visible on mobile */}
          <li className="flex py-2 md:hidden">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  )
}
