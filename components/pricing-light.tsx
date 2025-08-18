// components/pricing-light.tsx

// Tiny local check icon to avoid extra dependency
function CheckIcon({ className = '', size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function PricingLight() {
  return (
    <section className="relative">
      {/* Radial gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-50" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-20">
            <div className="pb-3 text-base md:text-lg font-medium" style={{ color: '#7500D6' }}>
              Pricing plans
            </div>
            <h2 className="h2 !text-slate-700 !bg-none !bg-transparent !bg-clip-border">
              Flexible plans and features
            </h2>
            <p className="text-lg md:text-xl leading-relaxed !text-slate-600">
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary,
              making this the first true generator on the Internet.
            </p>
          </div>

          {/* Pricing table */}
          <div className="grid md:grid-cols-4 gap-6 items-start lg:gap-8">
            {/* Left column (features labels) */}
            <div className="hidden md:block text-sm text-slate-600">
              <div className="font-semibold mb-4">Usage</div>
              <ul className="space-y-3 mb-8">
                <li>Social Connections</li>
                <li>Custom Domains</li>
                <li>User Role Management</li>
                <li>External Databases</li>
              </ul>

              <div className="font-semibold mb-4">Features</div>
              <ul className="space-y-3 mb-8">
                <li>Custom Connection</li>
                <li>Advanced Deployment Options</li>
                <li>Extra Add-ons</li>
                <li>Admin Roles</li>
                <li>Deploy and Monitor</li>
                <li>Enterprise Add-ons</li>
              </ul>

              <div className="font-semibold mb-4">Support</div>
              <ul className="space-y-3">
                <li>Premium Support</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="bg-slate-100 rounded-2xl shadow-lg p-6 flex flex-col">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold">$24</div>
                <div className="text-slate-600 text-sm">Everything at your fingertips.</div>
              </div>
              <button className="btn bg-purple-600 text-white hover:bg-purple-700 mb-6">Get Started →</button>
              <ul className="text-sm text-slate-600 space-y-3">
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> 100
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> 4
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> Unlimited
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> 1
                </li>
              </ul>
            </div>

            {/* Team (highlighted) */}
            <div className="bg-slate-100 rounded-2xl shadow-lg p-6 flex flex-col border-2 border-purple-500">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold">$49</div>
                <div className="text-slate-600 text-sm">Everything at your fingertips.</div>
              </div>
              <button className="btn bg-purple-600 text-white hover:bg-purple-700 mb-6">Get Started →</button>
              <ul className="text-sm text-slate-600 space-y-3">
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> 250
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> Unlimited
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> Unlimited
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> 5
                </li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-100 rounded-2xl shadow-lg p-6 flex flex-col">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold">$79</div>
                <div className="text-slate-600 text-sm">Everything at your fingertips.</div>
              </div>
              <button className="btn bg-purple-600 text-white hover:bg-purple-700 mb-6">Get Started →</button>
              <ul className="text-sm text-slate-600 space-y-3">
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> Unlimited
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> Unlimited
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> Unlimited
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-purple-600" /> Unlimited
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
