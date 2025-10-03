// components/ui/SpotlightCard.tsx
/**
 * Exact Stellar-style card:
 * - Uses before/after blurred circles
 * - Positions with translate-x/y via var(--mouse-x / --mouse-y)
 * - Fades on hover (group-hover) and keyboard focus (focus-within)
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
        group relative rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur p-4 overflow-hidden
        before:content-[''] before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40
        before:rounded-full before:bg-slate-400/10 before:opacity-0 before:pointer-events-none
        before:transition-opacity before:duration-300 before:blur-[100px]
        before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)]
        group-hover:before:opacity-100 focus-within:before:opacity-100

        after:content-[''] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48
        after:rounded-full after:bg-purple-500/20 after:opacity-0 after:pointer-events-none
        after:transition-opacity after:duration-300 after:blur-[120px]
        after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)]
        group-hover:after:opacity-100 focus-within:after:opacity-100

        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
