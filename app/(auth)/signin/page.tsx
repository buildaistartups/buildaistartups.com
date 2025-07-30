export const metadata = {
  title: 'Sign In - BuildAIStartups.com',
  description: 'Page description',
}

import Link from 'next/link'
import AuthLogo from '../auth-logo'

export default function SignIn() {
  return (
    <>
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        {/* Logo */}
        <AuthLogo />
        {/* Page title */}
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 dark:from-slate-800/70 dark:via-slate-100 dark:to-slate-800/70">
          Sign in to your account
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-sm mx-auto">

        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-300 font-medium mb-1" htmlFor="email">Email</label>
              <input id="email" className="form-input w-full dark:bg-slate-800 dark:text-slate-100 bg-white text-slate-900" type="email" required />
            </div>
            <div>
              <div className="flex justify-between">
                <label className="block text-sm text-slate-700 dark:text-slate-300 font-medium mb-1" htmlFor="password">Password</label>
                <Link className="text-sm font-medium text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out ml-2" href="/reset-password">Forgot?</Link>
              </div>
              <input id="password" className="form-input w-full dark:bg-slate-800 dark:text-slate-100 bg-white text-slate-900" type="password" autoComplete="on" required />
            </div>
          </div>
          <div className="mt-6">
            <button className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-xs group dark:bg-purple-500 dark:hover:bg-purple-600">
              Sign In <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1 dark:text-purple-200">-&gt;</span>
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <div className="text-sm text-slate-400 dark:text-slate-500">
            Don't have an account? <Link className="font-medium text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out" href="/signup">Sign up</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="border-t border-slate-200 dark:border-slate-800 grow mr-3" aria-hidden="true" />
          <div className="text-sm text-slate-500 italic dark:text-slate-400">or</div>
          <div className="border-t border-slate-200 dark:border-slate-800 grow ml-3" aria-hidden="true" />
        </div>

        {/* Social login */}
        <div className="flex space-x-3">
          <button className="btn text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(var(--color-slate-100),var(--color-slate-100))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-200)_25%,var(--color-slate-200)_75%,var(--color-slate-400)_100%)_border-box] dark:[background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-100/30 dark:before:bg-slate-800/30 before:rounded-full before:pointer-events-none h-9">
            <span className="relative">
              <span className="sr-only">Continue with Twitter</span>
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="14" height="12">
                <path d="m4.34 0 2.995 3.836L10.801 0h2.103L8.311 5.084 13.714 12H9.482L6.169 7.806 2.375 12H.271l4.915-5
