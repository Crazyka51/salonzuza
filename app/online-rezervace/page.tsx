// Online rezervace podle skutečného webu  
'use client'

import { useState } from 'react'
import { Navbar } from '@/components/salon/Navbar'
import { Footer } from '@/components/salon/Footer'

export default function OnlineRezervacePage() {
  const [formData, setFormData] = useState({
    jmeno: '',
    prijmeni: '',
    email: '',
    telefon: '',
    datum: '',
    cas: '',
    sluzba: '',
    poznamka: ''
  })

  const sluzby = [
    'Dámský střih',
    'Pánský střih', 
    'Barvení vlasů',
    'Melírování',
    'Svatební účes',
    'Společenský účes',
    'Kosmetické ošetření',
    'Keratinová kúra',
    'Konzultace'
  ]

  const casoveSloty = [
    '9:00', '9:45', '10:30', '11:15', '12:00', '12:45',
    '13:30', '14:15', '15:00', '15:45', '16:30', '17:15', '18:00'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Zde by byla logika odeslání rezervace
    alert('Rezervace byla odeslána! Brzy vás budeme kontaktovat.')
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero sekce */}
      <section className="bg-gradient-to-br from-[#B8A876] to-[#A39566] text-white py-24 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-wide">
            ONLINE REZERVACE
          </h1>
          <p className="text-xl font-light opacity-90 leading-relaxed">
            Rezervujte si termín pohodlně online
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
                Vyplňte formulář a my vás brzy kontaktujeme pro potvrzení termínu
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Osobní údaje */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Jméno *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.jmeno}
                    onChange={(e) => setFormData({...formData, jmeno: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    placeholder="Vaše jméno"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Příjmení *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.prijmeni}
                    onChange={(e) => setFormData({...formData, prijmeni: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    placeholder="Vaše příjmení"
                  />
                </div>
              </div>

              {/* Kontaktní údaje */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    placeholder="vas@email.cz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Telefon *
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={formData.telefon}
                    onChange={(e) => setFormData({...formData, telefon: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                    placeholder="+420 123 456 789"
                  />
                </div>
              </div>

              {/* Služba */}
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Služba *
                </label>
                <select 
                  required
                  title="Vyberte požadovanou službu"
                  value={formData.sluzba}
                  onChange={(e) => setFormData({...formData, sluzba: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                >
                  <option value="">Vyberte službu</option>
                  {sluzby.map((sluzba) => (
                    <option key={sluzba} value={sluzba}>
                      {sluzba}
                    </option>
                  ))}
                </select>
              </div>

              {/* Datum a čas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Datum *
                  </label>
                  <input 
                    type="date" 
                    required
                    title="Vyberte požadovaný datum rezervace"
                    value={formData.datum}
                    onChange={(e) => setFormData({...formData, datum: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Čas *
                  </label>
                  <select 
                    required
                    title="Vyberte požadovaný čas rezervace"
                    value={formData.cas}
                    onChange={(e) => setFormData({...formData, cas: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                  >
                    <option value="">Vyberte čas</option>
                    {casoveSloty.map((cas) => (
                      <option key={cas} value={cas}>
                        {cas}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Poznámka */}
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Poznámka
                </label>
                <textarea 
                  rows={4}
                  value={formData.poznamka}
                  onChange={(e) => setFormData({...formData, poznamka: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8A876]"
                  placeholder="Jakékoli speciální požadavky nebo poznámky..."
                />
              </div>

              {/* Odeslání */}
              <div className="text-center pt-6">
                <button 
                  type="submit"
                  className="bg-[#B8A876] hover:bg-[#A39566] text-white font-bold py-4 px-12 text-lg transition-colors"
                >
                  ODESLAT REZERVACI
                </button>
              </div>

            </form>

            {/* Informace */}
            <div className="mt-8 p-4 bg-[#F5F5F5] rounded-lg">
              <h3 className="font-semibold text-[#333333] mb-2">Důležité informace:</h3>
              <ul className="text-sm text-[#555555] space-y-1">
                <li>• Rezervace není potvrzena dokud vás nekontaktujeme</li>
                <li>• V případě změny nebo zrušení nás kontaktujte nejméně 24 hodin předem</li>
                <li>• Pro první návštěvu doporučujeme rezervaci konzultace</li>
                <li>• V sobotu je salon otevřen pouze do 14:00</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}