// components/ui/footer.tsx
import Link from 'next/link'
import Logo from './logo'

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4 order-1 lg:order-none">
            <div className="h-full flex flex-col sm:flex-row lg:flex-col justify-between">
              <div className="mb-4 sm:mb-0">
                <div className="mb-4">
                  <Logo />
                </div>
                <div className="text-sm text-slate-300">
                  © Build AI Startups - All rights reserved.
                </div>
              </div>
            </div>
          </div>

          {/* 2nd block - Products */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Product</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/product/builder">Builder</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/product/ecosystem">Ecosystem</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/product/marketplace">Marketplace</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/product/api">API</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* 3rd block - Solutions */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Solutions</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/solutions/indie-makers">Indie Makers</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/solutions/startups">Startups</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/solutions/product-teams">Product Teams</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/solutions/enterprises">Enterprises</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/solutions/investors">Investors</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/solutions/accelerators">Accelerators</Link></li>
            </ul>

            {/* Use cases (verticals) */}
            <h6 className="text-xs text-slate-400 font-medium mt-5 mb-2 tracking-wider">USE CASES</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/vertical/ai-leadgen">Lead Gen Pipeline</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/vertical/ai-support">Support Copilot</Link></li>
            </ul>
          </div>

          {/* 4th block - Resources */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Resources</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/docs">Docs</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/templates">Templates</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/blog">Blog</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/changelog">Changelog</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/press">Press Kit</Link></li>
            </ul>
          </div>

          {/* 5th block - Project */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Project</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/about">About</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/contact">Contact</Link></li>
            </ul>

            <h6 className="text-sm text-slate-50 font-medium mt-6 mb-2">Legal</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/terms">Terms</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/privacy">Privacy</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/cookies">Cookies</Link></li>
            </ul>
          </div>
        </div>
        {/* Bottom strip removed as requested */}
      </div>
    </footer>
  )
}
