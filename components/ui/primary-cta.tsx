'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  href: string
  children?: ReactNode
  fullWidth?: boolean
  className?: string
}

export default function PrimaryCta({
  href,
  children = 'Generate Startup',
  fullWidth = false,
  className = '',
}: Props) {
  // Same look as the hero “Get Started” button
  const base =
    'btn text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group cta-primary'
  const width = fullWidth ? 'w-full' : ''

  return (
    <Link href={href} className={`${base} ${width} ${className}`}>
      {children}
      <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
        -&gt;
      </span>
    </Link>
  )
}
