import Image from 'next/image'
import Testimonial01 from '@/public/images/testimonial-01.png'
import Testimonial02 from '@/public/images/testimonial-02.png'

const testimonials = [
  {
    img: Testimonial01,
    name: 'Mary Janiczak',
    title: 'Data Engineer',
    text: "The product helps our team move fast and build what matters. It’s a game-changer.",
  },
  {
    img: Testimonial02,
    name: 'Jack Smith',
    title: 'Software Engineer',
    text: "We've streamlined our workflow and collaborate more effectively thanks to BuildAIStartups.com.",
  },
]

export default function Testimonials() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 text-gray-900 dark:text-slate-100">What our clients say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col items-center bg-white dark:bg-slate-900 shadow rounded-xl p-8">
                <Image src={t.img} width={56} height={56} alt={t.name} className="mb-4 rounded-full" />
                <div className="font-semibold text-gray-900 dark:text-slate-100 mb-1">{t.name}</div>
                <div className="text-sm text-purple-500 mb-3">{t.title}</div>
                <p className="text-gray-700 dark:text-slate-300 text-center">“{t.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
