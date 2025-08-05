'use client'

import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="w-full z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-md sticky top-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 md:h-20">
          {/* Site branding */}
          <div>
            <Logo />
          </div>

          {/* Desktop navigation (centered, only on md+) */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-center flex-wrap items-center">
              <li>
                <Link className="font-medium text-sm text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/integrations">
                  Integrations
                </Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/customers">
                  Customers
                </Link>
              </li>
              <li>
                <Link className="font-medium text-sm text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out" href="/changelog">
                  Changelog
                </Link>
              </li>
            </ul>
          </nav>

          {/* All right-side controls, spaced and shifted right */}
          <div className="flex items-center ml-auto gap-x-3 md:gap-x-4">
            <Link
              className="font-medium text-sm text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white whitespace-nowrap transition duration-150 ease-in-out"
              href="/signin"
            >
              Sign in
            </Link>
            <Link
              className="btn-sm bg-white text-purple-700 border border-purple-100 hover:bg-purple-50 hover:text-purple-900 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition duration-150 ease-in-out w-full group relative rounded-full shadow"
              href="/signup"
            >
              <span className="relative inline-flex items-center">
                Sign up{' '}
                <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  -&gt;
                </span>
              </span>
            </Link>
            {/* ThemeToggle only shows on desktop */}
            <span className="hidden md:block">
              <ThemeToggle />
            </span>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
