'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  href: string
  children?: ReactNode
  fullWidth?: boolean
  className?: string
  ariaLabel?: string
  prefetch?: boolean
}

export default function PrimaryCta({
  href,
  children = 'Generate Startup',
  fullWidth = false,
  className = '',
  ariaLabel,
  prefetch = false, // CTAs often don’t need eager prefetch
}: Props) {
  const base =
    'btn text-slate-900 bg-linear-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group cta-primary'
  const width = fullWidth ? 'w-full' : ''
  const isExternal = /^https?:\/\//i.test(href)
  const computedAria = ariaLabel || (typeof children === 'string' ? children : 'Primary action')

  return (
    <Link
      href={href}
      prefetch={prefetch}
      aria-label={computedAria}
      className={`${base} ${width} ${className}`}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      <span
        className="ml-1 tracking-normal text-purple-500 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        -&gt;
      </span>
    </Link>
  )
}
