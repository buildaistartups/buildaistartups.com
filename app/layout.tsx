'use client'

import './css/style.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'BuildAIStartups — Instantly Generate Your Next Startup',
  description: 'The fully AI-driven startup generator and builder platform.',
  icons: [
    { rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
    { rel: "alternate icon", type: "image/png", url: "/favicon.ico" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
