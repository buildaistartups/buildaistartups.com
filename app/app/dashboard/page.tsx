import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false })

  const stageColors: Record<string, string> = {
    validate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    build: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    launch: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    measure: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    grow: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    archived: 'bg-gray-100 text-gray-500 dark:bg-gray-500/20 dark:text-gray-400',
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
          </p>
        </div>
        <Link href="/app/new" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm shadow-sm rounded-xl px-5 py-2.5">
          <svg className="w-4 h-4 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          New Project
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-500/20 mb-4">
            <svg className="w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">No projects yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create your first project to start tracking your startup.</p>
          <Link href="/app/new" className="btn bg-violet-500 hover:bg-violet-600 text-white text-sm rounded-xl">Create First Project</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link key={project.id} href={`/app/${project.id}/overview`}
              className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 hover:border-violet-300 dark:hover:border-violet-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 truncate">{project.name}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize shrink-0 ml-2 ${stageColors[project.stage] || stageColors.validate}`}>{project.stage}</span>
              </div>
              {project.one_liner && <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{project.one_liner}</p>}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{project.launch_score}<span className="text-sm font-normal text-gray-400">/100</span></div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{new Date(project.updated_at).toLocaleDateString()}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
