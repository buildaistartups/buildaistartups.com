import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  return (
    <header className="absolute z-30 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Site branding */}
          <div className="flex-1">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow flex-wrap items-center justify-center">
              {[
                { href: '/about', label: 'About' },
                { href: '/integrations', label: 'Integrations' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/customers', label: 'Customers' },
                { href: '/changelog', label: 'Changelog' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    className="mx-4 text-sm font-medium text-slate-600 transition duration-150 ease-in-out hover:text-slate-900 dark:text-slate-300 dark:hover:text-white lg:mx-5"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-4">
            <li>
              <Link
                className="whitespace-nowrap text-sm font-medium text-slate-600 transition duration-150 ease-in-out hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                href="/signin"
              >
                Sign in
              </Link>
            </li>

            <li>
              <Link
                href="/signup"
                className={[
                  // Light mode (clean black pill)
                  'btn-sm group relative inline-flex w-full items-center justify-center rounded-full bg-slate-900 text-white ring-1 ring-slate-200/70 transition duration-150 ease-in-out hover:bg-slate-800 hover:ring-slate-300/80',
                  // Dark mode (original Stellar gradient pill)
                  'dark:text-slate-300 dark:hover:text-white dark:ring-0',
                  'dark:[background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box]',
                  'dark:before:absolute dark:before:inset-0 dark:before:rounded-full dark:before:bg-slate-800/30 dark:before:pointer-events-none',
                ].join(' ')}
              >
                <span className="relative inline-flex items-center">
                  Sign up{' '}
                  <span className="ml-1 tracking-normal text-purple-400 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5 dark:text-purple-500">
                    -&gt;
                  </span>
                </span>
              </Link>
            </li>

            <li>
              <ThemeToggle />
            </li>
          </ul>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
