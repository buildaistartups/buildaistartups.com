'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import Particles from './particles'
import Illustration from '@/public/images/glow-top.svg'

type Tab = 1 | 2 | 3

const TAB_ROUTES: Record<Tab, string> = {
  1: '/product/builder/research-spec',
  2: '/product/builder/generate-ui',
  3: '/product/builder/deploy-iterate',
}

const TAB_COPY: Record<Tab, string> = {
  1: 'Build AI Startups maps the niche, analyzes competitors, drafts a PRD, and turns your one-line brief into a crisp plan with clear acceptance criteria.',
  2: 'We scaffold a production-ready Next.js app with a polished UI, docs, auth, billing, and analytics wired — pushed to your own GitHub.',
  3: 'One-click deploy to Vercel, observe real usage, and let Build AI Startups propose improvements, iterate specs, and ship updates safely.',
}

export default function Features() {
  const [tab, setTab] = useState<Tab>(1)

  // ------- AI ORB: particle canvas logic (scoped to the right column) -------
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
      // Add null checks here
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
      // Add null check here too for safety
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
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Illustration */}
        <div
          className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10">
            <Image
              src={Illustration}
              className="max-w-none"
              width={1404}
              height={658}
              alt="Features background glow"
            />
          </div>
        </div>

        <div className="pt-16 pb-12 md:pt-52 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">
              {/* Content */}
              <div
                className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center"
                data-aos="fade-down"
              >
                {/* Eyebrow */}
                <div>
                  <div className="inline-flex font-medium pb-3 bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-200 eyebrow-text">
                    The autonomy-first builder
                  </div>
                </div>

                <h3 className="h3 bg-clip-text text-transparent bg-linear-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  From one-line brief to running product
                </h3>

                <p className="feature-subtext text-lg mb-8 dark:text-slate-400">
                  Describe your idea in a sentence. Build AI Startups researches the niche, drafts the product spec,
                  scaffolds a production-ready repo, ships the UI &amp; docs, wires auth/billing/analytics, and deploys.
                  You keep everything under your own GitHub, Vercel, and Stripe.
                </p>

                <div className="mt-8 max-w-xs max-md:mx-auto space-y-2">
                  <button
                    className={`flex items-center text-sm font-medium text-slate-50 rounded-sm border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${
                      tab !== 1
                        ? 'border-slate-700 opacity-50'
                        : 'border-purple-700 shadow-sm shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(1)}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span>Research &amp; spec</span>
                  </button>

                  <button
                    className={`flex items-center text-sm font-medium text-slate-50 rounded-sm border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${
                      tab !== 2
                        ? 'border-slate-700 opacity-50'
                        : 'border-purple-700 shadow-sm shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(2)}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
                    </svg>
                    <span>Generate repo &amp; UI</span>
                  </button>

                  <button
                    className={`flex items-center text-sm font-medium text-slate-50 rounded-sm border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 ${
                      tab !== 3
                        ? 'border-slate-700 opacity-50'
                        : 'border-purple-700 shadow-sm shadow-purple-500/25'
                    }`}
                    onClick={() => setTab(3)}
                  >
                    <svg
                      className="shrink-0 fill-slate-300 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
                    </svg>
                    <span>Deploy, learn, iterate</span>
                  </button>
                </div>

                {/* Tab detail + Learn more */}
                <div className="rounded-md border border-slate-700/60 bg-slate-900/30 p-4 mt-4 max-w-lg max-md:mx-auto">
                  <p className="text-sm text-slate-300">{TAB_COPY[tab]}</p>
                  <div className="mt-3">
                    <Link
                      href={TAB_ROUTES[tab]}
                      className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition group"
                    >
                      <span>Learn more</span>
                      <span
                        aria-hidden
                        className="ml-1 transition-transform duration-150 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Visual (AI Orb) */}
              <div className="md:w-5/12 lg:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <div className="relative py-24 -mt-12">
                  {/* Particles behind the orb for subtle depth */}
                  <Particles className="absolute inset-0 -z-10" quantity={8} staticity={30} />

                  {/* Orb Scene */}
                  <div ref={sceneRef} className="ai-orb__scene">
                    <div className="ai-orb__halo" aria-hidden="true" />

                    <canvas ref={canvasRef} className="ai-orb__field" />

                    <div className="ai-orb__orb">
                      <div className="ai-orb__ring r1" />
                      <div className="ai-orb__ring r2" />
                      <div className="ai-orb__ring r3" />

                      <div className="ai-orb__logoPlate">
                        {/* Replace with your SVG if desired */}
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
                </div>
              </div>
              {/* /Visual */}
            </div>
          </div>
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
          /* Removed background and border-radius */
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
    </section>
  )
}
