import { z } from 'zod'

// JSON Schema definitions (draft-07)
export const quizSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['experience', 'timeline', 'budget'],
  properties: {
    experience: {
      type: 'string',
      enum: ['none', 'some', 'expert'],
      description: 'Technical experience level'
    },
    timeline: {
      type: 'string',
      enum: ['weekend', 'month', 'quarter'],
      description: 'Time to launch'
    },
    budget: {
      type: 'string',
      enum: ['bootstrap', 'small', 'funded'],
      description: 'Budget range'
    },
    preferredVertical: {
      type: 'string',
      enum: ['ai-leadgen', 'ai-support', 'other'],
      description: 'Preferred AI vertical'
    }
  },
  additionalProperties: false
}

export const miniPlanSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['ideaId', 'vertical', 'problemStatement', 'solution', 'targetUsers'],
  properties: {
    ideaId: {
      type: 'string',
      minLength: 1
    },
    vertical: {
      type: 'string',
      enum: ['ai-leadgen', 'ai-support']
    },
    problemStatement: {
      type: 'string',
      minLength: 10,
      maxLength: 500
    },
    solution: {
      type: 'string',
      minLength: 10,
      maxLength: 500
    },
    targetUsers: {
      type: 'string',
      minLength: 5,
      maxLength: 200
    },
    mvpFeatures: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 3,
        maxLength: 100
      },
      minItems: 1,
      maxItems: 5
    },
    launchChannels: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['producthunt', 'twitter', 'linkedin', 'reddit', 'direct']
      },
      minItems: 1,
      maxItems: 3
    }
  },
  additionalProperties: false
}

// TypeScript types
export interface QuizInput {
  experience: 'none' | 'some' | 'expert'
  timeline: 'weekend' | 'month' | 'quarter'
  budget: 'bootstrap' | 'small' | 'funded'
  preferredVertical?: 'ai-leadgen' | 'ai-support' | 'other'
}

export interface IdeaCard {
  id: string
  title: string
  description: string
  vertical: 'ai-leadgen' | 'ai-support'
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedDays: number
  techStack: string[]
}

export interface MiniPlanInput {
  ideaId: string
  vertical: 'ai-leadgen' | 'ai-support'
  problemStatement: string
  solution: string
  targetUsers: string
  mvpFeatures?: string[]
  launchChannels?: ('producthunt' | 'twitter' | 'linkedin' | 'reddit' | 'direct')[]
}

export interface Forecast {
  revenueRange: {
    low: number
    high: number
  }
  timeToFirstCustomer: number // days
  confidenceScore: number // 0-100
  assumptions: string[]
}
