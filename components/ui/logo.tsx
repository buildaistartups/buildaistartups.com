"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

// ...the rest of your code (unchanged)
export default function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Check if user has already chosen a theme
    if (typeof window !== "undefined") {
      setFirstLoad(!localStorage.getItem("theme"))
    }
  }, [])

  // Prevent rendering until theme is loaded (fixes flicker/bug)
  if (!mounted) {
    return <div style={{ width: 120, height: 60 }} />  // Placeholder, adjust as needed
  }

  // Logo selection logic
  let logoSrc = '/images/logo.svg' // Default logo
  if (!firstLoad) {
    logoSrc = resolvedTheme === 'dark'
      ? '/images/logo-dark.svg'
      : '/images/logo-light.svg'
  }

  return (
    <Link href="/" aria-label="BuildAIStartups" className="flex items-center gap-2">
      <
