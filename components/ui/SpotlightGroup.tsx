// components/ui/SpotlightGroup.tsx
'use client'

import { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
  /** Cards must have data-spotlight; override selector only if you know why */
  itemSelector?: string
}

/**
 * Mirrors Cruip Stellar behavior:
 * - Listens to pointer movement on the container
 * - Computes pointer position relative to the container
 * - Sets CSS vars --mouse-x / --mouse-y on each child card (data-spotlight)
 * - No React re-renders on move
 */
export default function SpotlightGroup({
  children,
  itemSelector = '[data-spotlight]',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const cards = el.querySelectorAll<HTMLElement>(itemSelector)
      for (const card of cards) {
        const cr = card.getBoundingClientRect()
        const cardX = x - (cr.left - rect.left)
        const cardY = y - (cr.top - rect.top)
        card.style.setProperty('--mouse-x', `${cardX}px`)
        card.style.setProperty('--mouse-y', `${cardY}px`)
      }
    }

    el.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => el.removeEventListener('pointermove', onPointerMove)
  }, [itemSelector])

  return <div ref={ref}>{children}</div>
}
