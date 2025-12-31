// components/ui/footer.tsx
import Link from 'next/link'
import Logo from './logo'

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">
          
          {/* 1st block - Logo & Copyright */}
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

          {/* PHASE 1 HIDDEN: 2nd block - Products
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Product</h6>
            <ul className="text-sm space-y-2">
              <li><Link ... >Builder</Link></li>
              ...
            </ul>
          </div>
          */}

          {/* PHASE 1 HIDDEN: 3rd block - Solutions
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Solutions</h6>
            <ul className="text-sm space-y-2">
              ...
            </ul>
            <h6 className="text-xs text-slate-400 font-medium mt-5 mb-2 tracking-wider">USE CASES</h6>
            <ul className="text-sm space-y-2">
              ...
            </ul>
          </div>
          */}

          {/* PHASE 1 HIDDEN: 4th block - Resources
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-sm text-slate-50 font-medium mb-2">Resources</h6>
            <ul className="text-sm space-y-2">
              ...
            </ul>
          </div>
          */}

          {/* 5th block - Project & Legal (KEEP THIS) */}
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
      </div>
    </footer>
  )
}
