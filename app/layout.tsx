import './css/style.css'
import { Inter } from 'next/font/google'
import ThemeWrapper from './ThemeWrapper'
import ThemeToggle from '@/components/ThemeToggle'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: "BuildAIStartups - Home",
  description: "Landing page for BuildAIStartups",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-inter antialiased bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 tracking-tight`}>
        <ThemeWrapper>
          <header className="w-full flex justify-end items-center px-4 py-4">
            <ThemeToggle />
          </header>
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}
