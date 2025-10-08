'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedSvgOnScrollProps {
  children: React.ReactNode
  threshold?: number // 0-1, how much of element must be visible (default 0.3 = 30%)
  triggerOnce?: boolean // true = animate once, false = animate every time it enters viewport
  className?: string
}

export default function AnimatedSvgOnScroll({
  children,
  threshold = 0.3,
  triggerOnce = true,
  className = '',
}: AnimatedSvgOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Element entered viewport
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            setHasAnimated(true)
          }
        } else {
          // Element left viewport
          if (!triggerOnce && !hasAnimated) {
            setIsVisible(false)
          }
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, triggerOnce, hasAnimated])

  return (
    <div
      ref={ref}
      className={className}
      data-animated={isVisible ? 'true' : 'false'}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {/* Key prop forces remount when isVisible changes, restarting SVG animations */}
      {isVisible ? <div key="visible">{children}</div> : <div key="hidden">{children}</div>}
    </div>
  )
}
