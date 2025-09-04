// components/hero-ai-orb.tsx
'use client'

import Image from 'next/image'

type Props = {
  logoSrc?: string
  size?: number // diameter in px
}

export default function HeroAIOrb({ logoSrc = '/logo.svg', size = 200 }: Props) {
  const px = `${size}px`
  const logo = Math.round(size * 0.28)

  return (
    <div className="relative" style={{ width: px, height: px }}>
      {/* Orb container */}
      <div className="relative grid place-items-center rounded-full w-full h-full bg-slate-900/50 ring-1 ring-white/10 shadow-2xl orb">
        {/* Soft glow */}
        <span className="pointer-events-none absolute inset-0 rounded-full glow" />
        {/* Subtle outline */}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-purple-400/30" />
        {/* Center logo */}
        <Image
          src={logoSrc}
          alt="Build AI Startups"
          width={logo}
          height={logo}
          className="relative z-10 opacity-90"
          priority
        />
        {/* Ambient halo */}
        <span className="pointer-events-none absolute -inset-[6%] bg-gradient-to-tr from-purple-500/20 via-fuchsia-400/10 to-cyan-400/20 blur-2xl rounded-full" />
      </div>

      <style jsx>{`
        .orb::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background:
            radial-gradient(120% 120% at 70% 30%, rgba(168, 85, 247, 0.5) 0%, transparent 60%),
            radial-gradient(120% 120% at 30% 70%, rgba(59, 130, 246, 0.45) 0%, transparent 60%),
            conic-gradient(
              from 0deg at 50% 50%,
              rgba(236, 72, 153, 0.35),
              rgba(168, 85, 247, 0.25),
              rgba(56, 189, 248, 0.35),
              rgba(236, 72, 153, 0.35)
            );
          filter: saturate(1.2);
          animation: spin 18s linear infinite;
          mask:
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.85) 60%, rgba(0, 0, 0, 1) 61%, rgba(0, 0, 0, 0.85) 62%, transparent 65%),
            radial-gradient(closest-side, black 70%, transparent 71%);
          -webkit-mask-composite: source-over;
          mask-composite: add;
          opacity: 0.9;
        }
        .orb::after {
          content: "";
          position: absolute;
          inset: 6%;
          border-radius: 9999px;
          background: radial-gradient(60% 60% at 50% 50%, rgba(255, 255, 255, 0.25) 0%, transparent 70%);
          mix-blend-mode: overlay;
          animation: breathe 4s ease-in-out infinite;
        }
        .glow {
          background: radial-gradient(120% 120% at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 60%);
          filter: blur(30px);
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes breathe {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  )
}
