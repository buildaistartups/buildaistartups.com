import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data, error } = await supabase.from('icp_profiles').select('*').eq('project_id', id).single()
  if (error && error.code !== 'PGRST116') return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const body = await request.json()
  const { data: existing } = await supabase.from('icp_profiles').select('id').eq('project_id', id).single()
  let result
  if (existing) {
    result = await supabase.from('icp_profiles').update({ ...body, updated_at: new Date().toISOString() }).eq('project_id', id).select().single()
  } else {
    result = await supabase.from('icp_profiles').insert({ project_id: id, ...body }).select().single()
  }
  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 })
  return NextResponse.json(result.data)
}
