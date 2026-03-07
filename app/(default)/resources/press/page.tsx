import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// Remove these imports since the files don't exist:
// import LogoLight from '@/public/brand/logo-light.svg'
// import LogoDark from '@/public/brand/logo-dark.svg'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buildaistartups.com'

export const metadata: Metadata = {
  title: 'Press Kit — Build AI Startups',
  description: 'Media resources, company information, and press materials for Build AI Startups. Download logos, photos, and key facts for your story.',
  openGraph: {
    title: 'Press Kit — Build AI Startups',
    description: 'Media resources, company information, and press materials for Build AI Startups.',
    url: `${SITE_URL}/resources/press`,
    siteName: 'Build AI Startups',
    images: [
      {
        url: `${SITE_URL}/images/og-press.jpg`,
        width: 1200,
        height: 630,
        alt: 'Build AI Startups Press Kit',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Kit — Build AI Startups',
    description: 'Media resources, company information, and press materials for Build AI Startups.',
    images: [`${SITE_URL}/images/og-press.jpg`],
  },
}

export default function PressKitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="pt-32 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-50 mb-4">Press Kit</h1>
          <p className="text-xl text-slate-300">
            Media resources, company information, and brand assets for journalists and partners.
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="mb-16">
        <div className="bg-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-50 mb-6">Company Overview</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-3">About Build AI Startups</h3>
              <p className="text-slate-300 mb-4">
                Build AI Startups is the comprehensive platform for turning AI startup ideas into production-ready businesses. We provide end-to-end tools for validation, development, deployment, and growth of AI-powered products.
              </p>
              <p className="text-slate-300">
                Founded in 2024, we're democratizing access to sophisticated AI development tools, making it possible for anyone to build, validate, and scale AI startups without extensive technical knowledge.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-3">Key Facts</h3>
              <ul className="space-y-2 text-slate-300">
                <li><strong className="text-slate-50">Founded:</strong> 2024</li>
                <li><strong className="text-slate-50">Mission:</strong> Democratize AI startup creation</li>
                <li><strong className="text-slate-50">Focus:</strong> AI-powered business tools and validation</li>
                <li><strong className="text-slate-50">Stage:</strong> Early-stage platform</li>
                <li><strong className="text-slate-50">Website:</strong> buildaistartups.com</li>
                <li><strong className="text-slate-50">Contact:</strong> press@buildaistartups.com</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-50 mb-8">Brand Assets</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Logos */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Logos</h3>
            
            <div className="space-y-6">
              {/* Light Logo Placeholder */}
              <div>
                <div className="bg-slate-900 rounded-lg p-6 mb-3 text-center">
                  <div className="text-slate-400">Build AI Startups Logo</div>
                  <div className="text-slate-500 text-sm">(Light Version)</div>
                </div>
                <div className="flex gap-3">
                  <Link 
                    href="/brand/logo-light.svg" 
                    download
                    className="text-sm bg-violet-500 hover:bg-violet-400 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    SVG
                  </Link>
                  <Link 
                    href="/brand/logo-light.png" 
                    download
                    className="text-sm bg-violet-500 hover:bg-violet-400 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    PNG
                  </Link>
                </div>
              </div>
              
              {/* Dark Logo Placeholder */}
              <div>
                <div className="bg-white rounded-lg p-6 mb-3 text-center">
                  <div className="text-slate-600">Build AI Startups Logo</div>
                  <div className="text-slate-400 text-sm">(Dark Version)</div>
                </div>
                <div className="flex gap-3">
                  <Link 
                    href="/brand/logo-dark.svg" 
                    download
                    className="text-sm bg-violet-500 hover:bg-violet-400 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    SVG
                  </Link>
                  <Link 
                    href="/brand/logo-dark.png" 
                    download
                    className="text-sm bg-violet-500 hover:bg-violet-400 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    PNG
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Brand Guidelines */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Brand Guidelines</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-slate-50 font-medium mb-2">Primary Colors</h4>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-violet-500 rounded-lg mb-2"></div>
                    <span className="text-xs text-slate-400">#8B5CF6</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg mb-2"></div>
                    <span className="text-xs text-slate-400">#0F172A</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-lg mb-2"></div>
                    <span className="text-xs text-slate-400">#FFFFFF</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-slate-50 font-medium mb-2">Typography</h4>
                <p className="text-slate-300 text-sm">Primary: Inter</p>
                <p className="text-slate-300 text-sm">Secondary: JetBrains Mono</p>
              </div>
              
              <div>
                <h4 className="text-slate-50 font-medium mb-2">Usage Guidelines</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Maintain clear space equal to logo height</li>
                  <li>• Use high contrast backgrounds</li>
                  <li>• Don't distort or modify the logo</li>
                  <li>• Download full guidelines below</li>
                </ul>
              </div>
              
              <Link 
                href="/brand/brand-guidelines.pdf" 
                download
                className="inline-block bg-violet-500 hover:bg-violet-400 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Download Full Guidelines
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-50 mb-8">Media Contact</h2>
        
        <div className="bg-slate-800 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4">Press Inquiries</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <a href="mailto:press@buildaistartups.com" className="text-violet-400 hover:text-violet-300">
                    press@buildaistartups.com
                  </a>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Response Time</p>
                  <p className="text-slate-300">Within 24 hours</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4">Social Media</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Twitter</p>
                  <a href="https://x.com/buildaistartups" className="text-violet-400 hover:text-violet-300">
                    @buildaistartups
                  </a>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">GitHub</p>
                  <a href="https://github.com/buildaistartups" className="text-violet-400 hover:text-violet-300">
                    /buildaistartups
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
