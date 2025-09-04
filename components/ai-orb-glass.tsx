'use client'

import React from 'react'

type Props = {
  /** Orb size (px). */
  size?: number
  /** Which chip to highlight. */
  active?: 1 | 2 | 3
  /** Text/Logo inside the center plate. */
  children?: React.ReactNode
  /** Labels for the chips (top, middle, bottom). */
  labels?: [string, string, string]
}

export default function AiOrbGlass({
  size = 520,
  active = 1,
  children,
  labels = ['Repo / UI', 'Spec → PRD', 'Deploy'],
}: Props) {
  return (
    <div className="orb-wrap relative grid place-items-center" style={{ ['--size' as any]: `${size}px` }}>
      {/* particle field */}
      <div className="sparkfield absolute inset-[-14%] -z-10 pointer-events-none" />
      {/* soft background glow */}
      <div className="bg-glow absolute inset-0 -z-10" />

      {/* concentric glass shells */}
      <div className="shell s1" />
      <div className="shell s2" />
      <div className="shell s3" />

      {/* dotted orbit lines */}
      <svg className="orbits absolute inset-0" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="40" className="orbit o1" stroke="url(#g1)" />
        <circle cx="50" cy="50" r="32" className="orbit o2" stroke="url(#g1)" />
      </svg>

      {/* center plate (logo/text) */}
      <div className="center">
        {children ?? (
          <div className="center-text">
            <strong>Build AI</strong>
            <span>Startups</span>
          </div>
        )}
      </div>

      {/* chips */}
      <Chip
        active={active === 1}
        label={labels[0]}
        radiusMul={0.40}
        speed="24s"
        angle={-55}
      />
      <Chip
        active={active === 2}
        label={labels[1]}
        radiusMul={0.28}
        speed="28s"
        angle={12}
      />
      <Chip
        active={active === 3}
        label={labels[2]}
        radiusMul={0.36}
        speed="26s"
        angle={130}
      />

      <style jsx>{`
        .orb-wrap {
          width: var(--size);
          height: var(--size);
          border-radius: 9999px;
          isolation: isolate;
        }

        /* soft space glow behind everything */
        .bg-glow {
          border-radius: 9999px;
          background:
            radial-gradient(closest-side, rgba(124,58,237,.25), transparent 70%),
            radial-gradient(closest-side, rgba(99,102,241,.18), transparent 60%);
          filter: blur(12px);
          animation: breathe 9s ease-in-out infinite;
        }

        /* particles (few, large & tiny) */
        .sparkfield {
          background:
            radial-gradient(2px 2px at 18% 18%, rgba(236, 72, 153, .35) 40%, transparent 45%),
            radial-gradient(1.5px 1.5px at 35% 74%, rgba(255,255,255,.28) 40%, transparent 45%),
            radial-gradient(1.5px 1.5px at 72% 38%, rgba(168,85,247,.30) 40%, transparent 45%),
            radial-gradient(1.5px 1.5px at 86% 62%, rgba(255,255,255,.22) 40%, transparent 45%),
            radial-gradient(2px 2px at 48% 12%, rgba(168,85,247,.35) 40%, transparent 45%);
          mix-blend-mode: screen;
          animation: twinkle 7s ease-in-out infinite;
          border-radius: 9999px;
        }

        /* glass shells */
        .shell {
          position: absolute;
          inset: 6%;
          border-radius: 9999px;
          background:
            radial-gradient(60% 60% at 50% 50%, rgba(30,41,59,.55), rgba(2,6,23,.35) 70%, transparent 80%),
            radial-gradient(closest-side, rgba(168,85,247,.20), rgba(168,85,247,.05));
          box-shadow:
            inset 0 1px 8px rgba(255,255,255,.08),
            0 0 0 1px rgba(168,85,247,.22),
            0 18px 55px rgba(0,0,0,.35);
          backdrop-filter: blur(6px);
          animation: float 10s ease-in-out infinite;
        }
        .shell.s1 { transform: rotate(-8deg); }
        .shell.s2 { inset: 10%; transform: rotate(8deg); animation-duration: 11.5s; }
        .shell.s3 { inset: 18%; transform: rotate(-3deg); animation-duration: 13s; }

        /* dotted orbit lines */
        .orbits { filter: drop-shadow(0 0 8px rgba(168,85,247,.35)); }
        .orbit {
          fill: none;
          stroke-width: .6;
          stroke-linecap: round;
          stroke-dasharray: 2 5;
          opacity: .55;
          animation: dash 20s linear infinite;
        }
        .orbit.o2 { stroke-dasharray: 1.7 4.6; opacity: .45; animation-duration: 24s; }

        /* center plate */
        .center {
          position: absolute;
          width: calc(var(--size) * .42);
          height: calc(var(--size) * .15);
          border-radius: 26px;
          display: grid;
          place-items: center;
          background: rgba(15,23,42,.55);
          border: 1px solid rgba(255,255,255,.08);
          box-shadow:
            inset 0 1px 6px rgba(255,255,255,.12),
            0 14px 42px rgba(0,0,0,.35);
          backdrop-filter: blur(6px);
        }
        .center-text {
          display: grid;
          gap: 4px;
          text-align: center;
          transform: translateY(-1px);
        }
        .center-text strong {
          font-weight: 800;
          letter-spacing: .3px;
          color: rgba(241,245,249,.98);
          font-size: clamp(18px, calc(var(--size)*.06), 28px);
          line-height: 1;
        }
        .center-text span {
          color: rgba(226,232,240,.92);
          font-size: clamp(16px, calc(var(--size)*.045), 22px);
          line-height: 1;
        }

        @keyframes dash { to { stroke-dashoffset: -240; } }
        @keyframes breathe { 0%,100% { opacity:.7; transform:scale(1); } 50% { opacity:1; transform:scale(1.05);} }
        @keyframes twinkle { 0%,100% { opacity:.5; filter:blur(0px);} 50% { opacity:.9; filter:blur(.5px);} }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(var(--rot,0deg)); } 50% { transform: translateY(-3px) rotate(var(--rot,0deg)); } }
        @keyframes orbit { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .sparkfield, .bg-glow, .shell, .orbit, .chip { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

function Chip({
  label,
  active,
  radiusMul,
  speed,
  angle,
}: {
  label: string
  active?: boolean
  radiusMul: number
  speed: string
  angle: number
}) {
  return (
    <div
      className={`chip absolute top-1/2 left-1/2 ${active ? 'is-active' : ''}`}
      style={
        {
          ['--r' as any]: `calc(var(--size) * ${radiusMul})`,
          ['--a' as any]: `${angle}deg`,
          ['animationDuration' as any]: speed,
        } as React.CSSProperties
      }
      aria-hidden
    >
      <div className="pill">
        <span>{label}</span>
        <i className="dot" />
      </div>

      <style jsx>{`
        .chip {
          transform-origin: 0 0;
          transform: rotate(var(--a));
          animation: orbit linear infinite;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transform: translateX(var(--r));
          white-space: nowrap;
          padding: 10px 14px;
          font-size: clamp(11px, calc(var(--size)*.034), 14px);
          color: rgba(226,232,240,.9);
          background: rgba(15,23,42,.55);
          border: 1px solid rgba(168,85,247,.35);
          border-radius: 9999px;
          backdrop-filter: blur(6px);
          box-shadow: 0 10px 28px rgba(0,0,0,.25), 0 0 0 1px rgba(168,85,247,.18) inset;
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease, color .25s ease;
        }
        .dot {
          width: 7px; height: 7px; border-radius: 9999px;
          background: #22d3ee; /* cyan accent */
          box-shadow: 0 0 12px #22d3ee, 0 0 24px rgba(34,211,238,.5);
        }
        .chip.is-active .pill {
          transform: translateX(var(--r)) scale(1.08);
          color: #fff;
          background: rgba(124,58,237,.35);
          border-color: rgba(168,85,247,.7);
          box-shadow: 0 14px 34px rgba(168,85,247,.35);
        }
      `}</style>
    </div>
  )
}
