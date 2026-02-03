// Footer s kontakty a mapou
'use client'

export function Footer() {
  return (
    <footer className="bg-[#333333] text-white">
      {/* Hlavní obsah footeru */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Kontakt */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#B8A876] tracking-wide">
                KONTAKT
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>📍 Pražská 1548</p>
                <p>📍 Praha 2, 120 00</p>
                <p>📞 +420 123 456 789</p>
                <p>📧 info@salonzuza.cz</p>
              </div>
            </div>
            
            {/* Otevírací doba */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#B8A876] tracking-wide">
                OTEVÍRACÍ DOBA
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-medium">Po-Pá:</span> 09:00 - 17:00</p>
                <p><span className="font-medium">So:</span> 09:00 - 13:00</p>
                <p><span className="font-medium">Ne:</span> Zavřeno</p>
              </div>
            </div>
            
            {/* Služby */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#B8A876] tracking-wide">
                SLUŽBY
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>✂️ Dámské kadeřnictví</p>
                <p>✂️ Pánské kadeřnictví</p>
                <p>🎨 Barvení a melíry</p>
                <p>💆 Kosmetické služby</p>
              </div>
            </div>
            
            {/* Sledujte nás */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#B8A876] tracking-wide">
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
      <div className="bg-[#2a2a2a] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Informace o lokalitě */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#B8A876]">
                NAJDĚTE NÁS
              </h4>
              <p className="text-gray-300 mb-4">
                Náš salon se nachází v srdci Prahy, snadno dostupný MHD. 
                Parkování je možné v okolních ulicích nebo v nedaleké garáži.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>🚇 Metro: Náměstí Míru (linka A)</p>
                <p>🚌 Autobus: 4, 22, 23</p>
                <p>🚗 Parkování: Okolní ulice, Garáž Vinohrady</p>
              </div>
            </div>
            
            {/* Placeholder pro mapu */}
            <div className="aspect-video bg-gray-600 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-sm">
                  Google Maps<br />
                  (Bude implementováno)
                </p>
              </div>
              
              {/* Skutečná mapa (až bude implementována) */}
              {/*
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
              */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-600 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400 text-sm">
            <p>
              &copy; 2025 Salon Zuza. Všechna práva vyhrazena. 
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