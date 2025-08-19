'use client'

import { useState } from 'react'

export default function PricingLight() {
  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <div className="relative">
      {/* Decorative blurred blob (kept subtle on light bg) */}
      <div
        className="max-md:hidden absolute bottom-0 -mb-20 left-2/3 -translate-x-1/2 blur-2xl opacity-40 pointer-events-none"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
          <defs>
            <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bs5-a)"
            fillRule="evenodd"
            d="m661 736 461 369-284 58z"
            transform="matrix(1 0 0 -1 -661 1163)"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        className={[
          // same grid mechanics as the original, only colors swapped for light
          'grid md:grid-cols-4 xl:-mx-6 text-sm',
          // paddings for the first header row
          '[&>div:nth-of-type(-n+4)]:py-6',
          '[&>div:nth-last-of-type(-n+4)]:pb-6',
          'max-md:[&>div:nth-last-of-type(-n+4)]:mb-8',
          // roundings of the 4-top/4-bottom groups on mobile
          'max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl',
          'max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl',
          // desktop corner radii
          'md:[&>div:nth-of-type(2)]:rounded-tl-3xl',
          'md:[&>div:nth-of-type(4)]:rounded-tr-3xl',
          'md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl',
          'md:[&>div:nth-last-of-type(1)]:rounded-br-3xl',
          // **Light theme backgrounds** for the 3 pricing columns (leave the left meta column transparent)
          '[&>div]:bg-slate-50',
          '[&>div:nth-of-type(4n+1)]:bg-transparent',
          // mobile ordering (unchanged)
          'max-md:[&>div:nth-of-type(4n+5)]:hidden',
          'max-md:[&>div:nth-of-type(4n+2)]:order-1',
          'max-md:[&>div:nth-of-type(4n+3)]:order-2',
          'max-md:[&>div:nth-of-type(4n+4)]:order-3',
          'max-md:md:[&>div:nth-of-type(n)]:mb-0',
          // keep the purple outline on the middle plan
          '[&>div:nth-of-type(4n+3)]:relative',
          '[&>div:nth-of-type(4n+3)]:before:absolute',
          '[&>div:nth-of-type(4n+3)]:before:-inset-px',
          '[&>div:nth-of-type(4n+3)]:before:rounded-[inherit]',
          '[&>div:nth-of-type(4n+3)]:before:border-x-2',
          '[&>div:nth-of-type(3)]:before:border-t-2',
          '[&>div:nth-last-of-type(2)]:before:border-b-2',
          '[&>div:nth-of-type(4n+3)]:before:border-purple-500',
          '[&>div:nth-of-type(4n+3)]:before:-z-10',
          '[&>div:nth-of-type(4n+3)]:before:pointer-events-none',
          // give the 3 plan cards a subtle card feel
          '[&>div:nth-of-type(4n+2)]:shadow-sm [&>div:nth-of-type(4n+3)]:shadow-sm [&>div:nth-of-type(4n+4)]:shadow-sm',
          '[&>div:nth-of-type(4n+2)]:border [&>div:nth-of-type(4n+3)]:border [&>div:nth-of-type(4n+4)]:border',
          '[&>div:nth-of-type(4n+2)]:border-slate-200 [&>div:nth-of-type(4n+3)]:border-slate-200 [&>div:nth-of-type(4n+4)]:border-slate-200',
        ].join(' ')}
      >
        {/* ======= Left column (meta + feature labels) ======= */}
        <div className="px-6 flex flex-col justify-end">
          <div className="pb-5 md:border-b border-slate-200">
            {/* Toggle switch */}
            <div className="max-md:text-center">
              <div className="inline-flex items-center whitespace-nowrap">
                <div className="text-sm text-slate-500 font-medium mr-2 md:max-lg:hidden">Monthly</div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="peer sr-only"
                    checked={annual}
                    onChange={() => setAnnual(!annual)}
                  />
                  <label
                    htmlFor="toggle"
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-300 px-0.5 outline-slate-300 transition-colors
                               before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-xs before:transition-transform before:duration-150
                               peer-checked:bg-purple-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2
                               peer-focus-visible:outline-gray-400 peer-focus-visible:peer-checked:outline-purple-500"
                  >
                    <span className="sr-only">Pay Yearly</span>
                  </label>
                </div>
                <div className="text-sm text-slate-500 font-medium ml-2">
                  Yearly <span className="text-teal-600">(-20%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section labels (left rail) */}
          <div className="mt-8 space-y-6">
            <div className="py-2 text-slate-900 font-semibold mt-4">Usage</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">Social Connections</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">Custom Domains</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">User Role Management</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">External Databases</div>

            <div className="py-2 text-slate-900 font-semibold mt-6">Features</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">Custom Connection</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">Advanced Deployment Options</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">Extra Add-ons</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">Admin Roles</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">Deploy and Monitor</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">Enterprise Add-ons</div>

            <div className="py-2 text-slate-900 font-semibold mt-6">Support</div>
            <div className="py-2 text-slate-600 border-b border-slate-200">Premium Support</div>
          </div>
        </div>

        {/* ======= Pro ======= */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-200">
            <div className="text-base font-medium text-purple-700 pb-0.5">Pro</div>
            <div className="mb-1">
              {/* $ + price + /mo -> force black for perfect contrast */}
              <span className="text-lg font-medium !text-slate-900">$</span>
              <span className="text-3xl font-bold !text-slate-900">{annual ? '24' : '29'}</span>
              <span className="text-sm font-medium !text-slate-900">/mo</span>
            </div>
            <div className="text-slate-600">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b border-slate-200">
            <a
              className="btn-sm text-slate-900 bg-linear-to-r from-white via-white to-white hover:bg-white w-full transition duration-150 ease-in-out group border border-slate-200"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>

        {/* ======= Team (featured) ======= */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-200">
            <div className="text-base font-medium text-purple-700 pb-0.5">Team</div>
            <div className="mb-1">
              <span className="text-lg font-medium !text-slate-900">$</span>
              <span className="text-3xl font-bold !text-slate-900">{annual ? '49' : '54'}</span>
              <span className="text-sm font-medium !text-slate-900">/mo</span>
            </div>
            <div className="text-slate-600">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b border-slate-200">
            <a
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full transition duration-150 ease-in-out group"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>

        {/* ======= Enterprise ======= */}
        <div className="px-6 flex flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-200">
            <div className="text-base font-medium text-purple-700 pb-0.5">Enterprise</div>
            <div className="mb-1">
              <span className="text-lg font-medium !text-slate-900">$</span>
              <span className="text-3xl font-bold !text-slate-900">{annual ? '79' : '85'}</span>
              <span className="text-sm font-medium !text-slate-900">/mo</span>
            </div>
            <div className="text-slate-600">Everything at your fingertips.</div>
          </div>
          <div className="pb-4 border-b border-slate-200">
            <a
              className="btn-sm text-slate-900 bg-linear-to-r from-white via-white to-white hover:bg-white w-full transition duration-150 ease-in-out group border border-slate-200"
              href="#0"
            >
              Get Started{' '}
              <span className="tracking-normal text-purple-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </a>
          </div>
        </div>

        {/* ======= Usage (values) ======= */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Usage</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Usage</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Usage</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4 md:hidden">Usage</div>
        </div>

        {/* Social Connections */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">Social Connections</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>100 <span className="md:hidden">Social Connections</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>250 <span className="md:hidden">Social Connections</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>Unlimited <span className="md:hidden">Social Connections</span></span>
          </div>
        </div>

        {/* Custom Domains */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">Custom Domains</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>4 <span className="md:hidden">Custom Domains</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>Unlimited <span className="md:hidden">Custom Domains</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>Unlimited <span className="md:hidden">Custom Domains</span></span>
          </div>
        </div>

        {/* User Role Management */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">User Role Management</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>Unlimited <span className="md:hidden">User Role Management</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>Unlimited <span className="md:hidden">User Role Management</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>Unlimited <span className="md:hidden">User Role Management</span></span>
          </div>
        </div>

        {/* External Databases */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">External Databases</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>1 <span className="md:hidden">External Databases</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>5 <span className="md:hidden">External Databases</span></span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>Unlimited <span className="md:hidden">External Databases</span></span>
          </div>
        </div>

        {/* ======= Features (row labels echoed for mobile) ======= */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4">Features</div>
        </div>
        <div className="px-6 flex flex-col justify-end md:hidden">
          <div className="py-2 text-slate-900 font-medium mt-4">Features</div>
        </div>
        <div className="px-6 flex flex-col justify-end md:hidden">
          <div className="py-2 text-slate-900 font-medium mt-4">Features</div>
        </div>
        <div className="px-6 flex flex-col justify-end md:hidden">
          <div className="py-2 text-slate-900 font-medium mt-4">Features</div>
        </div>

        {/* Custom Connection values */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">Custom Connection</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Custom Connection</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Custom Connection</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Custom Connection</span>
            </span>
          </div>
        </div>

        {/* Advanced Deployment Options */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">Advanced Deployment Options</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Advanced Deployment Options</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Advanced Deployment Options</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Advanced Deployment Options</span>
            </span>
          </div>
        </div>

        {/* Extra Add-ons */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">Extra Add-ons</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Extra Add-ons</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Extra Add-ons</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Extra Add-ons</span>
            </span>
          </div>
        </div>

        {/* Admin Roles */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">Admin Roles</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center border-b border-slate-200 py-2 text-slate-700 max-md:hidden">
            <span>
              <span className="md:hidden">Admin Roles</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center border-b border-slate-200 py-2 text-slate-700 max-md:hidden">
            <span>
              <span className="md:hidden">Admin Roles</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Admin Roles</span>
            </span>
          </div>
        </div>

        {/* Deploy and Monitor */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">Deploy and Monitor</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center border-b border-slate-200 py-2 text-slate-700 max-md:hidden">
            <span>
              <span className="md:hidden">Deploy and Monitor</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center border-b border-slate-200 py-2 text-slate-700 max-md:hidden">
            <span>
              <span className="md:hidden">Deploy and Monitor</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Deploy and Monitor</span>
            </span>
          </div>
        </div>

        {/* Enterprise Add-ons */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">Enterprise Add-ons</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center border-b border-slate-200 py-2 text-slate-700 max-md:hidden">
            <span>
              <span className="md:hidden">Enterprise Add-ons</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center border-b border-slate-200 py-2 text-slate-700 max-md:hidden">
            <span>
              <span className="md:hidden">Enterprise Add-ons</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Enterprise Add-ons</span>
            </span>
          </div>
        </div>

        {/* Support header (echo for grid alignment) */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-900 font-medium mt-4">Support</div>
        </div>
        <div className="px-6 flex flex-col justify-end md:hidden">
          <div className="py-2 text-slate-900 font-medium mt-4">Support</div>
        </div>
        <div className="px-6 flex flex-col justify-end md:hidden">
          <div className="py-2 text-slate-900 font-medium mt-4">Support</div>
        </div>
        <div className="px-6 flex flex-col justify-end md:hidden">
          <div className="py-2 text-slate-900 font-medium mt-4">Support</div>
        </div>

        {/* Premium Support values */}
        <div className="px-6 flex flex-col justify-end">
          <div className="py-2 text-slate-600 border-b border-slate-200">Premium Support</div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center border-b border-slate-200 py-2 text-slate-700 max-md:hidden">
            <span>
              <span className="md:hidden">Premium Support</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Premium Support</span>
            </span>
          </div>
        </div>
        <div className="px-6 flex flex-col justify-end">
          <div className="flex items-center h-full border-b border-slate-200 py-2 text-slate-700">
            <svg className="shrink-0 fill-purple-600 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
              <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
            </svg>
            <span>
              <span className="md:hidden">Premium Support</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
