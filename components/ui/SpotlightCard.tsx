// components/ui/SpotlightCard.tsx
/**
 * Exact Stellar-style card:
 * - Pseudo elements (before/after) are big blurred circles
 * - Positioned by translate-x/y using CSS vars: var(--mouse-x / --mouse-y)
 * - Fade on hover and keyboard focus (focus-within)
 */
export default function SpotlightCard({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-spotlight
      className={`
        relative rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur p-4 overflow-hidden

        /* LIGHT LAYER 1 (cool gray) */
        before:content-[''] before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40
        before:rounded-full before:bg-slate-400/10 before:opacity-0 before:pointer-events-none
        before:transition-opacity before:duration-300 before:blur-[100px]
        before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)]
        hover:before:opacity-100 focus-within:before:opacity-100

        /* LIGHT LAYER 2 (purple) */
        after:content-[''] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48
        after:rounded-full after:bg-purple-500/20 after:opacity-0 after:pointer-events-none
        after:transition-opacity after:duration-300 after:blur-[120px]
        after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)]
        hover:after:opacity-100 focus-within:after:opacity-100

        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
