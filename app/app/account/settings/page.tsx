import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Account Settings' }

export default async function AccountSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-8">Account Settings</h1>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center text-white text-xl font-bold">
              {user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{user?.user_metadata?.full_name || 'No name set'}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Signed in via {user?.app_metadata?.provider || 'email'}</div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700/60" />

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Account ID: <code className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">{user?.id}</code></p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Joined: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</p>
        </div>

        <hr className="border-gray-200 dark:border-gray-700/60" />

        <div>
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Delete Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Permanently delete your account and all project data. This cannot be undone.</p>
          <button className="btn text-sm bg-red-500 hover:bg-red-600 text-white rounded-xl" disabled>Delete Account (contact support)</button>
        </div>
      </div>
    </div>
  )
}
