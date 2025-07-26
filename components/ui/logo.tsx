import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="BuildAI Startups">
      <Image
        src="/images/logo.svg" // Update to your real path!
        width={48}
        height={48}
        alt="BuildAI Startups"
        className="mr-2"
        priority
      />
    </Link>
  )
}
