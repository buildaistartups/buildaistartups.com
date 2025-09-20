import { NextRequest, NextResponse } from 'next/server'
import { validateQuiz, ajvErrorsToMessage } from '@/lib/validate'
import type { QuizInput, IdeaCard } from '@/lib/schemas'

// Idea database with vertical bias
const ideaDatabase: IdeaCard[] = [
  // AI Lead Generation ideas
  {
    id: 'lead-1',
    title: 'AI Cold Email Writer',
    description: 'Generate personalized cold emails that actually get responses using GPT-4',
    vertical: 'ai-leadgen',
    difficulty: 'easy',
    estimatedDays: 7,
    techStack: ['Next.js', 'OpenAI API', 'Vercel']
  },
  {
    id: 'lead-2',
    title: 'LinkedIn Outreach Bot',
    description: 'Automate LinkedIn connection requests with AI-personalized messages',
    vertical: 'ai-leadgen',
    difficulty: 'medium',
    estimatedDays: 14,
    techStack: ['Next.js', 'Playwright', 'OpenAI API']
  },
  {
    id: 'lead-3',
    title: 'AI Sales Call Analyzer',
    description: 'Transcribe and analyze sales calls to identify winning patterns',
    vertical: 'ai-leadgen',
    difficulty: 'hard',
    estimatedDays: 30,
    techStack: ['Next.js', 'Whisper API', 'OpenAI API', 'PostgreSQL']
  },
  // AI Support ideas
  {
    id: 'support-1',
    title: 'AI Help Desk',
    description: 'Smart chatbot that learns from your docs and past tickets',
    vertical: 'ai-support',
    difficulty: 'easy',
    estimatedDays: 5,
    techStack: ['Next.js', 'OpenAI API', 'Vercel KV']
  },
  {
    id: 'support-2',
    title: 'Email Auto-Responder',
    description: 'AI that drafts support email responses for human review',
    vertical: 'ai-support',
    difficulty: 'medium',
    estimatedDays: 10,
    techStack: ['Next.js', 'OpenAI API', 'SendGrid']
  },
  {
    id: 'support-3',
    title: 'Voice Support Assistant',
    description: 'Phone support system powered by voice AI',
    vertical: 'ai-support',
    difficulty: 'hard',
    estimatedDays: 21,
    techStack: ['Next.js', 'Twilio', 'OpenAI API', 'ElevenLabs']
  },
  // Mixed difficulty backup ideas
  {
    id: 'lead-4',
    title: 'AI Proposal Generator',
    description: 'Create winning proposals from a few bullet points',
    vertical: 'ai-leadgen',
    difficulty: 'easy',
    estimatedDays: 5,
    techStack: ['Next.js', 'OpenAI API', 'PDF.js']
  },
  {
    id: 'support-4',
    title: 'FAQ Bot Builder',
    description: 'No-code tool to build AI FAQ bots from existing content',
    vertical: 'ai-support',
    difficulty: 'medium',
    estimatedDays: 12,
    techStack: ['Next.js', 'OpenAI API', 'Pinecone']
  }
]

function getIdeasForQuiz(quiz: QuizInput): IdeaCard[] {
  let candidates = [...ideaDatabase]
  
  // Apply vertical preference bias
  if (quiz.preferredVertical && quiz.preferredVertical !== 'other') {
    const preferred = candidates.filter(idea => idea.vertical === quiz.preferredVertical)
    const others = candidates.filter(idea => idea.vertical !== quiz.preferredVertical)
    // 70% from preferred vertical, 30% from others
    candidates = [...preferred, ...others.slice(0, 3)]
  }
  
  // Filter by timeline and experience
  return candidates.filter(idea => {
    if (quiz.timeline === 'weekend' && idea.estimatedDays > 7) return false
    if (quiz.timeline === 'month' && idea.estimatedDays > 30) return false
    if (quiz.experience === 'none' && idea.difficulty === 'hard') return false
    if (quiz.experience === 'some' && idea.difficulty === 'hard' && quiz.timeline === 'weekend') return false
    return true
  }).slice(0, 10)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate input
    if (!validateQuiz(body)) {
      return NextResponse.json(
        { error: ajvErrorsToMessage(validateQuiz.errors) },
        { status: 400 }
      )
    }
    
    const quiz = body as QuizInput
    const ideas = getIdeasForQuiz(quiz)
    
    // Ensure we return 8-10 ideas
    if (ideas.length < 8) {
      // Pad with easier ideas if needed
      const padding = ideaDatabase
        .filter(idea => idea.difficulty === 'easy' && !ideas.find(i => i.id === idea.id))
        .slice(0, 8 - ideas.length)
      ideas.push(...padding)
    }
    
    return NextResponse.json({ ideas })
  } catch (error) {
    console.error('Error in /api/start:', error)
    return NextResponse.json(
      { error: 'Failed to process quiz' },
      { status: 500 }
    )
  }
}
