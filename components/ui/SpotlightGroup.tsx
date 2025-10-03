// components/ui/SpotlightGroup.tsx
'use client'

import { useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
  /** Cards must have this selector; default matches the global CSS utility below */
  itemSelector?: string
}

/**
 * Mouse-only spotlight:
 * - Updates --mouse-x / --mouse-y only on the card under the pointer
 * - Clears variables when leaving that card / container
 * - No React re-renders on move
 */
export default function SpotlightGroup({
  children,
  itemSelector = '.spotlight-card',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let activeCard: HTMLElement | null = null
    const clear = (card: HTMLElement | null) => {
      if (!card) return
      card.style.setProperty('--mouse-x', '-1000px')
      card.style.setProperty('--mouse-y', '-1000px')
    }

    const onPointerMove = (e: PointerEvent) => {
      // Which element is under the pointer?
      const under = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      const card = under && el.contains(under) ? (under.closest(itemSelector) as HTMLElement | null) : null

      // If we moved to a different card, clear the old one
      if (card !== activeCard) {
        clear(activeCard)
        activeCard = card
      }

      // If we're over a card, set vars relative to that card
      if (card) {
        const groupRect = el.getBoundingClientRect()
        const cardRect = card.getBoundingClientRect()
        const x = e.clientX - groupRect.left - (cardRect.left - groupRect.left)
        const y = e.clientY - groupRect.top - (cardRect.top - groupRect.top)
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      }
    }

    const onPointerLeave = () => {
      clear(activeCard)
      activeCard = null
    }

    el.addEventListener('pointermove', onPointerMove, { passive: true })
    el.addEventListener('pointerleave', onPointerLeave)
    return () => {
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [itemSelector])

  return <div ref={ref}>{children}</div>
}
