'use client'

import React, { useRef, useState, useEffect } from 'react'
import MousePosition from './utils/mouse-position'

type HighlighterProps = {
  children: React.ReactNode
  className?: string
  refresh?: boolean
}

export default function Highlighter({
  children,
  className = '',
  refresh = false
}: HighlighterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = MousePosition()
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([])

  // Re-run box collection when children or refresh changes
  useEffect(() => {
    if (containerRef.current) {
      setBoxes(Array.from(containerRef.current.children).map((el) => el as HTMLElement))
    }
  }, [children, refresh])

  // Init container size
  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth
      containerSize.current.h = containerRef.current.offsetHeight
    }
  }

  // On mount and on resize
  useEffect(() => {
    initContainer()
    window.addEventListener('resize', initContainer)
    return () => {
      window.removeEventListener('resize', initContainer)
    }
  }, [])

  // On mouse move, update custom properties for all boxes
  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const { w, h } = containerSize.current
    const x = mousePosition.x - rect.left
    const y = mousePosition.y - rect.top
    const inside = x < w && x > 0 && y < h && y > 0
    if (inside) {
      mouse.current.x = x
      mouse.current.y = y
      boxes.forEach((box) => {
        const boxRect = box.getBoundingClientRect()
        const boxX = x - (boxRect.left - rect.left)
        const boxY = y - (boxRect.top - rect.top)
        box.style.setProperty('--mouse-x', `${boxX}px`)
        box.style.setProperty('--mouse-y', `${boxY}px`)
      })
    }
  }, [mousePosition, boxes])

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  )
}

type HighlighterItemProps = {
  children: React.ReactNode,
  className?: string
}

// Slightly improved effect: smoother in dark/light, a bit more modern
export function HighlighterItem({
  children,
  className = ''
}: HighlighterItemProps) {
  return (
    <div className={`
      relative h-full bg-slate-800 dark:bg-slate-900 rounded-3xl p-px
      before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-purple-500
      dark:before:bg-purple-700 before:rounded-full before:opacity-0 before:pointer-events-none
      before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)]
      hover:before:opacity-20 before:z-30 before:blur-[100px]
      after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500
      after:[background:radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.purple.500),transparent)]
      dark:after:[background:radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.purple.700),transparent)]
      group-hover:after:opacity-100 after:z-10 overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  )
}

export function HighlighterItem02({
  children,
  className = ''
}: HighlighterItemProps) {
  return (
    <div className={`
      relative h-full bg-slate-800 dark:bg-slate-900 rounded-3xl p-px -m-px
      before:absolute before:w-64 before:h-64 before:-left-32 before:-top-32 before:bg-indigo-500 dark:before:bg-indigo-700
      before:rounded-full before:opacity-0 before:pointer-events-none
      before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)]
      hover:before:opacity-30 before:z-30 before:blur-[64px]
      after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500
      after:[background:radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.indigo.500),transparent)]
      dark:after:[background:radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.indigo.700),transparent)]
      group-hover:after:opacity-100 after:z-10 overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  )
}
