// Stránka služeb podle skutečného webu
import { Navbar } from '@/components/salon/Navbar'
import { Footer } from '@/components/salon/Footer'

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
            Kompletní péče o vaše vlasy od profesionálních stylisti
          </p>
        </div>
      </section>

      {/* Kategorie služeb */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Dámské kadeřnictví */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-center">✂️</div>
              <h3 className="text-2xl font-bold text-[#333333] mb-4 text-center">
                Dámské kadeřnictví
              </h3>
              <ul className="space-y-2 text-[#555555]">
                <li>• Střihy všech délek</li>
                <li>• Foukaná a stylizace</li>
                <li>• Úprava obočí</li>
                <li>• Svatební účesy</li>
                <li>• Společenské účesy</li>
              </ul>
            </div>

            {/* Pánské kadeřnictví */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-center">👨</div>
              <h3 className="text-2xl font-bold text-[#333333] mb-4 text-center">
                Pánské kadeřnictví
              </h3>
              <ul className="space-y-2 text-[#555555]">
                <li>• Klasické střihy</li>
                <li>• Moderní střihy</li>
                <li>• Úprava vousů</li>
                <li>• Oholení</li>
                <li>• Stylizace vlasů</li>
              </ul>
            </div>

            {/* Barvení */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-center">🎨</div>
              <h3 className="text-2xl font-bold text-[#333333] mb-4 text-center">
                Barvení vlasů
              </h3>
              <ul className="space-y-2 text-[#555555]">
                <li>• Celobarvení</li>
                <li>• Melírování</li>
                <li>• Balayage</li>
                <li>• Ombre efekt</li>
                <li>• Tónování</li>
              </ul>
            </div>

            {/* Kosmetika */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-center">💆</div>
              <h3 className="text-2xl font-bold text-[#333333] mb-4 text-center">
                Kosmetické služby
              </h3>
              <ul className="space-y-2 text-[#555555]">
                <li>• Ošetření pleti</li>
                <li>• Čištění pleti</li>
                <li>• Hydratace</li>
                <li>• Anti-age ošetření</li>
                <li>• Úprava obočí</li>
              </ul>
            </div>

            {/* Speciální služby */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-center">✨</div>
              <h3 className="text-2xl font-bold text-[#333333] mb-4 text-center">
                Speciální péče
              </h3>
              <ul className="space-y-2 text-[#555555]">
                <li>• Keratinová kúra</li>
                <li>• Proteinová rekonstrukce</li>
                <li>• Hydratační masky</li>
                <li>• Olaplex ošetření</li>
                <li>• Poradenství</li>
              </ul>
            </div>

            {/* Produkty */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-center">🧴</div>
              <h3 className="text-2xl font-bold text-[#333333] mb-4 text-center">
                Profesionální produkty
              </h3>
              <ul className="space-y-2 text-[#555555]">
                <li>• Framesi</li>
                <li>• Label.M</li>
                <li>• Prodej domů</li>
                <li>• Poradenství</li>
                <li>• Doporučení</li>
              </ul>
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
            Rezervujte si termín online nebo nás kontaktujte pro více informací
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#B8A876] hover:bg-[#A39566] text-white font-bold py-3 px-8 transition-colors">
              ONLINE REZERVACE
            </button>
            <button className="border-2 border-[#B8A876] text-[#B8A876] hover:bg-[#B8A876] hover:text-white font-bold py-3 px-8 transition-colors">
              ZOBRAZIT CENÍK
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}