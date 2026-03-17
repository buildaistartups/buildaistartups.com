import Link from 'next/link'

export default function AppLogo() {
  return (
    <Link href="/app/dashboard" className="flex items-center gap-2" aria-label="Dashboard">
      <svg className="w-7 h-7 shrink-0" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#a855f7" />
        <path d="M22.5 12.5L14 21l-4.5-4.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-base font-bold text-gray-800 dark:text-gray-100">
        Build<span className="text-violet-500">AI</span>Startups
      </span>
    </Link>
  )
}
