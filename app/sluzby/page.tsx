// Stránka služeb s dynamickým obsahem z databáze
'use client'

import { Navbar } from '@/components/salon/Navbar'
import { Footer } from '@/components/salon/Footer'
import Link from 'next/link'

export default function SluzbyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero sekce pro služby */}
      <section className="bg-gradient-to-br from-[#B8A876] to-[#A39566] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-wide">
            NAŠE SLUŽBY
          </h1>
          <p className="text-xl font-light opacity-90 leading-relaxed">
            Profesionální kadeřnické služby s kvalitní péčí
          </p>
        </div>
      </section>

      {/* Úvodní text */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-[#555555] leading-relaxed">
            V našem salonu nabízíme profesionální kadeřnické služby pro ženy, muže i děti. 
            Pracujeme s kvalitními produkty značek <strong>Framesi</strong> a <strong>LABEL.M</strong>, 
            abychom vašim vlasům dopřáli tu nejlepší péči.
          </p>
        </div>
      </section>

      {/* Kategorie služeb - alternující layout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#F5F5F5]">
        <div className="max-w-6xl mx-auto space-y-16">
            
          {/* Střih */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#B8A876] to-[#A39566] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-[#333333] mb-4">Střih</h3>
              <p className="text-[#555555] leading-relaxed">
                <strong>Krátké vlasy</strong> – Precizní střih a styling pro svěží a moderní vzhled.<br/>
                <strong>Polodlouhé vlasy</strong> – Profesionální úprava, která podtrhne přirozenou krásu.<br/>
                <strong>Dlouhé vlasy</strong> – Perfektní tvar a péče pro zdravé a upravené vlasy.<br/>
                <strong>Extra dlouhé vlasy</strong> – Individuální střih a styling pro maximální efekt.<br/>
                <strong>Pánské střihy</strong> – Klasické i moderní účesy pro každého muže.<br/>
                <strong>Dětské střihy</strong> – Šetrný přístup a trendy účesy pro nejmenší.
              </p>
            </div>
          </div>

          {/* Barvení vlasů */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#B8A876] to-[#A39566] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-[#333333] mb-4">Barvení vlasů</h3>
              <p className="text-[#555555] leading-relaxed">
                <strong>Krátké vlasy a odrost</strong> – Dokonalé sjednocení barvy pro přirozený vzhled.<br/>
                <strong>Polodlouhé vlasy</strong> – Profesionální barvení pro hloubku a lesk.<br/>
                <strong>Dlouhé vlasy</strong> – Intenzivní a dlouhotrvající barva pro krásné vlasy.<br/>
                <strong>Přeliv</strong> – Jemné tónování pro osvěžení a sjednocení barvy.
              </p>
            </div>
          </div>

          {/* Melír */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#B8A876] to-[#A39566] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-[#333333] mb-4">Melír</h3>
              <p className="text-[#555555] leading-relaxed">
                <strong>Klasický melír</strong> – Přirozené prosvětlení vlasů pro svěží vzhled.<br/>
                <strong>1 ks fólie do účesu (krátká)</strong> – Jemný melír pro decentní zvýraznění.<br/>
                <strong>1 ks fólie do účesu (dlouhá)</strong> – Efektní melír pro větší kontrast a hloubku.
              </p>
            </div>
          </div>

          {/* Svatební účesy */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#B8A876] to-[#A39566] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-[#333333] mb-4">Svatební a společenské účesy</h3>
              <p className="text-[#555555] leading-relaxed">
                Připravujeme dokonalé svatební a společenské účesy, které podtrhnou vaši krásu a vydrží celý den. 
                Od romantických vln přes elegantní drdoly až po složité copánkové kreace – pomůžeme vám vytvořit 
                účes, který se perfektně hodí k vašemu stylu a šatům. Rezervujte si svou konzultaci a nechte 
                si vytvořit účes na míru!
              </p>
            </div>
          </div>

          {/* Regenerace */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#B8A876] to-[#A39566] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-[#333333] mb-4">Regenerace a ošetření vlasů</h3>
              <p className="text-[#555555] leading-relaxed">
                Dopřejte svým vlasům hloubkovou regeneraci s profesionální péčí Framesi a LABEL.M. 
                Naše ošetření obnovují poškozené vlasy, posilují jejich strukturu a dodávají jim intenzivní hydrataci. 
                Vyzkoušejte Smoothing systém pro dokonale hladké a zdravé vlasy bez krepatění. 
                Rezervujte si svůj termín a nechte své vlasy rozmazlovat!
              </p>
            </div>
          </div>

          {/* Zesvětlování */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#B8A876] to-[#A39566] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-[#333333] mb-4">Zesvětlování a speciální techniky</h3>
              <p className="text-[#555555] leading-relaxed">
                Oživte své vlasy profesionálním zesvětlením nebo moderními technikami, jako je Ombré, AirTouch nebo Micromelír. 
                Dosáhněte přirozeného přechodu barev, jemného prosvětlení nebo odvážnějšího efektu blond tónů. 
                Naše zesvětlovací metody jsou šetrné k vlasům a zajišťují dlouhotrvající a zdravý vzhled.
              </p>
            </div>
          </div>

          {/* PLEX péče */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#B8A876] to-[#A39566] rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-[#333333] mb-4">Nadstandardní péče PLEX, PRO-FORCE</h3>
              <p className="text-[#555555] leading-relaxed">
                Chcete svým vlasům dopřát luxusní péči? Naše nadstandardní ošetření PLEX a PRO-FORCE posilují vlasy, 
                chrání je před poškozením a zajišťují jejich zdravý vzhled. Ideální pro regeneraci po barvení nebo 
                jako prevence před lámáním a třepením konečků. Objednejte si VIP péči pro vaše vlasy ještě dnes!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA sekce */}
      <section className="bg-[#F5F5F5] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#333333] mb-6">
            Zaujala vás některá služba?
          </h2>
          <p className="text-lg text-[#555555] mb-8">
            Rezervujte si termín online nebo se podívejte na náš ceník
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/online-rezervace"
              className="bg-[#B8A876] hover:bg-[#A39566] text-white font-bold py-3 px-8 transition-colors"
            >
              ONLINE REZERVACE
            </Link>
            <Link
              href="/cenik"
              className="border-2 border-[#B8A876] text-[#B8A876] hover:bg-[#B8A876] hover:text-white font-bold py-3 px-8 transition-colors"
            >
              ZOBRAZIT CENÍK
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}