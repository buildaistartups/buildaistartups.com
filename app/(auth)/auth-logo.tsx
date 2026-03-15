import Link from 'next/link'

export default function AuthLogo() {
  return (
    <div className="mb-6">
      <Link className="inline-flex items-center gap-2" href="/" aria-label="Build AI Startups">
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="var(--ls-accent)" />
          <path d="M9 16L14 21L23 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  )
}
