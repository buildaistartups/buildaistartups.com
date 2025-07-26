import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="BuildAI Startups">
      <Image
        src="/images/logo.svg"
        width={40}
        height={40}
        alt="BuildAI Startups"
        className="w-10 h-10"
        priority
      />
    </Link>
  )
}
