// Partner loga sekce
'use client'

import Image from 'next/image'

export function PartnerLogos() {
  return (
    <section className="py-8 bg-[#F5F5F5] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-12 sm:gap-16 opacity-60">
          {/* Framesi logo */}
          <div className="flex items-center">
            <span className="text-2xl sm:text-3xl font-bold text-[#333333] tracking-wider">
              framesi
            </span>
          </div>
          
          {/* Label.M logo */}
          <div className="flex items-center">
            <span className="text-2xl sm:text-3xl font-bold text-[#333333] tracking-wider">
              label.m
            </span>
          </div>
        </div>
        
        {/* Alternativně s obrázky, pokud budou k dispozici */}
        {/* 
        <div className="flex justify-center items-center gap-12 sm:gap-16 opacity-60">
          <Image
            src="/framesi-logo.png"
            alt="Framesi"
            width={120}
            height={60}
            className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
          />
          <Image
            src="/label-m-logo.png"
            alt="Label.M"
            width={120}
            height={60}
            className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        */}
      </div>
    </section>
  )
}