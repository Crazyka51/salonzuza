// React hook pro načítání obsahu stránek
'use client'

import { useState, useEffect } from 'react'
import { IObsahStranky, IApiResponse } from '@/types/booking'

/**
 * Hook pro načítání obsahu konkrétní stránky
 */
export function useObsahStranky(stranka: string) {
  const [obsah, setObsah] = useState<IObsahStranky[]>([])
  const [nacitaSe, setNacitaSe] = useState(true)
  const [chyba, setChyba] = useState<string | null>(null)

  useEffect(() => {
    async function nacistObsah() {
      try {
        setNacitaSe(true)
        setChyba(null)

        const response = await fetch(`/api/cms/page-content?stranka=${stranka}`)
        const result: IApiResponse<IObsahStranky[]> = await response.json()

        if (result.uspech && result.data) {
          setObsah(result.data)
        } else {
          setChyba(result.chyba || 'Chyba při načítání obsahu')
        }
      } catch (error) {
        setChyba('Chyba při načítání obsahu')
        console.error('Chyba useObsahStranky:', error)
      } finally {
        setNacitaSe(false)
      }
    }

    if (stranka) {
      nacistObsah()
    }
  }, [stranka])

  return { obsah, nacitaSe, chyba }
}

/**
 * Hook pro načítání konkrétního obsahu podle klíče
 */
export function useObsahPodleKlice(klic: string) {
  const [obsah, setObsah] = useState<IObsahStranky | null>(null)
  const [nacitaSe, setNacitaSe] = useState(true)
  const [chyba, setChyba] = useState<string | null>(null)

  useEffect(() => {
    async function nacistObsah() {
      try {
        setNacitaSe(true)
        setChyba(null)

        const response = await fetch(`/api/cms/page-content?klic=${klic}`)
        const result: IApiResponse<IObsahStranky> = await response.json()

        if (result.uspech && result.data) {
          setObsah(result.data)
        } else {
          setChyba(result.chyba || 'Obsah nenalezen')
        }
      } catch (error) {
        setChyba('Chyba při načítání obsahu')
        console.error('Chyba useObsahPodleKlice:', error)
      } finally {
        setNacitaSe(false)
      }
    }

    if (klic) {
      nacistObsah()
    }
  }, [klic])

  return { obsah, nacitaSe, chyba }
}

/**
 * Hook pro admin - správa obsahu s možností editace
 */
export function useAdminObsah(stranka?: string) {
  const [obsah, setObsah] = useState<IObsahStranky[]>([])
  const [nacitaSe, setNacitaSe] = useState(true)
  const [chyba, setChyba] = useState<string | null>(null)

  const nacistObsah = async () => {
    try {
      setNacitaSe(true)
      setChyba(null)

      const url = stranka 
        ? `/api/admin/page-content?stranka=${stranka}`
        : '/api/admin/page-content'
      
      const response = await fetch(url)
      const result: IApiResponse<IObsahStranky[]> = await response.json()

      if (result.uspech && result.data) {
        setObsah(result.data)
      } else {
        setChyba(result.chyba || 'Chyba při načítání obsahu')
      }
    } catch (error) {
      setChyba('Chyba při načítání obsahu')
      console.error('Chyba useAdminObsah:', error)
    } finally {
      setNacitaSe(false)
    }
  }

  const aktualizovatObsah = async (klic: string, hodnota: string) => {
    try {
      const response = await fetch(`/api/admin/page-content?klic=${klic}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hodnota })
      })
      
      const result = await response.json()
      
      if (result.uspech) {
        // Aktualizovat lokální stav
        setObsah(prev => prev.map(item => 
          item.klic === klic 
            ? { ...item, hodnota, upraveno: new Date() }
            : item
        ))
      } else {
        throw new Error(result.chyba)
      }
      
      return result
    } catch (error) {
      console.error('Chyba při aktualizaci:', error)
      throw error
    }
  }

  const vytvorit = async (data: Omit<IObsahStranky, '_id' | 'vytvořeno' | 'upraveno'>) => {
    try {
      const response = await fetch('/api/admin/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (result.uspech) {
        await nacistObsah() // Znovu načíst data
      }
      
      return result
    } catch (error) {
      console.error('Chyba při vytváření:', error)
      throw error
    }
  }

  const smazat = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/page-content?id=${id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      
      if (result.uspech) {
        await nacistObsah() // Znovu načíst data
      }
      
      return result
    } catch (error) {
      console.error('Chyba při mazání:', error)
      throw error
    }
  }

  useEffect(() => {
    nacistObsah()
  }, [stranka])

  return { 
    obsah, 
    nacitaSe, 
    chyba, 
    nacistObsah,
    aktualizovatObsah, 
    vytvorit, 
    smazat 
  }
}