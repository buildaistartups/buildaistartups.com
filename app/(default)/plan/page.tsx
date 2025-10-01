'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { Loader2, TrendingUp, Code, Download, ChevronRight, ChevronLeft } from 'lucide-react'

// Define the types locally since they're not exported from schemas
type MiniPlanInput = {
  ideaId: string
  vertical: 'ai-leadgen' | 'ai-support'
  problemStatement: string
  solution: string
  targetUsers: string
  mvpFeatures?: string[]
  launchChannels?: string[]
}

type Forecast = {
  revenueRange: {
    low: number
    high: number
  }
  timeToFirstCustomer: number
  confidenceScore: number
  assumptions: string[]
}

const MVP_FEATURES = {
  'ai-leadgen': [
    'Email template generator',
    'Lead scoring AI',
    'CRM integration',
    'Automated follow-ups',
    'Analytics dashboard'
  ],
  'ai-support': [
    'AI chat widget',
    'Ticket auto-routing',
    'Knowledge base search',
    'Response suggestions',
    'Customer sentiment analysis'
  ]
}

const LAUNCH_CHANNELS = [
  { id: 'producthunt', label: 'Product Hunt' },
  { id: 'twitter', label: 'Twitter/X' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'reddit', label: 'Reddit' },
  { id: 'direct', label: 'Direct outreach' }
]

export default function PlanPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const ideaTitle = searchParams.get('idea') || 'AI Startup'
  const vertical = (searchParams.get('vertical') || 'ai-support') as 'ai-leadgen' | 'ai-support'
  const ideaId = searchParams.get('ideaId') || 'custom'

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [forecast, setForecast] = useState<Forecast | null>(null)
  
  const [plan, setPlan] = useState<MiniPlanInput>({
    ideaId,
    vertical,
    problemStatement: '',
    solution: '',
    targetUsers: '',
    mvpFeatures: [],
    launchChannels: []
  })

  const handleFeatureToggle = (feature: string) => {
    setPlan(prev => ({
      ...prev,
      mvpFeatures: prev.mvpFeatures?.includes(feature)
        ? prev.mvpFeatures.filter(f => f !== feature)
        : [...(prev.mvpFeatures || []), feature]
    }))
  }

  const handleChannelToggle = (channel: string) => {
    setPlan(prev => ({
      ...prev,
      launchChannels: prev.launchChannels?.includes(channel)
        ? prev.launchChannels.filter(c => c !== channel)
        : [...(prev.launchChannels || []), channel]
    }))
  }

  const getForecast = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan)
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate forecast')
      }
      
      setForecast(data.forecast)
      toast({
        title: 'Forecast generated!',
        description: 'Your revenue projections are ready'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = async () => {
    if (!forecast) {
      toast({
        title: 'Generate forecast first',
        description: 'You need to generate a forecast before downloading the PDF',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/plan/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, forecast })
      })
      
      if (!res.ok) throw new Error('Failed to generate PDF')
      
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai-startup-plan-${Date.now()}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)
      
      toast({
        title: 'PDF downloaded!',
        description: 'Check your downloads folder'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate PDF',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const goToBuild = () => {
    router.push(`/product/builder?vertical=${vertical}`)
  }

  const canProceed = () => {
    if (currentPage === 1) return plan.problemStatement && plan.solution
    if (currentPage === 2) return plan.targetUsers
    if (currentPage === 3) return (plan.mvpFeatures?.length || 0) > 0 && (plan.launchChannels?.length || 0) > 0
    return true
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Plan: {ideaTitle}</h1>
        <p className="text-lg text-muted-foreground">
          Let's turn your validated idea into an actionable plan
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <div
              key={page}
              className={`w-24 h-1 rounded ${
                page <= currentPage ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>
      </div>

      {currentPage === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Page 1: Problem & Solution</CardTitle>
            <CardDescription>
              Be specific - this clarity will guide everything else
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="problem">
                What problem are you solving? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="problem"
                placeholder="Sales teams waste 40% of their time on manual lead research..."
                value={plan.problemStatement}
                onChange={(e) => setPlan({ ...plan, problemStatement: e.target.value })}
                className="mt-2"
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tip: Start with "X people waste Y time/money on Z"
              </p>
            </div>
            
            <div>
              <Label htmlFor="solution">
                How does your AI solve it? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="solution"
                placeholder="Our AI analyzes company websites and news to generate personalized outreach..."
                value={plan.solution}
                onChange={(e) => setPlan({ ...plan, solution: e.target.value })}
                className="mt-2"
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tip: Focus on the outcome, not the technology
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {currentPage === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Page 2: Target Users</CardTitle>
            <CardDescription>
              Who exactly will pay for this? Be as specific as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="users">
                Describe your ideal customer <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="users"
                placeholder="B2B SaaS companies with 10-50 employees who sell to enterprise..."
                value={plan.targetUsers}
                onChange={(e) => setPlan({ ...plan, targetUsers: e.target.value })}
                className="mt-2"
                rows={3}
              />
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Good examples:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>"Seed-stage B2B SaaS founders who need their first 100 customers"</li>
                  <li>"E-commerce stores doing $10K-100K/month with high support volume"</li>
                  <li>"Marketing agencies managing 5+ client accounts"</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentPage === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Page 3: MVP & Launch</CardTitle>
            <CardDescription>
              Choose 1-3 features for v1 and where you'll launch
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>MVP Features (choose 1-5)</Label>
              <div className="mt-3 space-y-3">
                {MVP_FEATURES[vertical].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={plan.mvpFeatures?.includes(feature) || false}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <label
                      htmlFor={feature}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Start small! You can always add more later
              </p>
            </div>

            <div>
              <Label>Launch Channels (choose 1-3)</Label>
              <div className="mt-3 space-y-3">
                {LAUNCH_CHANNELS.map((channel) => (
                  <div key={channel.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={channel.id}
                      checked={plan.launchChannels?.includes(channel.id) || false}
                      onCheckedChange={() => handleChannelToggle(channel.id)}
                    />
                    <label
                      htmlFor={channel.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {channel.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        {currentPage < 3 ? (
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!canProceed()}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={getForecast}
              disabled={loading || !canProceed()}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <TrendingUp className="h-4 w-4 mr-2" />
              )}
              Get Forecast
            </Button>
            
            {forecast && (
              <Button
                variant="outline"
                onClick={downloadPDF}
                disabled={loading}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            )}
            
            <Button
              onClick={goToBuild}
              disabled={!forecast}
            >
              <Code className="h-4 w-4 mr-2" />
              Generate App
            </Button>
          </div>
        )}
      </div>

      {/* Forecast display */}
      {forecast && (
        <Card className="mt-8 border-primary">
          <CardHeader>
            <CardTitle>Your Revenue Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-primary">
                  ${forecast.revenueRange.low.toLocaleString()} - ${forecast.revenueRange.high.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Monthly recurring revenue in 6 months</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Time to first customer</p>
                  <p className="text-2xl">~{forecast.timeToFirstCustomer} days</p>
                </div>
                <div>
                  <p className="font-medium">Confidence</p>
                  <p className="text-2xl">{forecast.confidenceScore}%</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-2">Key assumptions:</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  {forecast.assumptions.map((assumption, i) => (
                    <li key={i}>{assumption}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
