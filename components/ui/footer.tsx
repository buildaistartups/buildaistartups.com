// components/ui/footer.tsx
import Link from 'next/link'
import Logo from './logo'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">
          
          {/* 1st block - Brand & Trust */}
          <div className="sm:col-span-12 lg:col-span-4 order-1 lg:order-none">
            <div className="h-full flex flex-col justify-between">
              <div className="mb-4 sm:mb-0">
                <div className="mb-4">
                  <Logo />
                </div>
                <div className="text-sm text-slate-400 max-w-xs mb-4">
                  Democratizing AI entrepreneurship. from idea to blueprint in 24 hours.
                </div>
                
                {/* Dynamic Year */}
                <div className="text-xs text-slate-500">
                  &copy; {new Date().getFullYear()} Build AI Startups. All rights reserved.
                </div>
              </div>
              
              {/* Optional: Social Links (Uncomment if you have them) */}
              {/* <div className="flex gap-4 mt-4">
                <Link href="https://twitter.com/yourhandle" className="text-slate-400 hover:text-purple-500 transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M16 3.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" /></svg>
                </Link>
              </div> 
              */}
            </div>
          </div>

          {/* --- PHASE 1 HIDDEN: FUTURE COLUMNS --- */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2"> ...Product Links... </div> */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2"> ...Solutions Links... </div> */}
          {/* <div className="sm:col-span-6 md:col-span-3 lg:col-span-2"> ...Resources Links... </div> */}

          {/* Spacer Column (takes up space of hidden columns to push links right) */}
          <div className="hidden lg:block lg:col-span-4"></div>

          {/* 5th block - Project Links */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-slate-50 font-medium mb-2">Project</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-purple-400 transition duration-150 ease-in-out" href="/pricing">Get Started</Link></li>
              <li><Link className="text-slate-400 hover:text-purple-400 transition duration-150 ease-in-out" href="/about">About</Link></li>
              <li><Link className="text-slate-400 hover:text-purple-400 transition duration-150 ease-in-out" href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* 6th block - Legal Links */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-slate-50 font-medium mb-2">Legal</h6>
            <ul className="text-sm space-y-2">
              <li><Link className="text-slate-400 hover:text-purple-400 transition duration-150 ease-in-out" href="/terms">Terms</Link></li>
              <li><Link className="text-slate-400 hover:text-purple-400 transition duration-150 ease-in-out" href="/privacy">Privacy</Link></li>
              <li><Link className="text-slate-400 hover:text-purple-400 transition duration-150 ease-in-out" href="/cookies">Cookies</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
