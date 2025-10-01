// components/ui/header.tsx
'use client'

import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="absolute z-30 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center md:h-20">
          <div>
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow flex-wrap items-center justify-center">
              {/* Product */}
              <li className="relative group mx-2 lg:mx-3">
                <button className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white">
                  Product
                </button>
                <div className="invisible absolute left-1/2 z-40 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <MenuItem href="/product/builder" title="Builder" desc="From brief to repo" />
                  <MenuItem href="/product/ecosystem" title="Ecosystem" desc="Network effects" />
                  <MenuItem href="/product/marketplace" title="Marketplace" desc="Buy & sell startups" />
                  <MenuItem href="/product/api" title="API" desc="Developer tools" />
                </div>
              </li>

              {/* Solutions */}
              <li className="relative group mx-2 lg:mx-3">
                <button className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white">
                  Solutions
                </button>
                <div className="invisible absolute left-1/2 z-40 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <MenuItem href="/solutions/indie-makers" title="Indie Makers" desc="Solo founders" />
                  <MenuItem href="/solutions/product-teams" title="Product Teams" desc="Enterprise teams" />
                  <MenuItem href="/solutions/investors" title="Investors" desc="Portfolio tools" />
                  <MenuItem href="/solutions/accelerators" title="Accelerators & Universities" desc="Cohort management" />
                  <MenuItem href="/solutions/lead-gen" title="Lead Gen Pipeline" desc="AI sales" />
                  <MenuItem href="/solutions/support-copilot" title="Support Copilot" desc="AI support" />
                </div>
              </li>

              {/* Resources */}
              <li className="relative group mx-2 lg:mx-3">
                <button className="inline-flex items-center whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white">
                  Resources
                </button>
                <div className="invisible absolute left-1/2 z-40 mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <MenuItem href="/resources/docs" title="Docs" desc="Documentation" />
                  <MenuItem href="/resources/templates" title="Templates" desc="Starter kits" />
                  <MenuItem href="/resources/roadmap" title="Roadmap" desc="What's next" />
                  <MenuItem href="/resources/blog" title="Blog" desc="Updates & guides" />
                  <MenuItem href="/resources/changelog" title="Changelog" desc="Release notes" />
                  <MenuItem href="/resources/press" title="Press Kit" desc="Media resources" />
                </div>
              </li>

              {/* Pricing */}
              <li className="mx-2 lg:mx-3">
                <Link className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/pricing">
                  Pricing
                </Link>
              </li>

              {/* About */}
              <li className="mx-2 lg:mx-3">
                <Link className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/about">
                  About
                </Link>
              </li>

              {/* Contact */}
              <li className="mx-2 lg:mx-3">
                <Link className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-x-3 md:gap-x-4">
            <Link className="whitespace-nowrap text-sm font-medium text-slate-300 transition duration-150 ease-in-out hover:text-white" href="/signin">
              Sign in
            </Link>
            <Link className="btn-sm group relative w-full whitespace-nowrap text-slate-300 transition duration-150 ease-in-out hover:text-white [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-slate-800/30" href="/generate">
              <span className="relative inline-flex items-center">
                Generate Startup
                <span className="ml-1 translate-x-0 text-purple-500 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
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

function MenuItem({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="block rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5">
      <div className="text-sm font-medium text-slate-100">{title}</div>
      <div className="text-xs text-slate-400">{desc}</div>
    </Link>
  )
}
