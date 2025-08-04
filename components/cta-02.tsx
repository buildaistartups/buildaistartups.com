import Particles from './particles'

export default function Cta02() {
  return (
    <section className="relative">

      {/* Particles animation */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-24">
        <Particles className="absolute inset-0 -z-10" quantity={6} staticity={30} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative px-8 py-12 md:py-20 border-t border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 rounded-2xl shadow-lg">
          {/* Blurred shape */}
          <div className="absolute top-0 -mt-24 left-1/2 -translate-x-1/2 ml-24 blur-2xl opacity-70 pointer-events-none -z-10" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
              <defs>
                <linearGradient id="bs4-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7"></stop>
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path fill="url(#bs4-a)" fillRule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)"></path>
            </svg>
          </div>
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <div className="inline-flex font-medium bg-gradient-to-r from-purple-500 to-purple-200 bg-clip-text text-transparent pb-3">
                The security first platform
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white pb-4">
              Supercharge your security
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
            </p>
            <div>
              <a
                className="btn px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow transition duration-150 ease-in-out group"
                href="#0"
              >
                Start Building
                <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  -&gt;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
