// Hlavní stránka Salonu Zuza s obsahem z databáze
import { HeroSection } from '@/components/salon/HeroSection'
import { SectionWithImage } from '@/components/salon/SectionWithImage'
import { CtaBanner } from '@/components/salon/CtaBanner'

export default function SalonPage() {
  return (
    <main className="min-h-screen">
      {/* Hero sekce */}
      <HeroSection />
      
      {/* Partner loga (zatím statické) */}
      <section className="py-8 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-[#333333]">Framesi</div>
            <div className="text-2xl font-bold text-[#333333]">Label.M</div>
          </div>
        </div>
      </section>

      {/* Sekce Kvalita */}
      <SectionWithImage
        nadpisKlic="kvalita_nadpis"
        podnadpisKlic="kvalita_podnadpis"
        textKlic="kvalita_text"
        tlacitkoKlic="kvalita_tlacitko"
        obrazekUrl="/kvalita-framesi.jpg"
        obrazekAlt="Kvalitní péče s produkty Framesi"
        obrazekVpravo={true}
        className="bg-white"
      />

      {/* Sekce Péče */}
      <SectionWithImage
        nadpisKlic="pece_nadpis"
        podnadpisKlic="pece_podnadpis"
        textKlic="pece_text"
        tlacitkoKlic="pece_tlacitko"
        obrazekUrl="/pece-vlasy.jpg"
        obrazekAlt="Profesionální péče o vlasy"
        obrazekVpravo={false}
        className="bg-[#F5F5F5]"
      />

      {/* TODO: Sekce Recenze (bude později načítána z databáze) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#333333] mb-12 tracking-wide">
            RECENZE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder pro recenze */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#F5F5F5] p-6 rounded-lg shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, star) => (
                    <span key={star} className="text-[#B8A876] text-xl">★</span>
                  ))}
                </div>
                <p className="text-[#555555] mb-4 italic">
                  "Byla jsem v salonu u paní Zuzy a byla jsem velmi spokojená..."
                </p>
                <p className="text-[#333333] font-semibold text-sm">
                  - KAROLÍNA NOVOTNÁ
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner />

      {/* TODO: Galerie salonu */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-300 rounded-lg animate-pulse">
                {/* Placeholder pro fotky salonu */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - zatím statický */}
      <footer className="bg-[#333333] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#B8A876]">KONTAKT</h3>
            <p className="mb-2">Pražská 1548</p>
            <p className="mb-2">Město, PSČ</p>
            <p className="mb-2">+420 123 456 789</p>
            <p>info@salonzuza.cz</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#B8A876]">OTEVÍRACÍ DOBA</h3>
            <p className="mb-2">Po-Pá: 09:00 - 17:00</p>
            <p className="mb-2">So: 09:00 - 13:00</p>
            <p>Ne: Zavřeno</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#B8A876]">SLEDUJTE NÁS</h3>
            <div className="flex gap-4">
              <span className="text-2xl hover:text-[#B8A876] cursor-pointer transition-colors">📘</span>
              <span className="text-2xl hover:text-[#B8A876] cursor-pointer transition-colors">📸</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Salon Zuza. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </main>
  )
}