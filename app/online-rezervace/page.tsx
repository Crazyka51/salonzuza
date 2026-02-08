'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/salon/Navbar'
import { Footer } from '@/components/salon/Footer'

interface Sluzba {
  id: number;
  nazev: string;
  dobaTrvaniMinuty: number;
  cenaStylist: number;
}

export default function OnlineRezervacePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dbSluzby, setDbSluzby] = useState<Sluzba[]>([])
  const [formData, setFormData] = useState({
    jmeno: '',
    prijmeni: '',
    email: '',
    telefon: '',
    datum: '',
    cas: '',
    sluzbaId: '',
    poznamka: ''
  })

  useEffect(() => {
    const fetchSluzby = async () => {
      try {
        const response = await fetch('/api/admin/sluzby')
        if (response.ok) {
          const data = await response.json()
          setDbSluzby(data.sluzby || [])
        }
      } catch (error) {
        console.error('Chyba při načítání služeb:', error)
      }
    }
    fetchSluzby()
  }, [])

  const casoveSloty = [
    '09:00', '09:45', '10:30', '11:15', '12:00', '12:45',
    '13:30', '14:15', '15:00', '15:45', '16:30', '17:15', '18:00'
  ]

  const calculateEndTime = (startTime: string, durationMinutes: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + durationMinutes
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.jmeno || !formData.prijmeni || !formData.email || !formData.telefon || 
          !formData.datum || !formData.cas || !formData.sluzbaId) {
        alert('Prosím vyplňte všechna povinná pole')
        setIsSubmitting(false)
        return
      }

      const vybranaSluzba = dbSluzby.find(s => s.id === Number(formData.sluzbaId))
      if (!vybranaSluzba) {
        alert('Vybraná služba nebyla nalezena')
        setIsSubmitting(false)
        return
      }

      const reservationData = {
        jmeno: formData.jmeno.trim(),
        prijmeni: formData.prijmeni.trim(),
        email: formData.email.trim(),
        telefon: formData.telefon.trim(),
        datum: formData.datum,
        casOd: formData.cas,
        casDo: calculateEndTime(formData.cas, vybranaSluzba.dobaTrvaniMinuty),
        sluzbaId: vybranaSluzba.id,
        poznamka: formData.poznamka || '',
        cena: vybranaSluzba.cenaStylist,
        zpusobPlatby: 'hotove',
        notifikaceEmail: true,
        notifikaceSms: false,
      }

      const response = await fetch('/api/rezervace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      })

      if (response.ok) {
        alert(' Rezervace byla úspěšně odeslána!')
        setFormData({
          jmeno: '', prijmeni: '', email: '', telefon: '',
          datum: '', cas: '', sluzbaId: '', poznamka: ''
        })
      } else {
        const errorData = await response.json()
        alert(` Chyba: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert(' Chyba při odesílání.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero sekce */}
      <section className="bg-linear-to-br from-[#B8A876] to-[#A39566] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-wide">
            ONLINE REZERVACE
          </h1>
          <p className="text-xl font-light opacity-90 leading-relaxed">
            Rezervujte si termín pohodlně online v našem salonu
          </p>
        </div>
      </section>

      {/* Rezervační formulář */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-[#333333] mb-4">
                Rezervace termínu
              </h2>
              <p className="text-[#555555]">
                Vyplňte formulář níže. Rezervace je okamžitě uložena v našem systému.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Osobní údaje */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="jmeno" className="block text-sm font-medium text-[#333333] mb-2">Jméno *</label>
                  <input
                    id="jmeno"
                    type="text"
                    required
                    value={formData.jmeno}
                    onChange={(e) => setFormData({...formData, jmeno: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    placeholder="Vaše jméno"
                    title="Jméno"
                  />
                </div>
                <div>
                  <label htmlFor="prijmeni" className="block text-sm font-medium text-[#333333] mb-2">Příjmení *</label>
                  <input
                    id="prijmeni"
                    type="text"
                    required
                    value={formData.prijmeni}
                    onChange={(e) => setFormData({...formData, prijmeni: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    placeholder="Vaše příjmení"
                    title="Příjmení"
                  />
                </div>
              </div>

              {/* Kontaktní údaje */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-2">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    placeholder="vas@email.cz"
                    title="Emailová adresa"
                  />
                </div>
                <div>
                  <label htmlFor="telefon" className="block text-sm font-medium text-[#333333] mb-2">Telefon *</label>
                  <input
                    id="telefon"
                    type="tel"
                    required
                    value={formData.telefon}
                    onChange={(e) => setFormData({...formData, telefon: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    placeholder="+420 123 456 789"
                    title="Telefonní číslo"
                  />
                </div>
              </div>

              {/* Služba */}
              <div>
                <label htmlFor="sluzbaId" className="block text-sm font-medium text-[#333333] mb-2">Služba *</label>
                <select
                  id="sluzbaId"
                  required
                  value={formData.sluzbaId}
                  onChange={(e) => setFormData({...formData, sluzbaId: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                  title="Výběr služby"
                >
                  <option value="">Vyberte službu</option>
                  {dbSluzby.map((sluzba) => (
                    <option key={sluzba.id} value={sluzba.id}>
                      {sluzba.nazev} ({sluzba.cenaStylist} Kč)
                    </option>
                  ))}
                </select>
              </div>

              {/* Datum a čas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="datum" className="block text-sm font-medium text-[#333333] mb-2">Datum *</label>
                  <input
                    id="datum"
                    type="date"
                    required
                    value={formData.datum}
                    onChange={(e) => setFormData({...formData, datum: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    title="Datum rezervace"
                  />
                </div>
                <div>
                  <label htmlFor="cas" className="block text-sm font-medium text-[#333333] mb-2">Čas *</label>
                  <select
                    id="cas"
                    required
                    value={formData.cas}
                    onChange={(e) => setFormData({...formData, cas: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    title="Čas rezervace"
                  >
                    <option value="">Vyberte čas</option>
                    {casoveSloty.map((cas) => (
                      <option key={cas} value={cas}>{cas}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Poznámka */}
              <div>
                <label htmlFor="poznamka" className="block text-sm font-medium text-[#333333] mb-2">Poznámka</label>
                <textarea
                  id="poznamka"
                  rows={4}
                  value={formData.poznamka}
                  onChange={(e) => setFormData({...formData, poznamka: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                  placeholder="Jakékoli speciální požadavky..."
                  title="Poznámka k rezervaci"
                />
              </div>

              {/* Odeslání */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#B8A876] hover:bg-[#A39566] text-white font-bold py-4 px-12 text-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'ODESÍLÁM...' : 'ODESLAT REZERVACI'}
                </button>
              </div>
            </form>

            {/* Informace */}
            <div className="mt-8 p-4 bg-[#F5F5F5] rounded-lg">
              <h3 className="font-semibold text-[#333333] mb-2">Důležité informace:</h3>
              <ul className="text-sm text-[#555555] space-y-1">
                <li> Rezervace je v našem systému okamžitě evidována</li>
                <li> V případě změny nás kontaktujte nejméně 24 hodin předem</li>
                
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
