import { SiteHeader } from '@/components/site-header'
import { NextStepBar } from '@/components/ui/NextStepBar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <NextStepBar />
      <main className="flex-1">
        {children}
      </main>
    </>
  )
}
