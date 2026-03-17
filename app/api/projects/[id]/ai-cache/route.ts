import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('ai_analyses')
    .select('result, created_at')
    .eq('project_id', id)
    .eq('analysis_type', 'idea')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return NextResponse.json(null)
  return NextResponse.json(data)
}
