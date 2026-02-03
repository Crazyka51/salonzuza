// Hlavní navigace podle skutečného webu Salon Zuza
'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [jeMobileMenuOtevrene, setJeMobileMenuOtevrene] = useState(false)

  return (
    <nav className="bg-white/98 backdrop-blur-md shadow-sm fixed w-full z-50 top-0 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black text-[#212121] tracking-[0.1em] uppercase">
              SALON ZUZA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              <Link 
                href="/sluzby" 
                className="text-[#212121] hover:text-[#B8A876] px-4 py-2 text-sm font-semibold tracking-[0.1em] transition-colors duration-200 uppercase"
              >
                SLUŽBY
              </Link>
              <span className="text-gray-300 text-lg">|</span>
              <Link 
                href="/cenik" 
                className="text-[#212121] hover:text-[#B8A876] px-4 py-2 text-sm font-semibold tracking-[0.1em] transition-colors duration-200 uppercase"
              >
                CENÍK
              </Link>
              <span className="text-gray-300 text-lg">|</span>
              <Link 
                href="/online-rezervace" 
                className="bg-[#B8A876] hover:bg-[#A39566] text-[#212121] px-6 py-3 ml-6 text-sm font-black tracking-[0.1em] transition-all duration-200 uppercase rounded-none"
              >
                ONLINE REZERVACE
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setJeMobileMenuOtevrene(!jeMobileMenuOtevrene)}
              className="text-[#333333] hover:text-[#B8A876] inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {jeMobileMenuOtevrene ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {jeMobileMenuOtevrene && (
          <div className="md:hidden">
            <div className="px-6 pt-4 pb-6 space-y-4 bg-white border-t border-gray-100">
              <Link 
                href="/sluzby" 
                className="text-[#212121] hover:text-[#B8A876] block py-3 text-base font-semibold tracking-[0.1em] uppercase transition-colors"
                onClick={() => setJeMobileMenuOtevrene(false)}
              >
                SLUŽBY
              </Link>
              <Link 
                href="/cenik" 
                className="text-[#212121] hover:text-[#B8A876] block py-3 text-base font-semibold tracking-[0.1em] uppercase transition-colors"
                onClick={() => setJeMobileMenuOtevrene(false)}
              >
                CENÍK
              </Link>
              <Link 
                href="/online-rezervace" 
                className="bg-[#B8A876] hover:bg-[#A39566] text-[#212121] block py-4 px-6 text-base font-black tracking-[0.1em] uppercase transition-all mt-4 text-center"
                onClick={() => setJeMobileMenuOtevrene(false)}
              >
                ONLINE REZERVACE
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}