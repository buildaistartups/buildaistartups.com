import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import ThemeToggle from './theme-toggle'

export default function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-1">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-center flex-wrap items-center">
              <li>
                <Link
                  className="font-medium text-sm text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] mx-4 lg:mx-5 transition duration-150 ease-in-out"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-sm text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] mx-4 lg:mx-5 transition duration-150 ease-in-out"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-sm text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] mx-4 lg:mx-5 transition duration-150 ease-in-out"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right controls: Sign in → Start Free → Theme Toggle */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <Link
              className="hidden md:inline-flex font-medium text-sm text-[var(--ls-text-secondary)] hover:text-[var(--ls-text)] whitespace-nowrap transition duration-150 ease-in-out"
              href="/signin"
            >
              Sign in
            </Link>
            <Link
              className="hidden md:inline-flex btn-sm text-white bg-[var(--ls-accent)] hover:bg-[var(--ls-accent-hover)] transition duration-150 ease-in-out group shadow-sm"
              href="/signup"
            >
              <span className="relative inline-flex items-center">
                Start Free{' '}
                <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  -&gt;
                </span>
              </span>
            </Link>
            {/* Theme toggle — rightmost element */}
            <ThemeToggle />

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
