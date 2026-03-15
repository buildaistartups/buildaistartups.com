'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ProjectSettingsPage() {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  // Note: projectId comes from URL, extracted at runtime
  async function handleDelete() {
    if (!confirm('Are you sure? This will permanently delete this project and all its data.')) return
    setDeleting(true)

    const supabase = createClient()
    const segments = window.location.pathname.split('/')
    const projectId = segments[2] // /app/[projectId]/settings

    const { error } = await supabase.from('projects').delete().eq('id', projectId)
    if (error) {
      alert('Failed to delete project')
      setDeleting(false)
      return
    }
    router.push('/app/dashboard')
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Project Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Project settings will be expanded in future updates to include renaming, archiving, and team management.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-500/30 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Permanently delete this project and all associated data. This action cannot be undone.</p>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn text-sm bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Delete Project'}
        </button>
      </div>
    </div>
  )
}
