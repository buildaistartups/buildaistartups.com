import { NextRequest, NextResponse } from 'next/server'

// Define types locally
type QuizInput = {
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
  timePerWeek: number
  budget: 'none' | 'low' | 'medium' | 'high'
  skills: string[]
  interests: string[]
  audiences: string[]
  goals: string[]
  riskTolerance: 'low' | 'medium' | 'high'
}

type IdeaCard = {
  id: string
  title: string
  description: string
  vertical: string
}

// Idea database with vertical bias
const ideaDatabase: IdeaCard[] = [
  {
    id: 'leadgen-1',
    title: 'AI Sales Outreach Assistant',
    description: 'Automatically research prospects and generate personalized cold emails that actually get responses.',
    vertical: 'ai-leadgen'
  },
  {
    id: 'leadgen-2',
    title: 'LinkedIn Connection Automator',
    description: 'Smart LinkedIn outreach that personalizes messages based on prospect profiles and mutual connections.',
    vertical: 'ai-leadgen'
  },
  {
    id: 'support-1',
    title: 'Smart Customer Support Chatbot',
    description: 'AI-powered support that handles 80% of customer queries with human-like responses.',
    vertical: 'ai-support'
  },
  {
    id: 'support-2',
    title: 'Ticket Auto-Classifier',
    description: 'Automatically categorize and route support tickets to the right team members.',
    vertical: 'ai-support'
  },
  {
    id: 'generic-1',
    title: 'AI Content Generator',
    description: 'Generate blog posts, social media content, and marketing copy tailored to your brand voice.',
    vertical: 'generic'
  },
  {
    id: 'generic-2',
    title: 'Document Intelligence Platform',
    description: 'Extract insights and automate workflows from contracts, invoices, and business documents.',
    vertical: 'generic'
  }
]

export async function POST(req: NextRequest) {
  try {
    const quiz: QuizInput = await req.json()

    // Simple validation
    if (!quiz.experienceLevel || !quiz.skills || !quiz.interests || !quiz.audiences) {
      return NextResponse.json(
        { error: 'Missing required quiz fields' },
        { status: 400 }
      )
    }

    // Filter ideas based on quiz responses
    let filteredIdeas = ideaDatabase

    // Filter by interests (if any AI/tech related interests, show AI ideas)
    const hasAIInterest = quiz.interests.some(interest => 
      interest.toLowerCase().includes('ai') || 
      interest.toLowerCase().includes('tech') ||
      interest.toLowerCase().includes('automation')
    )

    if (hasAIInterest) {
      filteredIdeas = filteredIdeas.filter(idea => idea.vertical !== 'generic')
    }

    // Filter by skills
    if (quiz.skills.includes('sales') || quiz.skills.includes('marketing')) {
      filteredIdeas = filteredIdeas.filter(idea => 
        idea.vertical === 'ai-leadgen' || idea.vertical === 'generic'
      )
    }

    if (quiz.skills.includes('support') || quiz.skills.includes('ops')) {
      filteredIdeas = filteredIdeas.filter(idea => 
        idea.vertical === 'ai-support' || idea.vertical === 'generic'
      )
    }

    // Shuffle and limit results
    const shuffled = filteredIdeas.sort(() => 0.5 - Math.random())
    const ideas = shuffled.slice(0, 3)

    return NextResponse.json({ ideas })
  } catch (error) {
    console.error('Start route error:', error)
    return NextResponse.json(
      { error: 'Failed to generate ideas' },
      { status: 500 }
    )
  }
}
