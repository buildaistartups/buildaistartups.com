import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('plan, ai_calls_used, ai_calls_limit').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  if (profile.plan === 'free' && profile.ai_calls_used >= profile.ai_calls_limit) {
    return NextResponse.json({ error: 'AI call limit reached. Upgrade to Pro for unlimited calls.' }, { status: 403 })
  }

  const body = await request.json()
  const { type, input, projectId } = body
  if (!type || !input) return NextResponse.json({ error: 'type and input required' }, { status: 400 })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'AI service not configured' }, { status: 503 })

  let systemPrompt: string
  if (type === 'analyze-idea') {
    systemPrompt = `You are a startup advisor. Analyze this micro-SaaS idea. Be honest and direct. If it's a bad idea, say so. No fake enthusiasm. The user may write in any language — always respond in English.

You MUST respond with ONLY valid JSON, no markdown, no backticks, no explanation before or after. Use this exact structure:
{
  "marketAnalysis": { "tam": "...", "growth": "...", "timing": "..." },
  "competitors": [{ "name": "...", "strength": "...", "weakness": "..." }],
  "icp": { "persona": "...", "pain": "...", "budget": "..." },
  "risks": ["..."],
  "verdict": "promising|risky|oversaturated|niche-viable",
  "score": 0-100,
  "nextSteps": ["..."]
}`
  } else if (type === 'generate-ideas') {
    systemPrompt = `You are a startup advisor. Based on the user's interests, skills, budget, and preferences, suggest 10 micro-SaaS startup ideas. Each must be realistic and buildable. Be direct. No hype. The user may write in any language — always respond in English.

You MUST respond with ONLY valid JSON, no markdown, no backticks, no explanation before or after. Use this exact structure:
{
  "ideas": [{
    "name": "...",
    "oneLiner": "...",
    "targetCustomer": "...",
    "revenueModel": "subscription|usage|transaction|freemium",
    "difficulty": "easy|medium|hard",
    "competition": "low|medium|high|saturated",
    "revenuePotential": "0-1K|1-5K|5-20K|20K+",
    "whyNow": "...",
    "firstStep": "..."
  }]
}`
  } else {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: input }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4000,
            responseMimeType: 'application/json',
          },
        }),
      }
    )

    if (!response.ok) {
      const err = await response.text()
      console.error('Gemini API error:', err)
      return NextResponse.json({ error: 'AI analysis failed' }, { status: 502 })
    }

    const aiResult = await response.json()
    const text = aiResult.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const tokensUsed = (aiResult.usageMetadata?.promptTokenCount || 0) + (aiResult.usageMetadata?.candidatesTokenCount || 0)

    let parsed
    try {
      parsed = JSON.parse(text)
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0])
      } else {
        return NextResponse.json({ error: 'Failed to parse AI response', raw: text }, { status: 500 })
      }
    }

    await supabase.from('profiles').update({ ai_calls_used: profile.ai_calls_used + 1 }).eq('id', user.id)

    if (projectId) {
      await supabase.from('ai_analyses').insert({
        project_id: projectId,
        analysis_type: type === 'analyze-idea' ? 'idea' : 'ideas_generator',
        input_hash: Buffer.from(input).toString('base64').slice(0, 100),
        result: parsed,
        tokens_used: tokensUsed,
      })
    }

    return NextResponse.json({ result: parsed, tokensUsed })
  } catch (err) {
    console.error('AI call error:', err)
    return NextResponse.json({ error: 'AI service error' }, { status: 500 })
  }
}
// updated 
