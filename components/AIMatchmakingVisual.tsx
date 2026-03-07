'use client'

import { useEffect, useRef, useState } from 'react'

export default function AIMatchmakingVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Detect theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      const isDarkMode = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      setIsDark(isDarkMode)
    }

    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 300 * dpr
    let h = 300 * dpr
    c.width = w
    c.height = h
    c.style.width = '300px'
    c.style.height = '300px'

    const cx = w / 2
    const cy = h / 2
    let t = 0
    let raf = 0

    // Theme-specific colors
    const colors = isDark ? {
      bgGlow: 'rgba(124, 58, 237, 0.08)',
      nodeHueBase: 265,
      lineBase: 'rgba(168, 85, 247, 0.08)',
      particleLine: (hue: number, alpha: number) => `hsla(${hue}, 90%, 70%, ${alpha})`,
      nodeGlow: (hue: number, alpha: number) => `hsla(${hue}, 90%, 60%, ${alpha})`,
      nodeCore: (hue: number, alpha: number) => `hsla(${hue}, 90%, 75%, ${alpha})`,
      hubGrad1: 'rgba(168, 85, 247, 0.95)',
      hubGrad2: 'rgba(124, 58, 237, 0.85)',
      hubGrad3: 'rgba(34, 211, 238, 0.75)',
      hubGlow1: 'rgba(168, 85, 247, 0.25)',
      hubGlow2: 'rgba(34, 211, 238, 0.15)',
      ringColor: (alpha: number) => `rgba(168, 85, 247, ${alpha})`,
      textColor: '#ffffff',
      textShadow: 'rgba(255, 255, 255, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.4)'
    } : {
      bgGlow: 'rgba(124, 58, 237, 0.05)',
      nodeHueBase: 265,
      lineBase: 'rgba(124, 58, 237, 0.15)',
      particleLine: (hue: number, alpha: number) => `hsla(${hue}, 80%, 45%, ${alpha * 1.5})`,
      nodeGlow: (hue: number, alpha: number) => `hsla(${hue}, 80%, 50%, ${alpha * 1.5})`,
      nodeCore: (hue: number, alpha: number) => `hsla(${hue}, 85%, 55%, ${alpha})`,
      hubGrad1: 'rgba(124, 58, 237, 0.95)',
      hubGrad2: 'rgba(99, 102, 241, 0.90)',
      hubGrad3: 'rgba(59, 130, 246, 0.85)',
      hubGlow1: 'rgba(124, 58, 237, 0.35)',
      hubGlow2: 'rgba(99, 102, 241, 0.25)',
      ringColor: (alpha: number) => `rgba(124, 58, 237, ${alpha * 1.5})`,
      textColor: '#ffffff',
      textShadow: 'rgba(124, 58, 237, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.9)'
    }

    type Node = {
      angle: number
      speed: number
      radius: number
      size: number
      hue: number
      label: string
      pulsePhase: number
    }

    type Particle = {
      fromIdx: number
      toIdx: number
      progress: number
      speed: number
      size: number
      hue: number
    }

    const nodeLabels = ['👥', '💼', '🎓', '🚀', '💡', '🏢']
    
    const nodes: Node[] = Array.from({ length: 6 }, (_, i) => ({
      angle: (i * Math.PI * 2) / 6 - Math.PI / 2,
      speed: (0.0015 + Math.random() * 0.001) * (i % 2 === 0 ? 1 : -1),
      radius: 95 * dpr,
      size: 10 * dpr,
      hue: colors.nodeHueBase + i * 12,
      label: nodeLabels[i],
      pulsePhase: Math.random() * Math.PI * 2
    }))

    const particles: Particle[] = []

    function spawnParticle() {
      if (particles.length < 8 && Math.random() > 0.97) {
        const fromIdx = Math.floor(Math.random() * nodes.length)
        let toIdx = Math.floor(Math.random() * nodes.length)
        while (toIdx === fromIdx) {
          toIdx = Math.floor(Math.random() * nodes.length)
        }
        particles.push({
          fromIdx,
          toIdx,
          progress: 0,
          speed: 0.01 + Math.random() * 0.015,
          size: 2 * dpr + Math.random() * 2 * dpr,
          hue: colors.nodeHueBase + Math.random() * 70
        })
      }
    }

    function draw() {
      if (!ctx) return
      t += 1

      ctx.clearRect(0, 0, w, h)

      // Background glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150 * dpr)
      bgGrad.addColorStop(0, colors.bgGlow)
      bgGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, w, h)

      // Update particles
      spawnParticle()
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.progress += p.speed

        if (p.progress >= 1) {
          particles.splice(i, 1)
          continue
        }

        const from = nodes[p.fromIdx]
        const to = nodes[p.toIdx]
        
        const x1 = cx + Math.cos(from.angle + t * from.speed) * from.radius
        const y1 = cy + Math.sin(from.angle + t * from.speed) * from.radius
        const x2 = cx + Math.cos(to.angle + t * to.speed) * to.radius
        const y2 = cy + Math.sin(to.angle + t * to.speed) * to.radius

        const px = x1 + (x2 - x1) * p.progress
        const py = y1 + (y2 - y1) * p.progress

        // Draw connection line
        const lineAlpha = (isDark ? 0.15 : 0.25) * (1 - Math.abs(p.progress - 0.5) * 2)
        ctx.strokeStyle = colors.particleLine(p.hue, lineAlpha)
        ctx.lineWidth = 1.5 * dpr
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(px, py)
        ctx.stroke()

        // Particle glow
        ctx.beginPath()
        ctx.fillStyle = colors.particleLine(p.hue, isDark ? 0.2 : 0.3)
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Particle core
        ctx.beginPath()
        ctx.fillStyle = colors.particleLine(p.hue, isDark ? 0.9 : 1)
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw static connection web (faint)
      ctx.strokeStyle = colors.lineBase
      ctx.lineWidth = 1 * dpr
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]
        const x1 = cx + Math.cos(n1.angle + t * n1.speed) * n1.radius
        const y1 = cy + Math.sin(n1.angle + t * n1.speed) * n1.radius

        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.abs(i - j) <= 2 || (i === 0 && j === nodes.length - 1)) {
            const n2 = nodes[j]
            const x2 = cx + Math.cos(n2.angle + t * n2.speed) * n2.radius
            const y2 = cy + Math.sin(n2.angle + t * n2.speed) * n2.radius

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const x = cx + Math.cos(node.angle + t * node.speed) * node.radius
        const y = cy + Math.sin(node.angle + t * node.speed) * node.radius
        const pulse = 1 + Math.sin(t * 0.04 + node.pulsePhase) * 0.15

        // Node connection to center (faint line)
        ctx.strokeStyle = colors.nodeGlow(node.hue, 0.1)
        ctx.lineWidth = 1 * dpr
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Node outer glow
        ctx.beginPath()
        ctx.fillStyle = colors.nodeGlow(node.hue, isDark ? 0.12 : 0.18)
        ctx.arc(x, y, node.size * 3.5 * pulse, 0, Math.PI * 2)
        ctx.fill()

        // Node inner glow
        ctx.beginPath()
        ctx.fillStyle = colors.nodeGlow(node.hue, isDark ? 0.3 : 0.4)
        ctx.arc(x, y, node.size * 2 * pulse, 0, Math.PI * 2)
        ctx.fill()

        // Node core with gradient
        const nodeGrad = ctx.createRadialGradient(x - node.size * 0.3, y - node.size * 0.3, 0, x, y, node.size * pulse)
        nodeGrad.addColorStop(0, colors.nodeCore(node.hue, 1))
        nodeGrad.addColorStop(1, colors.nodeCore(node.hue, 0.8))
        
        ctx.beginPath()
        ctx.fillStyle = nodeGrad
        ctx.arc(x, y, node.size * pulse, 0, Math.PI * 2)
        ctx.fill()

        // Node border
        ctx.beginPath()
        ctx.strokeStyle = colors.nodeCore(node.hue, 0.7)
        ctx.lineWidth = 1.5 * dpr
        ctx.arc(x, y, node.size * pulse, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Central "AI" hub with animated rings
      const hubSize = 35 * dpr
      const hubPulse = 1 + Math.sin(t * 0.04) * 0.1

      // Rotating rings around center
      for (let i = 0; i < 3; i++) {
        const ringRadius = hubSize * (2.2 + i * 0.8) * hubPulse
        
        ctx.strokeStyle = colors.ringColor(0.15 - i * 0.04)
        ctx.lineWidth = 2 * dpr
        ctx.setLineDash([5 * dpr, 10 * dpr])
        ctx.lineDashOffset = -t * (i % 2 === 0 ? 1 : -1)
        
        ctx.beginPath()
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Central hub outer glow
      ctx.beginPath()
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, hubSize * 3)
      outerGlow.addColorStop(0, colors.hubGlow1)
      outerGlow.addColorStop(0.5, colors.hubGlow2)
      outerGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = outerGlow
      ctx.arc(cx, cy, hubSize * 3, 0, Math.PI * 2)
      ctx.fill()

      // Central hub background
      ctx.beginPath()
      const hubGrad = ctx.createRadialGradient(
        cx - hubSize * 0.3, 
        cy - hubSize * 0.3, 
        0, 
        cx, 
        cy, 
        hubSize * hubPulse
      )
      hubGrad.addColorStop(0, colors.hubGrad1)
      hubGrad.addColorStop(0.5, colors.hubGrad2)
      hubGrad.addColorStop(1, colors.hubGrad3)
      ctx.fillStyle = hubGrad
      ctx.arc(cx, cy, hubSize * hubPulse, 0, Math.PI * 2)
      ctx.fill()

      // Hub border
      ctx.beginPath()
      ctx.strokeStyle = colors.borderColor
      ctx.lineWidth = 2 * dpr
      ctx.arc(cx, cy, hubSize * hubPulse, 0, Math.PI * 2)
      ctx.stroke()

      // Draw "AI" text in center
      ctx.save()
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `bold ${28 * dpr}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
      
      // Text glow
      ctx.shadowColor = colors.textShadow
      ctx.shadowBlur = 15 * dpr
      ctx.fillStyle = colors.textColor
      ctx.fillText('AI', cx, cy)
      
      // Reset shadow and add crisp text on top
      ctx.shadowBlur = 0
      ctx.fillStyle = colors.textColor
      ctx.fillText('AI', cx, cy)
      ctx.restore()

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="w-[300px] h-[300px] mx-auto"
      style={{ filter: 'blur(0.2px)' }}
    />
  )
}
