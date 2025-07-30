import Image from 'next/image'
import { StaticImageData } from 'next/image'
import Testimonial01 from '@/public/images/testimonial-01.png'
import Testimonial02 from '@/public/images/testimonial-02.png'
import Testimonial03 from '@/public/images/testimonial-03.png'

interface Item {
  img: StaticImageData
  name: string
  role: string
  twitter: string
  quote: string
}

export default function Testimonials02() {

  const items: Item[] = [
    {
      img: Testimonial01,
      name: 'Mary Janiczak',
      role: 'Data Engineer',
      twitter: '#0',
      quote: "The pace of change and velocity of the product force you to pick up new skills, experiment with new tactics, and walk in a variety of users' shoes.",
    },
    {
      img: Testimonial02,
      name: 'Jack Smith',
      role: 'Software Engineer',
      twitter: '#0',
      quote: "The pace of change and velocity of the product force you to pick up new skills, experiment with new tactics, and walk in a variety of users' shoes.",
    },
    {
      img: Testimonial03,
      name: 'Anna Johnson',
      role: 'Product Designer',
      twitter: '#0',
      quote: "The pace of change and velocity of the product force you to pick up new skills, experiment with new tactics, and walk in a variety of users' shoes.",
    },
  ]

  return (
    <section className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-purple-500 rounded-full blur-[120px] opacity-50"></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 text-gray-900 dark:text-slate-100 pb-4">Hear from our people</h2>
            <p className="text-lg text-gray-600 dark:text-slate-400">Our company is comprised of people who make bold choices for our clients and the security sector. It's in our DNA to push our limits and make bold changes.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 max-w-xs mx-auto lg:max-w-none">
            {items.map((item, index) => ( 
              <div key={index} className="relative p-5 before:absolute before:inset-0 before:-z-10 before:border before:border-gray-200 dark:before:border-slate-300 before:bg-gray-100 dark:before:bg-slate-700 before:opacity-10 before:rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Image className="shrink-0" src={item.img} width={44} height={44} alt={item.name} />
                    <div className="grow">
                      <div className="font-bold text-gray-900 dark:text-slate-100">{item.name}</div>
                      <div className="text-sm text-purple-500 font-medium">{item.role}</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-slate-400">“{item.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
