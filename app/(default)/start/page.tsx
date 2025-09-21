'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Rocket } from 'lucide-react'

// Define the types locally
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

export default function StartPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [ideas, setIdeas] = useState<IdeaCard[]>([])
  
  const [quiz, setQuiz] = useState<QuizInput>({
    experienceLevel: 'beginner',
    timePerWeek: 10,
    budget: 'low',
    skills: [],
    interests: [],
    audiences: [],
    goals: [],
    riskTolerance: 'medium'
  })

  const SKILLS = [
    'coding', 'no-code', 'design', 'marketing', 'sales', 'writing', 'data', 'ops', 'ai-ml', 'support'
  ]

  const AUDIENCES = [
    'consumers', 'indie-saas', 'agencies', 'smb', 'midmarket', 'enterprise', 'creators', 'nonprofits'
  ]

  const GOALS = [
    'learn-by-doing', 'side-income', 'replace-job', 'raise-capital', 'exit'
  ]

  const handleSkillToggle = (skill: string) => {
    setQuiz(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleAudienceToggle = (audience: string) => {
    setQuiz(prev => ({
      ...prev,
      audiences: prev.audiences.includes(audience)
        ? prev.audiences.filter(a => a !== audience)
        : [...prev.audiences, audience]
    }))
  }

  const handleGoalToggle = (goal: string) => {
    setQuiz(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const generateIdeas = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz)
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate ideas')
      }
      
      setIdeas(data.ideas)
      setCurrentStep(3)
      
      toast({
        title: 'Ideas generated!',
        description: `Found ${data.ideas.length} AI startup ideas for you`
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

  const selectIdea = (idea: IdeaCard) => {
    router.push(`/validate?idea=${encodeURIComponent(idea.title)}&vertical=${idea.vertical}&ideaId=${idea.id}`)
  }

  const canProceedToStep2 = quiz.experienceLevel && quiz.timePerWeek > 0 && quiz.budget
  const canGenerateIdeas = quiz.skills.length > 0 && quiz.interests.length > 0 && quiz.audiences.length > 0 && quiz.goals.length > 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Start Your AI Journey</h1>
        <p className="text-lg text-muted-foreground">
          Answer a few questions to get personalized AI startup ideas
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-24 h-1 rounded ${
                step <= currentStep ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Background</CardTitle>
            <CardDescription>
              Help us understand your current situation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Experience Level</Label>
              <RadioGroup
                value={quiz.experienceLevel}
                onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => 
                  setQuiz({ ...quiz, experienceLevel: value })
                }
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">Beginner - New to startups</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate - Some experience</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced">Advanced - Serial entrepreneur</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="time" className="text-base font-medium">
                Time per week (hours)
              </Label>
              <Input
                id="time"
                type="number"
                min="1"
                max="80"
                value={quiz.timePerWeek}
                onChange={(e) => setQuiz({ ...quiz, timePerWeek: parseInt(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-base font-medium">Monthly Budget</Label>
              <RadioGroup
                value={quiz.budget}
                onValueChange={(value: 'none' | 'low' | 'medium' | 'high') => 
                  setQuiz({ ...quiz, budget: value })
                }
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">$0 - Bootstrap only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">$1-100 - Minimal tools</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">$100-500 - Standard tools</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">$500+ - Premium tools</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Your Profile</CardTitle>
            <CardDescription>
              Tell us about your skills and interests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Your Skills</Label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {SKILLS.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={quiz.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={skill} className="capitalize cursor-pointer">
                      {skill.replace('-', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="interests" className="text-base font-medium">
                Interests/Industries
              </Label>
              <Input
                id="interests"
                placeholder="e.g., healthcare, education, finance, e-commerce"
                value={quiz.interests.join(', ')}
                onChange={(e) => setQuiz({ 
                  ...quiz, 
                  interests: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate multiple interests with commas
              </p>
            </div>

            <div>
              <Label className="text-base font-medium">Target Audience</Label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {AUDIENCES.map((audience) => (
                  <div key={audience} className="flex items-center space-x-2">
                    <Checkbox
                      id={audience}
                      checked={quiz.audiences.includes(audience)}
                      onCheckedChange={() => handleAudienceToggle(audience)}
                    />
                    <Label htmlFor={audience} className="capitalize cursor-pointer">
                      {audience.replace('-', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Goals</Label>
              <div className="mt-3 space-y-3">
                {GOALS.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={quiz.goals.includes(goal)}
                      onCheckedChange={() => handleGoalToggle(goal)}
                    />
                    <Label htmlFor={goal} className="capitalize cursor-pointer">
                      {goal.replace('-', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Risk Tolerance</Label>
              <RadioGroup
                value={quiz.riskTolerance}
                onValueChange={(value: 'low' | 'medium' | 'high') => 
                  setQuiz({ ...quiz, riskTolerance: value })
                }
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="risk-low" />
                  <Label htmlFor="risk-low">Low - Proven business models</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="risk-medium" />
                  <Label htmlFor="risk-medium">Medium - Some experimentation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="risk-high" />
                  <Label htmlFor="risk-high">High - Cutting edge ideas</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your AI Startup Ideas</CardTitle>
              <CardDescription>
                Click on an idea to validate and plan it
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ideas.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Generate some ideas to get started
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {ideas.map((idea) => (
                    <div
                      key={idea.id}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => selectIdea(idea)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{idea.title}</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {idea.vertical}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {idea.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 && currentStep < 3 && (
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </Button>
        )}
        
        {currentStep === 1 && (
          <div className="ml-auto">
            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!canProceedToStep2}
            >
              Next
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="ml-auto">
            <Button
              onClick={generateIdeas}
              disabled={loading || !canGenerateIdeas}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Rocket className="h-4 w-4 mr-2" />
              )}
              Generate Ideas
            </Button>
          </div>
        )}

        {currentStep === 3 && ideas.length === 0 && (
          <div className="ml-auto">
            <Button
              onClick={generateIdeas}
              disabled={loading || !canGenerateIdeas}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Rocket className="h-4 w-4 mr-2" />
              )}
              Generate Ideas
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
