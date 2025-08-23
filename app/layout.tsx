import './css/style.css'
import { Inter } from 'next/font/google'
import ThemeWrapper from './ThemeWrapper'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// 👇 Metadata (unchanged)
export const metadata = {
  title: 'BuildAIStartups - Home',
  description: 'Landing page for BuildAIStartups',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* No-flash theme script: picks user setting or system and sets html class ASAP */}
      <head>
        <meta name="color-scheme" content="dark light" />
        <Script id="no-flash-theme" strategy="beforeInteractive">
          {`(function () {
            try {
              var stored = localStorage.getItem('theme');
              var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              var finalTheme = (stored && stored !== 'system') ? stored : system;
              var html = document.documentElement;
              if (finalTheme !== 'light' && finalTheme !== 'dark') finalTheme = 'dark';
              html.classList.remove('light','dark');
              html.classList.add(finalTheme);
            } catch (e) {
              // On any error, fall back to dark to match your defaultTheme
              var html = document.documentElement;
              html.classList.remove('light','dark');
              html.classList.add('dark');
            }
          })();`}
        </Script>
      </head>

      <body className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}>
        <ThemeWrapper>
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}
