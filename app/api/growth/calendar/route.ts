// app/api/growth/calendar/route.ts
import { NextRequest, NextResponse } from 'next/server'

type Channel = 'seo' | 'social' | 'email' | 'partnerships' | 'ads' | 'community'
type Vertical = 'ai-leadgen' | 'ai-support' | 'saas' | 'api' | 'content'

interface CalendarRequest {
  channels: Channel[]
  vertical: Vertical
  projectId?: string
}

interface CalendarTask {
  id: string
  type: 'content' | 'outreach' | 'optimization' | 'analysis'
  title: string
  description: string
  channel: Channel
  effort: 'low' | 'medium' | 'high'
  expected: string
}

interface CalendarDay {
  day: number
  date: string
  tasks: CalendarTask[]
}

// Content templates by vertical and channel
const CONTENT_TEMPLATES = {
  'ai-leadgen': {
    seo: [
      'Write "AI Lead Generation vs Traditional Methods" comparison',
      'Create "B2B Lead Scoring with AI" guide',
      'Publish "ROI Calculator for AI Lead Tools"',
      'Draft "AI Lead Qualification Checklist"'
    ],
    social: [
      'Share AI lead gen case study on LinkedIn',
      'Post "5 AI tools that 10x your lead quality" thread',
      'Create lead generation tips carousel',
      'Share customer success story'
    ],
    partnerships: [
      'Reach out to CRM integrations',
      'Contact sales automation platforms',
      'Connect with marketing agencies',
      'Partner with lead gen communities'
    ]
  },
  'ai-support': {
    seo: [
      'Write "AI Customer Support Implementation Guide"',
      'Create "Chatbot vs Human Agent ROI Analysis"',
      'Publish "Support Ticket Automation Playbook"',
      'Draft "AI Support Metrics That Matter"'
    ],
    social: [
      'Share support automation success metrics',
      'Post "Customer service AI trends" insights',
      'Create support team efficiency tips',
      'Showcase response time improvements'
    ],
    partnerships: [
      'Connect with helpdesk platforms',
      'Reach out to CX consultants',
      'Partner with customer success tools',
      'Join support community forums'
    ]
  },
  saas: {
    seo: [
      'Write "SaaS Onboarding Best Practices" guide',
      'Create "SaaS Metrics Dashboard" tutorial',
      'Publish "Freemium vs Paid SaaS Models"',
      'Draft "SaaS Customer Retention Strategies"'
    ],
    social: [
      'Share SaaS growth metrics publicly',
      'Post "Building in public" updates',
      'Create product development timeline',
      'Showcase customer testimonials'
    ],
    partnerships: [
      'Reach out to complementary SaaS tools',
      'Connect with integration platforms',
      'Partner with business consultants',
      'Join SaaS founder communities'
    ]
  },
  api: {
    seo: [
      'Write "API Documentation Best Practices"',
      'Create "API Rate Limiting Guide"',
      'Publish "Developer Onboarding Tutorial"',
      'Draft "API Security Checklist"'
    ],
    social: [
      'Share API usage examples on GitHub',
      'Post developer tutorials on Dev.to',
      'Create API use case threads',
      'Showcase integration examples'
    ],
    partnerships: [
      'Connect with developer tools',
      'Reach out to API management platforms',
      'Partner with developer communities',
      'Join API provider networks'
    ]
  },
  content: {
    seo: [
      'Write "Content Marketing ROI Guide"',
      'Create "SEO Content Calendar Template"',
      'Publish "Content Distribution Strategies"',
      'Draft "Content Performance Metrics"'
    ],
    social: [
      'Share content creation tips',
      'Post "Content that converts" examples',
      'Create content planning templates',
      'Showcase content performance'
    ],
    partnerships: [
      'Connect with content creators',
      'Reach out to marketing agencies',
      'Partner with content platforms',
      'Join creator communities'
    ]
  }
}

function generateCalendar(channels: Channel[], vertical: Vertical): CalendarDay[] {
  const today = new Date()
  const calendar: CalendarDay[] = []
  
  const templates = CONTENT_TEMPLATES[vertical] || CONTENT_TEMPLATES.saas
  
  for (let day = 1; day <= 30; day++) {
    const date = new Date(today)
    date.setDate(today.getDate() + day - 1)
    
    const tasks: CalendarTask[] = []
    
    // Generate tasks based on day and channels
    channels.forEach((channel, channelIndex) => {
      const channelTasks = templates[channel] || templates.seo || []
      
      // Different task patterns for different days
      if (day % 7 === 1) { // Mondays - Planning
        tasks.push({
          id: `${day}-${channel}-plan`,
          type: 'optimization',
          title: `Plan ${channel} content for the week`,
          description: `Review performance and plan content strategy for ${channel}`,
          channel,
          effort: 'medium',
          expected: 'Content calendar updated'
        })
      }
      
      if (day % 3 === channelIndex + 1 && channelTasks.length > 0) { // Staggered content creation
        const taskIndex = Math.floor((day - 1) / 3) % channelTasks.length
        tasks.push({
          id: `${day}-${channel}-content`,
          type: 'content',
          title: channelTasks[taskIndex],
          description: `Create and publish content for ${channel} channel`,
          channel,
          effort: 'high',
          expected: 'Content published'
        })
      }
      
      if (day % 5 === 0) { // Every 5 days - Outreach
        tasks.push({
          id: `${day}-${channel}-outreach`,
          type: 'outreach',
          title: `${channel} outreach and engagement`,
          description: `Connect with prospects and engage with community on ${channel}`,
          channel,
          effort: 'medium',
          expected: '5+ meaningful connections'
        })
      }
      
      if (day % 7 === 0) { // Sundays - Analysis
        tasks.push({
          id: `${day}-${channel}-analysis`,
          type: 'analysis',
          title: `Analyze ${channel} performance`,
          description: `Review metrics and optimize strategy for ${channel}`,
          channel,
          effort: 'low',
          expected: 'Weekly report completed'
        })
      }
    })
    
    calendar.push({
      day,
      date: date.toISOString().split('T')[0],
      tasks
    })
  }
  
  return calendar
}

function ok(data: any, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
}

function bad(err: string, code = 400) { 
  return NextResponse.json({ error: err }, { status: code }) 
}

export async function POST(req: NextRequest) {
  try {
    const body: CalendarRequest = await req.json()
    
    if (!body.channels || !Array.isArray(body.channels) || body.channels.length === 0) {
      return bad('channels array is required')
    }
    
    if (!body.vertical) {
      return bad('vertical is required')
    }
    
    if (body.channels.length > 3) {
      return bad('Maximum 3 channels allowed for focused execution')
    }
    
    const calendar = generateCalendar(body.channels, body.vertical)
    
    // Calculate summary stats
    const totalTasks = calendar.reduce((sum, day) => sum + day.tasks.length, 0)
    const tasksByType = calendar.reduce((acc, day) => {
      day.tasks.forEach(task => {
        acc[task.type] = (acc[task.type] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)
    
    const tasksByChannel = calendar.reduce((acc, day) => {
      day.tasks.forEach(task => {
        acc[task.channel] = (acc[task.channel] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)
    
    return ok({
      calendar,
      summary: {
        totalTasks,
        tasksByType,
        tasksByChannel,
        channels: body.channels,
        vertical: body.vertical,
        startDate: calendar[0]?.date,
        endDate: calendar[29]?.date
      }
    })
    
  } catch (error) {
    return bad('Invalid JSON or server error', 500)
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const vertical = (searchParams.get('vertical') as Vertical) || 'saas'
  const channelsParam = searchParams.get('channels') || 'seo,social'
  const channels = channelsParam.split(',') as Channel[]
  
  const calendar = generateCalendar(channels.slice(0, 3), vertical)
  
  return ok({
    calendar,
    availableChannels: ['seo', 'social', 'email', 'partnerships', 'ads', 'community'],
    availableVerticals: ['ai-leadgen', 'ai-support', 'saas', 'api', 'content']
  })
}
