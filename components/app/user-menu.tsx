'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handler = ({ target }: MouseEvent) => {
      if (ref.current && !ref.current.contains(target as Node)) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        onClick={() => setOpen(!open)}
      >
        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
        <svg className={`w-3 h-3 shrink-0 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12">
          <path className="fill-current" d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-lg shadow-lg py-1 z-50">
          <Link
            href="/app/account/settings"
            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <Link
            href="/app/account/billing"
            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
            onClick={() => setOpen(false)}
          >
            Billing
          </Link>
          <hr className="my-1 border-gray-200 dark:border-gray-700/60" />
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700/30"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
