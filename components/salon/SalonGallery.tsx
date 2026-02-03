// Galerie salonu
'use client'

import Image from 'next/image'

const galerieFotky = [
  {
    id: 1,
    src: "/salon-interior-1.jpg",
    alt: "Hlavní místnost salonu"
  },
  {
    id: 2,
    src: "/salon-interior-2.jpg", 
    alt: "Pracovní místa stylisti"
  },
  {
    id: 3,
    src: "/salon-interior-3.jpg",
    alt: "Relaxační zóna"
  },
  {
    id: 4,
    src: "/salon-interior-4.jpg",
    alt: "Profesionální vybavení"
  },
  {
    id: 5,
    src: "/salon-interior-5.jpg",
    alt: "Recepce salonu"
  },
  {
    id: 6,
    src: "/salon-interior-6.jpg",
    alt: "Mycí boxy"
  }
]

export function SalonGallery() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        {/* Nadpis sekce */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#333333] mb-12 tracking-wide">
          NÁŠ SALON
        </h2>
        
        {/* Mřížka fotek */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galerieFotky.map((foto, index) => (
            <div key={foto.id} className="aspect-square relative group overflow-hidden rounded-lg">
              {/* Placeholder obrázek s barvou podle pozice */}
              <div 
                className={`w-full h-full bg-gradient-to-br ${
                  index % 4 === 0 ? 'from-[#B8A876] to-[#A39566]' :
                  index % 4 === 1 ? 'from-gray-300 to-gray-400' :
                  index % 4 === 2 ? 'from-[#E5E5E5] to-[#D0D0D0]' :
                  'from-[#F0F0F0] to-[#E0E0E0]'
                } flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
              >
                <span className="text-white font-semibold text-sm text-center opacity-70">
                  Foto {foto.id}
                </span>
              </div>
              
              {/* Skutečný obrázek (až budou k dispozici) */}
              {/*
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              */}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
          ))}
        </div>
        
        {/* Popis pod galerií */}
        <div className="text-center mt-8">
          <p className="text-[#555555] max-w-2xl mx-auto leading-relaxed">
            Podívejte se na náš moderní salon vybavený nejnovějším profesionálním 
            vybavením a vytvořený pro vaše pohodlí a relaxaci.
          </p>
        </div>
      </div>
    </section>
  )
}