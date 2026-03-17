import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = { title: 'New Project' }

export default function NewProjectPage() {
  async function createProject(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/signin')

    const name = formData.get('name') as string
    const oneLiner = formData.get('one_liner') as string

    const { data, error } = await supabase
      .from('projects')
      .insert({ user_id: user.id, name, one_liner: oneLiner || null })
      .select()
      .single()

    if (error) throw new Error(error.message)
    redirect(`/app/${data.id}/overview`)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">Create a new project</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Give your startup a name. You can always change it later.</p>

      <form action={createProject} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" type="text" required
            className="form-input w-full rounded-xl text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200"
            placeholder="e.g., FitTracker AI" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="one_liner">
            One-liner <span className="text-gray-400">(optional)</span>
          </label>
          <input id="one_liner" name="one_liner" type="text"
            className="form-input w-full rounded-xl text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200"
            placeholder="e.g., AI-powered fitness tracking for busy professionals" />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">What does it do, in one sentence?</p>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm shadow-sm rounded-xl px-5 py-2.5">Create Project &rarr;</button>
          <a href="/app/dashboard" className="btn border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 text-sm rounded-xl px-5 py-2.5">Cancel</a>
        </div>
      </form>
    </div>
  )
}
