'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import ThemeToggle from './ThemeToggle'

export default function HeaderClient({ signedIn }: { signedIn: boolean }) {
  const router = useRouter()

  async function handleSignOut() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    router.refresh()
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
              <li className="relative group mx-2 lg:mx-3">
                <button
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                  aria-haspopup="true"
                >
                  Product
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-150 group-hover:rotate-180"
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
                <div className="invisible absolute left-1/2 z-40 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <MenuItem href="/product/builder" title="Builder" desc="From brief to repo in minutes" />
                  <MenuItem href="/product/ecosystem" title="Ecosystem" desc="Startups that help each other grow" />
                  <MenuItem href="/product/marketplace" title="Marketplace" desc="Launch, list, license, exit" />
                  <MenuItem href="/product/api" title="API" desc="Programmatic access to the engine" />
                </div>
              </li>

              {/* Solutions */}
              <li className="relative group mx-2 lg:mx-3">
                <button
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                  aria-haspopup="true"
                >
                  Solutions
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-150 group-hover:rotate-180"
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
                <div className="invisible absolute left-1/2 z-40 mt-3 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <MenuItem href="/solutions/indie" title="Indie Makers" desc="Weekend-to-launch kits" />
                  <MenuItem href="/solutions/startups" title="Product Teams" desc="Validate ideas in parallel" />
                  <MenuItem href="/solutions/investors" title="Investors" desc="Continuous deal flow" />
                  <MenuItem href="/solutions/accelerators" title="Accelerators & Universities" desc="Autonomous incubator" />
                </div>
              </li>

              {/* Resources */}
              <li className="relative group mx-2 lg:mx-3">
                <button
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                  aria-haspopup="true"
                >
                  Resources
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-150 group-hover:rotate-180"
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
                <div className="invisible absolute left-1/2 z-40 mt-3 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <MenuItem href="/resources/docs" title="Docs" desc="Build faster with HyperNova" />
                  <MenuItem href="/resources/templates" title="Templates" desc="Jump-start with starters" />
                  <MenuItem href="/resources/roadmap" title="Roadmap" desc="What’s now, next, later" />
                  <MenuItem href="/resources/blog" title="Blog" desc="Build-in-public & playbooks" />
                  <MenuItem href="/resources/changelog" title="Changelog" desc="Ship notes & releases" />
                  <MenuItem href="/resources/press" title="Press Kit" desc="Logos, shots, bio" />
                </div>
              </li>

              {/* Pricing (single link) */}
              <li className="mx-2 lg:mx-3">
                <Link
                  className="mx-1 whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>

              {/* Company */}
              <li className="relative group mx-2 lg:mx-3">
                <button
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                  aria-haspopup="true"
                >
                  Company
                  <svg
                    className="ml-1 h-4 w-4 transition-transform duration-150 group-hover:rotate-180"
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
                <div className="invisible absolute left-1/2 z-40 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <MenuItem href="/about" title="About" desc="Mission & principles" />
                  <MenuItem href="/contact" title="Contact" desc="Say hello" />
                </div>
              </li>
            </ul>
          </nav>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-x-3 md:gap-x-4">
            {!signedIn ? (
              <Link
                className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white"
                href="/signin"
              >
                Sign in
              </Link>
            ) : (
              <>
                <Link
                  className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white"
                  href="/app"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white"
                >
                  Sign out
                </button>
              </>
            )}

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

/** Reusable dropdown item */
function MenuItem({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5 focus:bg-white/5"
    >
      <div className="text-sm font-medium text-slate-100">{title}</div>
      <div className="text-xs text-slate-400">{desc}</div>
    </Link>
  )
}
