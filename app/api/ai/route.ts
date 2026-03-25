import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// --- Provider: Gemini ---
async function callGemini(apiKey: string, systemPrompt: string, input: string) {
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
  if (!response.ok) { const err = await response.text(); throw new Error(`Gemini error ${response.status}: ${err}`) }
  const aiResult = await response.json()
  const text = aiResult.candidates?.[0]?.content?.parts?.[0]?.text || ''
  const tokensUsed = (aiResult.usageMetadata?.promptTokenCount || 0) + (aiResult.usageMetadata?.candidatesTokenCount || 0)
  return { text, tokensUsed, provider: 'gemini' }
}

// --- Provider: Groq ---
async function callGroq(apiKey: string, systemPrompt: string, input: string) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: input }],
      temperature: 0.7, max_tokens: 4000,
      response_format: { type: 'json_object' },
    }),
  })
  if (!response.ok) { const err = await response.text(); throw new Error(`Groq error ${response.status}: ${err}`) }
  const aiResult = await response.json()
  const text = aiResult.choices?.[0]?.message?.content || ''
  const tokensUsed = (aiResult.usage?.prompt_tokens || 0) + (aiResult.usage?.completion_tokens || 0)
  return { text, tokensUsed, provider: 'groq' }
}

// Robust JSON parser with retry
function parseJSON(text: string): unknown {
  try { return JSON.parse(text) } catch {}
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (jsonMatch) { try { return JSON.parse(jsonMatch[0]) } catch {} }
  // Try removing markdown fences
  const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
  try { return JSON.parse(cleaned) } catch {}
  return null
}

// System prompts for each type
function getSystemPrompt(type: string): string {
  const jsonRule = 'You MUST respond with ONLY valid JSON, no markdown, no backticks, no explanation before or after.'

  switch (type) {
    case 'analyze-idea':
      return `You are a startup advisor. Analyze this micro-SaaS idea. Be honest and direct. If it's a bad idea, say so. No fake enthusiasm. The user may write in any language — always respond in English.\n\n${jsonRule} Use this exact structure:\n{"marketAnalysis":{"tam":"...","growth":"...","timing":"..."},"competitors":[{"name":"...","strength":"...","weakness":"..."}],"icp":{"persona":"...","pain":"...","budget":"..."},"risks":["..."],"verdict":"promising|risky|oversaturated|niche-viable","score":0-100,"nextSteps":["..."]}`

    case 'generate-ideas':
      return `You are a startup advisor. Based on the user's interests, skills, budget, and preferences, suggest 10 micro-SaaS startup ideas. Each must be realistic and buildable. Be direct. No hype. The user may write in any language — always respond in English.\n\n${jsonRule} Use this exact structure:\n{"ideas":[{"name":"...","oneLiner":"...","targetCustomer":"...","revenueModel":"subscription|usage|transaction|freemium","difficulty":"easy|medium|hard","competition":"low|medium|high|saturated","revenuePotential":"0-1K|1-5K|5-20K|20K+","whyNow":"...","firstStep":"..."}]}`

    case 'find-competitors':
      return `You are a market research analyst. Based on the startup idea described, identify the top 5 direct or close competitors. For each, provide their name, website URL, pricing model, key strengths, and key weaknesses. Be factual and specific.\n\n${jsonRule} Use this exact structure:\n{"competitors":[{"name":"...","url":"...","pricing":"...","strengths":["...","..."],"weaknesses":["...","..."],"market_share":"dominant|significant|niche|emerging"}]}`

    case 'recommend-stack':
      return `You are a senior full-stack developer and startup technical advisor. Based on the project described, recommend the optimal tech stack. Consider: solo developer, fast shipping, low cost, scalability. Explain why each choice is best for this specific project.\n\n${jsonRule} Use this exact structure:\n{"recommendations":[{"category":"frontend|backend|database|hosting|auth|payments|analytics|other","name":"...","url":"...","reason":"..."}]}`

    case 'launch-plan':
      return `You are a startup launch strategist. Create a detailed, actionable launch plan for the startup described. Be specific with timelines, platforms, and copy templates.\n\n${jsonRule} Use this exact structure:\n{"preLaunch":{"title":"Pre-Launch (1 Week Before)","tasks":[{"task":"...","details":"..."}]},"launchDay":{"title":"Launch Day Timeline","hours":[{"time":"...","action":"...","details":"..."}]},"postLaunch":{"title":"Post-Launch (48 Hours)","tasks":[{"task":"...","details":"..."}]},"platforms":[{"name":"...","why":"...","template":"..."}],"tips":["..."]}`

    case 'growth-advisor':
      return `You are a startup growth advisor. Analyze the startup's current situation, experiments, and data. Give direct, honest advice. No fluff. Replace any suggestion to "kill" something with "sunset" or "stop".\n\n${jsonRule} Use this exact structure:\n{"verdict":"pivot|persevere|expand","verdictReason":"...","experiments":[{"name":"...","channel":"...","hypothesis":"...","expectedOutcome":"..."}],"adjacentProducts":[{"name":"...","description":"...","synergy":"..."}],"stopDoing":["..."],"keyInsight":"..."}`

    default:
      return ''
  }
}

// --- Main handler ---
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

  const geminiKey = process.env.GEMINI_API_KEY
  const groqKey = process.env.GROQ_API_KEY
  if (!geminiKey && !groqKey) return NextResponse.json({ error: 'AI service not configured' }, { status: 503 })

  const systemPrompt = getSystemPrompt(type)
  if (!systemPrompt) return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

  // Try with retry: Gemini (2 attempts) → Groq (2 attempts)
  let result: { text: string; tokensUsed: number; provider: string } | null = null

  for (let attempt = 0; attempt < 2 && !result; attempt++) {
    if (geminiKey) {
      try { result = await callGemini(geminiKey, systemPrompt, input) } catch (err) {
        console.error(`Gemini attempt ${attempt + 1} failed:`, err)
      }
    }
  }

  for (let attempt = 0; attempt < 2 && !result; attempt++) {
    if (groqKey) {
      try { result = await callGroq(groqKey, systemPrompt, input) } catch (err) {
        console.error(`Groq attempt ${attempt + 1} failed:`, err)
      }
    }
  }

  if (!result) return NextResponse.json({ error: 'AI analysis failed on all providers' }, { status: 502 })

  // Parse JSON with robust parser
  const parsed = parseJSON(result.text)
  if (!parsed) return NextResponse.json({ error: 'Failed to parse AI response. Please try again.' }, { status: 500 })

  // Increment AI calls
  await supabase.from('profiles').update({ ai_calls_used: profile.ai_calls_used + 1 }).eq('id', user.id)

  // Cache result
  if (projectId) {
    await supabase.from('ai_analyses').insert({
      project_id: projectId,
      analysis_type: type,
      input_hash: Buffer.from(input).toString('base64').slice(0, 100),
      result: parsed,
      tokens_used: result.tokensUsed,
    }).catch(() => {}) // Don't fail if cache insert fails
  }

  return NextResponse.json({ result: parsed, tokensUsed: result.tokensUsed })
}
