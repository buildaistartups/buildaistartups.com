export const metadata = {
  title: 'Sign Up - Stellar',
  description: 'Page description',
}

import Link from 'next/link'
import AuthLogo from '../auth-logo'

export default function SignUp() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <AuthLogo />
        <h1 className="h2 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Create your free account
        </h1>
      </div>
      <div className="max-w-sm mx-auto">
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="company">
                Company <span className="text-rose-500">*</span>
              </label>
              <input id="company" className="form-input w-full" type="text" placeholder="E.g., Acme Inc." required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="full-name">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input id="full-name" className="form-input w-full" type="text" placeholder="E.g., Mark Rossi" required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="email">
                Email <span className="text-rose-500">*</span>
              </label>
              <input id="email" className="form-input w-full" type="email" placeholder="markrossi@company.com" required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="password">
                Password <span className="text-rose-500">*</span>
              </label>
              <input id="password" className="form-input w-full" type="password" autoComplete="on" required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="referrer">
                Where did you hear about us? <span className="text-rose-500">*</span>
              </label>
              <select id="referrer" className="form-select text-sm py-2 w-full" required>
                <option>Google</option>
                <option>Medium</option>
                <option>GitHub</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-xs group">
              Sign Up <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">&rarr;</span>
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <div className="text-sm text-slate-400">
            Already have an account?{' '}
            <Link className="font-medium text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out" href="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
