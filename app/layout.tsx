import './css/style.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildaistartups.com'),
  title: {
    default: 'Build AI Startups — Know if your startup is working',
    template: '%s — Build AI Startups',
  },
  description:
    'LaunchScore helps indie makers validate, build, and grow AI-powered micro-SaaS products by replacing guesswork with structured evidence and AI-assisted analysis.',
  openGraph: {
    type: 'website',
    siteName: 'Build AI Startups',
    title: 'Build AI Startups — Know if your startup is working',
    description:
      'Replace founder gut-feel with structured evidence. Track your startup from idea to revenue with AI-assisted validation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build AI Startups — Know if your startup is working',
    description:
      'Replace founder gut-feel with structured evidence. Track your startup from idea to revenue.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-inter antialiased bg-[var(--ls-bg)] text-[var(--ls-text)] tracking-tight`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
