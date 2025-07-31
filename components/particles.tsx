import React from 'react'

type Props = {
  className?: string
  quantity?: number
}

export default function Particles({ className = '', quantity = 20 }: Props) {
  // (No changes needed here for light/dark mode)
  return (
    <div className={className}>
      {/* Particle animation implementation */}
    </div>
  )
}
