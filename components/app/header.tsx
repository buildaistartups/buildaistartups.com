'use client'

import { useAppProvider } from '@/app/app/app-provider'
import ThemeToggle from '@/components/ui/theme-toggle'
import UserMenu from '@/components/app/user-menu'

export default function AppHeader() {
  const { sidebarOpen, setSidebarOpen } = useAppProvider()

  return (
    <header className="sticky top-0 z-30 before:absolute before:inset-0 before:backdrop-blur-md before:bg-white/90 dark:before:bg-gray-900/90 before:-z-10 border-b border-gray-200 dark:border-gray-700/60">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: hamburger */}
          <div className="flex">
            <button
              className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
