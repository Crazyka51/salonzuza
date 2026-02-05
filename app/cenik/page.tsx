'use client'

// Stránka ceníku podle skutečného webu
import { Navbar } from '@/components/salon/Navbar'
import { Footer } from '@/components/salon/Footer'
import { useEffect, useState } from 'react'

interface Sluzba {
  id: number
  nazev: string
  cenaTopStylist: number
  dobaTrvaniMinuty: number
}

interface Kategorie {
  id: number
  nazev: string
  popis: string | null
  sluzby: Sluzba[]
}

export default function CenikPage() {
  const [kategorie, setKategorie] = useState<Kategorie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cenik')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setKategorie(data.data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
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
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8A876] mx-auto"></div>
              <p className="mt-4 text-gray-600">Načítání ceníku...</p>
            </div>
          ) : (
            kategorie.map(kat => (
              <div key={kat.id} className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#B8A876] text-white p-6">
                  <h2 className="text-2xl font-bold">{kat.nazev}</h2>
                  {kat.popis && <p className="text-sm opacity-90 mt-1">{kat.popis}</p>}
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {kat.sluzby.map(sluzba => (
                      <div key={sluzba.id} className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                          <span>{sluzba.nazev}</span>
                          <span className="font-semibold">{sluzba.cenaTopStylist} Kč</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}

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
          <a href="/online-rezervace" className="inline-block bg-[#B8A876] hover:bg-[#A39566] text-white font-bold py-3 px-8 transition-colors">
            REZERVOVAT ONLINE
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}