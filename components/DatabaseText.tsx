// Komponenta pro zobrazení editovatelného obsahu z databáze
'use client'

import { useObsahPodleKlice } from '@/hooks/use-obsah-stranky'
import { TypObsahu } from '@/types/booking'

interface DatabaseTextProps {
  klic: string
  typ?: TypObsahu
  className?: string
  placeholder?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

export function DatabaseText({ 
  klic, 
  typ = 'text', 
  className = '', 
  placeholder = 'Načítá se...',
  as = 'p'
}: DatabaseTextProps) {
  const { obsah, nacitaSe, chyba } = useObsahPodleKlice(klic)

  if (nacitaSe) {
    const Component = as
    return <Component className={`animate-pulse bg-gray-200 rounded ${className}`}>
      {placeholder}
    </Component>
  }

  if (chyba || !obsah) {
    const Component = as
    return <Component className={`text-red-500 ${className}`}>
      {chyba || `Obsah s klíčem "${klic}" nenalezen`}
    </Component>
  }

  const Component = as

  // Renderování podle typu obsahu
  switch (typ) {
    case 'html':
      return (
        <Component 
          className={className}
          dangerouslySetInnerHTML={{ __html: obsah.hodnota }}
        />
      )
    
    case 'nadpis':
      return (
        <Component className={`font-bold ${className}`}>
          {obsah.hodnota}
        </Component>
      )
    
    case 'popis':
      return (
        <Component className={`text-gray-600 ${className}`}>
          {obsah.hodnota}
        </Component>
      )
    
    case 'tlacitko_text':
      return (
        <span className={className}>
          {obsah.hodnota}
        </span>
      )
    
    default:
      return (
        <Component className={className}>
          {obsah.hodnota}
        </Component>
      )
  }
}