'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import customer1 from '@/public/images/customer-01.svg'
import customer2 from '@/public/images/customer-02.svg'
import customer3 from '@/public/images/customer-03.svg'
import customer4 from '@/public/images/customer-04.svg'
import customer5 from '@/public/images/customer-05.svg'
import customer6 from '@/public/images/customer-06.svg'

const customers = [
  customer1, customer2, customer3, customer4, customer5, customer6
]

export default function IntegrationsCarousel() {
  const swiperRef = useRef<any>(null)

  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={30}
      slidesPerView={2}
      loop
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 6 },
      }}
      className="py-4"
    >
      {customers.map((img, idx) => (
        <SwiperSlide key={idx} className="flex items-center justify-center">
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm p-2">
            <Image src={img} alt={`Integration ${idx + 1}`} width={96} height={48} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
