'use client'

import { useEffect, useRef } from 'react'

interface SVGScrollTriggerProps {
  children: React.ReactNode
  className?: string
  /**
   * Percentage of element that must be visible (0-1)
   * Default: 0.8 (80% visible - recommended for best UX)
   */
  threshold?: number
}

export function SVGScrollTrigger({
  children,
  threshold = 0.8,
  className = ''
}: SVGScrollTriggerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const svg = container.querySelector('svg')
    if (!svg) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger when the specified threshold is met
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            svg.classList.add('is-visible')
            observer.unobserve(entry.target) // Stop observing after first trigger
          }
        })
      },
      {
        // Check multiple threshold points for smooth detection
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '0px'
      }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
