import Link from 'next/link'
import Particles from './particles'

const badges = [
  { label: 'GitHub', href: '/resources/docs#github' },
  { label: 'Vercel', href: '/resources/docs#vercel' },
  { label: 'Stripe', href: '/resources/docs#stripe' },
  { label: 'Postgres', href: '/resources/docs#postgres' },
  { label: 'OpenAI', href: '/resources/docs#openai' },
  { label: 'Cloudflare', href: '/resources/docs#cloudflare' },
  { label: 'Supabase', href: '/resources/docs#supabase' },
  { label: 'S3', href: '/resources/docs#s3' },
  { label: 'Pinecone', href: '/resources/docs#vector' },
]

function Badge({ label, href }: { label: string; href: string }) {
  return (
    <li className="mx-3">
      <Link
        href={href}
        className="inline-flex items-center rounded-full border border-white/10 bg-slate-900/30 px-4 py-2 text-sm text-slate-300 transition hover:text-white hover:bg-slate-900/40"
      >
        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-400/90" />
        {label}
      </Link>
    </li>
  )
}

export default function Clients() {
  return (
    <section>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Particles animation */}
        <div className="absolute inset-0 mx-auto max-w-6xl px-4 sm:px-6">
          <Particles className="absolute inset-0 -z-10" quantity={6} />
        </div>

        <div className="py-12 md:py-16">
          <p className="mb-6 text-center text-sm font-medium tracking-wide text-slate-400">
            Plays nicely with your stack
          </p>

          <div className="overflow-hidden">
            <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <ul className="flex animate-infinite-scroll items-center [&>li]:shrink-0">
                {badges.map((b) => (
                  <Badge key={b.label} {...b} />
                ))}
              </ul>
              {/* Duplicate for seamless loop */}
              <ul className="flex animate-infinite-scroll items-center [&>li]:shrink-0" aria-hidden="true">
                {badges.map((b) => (
                  <Badge key={`${b.label}-dup`} {...b} />
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Want your logo here? <Link href="/contact" className="text-purple-400 hover:text-purple-300">Become a design partner</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
