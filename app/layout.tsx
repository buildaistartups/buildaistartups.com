import './css/style.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import ThemeWrapper from './ThemeWrapper'
import Header from '@/components/ui/header' // ✅ client header

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://www.buildaistartups.com'),
  title: {
    default: 'Build AI Startups',
    template: '%s · Build AI Startups',
  },
  description:
    'Startups that build themselves. HyperNova turns a one-sentence intent into a production-ready micro-SaaS—code, UI, docs, pricing, deploy, and growth.',
  openGraph: {
    title: 'Build AI Startups',
    description:
      'Startups that build themselves. HyperNova turns a one-sentence intent into a production-ready micro-SaaS—code, UI, docs, pricing, deploy, and growth.',
    url: '/',
    siteName: 'Build AI Startups',
    images: [{ url: '/brand/og-default.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build AI Startups',
    description:
      'Startups that build themselves. HyperNova turns a one-sentence intent into a production-ready micro-SaaS—code, UI, docs, pricing, deploy, and growth.',
    images: ['/brand/og-default.png'],
  },
  icons: { icon: '/favicon.ico' },
  alternates: {
    types: { 'application/rss+xml': '/resources/changelog/rss.xml' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        {/* No-flash theme: set html class before hydration */}
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
              var html = document.documentElement;
              html.classList.remove('light','dark');
              html.classList.add('dark');
            }
          })();`}
        </Script>
      </head>

      <body
        className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}
      >
        <ThemeWrapper>
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Header />
            <main className="grow">{children}</main>
            {/* If you have a footer component, add it here:
                <Footer />
            */}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}
