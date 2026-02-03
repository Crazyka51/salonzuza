// Hlavní landing page - Salon Zuza
import { Navbar } from '@/components/salon/Navbar'
import { HeroSection } from '@/components/salon/HeroSection'
import { PartnerLogos } from '@/components/salon/PartnerLogos'
import { SectionWithImage } from '@/components/salon/SectionWithImage'
import { ReviewSection } from '@/components/salon/ReviewSection'
import { CtaBanner } from '@/components/salon/CtaBanner'
import { SalonGallery } from '@/components/salon/SalonGallery'
import { Footer } from '@/components/salon/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigace */}
      <Navbar />
      
      {/* Hero sekce */}
      <HeroSection 
        backgroundImage="/hero-salon.jpg"
      />
      
      {/* Partner loga */}
      <PartnerLogos />

      {/* Sekce Kvalita */}
      <SectionWithImage
        nadpisKlic="kvalita_nadpis"
        podnadpisKlic="kvalita_podnadpis"
        textKlic1="kvalita_text1"
        textKlic2="kvalita_text2"
        tlacitkoKlic="kvalita_tlacitko"
        obrazekUrl="/kvalita-framesi.jpg"
        obrazekAlt="Kvalitní péče s produkty Framesi a Label.M"
        obrazekVpravo={true}
        className="bg-white"
      />

      {/* Sekce Péče */}
      <SectionWithImage
        nadpisKlic="pece_nadpis"
        podnadpisKlic="pece_podnadpis"
        textKlic1="pece_text1"
        textKlic2="pece_text2"
        tlacitkoKlic="pece_tlacitko"
        obrazekUrl="/pece-vlasy.jpg"
        obrazekAlt="Zkušenosti a kvalita v péči o vlasy"
        obrazekVpravo={false}
        className="bg-[#F5F5F5]"
      />

      {/* Sekce Recenze */}
      <ReviewSection />

      {/* CTA Banner */}
      <CtaBanner linkHref="/book-appointment" />

      {/* Galerie salonu */}
      <SalonGallery />

      {/* Footer */}
      {/* Finální CTA sekce podle moderní analýzy */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-[#212121] text-white overflow-hidden">
        {/* Velký poloprůhledný text v pozadí */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="text-9xl lg:text-[20rem] font-black tracking-tighter select-none">
            RESERVED
          </span>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-[#B8A876] text-sm font-semibold tracking-[0.3em] mb-4 uppercase">
            VAŠE VLASY, NAŠE PÉČE
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 tracking-tight uppercase leading-tight">
            NAPLÁNUJTE SI NOVÝ ÚČES!
          </h2>
          <h3 className="text-2xl lg:text-3xl font-bold mb-12 tracking-wide uppercase">
            VYBERTE SI SVŮJ TERMÍN ONLINE
          </h3>
          <button className="bg-[#B8A876] hover:bg-[#A39566] text-[#212121] font-black py-6 px-12 text-lg tracking-[0.1em] transition-all duration-300 transform hover:scale-[1.02] uppercase rounded-none">
            ✂️ REZERVOVAT TERMÍN
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}