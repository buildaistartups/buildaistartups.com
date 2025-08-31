import Link from "next/link";

export function HeroButtons() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      {/* Primary — white gradient pill */}
      <Link
        href="/generate"
        className="group inline-flex items-center rounded-full px-6 py-3 text-base font-semibold text-slate-900
                   bg-[linear-gradient(90deg,rgba(255,255,255,.85),rgba(255,255,255,1),rgba(255,255,255,.85))]
                   hover:bg-white transition-colors duration-150
                   ring-1 ring-inset ring-white/30
                   shadow-[inset_0_0_0_1px_rgba(255,255,255,.35),0_1px_1px_rgba(0,0,0,.06),0_12px_30px_rgba(124,58,237,.25)]"
      >
        Generate Startup
        <svg
          className="ml-2 h-4 w-4 text-purple-500 transition-transform duration-150 group-hover:translate-x-0.5"
          viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
        >
          <path d="M11.293 4.293a1 1 0 011.414 0l4.999 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z"/>
        </svg>
      </Link>

      {/* Secondary — purple pill with “wand” icon */}
      <Link
        href="/resources/docs"
        className="group inline-flex items-center rounded-full px-6 py-3 text-base font-semibold text-slate-100
                   bg-gradient-to-r from-purple-700/80 via-purple-600/80 to-purple-500/80
                   hover:from-purple-700 hover:via-purple-600 hover:to-purple-500
                   ring-1 ring-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]
                   transition-colors duration-150"
      >
        <svg
          className="mr-2 h-4 w-4 opacity-90"
          viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
        >
          {/* magic wand icon */}
          <path d="M6 19L19 6l-1.414-1.414L4.586 17.586 6 19zM20 4l-2-2 1-1 2 2-1 1zM16 4l-1-3 1-1 1 3-1 1zM22 10l-3-1 1-1 3 1-1 1zM8 20l-3-1 1-1 3 1-1 1z" />
        </svg>
        Read the docs
      </Link>
    </div>
  );
}
