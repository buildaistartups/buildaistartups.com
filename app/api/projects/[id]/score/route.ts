import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { calculateLaunchScore } from '@/lib/launch-score'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [competitors, icp, demand, validateChecklist, buildChecklist, project, revenue] = await Promise.all([
    supabase.from('competitors').select('id').eq('project_id', id),
    supabase.from('icp_profiles').select('id').eq('project_id', id).single(),
    supabase.from('demand_signals').select('id').eq('project_id', id),
    supabase.from('checklist_items').select('completed').eq('project_id', id).eq('stage', 'validate'),
    supabase.from('checklist_items').select('completed').eq('project_id', id).eq('stage', 'build'),
    supabase.from('projects').select('pmf_score, runway_months').eq('id', id).single(),
    supabase.from('revenue_entries').select('mrr').eq('project_id', id).order('month', { ascending: false }).limit(1),
  ])

  const latestMRR = revenue.data?.[0]?.mrr ? Number(revenue.data[0].mrr) : 0

  const result = calculateLaunchScore({
    competitorCount: competitors.data?.length || 0,
    icpDefined: !!icp.data,
    demandSignals: demand.data?.length || 0,
    checklistValidate: {
      total: validateChecklist.data?.length || 0,
      completed: validateChecklist.data?.filter((i: { completed: boolean }) => i.completed).length || 0,
    },
    checklistBuild: {
      total: buildChecklist.data?.length || 0,
      completed: buildChecklist.data?.filter((i: { completed: boolean }) => i.completed).length || 0,
    },
    pmfScore: project.data?.pmf_score ?? null,
    mrr: latestMRR,
    runwayMonths: project.data?.runway_months ? Number(project.data.runway_months) : null,
    experimentCount: 0, // Week 5
  })

  await supabase.from('projects').update({ launch_score: result.overall, updated_at: new Date().toISOString() }).eq('id', id)

  return NextResponse.json(result)
}
