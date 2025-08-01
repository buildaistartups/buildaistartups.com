'use client'

import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 md:h-20">
          {/* Site branding */}
          <div>
            <Logo />
          </div>
          
          {/* Spacer to push controls to the far right */}
          <div className="flex-1" />

          {/* Right-side controls */}
          <div className="flex items-center gap-x-3 md:gap-x-4">
            <Link
              className="font-medium text-sm text-slate-300 hover:text-white whitespace-nowrap transition duration-150 ease-in-out"
              href="/signin"
            >
              Sign in
            </Link>
            <Link
              className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
              href="/signup"
            >
              <span className="relative inline-flex items-center">
                Sign up{' '}
                <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  -&gt;
                </span>
              </span>
            </Link>
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
