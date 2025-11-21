// app/vertical/ai-support/page.tsx
import type { Metadata } from 'next'
import { verticals } from '@/lib/verticals'
import BuilderVerticalPage from '@/components/builder/BuilderVerticalPage'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

const vertical = verticals['ai-support']

export const metadata: Metadata = {
  title: `${vertical.title} | Build AI Startups`,
  description: vertical.tagline,
  openGraph: {
    title: `${vertical.title} | Build AI Startups`,
    description: vertical.tagline,
    images: [{ url: '/og/product-builder.svg', width: 1200, height: 630 }],
  },
}

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <BuilderVerticalPage vertical={vertical} />
        </div>
        <Footer />
      </div>
    </>
  )
}
