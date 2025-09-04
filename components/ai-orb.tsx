'use client'

import React from 'react'

type Props = {
  /** Size of the orb in px (width = height). */
  size?: number
  /** 1 | 2 | 3 – which orbit chip should be subtly highlighted */
  active?: 1 | 2 | 3
  /** Replace the center plate content with your SVG or <img>. */
  children?: React.ReactNode
  /** Optional labels for the three orbiting chips */
  labels?: [string, string, string]
}

/**
 * AI Orb — glass core with neon rings, drifting grid glow, particle sparkle,
 *  and three orbiting “chips”. Pure CSS + SVG; no deps.
 */
export default function AiOrb({
  size = 420,
  active = 1,
  labels = ['Spec → PRD', 'Repo & UI', 'Deploy'],
  children,
}: Props) {
  const style = {
    // expose size to CSS
    ['--size' as any]: `${size}px`,
  } as React.CSSProperties

  return (
    <div className="ai-orb relative" style={style} aria-hidden>
      {/* Soft radial glow */}
      <div className="glow absolute inset-0 rounded-full" />

      {/* Neon stroke rings (CSS animates stroke dashes) */}
      <svg className="neon absolute inset-0" viewBox="0 0 100 100" role="img" aria-label="Animated neon rings">
        <defs>
          <linearGradient id="orb-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <circle className="ring r1" cx="50" cy="50" r="44" stroke="url(#orb-grad)" fill="none" />
        <circle className="ring r2" cx="50" cy="50" r="34" stroke="url(#orb-grad)" fill="none" />
        <circle className="ring r3" cx="50" cy="50" r="24" stroke="url(#orb-grad)" fill="none" />
      </svg>

      {/* Center glass plate for your logo */}
      <div className="logo-plate">
        {children ?? <span className="logo-fallback">Build AI Startups</span>}
      </div>

      {/* Orbiting chips */}
      <div className={`chip c1 ${active === 1 ? 'is-active' : ''}`} style={{ ['--speed' as any]: '22s' } as any}>
        <div className="node">{labels[0]}</div>
      </div>
      <div className={`chip c2 ${active === 2 ? 'is-active' : ''}`} style={{ ['--speed' as any]: '26s' } as any}>
        <div className="node">{labels[1]}</div>
      </div>
      <div className={`chip c3 ${active === 3 ? 'is-active' : ''}`} style={{ ['--speed' as any]: '30s' } as any}>
        <div className="node">{labels[2]}</div>
      </div>

      {/* Sparkles */}
      <div className="sparks pointer-events-none" />

      <style jsx>{`
        .ai-orb {
          width: var(--size);
          height: var(--size);
          border-radius: 9999px;
          display: grid;
          place-items: center;
          isolation: isolate;
          /* soft inner glass look */
          background:
            radial-gradient(60% 60% at 50% 50%, rgba(124, 58, 237, .18), rgba(99, 102, 241, .06) 60%, transparent 70%),
            radial-gradient(closest-side, rgba(2, 6, 23, .4), rgba(2, 6, 23, .2));
          box-shadow:
            inset 0 1px 12px rgba(255, 255, 255, .08),
            inset 0 -2px 24px rgba(168, 85, 247, .12),
            0 20px 60px rgba(0, 0, 0, .35);
          border: 1px solid rgba(255, 255, 255, .06);
          backdrop-filter: blur(6px);
        }

        .glow {
          background:
            radial-gradient(closest-side, rgba(168, 85, 247, .25), transparent 70%),
            radial-gradient(closest-side, rgba(99, 102, 241, .2), transparent 60%);
          filter: blur(18px);
          animation: glow 8s ease-in-out infinite;
        }

        .neon { filter: drop-shadow(0 0 12px rgba(168, 85, 247, .35)); }
        .ring {
          strokeWidth: 1.2;
          strokeLinecap: round;
          strokeDasharray: 6 18;
          opacity: .8;
          animation: dash 14s linear infinite;
        }
        .ring.r2 { strokeDasharray: 5 14; opacity: .6; animation-duration: 18s; }
        .ring.r3 { strokeDasharray: 4 10; opacity: .5; animation-duration: 22s; }

        .logo-plate {
          position: absolute;
          width: calc(var(--size) * .28);
          height: calc(var(--size) * .28);
          display: grid;
          place-items: center;
          border-radius: 20%;
          background: rgba(15, 23, 42, .55);
          border: 1px solid rgba(255,255,255,.08);
          box-shadow:
            0 10px 30px rgba(0,0,0,.35),
            inset 0 1px 6px rgba(255,255,255,.12);
          transform: rotate(-10deg);
        }
        .logo-fallback {
          font-size: clamp(10px, calc(var(--size) * .045), 18px);
          color: rgba(226, 232, 240, .95);
          letter-spacing: .2px;
          text-align: center;
          line-height: 1.1;
        }

        /* Orbits */
        .chip {
          --radius: calc(var(--size) * .40);
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: 0 0;
          animation: orbit var(--speed) linear infinite;
        }
        .chip.c2 { --radius: calc(var(--size) * .33); }
        .chip.c3 { --radius: calc(var(--size) * .26); }

        .chip .node {
          transform: translateX(var(--radius));
          white-space: nowrap;
          font-size: clamp(10px, calc(var(--size) * .038), 14px);
          color: rgba(226, 232, 240, .85);
          background: rgba(15, 23, 42, .65);
          border: 1px solid rgba(168, 85, 247, .35);
          padding: 6px 10px;
          border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(168, 85, 247, .15);
          backdrop-filter: blur(4px);
          transition: transform .25s ease, box-shadow .25s ease, color .25s ease, background .25s ease, border-color .25s ease;
        }
        .chip.is-active .node {
          transform: translateX(var(--radius)) scale(1.07);
          color: #fff;
          background: rgba(124, 58, 237, .35);
          border-color: rgba(168, 85, 247, .65);
          box-shadow: 0 6px 26px rgba(168, 85, 247, .35);
        }

        /* Sparkles using repeating radial dots */
        .sparks {
          position: absolute;
          inset: -8%;
          border-radius: 9999px;
          background:
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.35) 40%, transparent 45%),
            radial-gradient(1.5px 1.5px at 70% 60%, rgba(255,255,255,.28) 40%, transparent 45%),
            radial-gradient(1.5px 1.5px at 35% 75%, rgba(255,255,255,.22) 40%, transparent 45%),
            radial-gradient(1.5px 1.5px at 80% 40%, rgba(255,255,255,.22) 40%, transparent 45%);
          animation: twinkle 6s ease-in-out infinite;
          mix-blend-mode: screen;
          opacity: .7;
          pointer-events: none;
        }

        /* Animations */
        @keyframes dash { to { stroke-dashoffset: -240; } }
        @keyframes glow {
          0%,100% { opacity: .75; transform: scale(1); }
          50%     { opacity: 1;    transform: scale(1.06); }
        }
        @keyframes orbit { to { transform: rotate(360deg); } }
        @keyframes twinkle {
          0%,100% { opacity: .5; filter: blur(0px); }
          50%     { opacity: .9; filter: blur(0.5px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ring, .glow, .chip, .sparks { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
