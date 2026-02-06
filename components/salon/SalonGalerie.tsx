'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface SalonGalerieProps {
  className?: string
}

// Fotografie interiéru Salon Zuza
const salonImages = [
  {
    src: '/imgssalon/interier.jpg',
    alt: 'Interiér Salon Zuza',
    title: 'Hlavní prostor'
  },
  {
    src: '/imgssalon/interier2.jpg', 
    alt: 'Interiér salonu',
    title: 'Kadeřnické křeslo'
  },
  {
    src: '/imgssalon/interier3.jpg',
    alt: 'Interiér salonu',
    title: 'Pracovní místo'
  },
  {
    src: '/imgssalon/interier4.jpg',
    alt: 'Interiér salonu',
    title: 'Styling prostor'
  },
  {
    src: '/imgssalon/interier5.jpg',
    alt: 'Interiér salonu',
    title: 'Salon z boku'
  },
  {
    src: '/imgssalon/interier6.jpg',
    alt: 'Interiér salonu',
    title: 'Detaily vybavení'
  }
]

export default function SalonGalerie({ className = '' }: SalonGalerieProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className={`${className} pb-16 mb-8`}>
      {/* Grid galerie */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {salonImages.map((image, index) => (
          <div 
            key={index}
            className="group cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setSelectedImage(index)}
          >
            <div className="aspect-video relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent w-full">
                  <h4 className="font-semibold text-lg">{image.title}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pro zvětšený obrázek */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={salonImages[selectedImage].src}
              alt={salonImages[selectedImage].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Zavřít tlačítko */}
            <button 
              className="absolute top-4 right-4 text-[#212121] hover:text-[#B8A876] transition-colors bg-white/80 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              aria-label="Zavřít náhled obrázku"
              title="Zavřít"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            {/* Navigace */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#212121] hover:text-[#B8A876] transition-colors bg-white/80 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) => prev === 0 ? salonImages.length - 1 : prev! - 1)
              }}
              aria-label="Předchozí obrázek"
              title="Předchozí"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>
              </svg>
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#212121] hover:text-[#B8A876] transition-colors bg-white/80 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) => prev === salonImages.length - 1 ? 0 : prev! + 1)
              }}
              aria-label="Další obrázek"
              title="Další"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}