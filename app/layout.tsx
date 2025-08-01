import './css/style.css'
import { Inter } from 'next/font/google'
import ThemeWrapper from './ThemeWrapper'

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        scroll-smooth
        ${inter.variable} font-inter antialiased tracking-tight
      `}
    >
      <body>
        <ThemeWrapper>
          {/* === MOVE THEME CLASSES HERE === */}
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip bg-white text-black dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}
