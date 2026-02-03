// Sekce recenzí
'use client'

interface Recenze {
  id: number
  jmeno: string
  text: string
  hodnoceni: number
}

const recenze: Recenze[] = [
  {
    id: 1,
    jmeno: "KATEŘINA NOVÁKOVÁ",
    text: "Nejlepší kadeřnický salon, jaký jsem kdy navštívila! Profesionální přístup, krásné prostředí a úžasný výsledek. Určitě se vrátím.",
    hodnoceni: 5
  },
  {
    id: 2,
    jmeno: "MATĚJ HRABÁK", 
    text: "Se ženou a našimi dvěma dcerami jsme hledali kadeřnictví, kde se postará o celou rodinu – a v Salonu Zuza jsme našli přesně to, co jsme potřebovali. Profesionální přístup, skvělá atmosféra a hlavně perfektní výsledky!",
    hodnoceni: 5
  },
  {
    id: 3,
    jmeno: "JANA SVOBODOVÁ",
    text: "Dcery odcházely nadšené, manželka spokojená a já mám střih přesně podle svých představ. Skvělý zážitek, určitě se sem vrátíme!",
    hodnoceni: 5
  }
]

export function ReviewSection() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Nadpis sekce */}
        <h2 className="text-6xl lg:text-7xl xl:text-8xl font-black text-center text-[#212121] mb-20 tracking-tight uppercase leading-none">
          RECENZE
        </h2>
        
        {/* Mřížka recenzí */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {recenze.map((recenze) => (
            <RecenzeCard key={recenze.id} recenze={recenze} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RecenzeCard({ recenze }: { recenze: Recenze }) {
  return (
    <div className="bg-white p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Hvězdy */}
      <div className="flex mb-6 justify-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-[#B8A876] transform rotate-45 border border-[#A39566]"></div>
        ))}
      </div>
      
      {/* Text recenze */}
      <blockquote className="text-[#212121] mb-8 italic text-center leading-relaxed text-lg">
        "{recenze.text}"
      </blockquote>
      
      {/* Oddělovací čára */}
      <div className="w-16 h-px bg-[#B8A876] mx-auto mb-4"></div>
      
      {/* Autor */}
      <p className="text-[#212121] font-black text-sm text-center tracking-[0.2em] uppercase">
        {recenze.jmeno}
      </p>
    </div>
  )
}