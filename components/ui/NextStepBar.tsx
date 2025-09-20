'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const steps = [
  { id: 'start', label: 'Start', path: '/start' },
  { id: 'validate', label: 'Validate', path: '/validate' },
  { id: 'plan', label: 'Plan', path: '/plan' },
  { id: 'build', label: 'Build', paths: ['/product/builder', '/product/ecosystem', '/product/marketplace', '/product/api'] },
  { id: 'launch', label: 'Launch', path: '/launch' },
  { id: 'grow', label: 'Grow', path: '/grow' }
]

export function NextStepBar() {
  const pathname = usePathname()
  
  const getCurrentStepIndex = () => {
    const index = steps.findIndex(step => {
      if (Array.isArray(step.paths)) {
        return step.paths.some(p => pathname.startsWith(p))
      }
      return step.path ? pathname.startsWith(step.path) : false
    })
    return index >= 0 ? index : -1
  }
  
  const currentStepIndex = getCurrentStepIndex()
  
  return (
    <div className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex
            const isLast = index === steps.length - 1
            
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                      isCompleted && "bg-primary text-primary-foreground",
                      isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      !isCompleted && !isCurrent && "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "ml-2 text-sm font-medium",
                      isCurrent && "text-primary",
                      !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "w-12 h-0.5 mx-2",
                      isCompleted ? "bg-primary" : "bg-secondary"
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
