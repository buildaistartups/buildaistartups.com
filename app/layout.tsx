import './css/style.css'
import { Inter } from 'next/font/google'
import ThemeWrapper from './ThemeWrapper'
<<<<<<< HEAD
=======
import ThemeToggle from '../components/ui/ThemeToggle'
>>>>>>> 99769d8f3b50c9454f51ac2760f3666d216569b9

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

// 👇 Add or update this metadata block!
export const metadata = {
  title: "BuildAIStartups - Home",           // 👈 Change this to your preferred tab text
  description: "Landing page for BuildAIStartups",  // Optional: update the description
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
<<<<<<< HEAD
      <body className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}>
=======
      <body className={`${inter.variable} font-inter antialiased bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 tracking-tight`}>
>>>>>>> 99769d8f3b50c9454f51ac2760f3666d216569b9
        <ThemeWrapper>
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}
