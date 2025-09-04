'use client'

import Image from 'next/image'
import clsx from 'clsx'

type Props = {
  /** Path to your logo (SVG/PNG). Defaults to /logo.svg */
  logoSrc?: string
  /** Optional extra classes to size/position from parent */
  className?: string
}

export default function HeroAIOrb({ logoSrc = '/logo.svg', className }: Props) {
  return (
    <div
      className={clsx(
        'relative select-none',
        // default size; feel free to tweak
        'w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80',
        className,
      )}
      aria-hidden
    >
      {/* --- Layer 1: soft radial glow ------------------------------------ */}
      <div className="absolute inset-0 rounded-full" style={{
        background:
          'radial-gradient(55% 55% at 50% 50%, rgba(168,85,247,0.45) 0%, rgba(99,102,241,0.35) 28%, rgba(15,23,42,0) 70%)'
      }} />
      {/* subtle bloom */}
      <div className="absolute -inset-6 rounded-full blur-2xl opacity-60"
           style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,0.30), transparent 70%)' }} />

      {/* --- Layer 2: spectral ring (conic gradient + mask) --------------- */}
      <div className="absolute inset-0 rounded-full overflow-visible motion-safe:spin-slow">
        <div className="absolute inset-0 rounded-full"
             style={{
               background: 'conic-gradient(from 0deg, #A855F7, #22D3EE, #60A5FA, #A855F7)',
               WebkitMask:
                 'radial-gradient(closest-side, transparent 62%, black 63%)', // ring thickness
               mask: 'radial-gradient(closest-side, transparent 62%, black 63%)',
               filter: 'blur(0.2px)',
               opacity: 0.85,
             }} />
        {/* faint echo ring */}
        <div className="absolute inset-0 rounded-full opacity-40"
             style={{
               background: 'conic-gradient(from 90deg, #A855F7, #22D3EE, #60A5FA, #A855F7)',
               WebkitMask:
                 'radial-gradient(closest-side, transparent 70%, black 71%)',
               mask: 'radial-gradient(closest-side, transparent 70%, black 71%)',
               filter: 'blur(2px)',
             }} />
      </div>

      {/* --- Layer 3: orbiting nodes ------------------------------------- */}
      <div className="absolute inset-0 rounded-full motion-safe:spin-reverse"
           style={{ animationDuration: '16s' }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360
          return (
            <span
              key={i}
              className="absolute block"
              style={{
                left: '50%',
                top: '50%',
                width: 0, height: 0,
                transform: `rotate(${angle}deg) translateX(44%)`,
                transformOrigin: '0 0',
              }}
            >
              <span
                className="block rounded-full shadow"
                style={{
                  width: 8, height: 8,
                  background:
                    'radial-gradient(circle at 30% 30%, #ffffff 0%, #A855F7 40%, #0ea5e9 100%)',
                  boxShadow: '0 0 10px rgba(99,102,241,0.6)',
                  animation: `orbPulse ${1.8 + (i % 3) * 0.2}s ease-in-out ${i * 0.06
                    }s infinite alternate`,
                }}
              />
            </span>
          )
        })}
      </div>

      {/* --- Layer 4: inner glass ---------------------------------------- */}
      <div className="absolute inset-[14%] rounded-full"
           style={{
             background:
               'radial-gradient(70% 70% at 30% 30%, rgba(255,255,255,0.25), rgba(255,255,255,0.04) 70%)',
             boxShadow:
               'inset 0 0 40px rgba(255,255,255,0.06), inset 0 10px 50px rgba(99,102,241,0.15)',
             backdropFilter: 'saturate(120%) blur(1px)',
             WebkitBackdropFilter: 'saturate(120%) blur(1px)',
           }}
      />

      {/* --- Layer 5: center logo / mark --------------------------------- */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid place-items-center rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32
                        bg-slate-900/50 ring-1 ring-white/10 shadow-2xl"
             style={{
               boxShadow:
                 '0 10px 30px rgba(0,0,0,0.35), inset 0 1px 6px rgba(255,255,255,0.12)',
             }}
        >
          {logoSrc ? (
            <Image src={logoSrc} alt="logo" width={64} height={64} className="opacity-95" />
          ) : (
            <span className="text-xl font-semibold tracking-wide text-slate-100">BAS</span>
          )}
          {/* subtle rotating highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-full motion-safe:spin-slowest"
               style={{
                 background:
                   'conic-gradient(from 0deg, rgba(255,255,255,0.08), transparent 30%, transparent 70%, rgba(255,255,255,0.08))',
               }}
          />
        </div>
      </div>

      {/* --- Local styles (scoped) --------------------------------------- */}
      <style jsx>{`
        .spin-slow { animation: spin 12s linear infinite; }
        .spin-slowest { animation: spin 24s linear infinite; }
        .spin-reverse { animation: spin-rev 12s linear infinite; }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spin-rev { to { transform: rotate(-360deg); } }
        @keyframes orbPulse {
          0% { transform: scale(0.9); filter: drop-shadow(0 0 6px rgba(99,102,241,0.5)); }
          100% { transform: scale(1.15); filter: drop-shadow(0 0 12px rgba(168,85,247,0.8)); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .spin-slow, .spin-slowest, .spin-reverse { animation: none !important; }
          @keyframes orbPulse { from { transform: none; } to { transform: none; } }
        }
      `}</style>
    </div>
  )
}
