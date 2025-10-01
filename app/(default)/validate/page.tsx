'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Users, Target, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ValidatePage() {
  const searchParams = useSearchParams()
  const idea = searchParams.get('idea') || 'Your AI Startup'
  const vertical = searchParams.get('vertical') || 'ai-support'
  const ideaId = searchParams.get('ideaId') || ''

  const validationSteps = [
    {
      icon: Users,
      title: 'Talk to 5 potential customers',
      description: 'Use this script: "I\'m building [idea]. Would you pay $X/month for this?"',
      timeEstimate: '2-3 hours'
    },
    {
      icon: Target,
      title: 'Find 3 competitors',
      description: 'Google similar tools. If none exist, that\'s either very good or very bad!',
      timeEstimate: '30 mins'
    },
    {
      icon: Zap,
      title: 'Build a landing page',
      description: 'Just a simple page with an email signup. Ship it today!',
      timeEstimate: '1-2 hours'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Validate: {idea}</h1>
        <p className="text-lg text-muted-foreground">
          Before writing code, let's make sure people want this
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            The Validation Interview Kit
          </CardTitle>
          <CardDescription>
            Copy these questions and start talking to potential customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
            <p className="font-medium">Opening:</p>
            <p className="italic text-sm">
              "Hi! I'm working on {idea} for {vertical === 'ai-leadgen' ? 'sales teams' : 'support teams'}. 
              Do you have 5 minutes to help me understand if this would be useful?"
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Key Questions:</p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>What's your biggest frustration with {vertical === 'ai-leadgen' ? 'finding new customers' : 'customer support'} today?</li>
              <li>How are you solving this problem right now?</li>
              <li>What would an ideal solution look like?</li>
              <li>Would you pay $49-99/month for a tool that [describe your solution]?</li>
              <li>What's the #1 feature this would need to have?</li>
            </ol>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="font-medium mb-2">🎯 Success Metric:</p>
            <p className="text-sm">
              If 3 out of 5 people say "yes" to question #4, you're onto something!
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 mb-8">
        <h2 className="text-2xl font-semibold">Quick Validation Checklist</h2>
        {validationSteps.map((step, index) => (
          <Card key={index}>
            <CardContent className="flex items-start gap-4 pt-6">
              <step.icon className="h-8 w-8 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  ⏱️ {step.timeEstimate}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Where to Find People to Interview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {vertical === 'ai-leadgen' ? (
            <>
              <p>• LinkedIn Sales Navigator (search for "sales manager" or "SDR")</p>
              <p>• Facebook groups for B2B sales professionals</p>
              <p>• Reddit: r/sales</p>
              <p>• Local startup meetups</p>
            </>
          ) : (
            <>
              <p>• LinkedIn (search for "customer success manager")</p>
              <p>• Facebook groups for customer support pros</p>
              <p>• Reddit: r/CustomerService</p>
              <p>• Slack communities (Support Driven, CX Accelerator)</p>
            </>
          )}
        </CardContent>
      </Card>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          Done validating? Let's create your plan!
        </p>
        <Link 
          href={`/plan?idea=${encodeURIComponent(idea)}&vertical=${vertical}&ideaId=${ideaId}`}
        >
          <Button size="lg" className="gap-2">
            Create My Plan
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
