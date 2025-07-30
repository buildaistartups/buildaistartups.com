'use client'

import Link from 'next/link'
import AuthLogo from '../auth-logo'

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center min-h-screen py-12 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <AuthLogo className="mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sign in to BuildAIStartups.com</h1>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-100 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-slate-900 dark:text-slate-100">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/reset-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign in
          </button>
        </form>
        <div className="flex flex-col gap-2">
          <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
            <svg width="20" height="20" fill="currentColor" className="text-blue-500" viewBox="0 0 48 48">
              <g>
                <path d="M44.5 20H24v8.5h11.8c-1.2 3.3-4.2 5.5-8.8 5.5A9.5 9.5 0 1 1 24 14c2.2 0 4.3.8 5.9 2.2l6.3-6.3C32.8 7 28.6 5 24 5A19 19 0 1 0 43 24c0-1.3-.1-2.7-.5-4z"/>
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12">
              <path d="m4.34 0 2.995 3.836L10.801 0h2.103L8.311 5.084 13.714 12H9.482L6.169 7.806 2.375 12H.271l4.915-5.934L0 0h4.34Zm-.634 1.347H2.249l7.734 9.79h1.306l-7.683-9.79Z" />
            </svg>
            <span>Continue with Twitter</span>
          </button>
        </div>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
