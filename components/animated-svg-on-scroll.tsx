'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedSvgOnScrollProps {
  children: React.ReactNode
  threshold?: number
  triggerOnce?: boolean
  className?: string
}

export default function AnimatedSvgOnScroll({
  children,
  threshold = 0.3,
  triggerOnce = true,
  className = '',
}: AnimatedSvgOnScrollProps) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Element is now visible - trigger all SVG animations
          const container = ref.current
          if (container) {
            // Find all <animate>, <animateTransform>, <animateMotion> elements
            const animations = container.querySelectorAll('animate, animateTransform, animateMotion')
            
            // Restart each animation
            animations.forEach((anim) => {
              const animElement = anim as SVGAnimationElement
              try {
                // Stop any existing animation
                animElement.endElement()
                // Start the animation fresh
                animElement.beginElement()
              } catch (e) {
                // Some animations might not support endElement, that's okay
                try {
                  animElement.beginElement()
                } catch (err) {
                  console.warn('Could not start animation:', err)
                }
              }
            })
          }

          if (triggerOnce) {
            setHasAnimated(true)
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
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
