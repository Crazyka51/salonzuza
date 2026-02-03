// Stránka ceníku podle skutečného webu
import { Navbar } from '@/components/salon/Navbar'
import { Footer } from '@/components/salon/Footer'

export default function CenikPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero sekce pro ceník */}
      <section className="bg-gradient-to-br from-[#B8A876] to-[#A39566] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-wide">
            CENÍK SLUŽEB
          </h1>
          <p className="text-xl font-light opacity-90 leading-relaxed">
            Transparentní ceny za profesionální služby
          </p>
        </div>
      </section>

      {/* Ceník tabulka */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Dámské kadeřnictví */}
          <div className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#B8A876] text-white p-6">
              <h2 className="text-2xl font-bold">Dámské kadeřnictví</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Mytí + foukaná</span>
                    <span className="font-semibold">450 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Střih + mytí + foukaná</span>
                    <span className="font-semibold">650 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Střih + barvení + foukaná</span>
                    <span className="font-semibold">1200 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Melírování + tónování</span>
                    <span className="font-semibold">1400 Kč</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Svatební účes</span>
                    <span className="font-semibold">800 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Společenský účes</span>
                    <span className="font-semibold">600 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Úprava obočí</span>
                    <span className="font-semibold">200 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Keratinová kúra</span>
                    <span className="font-semibold">2500 Kč</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pánské kadeřnictví */}
          <div className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#B8A876] text-white p-6">
              <h2 className="text-2xl font-bold">Pánské kadeřnictví</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Mytí + střih + foukaná</span>
                    <span className="font-semibold">450 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Klasický střih</span>
                    <span className="font-semibold">350 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Moderní střih</span>
                    <span className="font-semibold">400 Kč</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Úprava vousů</span>
                    <span className="font-semibold">200 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Oholení</span>
                    <span className="font-semibold">250 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Kompletní služba</span>
                    <span className="font-semibold">600 Kč</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barvení */}
          <div className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#B8A876] text-white p-6">
              <h2 className="text-2xl font-bold">Barvení vlasů</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Celobarvení krátké vlasy</span>
                    <span className="font-semibold">800 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Celobarvení dlouhé vlasy</span>
                    <span className="font-semibold">1200 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Melírování částečné</span>
                    <span className="font-semibold">900 Kč</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Melírování kompletní</span>
                    <span className="font-semibold">1400 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Balayage</span>
                    <span className="font-semibold">1600 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Tónování</span>
                    <span className="font-semibold">400 Kč</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kosmetika */}
          <div className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#B8A876] text-white p-6">
              <h2 className="text-2xl font-bold">Kosmetické služby</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Základní ošetření pleti</span>
                    <span className="font-semibold">600 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Hloubkové čištění</span>
                    <span className="font-semibold">800 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Hydratační ošetření</span>
                    <span className="font-semibold">700 Kč</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span>Anti-age ošetření</span>
                    <span className="font-semibold">900 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Úprava a barvení obočí</span>
                    <span className="font-semibold">300 Kč</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Úprava řas</span>
                    <span className="font-semibold">250 Kč</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Poznámka */}
      <section className="bg-[#F5F5F5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-[#555555] text-lg mb-4">
              <strong>Poznámka:</strong> Ceny se mohou lišit v závislosti na délce a struktuře vlasů.
            </p>
            <p className="text-[#555555]">
              Pro přesnou cenovou nabídku nás kontaktujte nebo si domluvte konzultaci zdarma.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#333333] mb-6">
            Chcete si rezervovat termín?
          </h2>
          <p className="text-lg text-[#555555] mb-8">
            Využijte naši online rezervaci nebo nás kontaktujte přímo
          </p>
          <button className="bg-[#B8A876] hover:bg-[#A39566] text-white font-bold py-3 px-8 transition-colors">
            REZERVOVAT ONLINE
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}