'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const stages = [
  { key: 'overview', label: 'Overview', icon: '📋' },
  { key: 'validate', label: 'Validate', icon: '✅' },
  { key: 'build', label: 'Build', icon: '🔨' },
  { key: 'launch', label: 'Launch', icon: '🚀' },
  { key: 'measure', label: 'Measure', icon: '📊' },
  { key: 'grow', label: 'Grow', icon: '📈' },
]

export default function StageNav({ projectId, currentStage }: { projectId: string; currentStage: string }) {
  const pathname = usePathname()

  return (
    <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200 dark:border-gray-700/60 -mx-4 px-4 sm:mx-0 sm:px-0">
      {stages.map((stage) => {
        const href = `/app/${projectId}/${stage.key}`
        const isActive = pathname === href || pathname.startsWith(href + '/')

        return (
          <Link
            key={stage.key}
            href={href}
            className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition ${
              isActive
                ? 'border-violet-500 text-violet-500'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300'
            }`}
          >
            <span>{stage.icon}</span>
            <span>{stage.label}</span>
          </Link>
        )
      })}
      <Link
        href={`/app/${projectId}/settings`}
        className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition ml-auto ${
          pathname.includes('/settings')
            ? 'border-violet-500 text-violet-500'
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        }`}
      >
        ⚙️ Settings
      </Link>
    </div>
  )
}
