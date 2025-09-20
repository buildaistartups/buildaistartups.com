'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Import Swiper core and required modules (v8 compatible)
import Swiper, { Navigation } from 'swiper'
import 'swiper/swiper.min.css'

// Import images
import IntegrationImg01 from '@/public/images/integrations-01.svg'
import IntegrationImg02 from '@/public/images/integrations-02.svg'
import IntegrationImg03 from '@/public/images/integrations-03.svg'
import IntegrationImg04 from '@/public/images/integrations-04.svg'
import IntegrationImg05 from '@/public/images/integrations-05.svg'
import Star from '@/public/images/star.svg'
import Avatar01 from '@/public/images/avatar-01.jpg'
import Avatar02 from '@/public/images/avatar-02.jpg'
import Avatar03 from '@/public/images/avatar-03.jpg'
import Avatar04 from '@/public/images/avatar-04.jpg'
import Avatar05 from '@/public/images/avatar-05.jpg'
import Avatar06 from '@/public/images/avatar-06.jpg'
import Avatar07 from '@/public/images/avatar-07.jpg'
import Avatar08 from '@/public/images/avatar-08.jpg'
import Avatar09 from '@/public/images/avatar-09.jpg'
import Avatar10 from '@/public/images/avatar-10.jpg'
import Avatar11 from '@/public/images/avatar-11.jpg'
import Avatar12 from '@/public/images/avatar-12.jpg'
import Avatar13 from '@/public/images/avatar-13.jpg'
import Avatar14 from '@/public/images/avatar-14.jpg'
import Avatar15 from '@/public/images/avatar-15.jpg'
import Avatar16 from '@/public/images/avatar-16.jpg'
import Avatar17 from '@/public/images/avatar-17.jpg'
import Avatar18 from '@/public/images/avatar-18.jpg'
import Avatar19 from '@/public/images/avatar-19.jpg'

// Configure Swiper
Swiper.use([Navigation])

export default function IntegrationsCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const swiperRef = useRef<Swiper | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const instance = new Swiper(containerRef.current, {
      breakpoints: {
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },
    })

    swiperRef.current = instance

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true)
        swiperRef.current = null
      }
    }
  }, [])

  return (
    <>
      {/* Carousel built with Swiper.js */}
      <div className="swiper" ref={containerRef}>
        <div className="swiper-wrapper">
          {/* Card 1 */}
          <div className="swiper-slide h-auto flex flex-col bg-slate-800 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <Image src={IntegrationImg01} width={48} height={48} alt="Integration 01" />
              </div>
              <div className="grow truncate">
                <div className="font-semibold text-slate-50 mb-1">Build AI Startups Builder</div>
                <div className="text-sm font-medium text-blue-500">buildaistartups.com</div>
              </div>
              <div className="shrink-0">
                <svg className="w-3 h-3 fill-slate-400" xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                  <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5
                  
