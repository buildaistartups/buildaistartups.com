import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link className="inline-flex items-center" href="/" aria-label="BuildAI Startups">
      <Image src="/images/logo.svg" width={48} height={48} alt="BuildAI Startups Logo" priority />
      <span className="ml-2 font-bold text-xl text-white">BuildAI Startups</span>
    </Link>
  )
}
