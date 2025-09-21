import { NextStepBar } from '@/components/ui/NextStepBar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NextStepBar />
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </>
    </>
  )
}
