'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [useImagesDir, setUseImagesDir] = useState(false) // fallback to /images if /brand fails

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div style={{ width: 120, height: 60 }} />

  // Prefer /brand, fallback to /images if onError fires once
  const base = useImagesDir ? '/images' : '/brand'
  const src = resolvedTheme === 'dark' ? `${base}/logo-dark.svg` : `${base}/logo-light.svg`

  return (
    <Link href="/" aria-label="Build AI Startups" className="flex items-center gap-2">
      <Image
        src={src}
        width={120}
        height={60}
        alt="Build AI Starups logo"
        priority
        onError={() => setUseImagesDir(true)}
      />
    </Link>
  )
}
