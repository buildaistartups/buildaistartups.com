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
    <html lang="en" className="scroll-smooth">
      <body className={`
        ${inter.variable} font-inter antialiased tracking-tight
        bg-white text-black
        dark:bg-slate-900 dark:text-slate-100
        transition-colors duration-300
      `}>
        <ThemeWrapper>
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}
