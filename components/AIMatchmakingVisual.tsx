'use client'

import { useEffect, useRef } from 'react'

export default function AIMatchmakingVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

    type Node = {
      angle: number
      speed: number
      radius: number
      size: number
      hue: number
    }

    const nodes: Node[] = Array.from({ length: 6 }, (_, i) => ({
      angle: (i * Math.PI * 2) / 6,
      speed: 0.003 + Math.random() * 0.002,
      radius: 80 * dpr,
      size: 8 * dpr,
      hue: 265 + i * 15
    }))

    function draw() {
      if (!ctx) return
      t += 1

      ctx.clearRect(0, 0, w, h)

      // Draw connections between nodes
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)'
      ctx.lineWidth = 1 * dpr
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]
        const x1 = cx + Math.cos(n1.angle + t * n1.speed) * n1.radius
        const y1 = cy + Math.sin(n1.angle + t * n1.speed) * n1.radius

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const x2 = cx + Math.cos(n2.angle + t * n2.speed) * n2.radius
          const y2 = cy + Math.sin(n2.angle + t * n2.speed) * n2.radius

          const dist = Math.hypot(x2 - x1, y2 - y1)
          if (dist < 180 * dpr) {
            const alpha = (1 - dist / (180 * dpr)) * 0.3
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.angle += node.speed

        const x = cx + Math.cos(node.angle + t * node.speed) * node.radius
        const y = cy + Math.sin(node.angle + t * node.speed) * node.radius
        const pulse = 1 + Math.sin(t * 0.05) * 0.2

        // Glow
        ctx.beginPath()
        ctx.fillStyle = `hsla(${node.hue}, 90%, 65%, 0.15)`
        ctx.arc(x, y, node.size * 3 * pulse, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.fillStyle = `hsla(${node.hue}, 90%, 70%, 0.9)`
        ctx.arc(x, y, node.size * pulse, 0, Math.PI * 2)
        ctx.fill()
      })

      // Center hub
      const hubSize = 15 * dpr * (1 + Math.sin(t * 0.03) * 0.1)
      
      // Hub glow
      ctx.beginPath()
      ctx.fillStyle = 'rgba(168, 85, 247, 0.2)'
      ctx.arc(cx, cy, hubSize * 3, 0, Math.PI * 2)
      ctx.fill()

      // Hub core
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, hubSize)
      gradient.addColorStop(0, 'rgba(168, 85, 247, 0.9)')
      gradient.addColorStop(1, 'rgba(34, 211, 238, 0.7)')
      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.arc(cx, cy, hubSize, 0, Math.PI * 2)
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-[300px] h-[300px] mx-auto"
      style={{ filter: 'blur(0.3px)' }}
    />
  )
}
