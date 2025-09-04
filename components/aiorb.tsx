'use client'

import { useEffect, useRef } from 'react'

export default function AIOrb() {
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const scene = sceneRef.current
    const c = canvasRef.current
    if (!scene || !c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let w = 0,
      h = 0,
      cx = 0,
      cy = 0,
      t = 0,
      raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type P = {
      baseR: number
      r: number
      a: number
      speed: number
      size: number
      hue: number
      tw: number
    }
    let particles: P[] = []

    const ro = new ResizeObserver(() => resize())
    ro.observe(scene)

    function resize() {
      if (!scene || !c) return
      
      const rect = scene.getBoundingClientRect()
      w = (c.width = Math.floor(rect.width * dpr))
      h = (c.height = Math.floor(rect.height * dpr))
      c.style.width = `${rect.width}px`
      c.style.height = `${rect.height}px`
      cx = w / 2
      cy = h / 2
      particles = Array.from({ length: 220 }, () => {
        const radius =
          Math.pow(Math.random(), 0.8) * Math.min(w, h) * 0.45 + 40 * dpr
        return {
          baseR: radius,
          r: radius,
          a: Math.random() * Math.PI * 2,
          speed:
            (Math.random() * 0.0007 + 0.0002) * (Math.random() < 0.5 ? -1 : 1),
          size: Math.random() * 1.6 * dpr + 0.7 * dpr,
          hue: 265 + Math.random() * 70,
          tw: Math.random() * Math.PI * 2,
        }
      })
    }

    function draw() {
      if (!ctx) return
      
      t += 1
      ctx.clearRect(0, 0, w, h)

      // subtle radial glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.6)
      grd.addColorStop(0, 'rgba(124,58,237,0.05)')
      grd.addColorStop(1, 'rgba(2,6,23,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, w, h)

      particles.forEach((p) => {
        p.a += p.speed
        p.r = p.baseR + Math.sin(t * 0.004 + p.tw) * 6 * dpr
        const x = cx + Math.cos(p.a) * p.r
        const y = cy + Math.sin(p.a) * p.r * (0.86 + Math.sin(p.a * 2) * 0.06)
        const alpha = 0.7 + Math.sin(t * 0.02 + p.tw) * 0.3

        // glow
        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${alpha * 0.08})`
        ctx.arc(x, y, p.size * 3.2, 0, Math.PI * 2)
        ctx.fill()

        // core
        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${alpha})`
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <>
      {/* Orb Scene */}
      <div ref={sceneRef} className="ai-orb__scene">
        <div className="ai-orb__halo" aria-hidden="true" />

        <canvas ref={canvasRef} className="ai-orb__field" />

        <div className="ai-orb__orb">
          <div className="ai-orb__ring r1" />
          <div className="ai-orb__ring r2" />
          <div className="ai-orb__ring r3" />

          <div className="ai-orb__logoPlate">
            <div className="ai-orb__brand">
              Build AI Startups
              <small>From one-line spec to shipped product</small>
            </div>
          </div>

          <div className="ai-orb__chip c1">
            <span>Spec → PRD</span>
          </div>
          <div className="ai-orb__chip c2">
            <span>Repo / UI</span>
          </div>
          <div className="ai-orb__chip c3">
            <span>Deploy</span>
          </div>

          <svg
            className="ai-orb__signals"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ai-orb-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <path d="M 50 250 Q 300 100 500 500 T 950 720" />
            <path d="M 80 700 Q 260 540 500 500 T 920 320" />
            <path d="M 120 480 Q 380 420 500 500 T 880 540" />
          </svg>
        </div>
      </div>

      {/* Styled-JSX (scoped to this component) */}
      <style jsx>{`
        /* Theme variables (scoped to scene for safety) */
        .ai-orb__scene {
          --bg-from: #0b0f1a;
          --bg-to: #05070d;
          --purple: #a855f7;
          --violet: #7c3aed;
          --indigo: #6366f1;
          --teal: #14b8a6;
          --cyan: #22d3ee;
          --ring: rgba(168, 85, 247, 0.55);

          position: relative;
          width: 100%;
          height: 24rem;
          display: grid;
          place-items: center;
          overflow: visible;
        }
        @media (min-width: 768px) {
          .ai-orb__scene {
            height: 28rem;
          }
        }
        @media (min-width: 1024px) {
          .ai-orb__scene {
            height: 32rem;
          }
        }

        .ai-orb__halo {
          position: absolute;
          inset: -10vmax;
          background: radial-gradient(45% 55% at 50% 40%, rgba(20, 184, 166, 0.08), transparent 60%),
            radial-gradient(65% 55% at 50% 60%, rgba(99, 102, 241, 0.08), transparent 60%),
            conic-gradient(
              from 0deg,
              rgba(168, 85, 247, 0.15),
              rgba(34, 211, 238, 0.15),
              rgba(124, 58, 237, 0.15),
              rgba(20, 184, 166, 0.15),
              rgba(168, 85, 247, 0.15)
            );
          filter: blur(24px);
          animation: ai-spin 38s linear infinite;
          opacity: 0.7;
          pointer-events: none;
        }

        /* Central glass orb */
        .ai-orb__orb {
          position: relative;
          width: min(56vmin, 560px);
          max-width: 100%;
          aspect-ratio: 1/1;
          border-radius: 50%;
          background: radial-gradient(120px 120px at 60% 35%, rgba(255, 255, 255, 0.35), transparent 60%),
            radial-gradient(80% 80% at 45% 55%, rgba(124, 58, 237, 0.14), transparent 70%),
            radial-gradient(110% 110% at 50% 60%, rgba(34, 211, 238, 0.12), transparent 70%),
            rgba(9, 12, 22, 0.35);
          box-shadow: inset 0 0 60px rgba(124, 58, 237, 0.35), inset 0 0 160px rgba(34, 211, 238, 0.22),
            0 0 0 1px rgba(148, 163, 184, 0.08), 0 20px 80px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: grid;
          place-items: center;
          isolation: isolate;
        }
        .ai-orb__orb::before {
          content: '';
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(120% 80% at 30% 20%, rgba(168, 85, 247, 0.25), transparent 50%),
            radial-gradient(70% 70% at 70% 20%, rgba(34, 211, 238, 0.18), transparent 55%);
          filter: blur(18px);
          z-index: -1;
        }

        /* Orbiting neon rings */
        .ai-orb__ring {
          position: absolute;
          inset: -10%;
          border-radius: 50%;
          pointer-events: none;
          transform-style: preserve-3d;
        }
        .ai-orb__ring::before,
        .ai-orb__ring::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: 0 0 0 1px var(--ring), 0 0 40px rgba(168, 85, 247, 0.25) inset;
          mix-blend-mode: screen;
        }
        .ai-orb__ring.r1 {
          animation: ai-tilt1 16s linear infinite;
        }
        .ai-orb__ring.r2 {
          animation: ai-tilt2 21s linear infinite reverse;
        }
        .ai-orb__ring.r3 {
          animation: ai-tilt3 27s linear infinite;
        }

        /* Chips */
        .ai-orb__chip {
          --r: 40%;
          position: absolute;
          left: 50%;
          top: 50%;
          translate: -50% -50%;
          padding: 6px 10px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(16, 185, 129, 0.12), rgba(124, 58, 237, 0.12));
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(168, 85, 247, 0.15) inset;
          font-size: 12px;
          color: #cbd5e1;
          letter-spacing: 0.2px;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          white-space: nowrap;
        }
        .ai-orb__chip::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(circle, #fff, var(--cyan));
          box-shadow: 0 0 10px var(--cyan), 0 0 20px var(--cyan);
        }
        .ai-orb__chip.c1 {
          animation: ai-orbit1 12s linear infinite;
        }
        .ai-orb__chip.c2 {
          animation: ai-orbit2 18s linear infinite reverse;
        }
        .ai-orb__chip.c3 {
          animation: ai-orbit3 22s linear infinite;
        }

        /* Logo plate */
        .ai-orb__logoPlate {
          position: relative;
          width: 64%;
          aspect-ratio: 3.6/1.2;
          border-radius: 22px;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
            radial-gradient(120% 140% at 10% 0%, rgba(168, 85, 247, 0.3), transparent 50%),
            radial-gradient(120% 140% at 90% 0%, rgba(34, 211, 238, 0.28), transparent 55%);
          border: 1px solid rgba(148, 163, 184, 0.25);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.06) inset;
          backdrop-filter: blur(10px) saturate(1.1);
          -webkit-backdrop-filter: blur(10px) saturate(1.1);
          overflow: hidden;
        }
        .ai-orb__logoPlate::before {
          content: '';
          position: absolute;
          inset: -20%;
          background: conic-gradient(
            from 0deg,
            rgba(168, 85, 247, 0.25),
            rgba(34, 211, 238, 0.18),
            rgba(99, 102, 241, 0.25),
            rgba(20, 184, 166, 0.18),
            rgba(168, 85, 247, 0.25)
          );
          filter: blur(32px);
          animation: ai-spin 30s linear infinite;
          opacity: 0.7;
          pointer-events: none;
        }
        .ai-orb__brand {
          font-weight: 800;
          font-size: clamp(18px, 4.2vw, 36px);
          letter-spacing: 0.3px;
          line-height: 1;
          background: linear-gradient(90deg, #fff, #e9d5ff 40%, #dbeafe);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 4px 24px rgba(168, 85, 247, 0.25);
          text-align: center;
        }
        .ai-orb__brand small {
          display: block;
          font-weight: 600;
          font-size: clamp(11px, 1.2vw, 12.5px);
          letter-spacing: 0.4px;
          margin-top: 6px;
          background: linear-gradient(90deg, #a5b4fc, #a78bfa, #67e8f9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          opacity: 0.95;
        }

        /* Signals */
        .ai-orb__signals {
          position: absolute;
          inset: 0;
          pointer-events: none;
          filter: drop-shadow(0 0 10px rgba(124, 58, 237, 0.6));
        }
        .ai-orb__signals path {
          fill: none;
          stroke: url(#ai-orb-grad);
          stroke-width: 1.2;
          stroke-linecap: round;
          stroke-dasharray: 3 10;
          animation: ai-dash 3.2s linear infinite;
          opacity: 0.8;
        }

        .ai-orb__field {
          position: absolute;
          inset: 0;
          z-index: -1;
          filter: blur(0.2px) saturate(1.1);
          opacity: 0.8;
        }

        /* Keyframes */
        @keyframes ai-spin {
          to {
            transform: rotate(1turn);
          }
        }
        @keyframes ai-tilt1 {
          to {
            transform: rotateX(65deg) rotateZ(360deg);
          }
        }
        @keyframes ai-tilt2 {
          to {
            transform: rotateY(65deg) rotateZ(-360deg);
          }
        }
        @keyframes ai-tilt3 {
          to {
            transform: rotateX(20deg) rotateY(30deg) rotateZ(360deg);
          }
        }
        @keyframes ai-orbit1 {
          from {
            transform: rotate(0deg) translateX(var(--r)) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(var(--r)) rotate(-360deg);
          }
        }
        @keyframes ai-orbit2 {
          from {
            transform: rotate(0deg) translateX(calc(var(--r) + 40px)) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(calc(var(--r) + 40px)) rotate(-360deg);
          }
        }
        @keyframes ai-orbit3 {
          from {
            transform: rotate(0deg) translateX(calc(var(--r) + 80px)) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(calc(var(--r) + 80px)) rotate(-360deg);
          }
        }
        @keyframes ai-dash {
          to {
            stroke-dashoffset: -200;
          }
        }
      `}</style>
    </>
  )
}
