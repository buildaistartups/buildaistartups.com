import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StageNav from '@/components/app/stage-nav'

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const supabase = await createClient()

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (error || !project) notFound()

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Project header */}
      <div className="mb-6">
        <Link href="/app/dashboard" className="text-sm text-violet-500 hover:text-violet-600 mb-2 inline-flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Dashboard
        </Link>
        <div className="flex items-center gap-3 mt-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{project.name}</h1>
          <div className="text-lg font-bold text-violet-500">{project.launch_score}<span className="text-sm font-normal text-gray-400">/100</span></div>
        </div>
        {project.one_liner && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.one_liner}</p>}
      </div>

      {/* Stage navigation tabs */}
      <StageNav projectId={projectId} currentStage={project.stage} />

      {/* Stage content */}
      <div className="mt-6">
        {children}
      </div>
    </div>
  )
}
