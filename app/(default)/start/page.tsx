'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Rocket } from 'lucide-react'
import type { QuizInput, IdeaCard } from '@/lib/schemas'

export default function StartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState<QuizInput>({
    experience: 'none',
    timeline: 'weekend',
    budget: 'bootstrap'
  })
  const [ideas, setIdeas] = useState<IdeaCard[]>([])
  
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz)
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get ideas')
      }
      
      setIdeas(data.ideas)
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
  
  const selectIdea = (idea: IdeaCard) => {
    const params = new URLSearchParams({
      idea: idea.title,
      vertical: idea.vertical,
      ideaId: idea.id
    })
    router.push(`/validate?${params.toString()}`)
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Start Your AI Journey</h1>
        <p className="text-lg text-muted-foreground">
          Answer 3 simple questions and we'll suggest perfect AI startup ideas for you
        </p>
      </div>
      
      {ideas.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Quick Quiz</CardTitle>
            <CardDescription>
              Help us understand your background so we can suggest the best ideas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Experience */}
            <div>
              <Label className="text-base mb-3 block">What's your coding experience?</Label>
              <RadioGroup
                value={quiz.experience}
                onValueChange={(value) => setQuiz({ ...quiz, experience: value as any })}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="none" id="exp-none" />
                  <Label htmlFor="exp-none" className="font-normal cursor-pointer">
                    I'm just starting (will use AI to code)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="some" id="exp-some" />
                  <Label htmlFor="exp-some" className="font-normal cursor-pointer">
                    I can build basic apps
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expert" id="exp-expert" />
                  <Label htmlFor="exp-expert" className="font-normal cursor-pointer">
                    I'm a seasoned developer
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Timeline */}
            <div>
              <Label className="text-base mb-3 block">When do you want to launch?</Label>
              <RadioGroup
                value={quiz.timeline}
                onValueChange={(value) => setQuiz({ ...quiz, timeline: value as any })}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="weekend" id="time-weekend" />
                  <Label htmlFor="time-weekend" className="font-normal cursor-pointer">
                    This weekend
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="month" id="time-month" />
                  <Label htmlFor="time-month" className="font-normal cursor-pointer">
                    Within a month
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quarter" id="time-quarter" />
                  <Label htmlFor="time-quarter" className="font-normal cursor-pointer">
                    Next 3 months
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Budget */}
            <div>
              <Label className="text-base mb-3 block">What's your budget?</Label>
              <RadioGroup
                value={quiz.budget}
                onValueChange={(value) => setQuiz({ ...quiz, budget: value as any })}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="bootstrap" id="budget-bootstrap" />
                  <Label htmlFor="budget-bootstrap" className="font-normal cursor-pointer">
                    $0-100 (bootstrap mode)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="small" id="budget-small" />
                  <Label htmlFor="budget-small" className="font-normal cursor-pointer">
                    $100-1000 (small investment)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="funded" id="budget-funded" />
                  <Label htmlFor="budget-funded" className="font-normal cursor-pointer">
                    $1000+ (ready to scale)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Preferred Vertical */}
            <div>
              <Label className="text-base mb-3 block">Any preference? (optional)</Label>
              <RadioGroup
                value={quiz.preferredVertical || ''}
                onValueChange={(value) => setQuiz({ ...quiz, preferredVertical: value as any || undefined })}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="ai-leadgen" id="vert-leadgen" />
                  <Label htmlFor="vert-leadgen" className="font-normal cursor-pointer">
                    AI Lead Generation (help businesses find customers)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="ai-support" id="vert-support" />
                  <Label htmlFor="vert-support" className="font-normal cursor-pointer">
                    AI Support (help businesses serve customers)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="vert-other" />
                  <Label htmlFor="vert-other" className="font-normal cursor-pointer">
                    Show me everything
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding perfect ideas...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Get My AI Startup Ideas
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Your Personalized Ideas</h2>
            <p className="text-muted-foreground">
              Click any idea to start validating and building
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {ideas.map((idea) => (
              <Card 
                key={idea.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => selectIdea(idea)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{idea.title}</CardTitle>
                    <span className={`text-xs px-2 py-1 rounded ${
                      idea.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      idea.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {idea.difficulty}
                    </span>
                  </div>
                  <CardDescription>{idea.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {idea.techStack.map((tech) => (
                      <span key={tech} className="text-xs bg-secondary px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      ~{idea.estimatedDays} days to build
                    </span>
                    <span className="text-sm font-medium capitalize">
                      {idea.vertical.replace('-', ' ')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
