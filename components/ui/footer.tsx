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
                  © <span className="font-medium">Build AI Startups</span>{' '}
                  <span className="text-slate-500">—</span>{' '}
                  <a
                    href="https://www.buildaistartups.com"
                    className="hover:text-slate-200 underline-offset-2 hover:underline"
                  >
                    buildaistartups.com
                  </a>{' '}
                  <span className="text-slate-500">·</span> All rights reserved.
                </div>
              </div>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Products</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/product/builder">Features</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/product/api">Integrations</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/pricing">Pricing &amp; Plans</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/changelog">Changelog</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/docs#concepts">Our method</Link></li>
            </ul>

            {/* Use cases (verticals) */}
            <h6 className="text-xs text-slate-400 font-medium mt-5 mb-2 tracking-wider">USE CASES</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/vertical/ai-leadgen">Lead Gen Pipeline</Link></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/vertical/ai-support">Support Copilot</Link></li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Company</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/press">About us</Link></li>
              <li><a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#">Diversity &amp; Inclusion</a></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/blog">Blog</Link></li>
              <li><a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#">Careers</a></li>
              <li><a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#">Financial statements</a></li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Resources</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources">Community</Link></li>
              <li><a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#">Terms of service</a></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/contact?subject=Security%20issue">Report a vulnerability</Link></li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Legals</h6>
            <ul className="text-sm space-y-2">
              <li><a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#">Refund policy</a></li>
              <li><a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#">Terms &amp; Conditions</a></li>
              <li><a className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#">Privacy policy</a></li>
              <li><Link className="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="/resources/press">Brand Kit</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
