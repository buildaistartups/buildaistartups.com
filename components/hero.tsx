import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-bottom.svg'

export default function Hero() {
  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>

        <div className="pt-32 pb-16 md:pt-52 md:pb-32">

          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6" data-aos="fade-down">
              <div className="inline-flex relative before:absolute before:inset-0 before:bg-purple-200 before:blur-md">
                <a className="btn-sm py-0.5 text-gray-900 dark:text-slate-300 hover:text-purple-700 dark:hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(var(--color-purple-100),var(--color-purple-100))_padding-box,linear-gradient(var(--color-purple-200),var(--color-purple-100)_75%,transparent_100%)_border-box] relative before:absolute before:inset-0 before:bg-white/50 dark:before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow-sm" href="#0">
                  <span className="relative inline-flex items-center">
                    BuildAIStartups.com is now live! <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </span>
                </a>
              </div>
            </div>
            <h1 className="h1 bg-clip-text text-transparent bg-gradient-to-r from-gray-900/80 via-purple-700 to-gray-900/80 dark:from-slate-200/60 dark:via-slate-200 dark:to-slate-200/60 pb-4" data-aos="fade-down">The AI Startup Platform</h1>
            <p className="text-lg text-gray-700 dark:text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">
              Build, launch, and scale your AI startup—no code, no hassle. Responsive, modern, and built for both dark and light mode.
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-down" data-aos-delay="400">
              <div>
                <a className="btn text-white dark:text-slate-900 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300 hover:bg-purple-600 w-full transition duration-150 ease-in-out group" href="#0">
                  Get Started <span className="tracking-normal text-white dark:text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                </a>
              </div>
              <div>
                <a className="btn text-gray-900 dark:text-slate-200 bg-white/80 dark:bg-slate-900/25 hover:bg-gray-50 dark:hover:bg-slate-900/30 w-full transition duration-150 ease-in-out" href="#0">
                  <svg className="shrink-0 fill-gray-700 dark:fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="m1.999 0 1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 0l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 10l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM6.292 7.586z" />
                  </svg>
                  Learn More
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
