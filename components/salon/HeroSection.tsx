// Hero sekce s obsahem z databáze
'use client'

import { DatabaseText } from '@/components/DatabaseText'

interface HeroSectionProps {
  className?: string
  backgroundImage?: string
}

export function HeroSection({ 
  className = '', 
  backgroundImage = '/hero-salon.jpg' 
}: HeroSectionProps) {
  return (
    <section 
      className={`relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center ${className}`}
      style={{ 
        backgroundImage: backgroundImage.startsWith('/') 
          ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImage})`
          : `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/hero-placeholder.jpg')`
      }}
    >
      {/* Fallback gradient pokud není obrázek */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B8A876] to-[#A39566] opacity-90" />
      
      {/* Obsah */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Úvodní zlatavý text */}
        <p className="text-[#B8A876] text-sm sm:text-base font-medium tracking-[0.2em] mb-4 uppercase">
          VÍTEJTE V SALONU ZUZA
        </p>
        
        <DatabaseText
          klic="hero_nadpis"
          typ="nadpis"
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-[0.05em] drop-shadow-2xl uppercase leading-tight"
          placeholder="PÉČE O VAŠE VLASY PODLE VAŠICH PŘEDSTAV"
        />
        
        <DatabaseText
          klic="hero_podnadpis"
          typ="popis"
          as="h2"
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-8 tracking-[0.15em] opacity-90 drop-shadow-md"
          placeholder="PÉČE O VAŠE VLASY PODLE VAŠICH PŘEDSTAV"
        />
        
        {/* Popis */}
        <DatabaseText
          klic="hero_popis"
          typ="text"
          as="p"
          className="text-base sm:text-lg md:text-xl font-light mb-8 max-w-3xl mx-auto leading-relaxed opacity-85 drop-shadow-sm"
          placeholder="Poskytujeme profesionální kadeřnické služby na míru. Dopřejte si relaxaci v příjemném prostředí a nechte své vlasy ožít díky odborné péči a špičkovým produktům."
        />
        
        {/* Loga produktů podle skutečného webu */}
        <div className="flex items-center justify-center space-x-12 mb-12 opacity-90">
          <div className="text-white text-3xl font-bold tracking-[0.15em] drop-shadow-lg hover:scale-105 transition-transform duration-300">
            FRAMESI
          </div>
          <div className="w-px h-8 bg-white/30"></div>
          <div className="text-white text-3xl font-bold tracking-[0.15em] drop-shadow-lg hover:scale-105 transition-transform duration-300">
            LABEL.M
          </div>
        </div>
        
        {/* Dekorativní čára */}
        <div className="w-24 h-1 bg-white mx-auto mb-12 opacity-70" />
        
        {/* CTA tlačítko */}
        <button className="bg-[#B8A876] hover:bg-[#A39566] text-[#212121] font-black py-5 px-12 text-lg tracking-[0.1em] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl uppercase border-0 rounded-none">
          <DatabaseText
            klic="cta_tlacitko"
            typ="tlacitko_text"
            as="span"
            placeholder="VYBERTE SI SVŮJ TERMÍN ONLINE"
          />
        </button>
        
        {/* Scroll indikátor */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}