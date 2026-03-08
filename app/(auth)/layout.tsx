import Image from 'next/image'
import Illustration from '@/public/images/auth-illustration.svg'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main className="grow">
        <section className="relative">
          <div
            className="md:block absolute left-1/2 -translate-x-1/2 -mt-36 blur-2xl pointer-events-none -z-10"
            style={{ opacity: 'var(--ls-glow-opacity)' }}
            aria-hidden="true"
          >
            <Image src={Illustration} className="max-w-none" width={1440} height={450} priority alt="" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">{children}</div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
