// Footer s kontakty a mapou
'use client'

import dynamic from 'next/dynamic'

// Dynamicky načíst SalonMapa komponentu (kvůli SSR problémům s Leaflet)
const SalonMapa = dynamic(() => import('./SalonMapa').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-gray-600 rounded-lg flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B8A876] mx-auto mb-2"></div>
        <p className="text-sm">Načítání mapy...</p>
      </div>
    </div>
  )
})

export function Footer() {
  return (
    <footer className="bg-[#333333] text-white">
      {/* Hlavní obsah footeru */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid pro rozložení sloupců */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Kontakt */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#B8A876] tracking-wide uppercase"> {/* Přidáno uppercase */}
                KONTAKT
              </h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-1"> {/* Přidána ikona */}
                  <span>📍</span><span>Fričova 1240</span>
                </p>
                <p className="flex items-center gap-1"> {/* Přidána ikona */}
                  <span>📍</span><span>Dobříš, 263 01</span>
                </p>
                <p className="flex items-center gap-1"> {/* Přidána ikona */}
                  <span>📞</span><span>+420 724 311 258</span>
                </p>
                <p className="flex items-center gap-1"> {/* Přidána ikona */}
                  <span>📧</span><span>zuzka@salon-zuza.cz</span>
                </p>
              </div>
            </div>

            {/* Otevírací doba */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#B8A876] tracking-wide uppercase"> {/* Přidáno uppercase */}
                OTEVÍRACÍ DOBA
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-medium">Po-Pá:</span> 08:30 - 17:00</p>
                <p><span className="font-medium">So:</span> Zavřeno</p>
                <p><span className="font-medium">Ne:</span> Zavřeno</p>
              </div>
            </div>

            {/* Služby */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#B8A876] tracking-wide uppercase"> {/* Přidáno uppercase */}
                SLUŽBY
              </h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-1"><span>✂️</span> Dámské kadeřnictví</p>
                <p className="flex items-center gap-1"><span>✂️</span> Pánské kadeřnictví</p>
                <p className="flex items-center gap-1"><span>🎨</span> Barvení a melíry</p>
                
              </div>
            </div>

            {/* Sledujte nás */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#B8A876] tracking-wide uppercase"> {/* Přidáno uppercase */}
                SLEDUJTE NÁS
              </h3>
              <div className="flex gap-4 mb-4">
                <a
                  href="#"
                  className="text-2xl hover:text-[#B8A876] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  📘
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-[#B8A876] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  📸
                </a>
              </div>
              <p className="text-sm text-gray-400">
                Sledujte naše nejnovější práce a trendy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa sekce */}
      <div className="bg-[#2a2a2a] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid pro mapu a info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Informace o lokalitě */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#B8A876] uppercase"> {/* Přidáno uppercase */}
                NAJDĚTE NÁS
              </h4>
              <p className="text-gray-300 mb-4">
                Náš salon se nachází v srdci Dobříše, snadno dostupný MHD.
                Parkování je možné v okolních ulicích nebo na parkovišti u zámku.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center gap-1"> {/* Přidána ikona */}
                  <span>🚇</span> Autobus: 317, 360, 392, 395, 420, 517
                </p>
                <p className="flex items-center gap-1"> {/* Přidána ikona */}
                  <span>🚗</span> Parkování: Okolní ulice, Parkoviště u zámku Dobříš
                </p>
              </div>
            </div>

            {/* Interaktivní mapa */}
            <SalonMapa height="300px" className="aspect-video rounded-lg" /> {/* Přidáno rounded-lg */}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Salon Zuza. Všechna práva vyhrazena. {/* Aktuální rok */}
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-[#B8A876] transition-colors">
                Ochrana osobních údajů
              </a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-[#B8A876] transition-colors">
                Obchodní podmínky
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}