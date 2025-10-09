import { SVGScrollTrigger } from '@/components/svg-scroll-trigger'

export default function BuilderPage() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      
      {/* Hero Section */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AI Builder Platform
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Transform your ideas into production-ready applications with AI-powered development
          </p>
        </div>
        
        <SVGScrollTrigger className="relative w-full max-w-4xl mx-auto">
          <img
            src="/images/product/builder/hero.svg"
            alt="AI Builder Platform - Automated development workflow"
            className="w-full h-auto"
          />
        </SVGScrollTrigger>
      </section>

      {/* Step 1: Research & Spec */}
      <section className="relative px-6 py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Step 1: Research & Specification
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Our AI analyzes your requirements and creates a comprehensive technical specification
            </p>
          </div>
          
          <SVGScrollTrigger className="relative w-full max-w-3xl mx-auto">
            <img
              src="/images/product/builder/flow-research-spec.svg"
              alt="Research and Specification workflow - From idea to detailed spec"
              className="w-full h-auto"
            />
          </SVGScrollTrigger>
        </div>
      </section>

      {/* Step 2: Generate UI */}
      <section className="relative px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Step 2: Generate UI
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              AI generates pixel-perfect user interfaces with live preview and instant refinements
            </p>
          </div>
          
          <SVGScrollTrigger className="relative w-full max-w-3xl mx-auto">
            <img
              src="/images/product/builder/flow-generate-ui.svg"
              alt="UI Generation workflow - Code to preview to refinement"
              className="w-full h-auto"
            />
          </SVGScrollTrigger>
        </div>
      </section>

      {/* Step 3: Deploy & Iterate */}
      <section className="relative px-6 py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Step 3: Deploy & Iterate
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Ship to production, monitor performance, and continuously improve with AI insights
            </p>
          </div>
          
          <SVGScrollTrigger className="relative w-full max-w-3xl mx-auto">
            <img
              src="/images/product/builder/flow-deploy-iterate.svg"
              alt="Deploy and Iterate workflow - Ship, monitor, and improve"
              className="w-full h-auto"
            />
          </SVGScrollTrigger>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build with AI?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Start creating production-ready applications in minutes, not months
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
            Get Started Free
          </button>
        </div>
      </section>

    </div>
  )
}
