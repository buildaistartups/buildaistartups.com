import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center py-10 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-slate-100">
          Sign up for BuildAIStartups.com
        </h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </form>

        <div className="mt-8 flex flex-col space-y-3">
          <button className="flex items-center justify-center w-full border border-slate-300 dark:border-slate-700 rounded-lg py-2 text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
              <path
                d="M21.805 10.023H12.18v3.99h5.497c-.237 1.289-1.363 3.786-5.497 3.786-3.3 0-5.992-2.733-5.992-6.092 0-3.359 2.692-6.092 5.992-6.092 1.885 0 3.151.8 3.877 1.495l2.647-2.572C16.402 3.498 14.469 2.45 12.18 2.45 6.954 2.45 2.625 6.638 2.625 12.001c0 5.364 4.329 9.551 9.555 9.551 5.523 0 9.17-3.873 9.17-9.321 0-.627-.07-1.113-.172-1.607z"
                fill="#4285F4"
              />
            </svg>
            Continue with Google
          </button>
          <button className="flex items-center justify-center w-full border border-slate-300 dark:border-slate-700 rounded-lg py-2 text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.34-1.6.57-2.47.68a4.28 4.28 0 0 0 1.88-2.36 8.52 8.52 0 0 1-2.7 1.03 4.26 4.26 0 0 0-7.47 3.89A12.07 12.07 0 0 1 3.09 4.84a4.23 4.23 0 0 0-.58 2.15c0 1.48.75 2.78 1.9 3.55a4.21 4.21 0 0 1-1.93-.53v.05a4.26 4.26 0 0 0 3.42 4.17 4.28 4.28 0 0 1-1.92.07 4.27 4.27 0 0 0 3.98 2.96A8.57 8.57 0 0 1 2 19.54a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.18-.01-.36-.02-.54A8.64 8.64 0 0 0 24 4.59a8.49 8.49 0 0 1-2.46.67z" />
            </svg>
            Continue with Twitter
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
