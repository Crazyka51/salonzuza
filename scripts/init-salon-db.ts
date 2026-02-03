// Inicializace databáze pro Salon Zuza portfolio
import { ObsahStrankyModel } from '../models/ObsahStrankyModel'

const basicContent = [
  // Hero sekce
  {
    klicObsahu: 'hero_nadpis',
    nazev: 'Hlavní nadpis',
    obsah: 'VÍTEJTE V SALONU ZUZA',
    kategorie: 'hero',
    popis: 'Hlavní nadpis na homepage'
  },
  {
    klicObsahu: 'hero_podnadpis', 
    nazev: 'Podnadpis hero sekce',
    obsah: 'PÉČE O VAŠE VLASY PODLE VAŠICH PŘEDSTAV',
    kategorie: 'hero',
    popis: 'Podnadpis v hero sekci'
  },
  {
    klicObsahu: 'hero_popis',
    nazev: 'Popis hero sekce', 
    obsah: 'Poskytujeme profesionální kadeřnické služby na míru. Dopřejte si relaxaci v příjemném prostředí a nechte své vlasy ožít díky odborné péči a špičkovým produktům.',
    kategorie: 'hero',
    popis: 'Kratší popis v hero sekci'
  },
  
  // Sekce KVALITA
  {
    klicObsahu: 'kvalita_nadpis',
    nazev: 'Nadpis sekce Kvalita',
    obsah: 'KVALITA',
    kategorie: 'kvalita',
    popis: 'Hlavní nadpis sekce kvalita'
  },
  {
    klicObsahu: 'kvalita_podnadpis',
    nazev: 'Podnadpis sekce Kvalita',
    obsah: 'PRVOTŘÍDNÍ PÉČE O VAŠE VLASY',
    kategorie: 'kvalita',
    popis: 'Podnadpis sekce kvalita'
  },
  {
    klicObsahu: 'kvalita_text1',
    nazev: 'První text sekce Kvalita',
    obsah: 'Vlasová péče je více než jen střih nebo barva – je to umění. Sledujeme nejnovější trendy a využíváme kvalitní přípravky, které chrání a vyživují vaše vlasy. Přesný střih, profesionální barvení a precizní styling – to je standard v našem salonu.',
    kategorie: 'kvalita',
    popis: 'První odstavec textu o kvalitě'
  },
  {
    klicObsahu: 'kvalita_text2',
    nazev: 'Druhý text sekce Kvalita',
    obsah: 'Každý klient je jedinečný a my dbáme na individuální přístup. Společně najdeme styl, který vám bude dokonale slušet a zvýrazní vaši osobnost.',
    kategorie: 'kvalita',
    popis: 'Druhý odstavec textu o kvalitě'
  },
  {
    klicObsahu: 'kvalita_tlacitko',
    nazev: 'Tlačítko sekce Kvalita',
    obsah: 'VÍCE INFORMACÍ',
    kategorie: 'kvalita',
    popis: 'Text tlačítka v sekci kvalita'
  },
  
  // Sekce PÉČE
  {
    klicObsahu: 'pece_nadpis',
    nazev: 'Nadpis sekce Péče',
    obsah: 'PÉČE',
    kategorie: 'pece',
    popis: 'Hlavní nadpis sekce péče'
  },
  {
    klicObsahu: 'pece_podnadpis',
    nazev: 'Podnadpis sekce Péče',
    obsah: 'ZKUŠENOSTI A KVALITA',
    kategorie: 'pece',
    popis: 'Podnadpis sekce péče'
  },
  {
    klicObsahu: 'pece_text1',
    nazev: 'První text sekce Péče',
    obsah: 'S více než 10 lety zkušeností víme, jak o vaše vlasy správně pečovat. Používáme moderní techniky a exkluzivní produkty, abychom zajistili maximální kvalitu.',
    kategorie: 'pece',
    popis: 'První odstavec textu o péči'
  },
  {
    klicObsahu: 'pece_text2',
    nazev: 'Druhý text sekce Péče',
    obsah: 'Ať už hledáte jemnou změnu nebo výraznou proměnu, u nás jste v dobrých rukou. Vytváříme účesy, které podtrhnou vaši přirozenou krásu a sebevědomí.',
    kategorie: 'pece',
    popis: 'Druhý odstavec textu o péči'
  },
  {
    klicObsahu: 'pece_tlacitko',
    nazev: 'Tlačítko sekce Péče',
    obsah: 'VÍCE INFORMACÍ',
    kategorie: 'pece',
    popis: 'Text tlačítka v sekci péče'
  },
  
  // CTA tlačítko
  {
    klicObsahu: 'cta_tlacitko',
    nazev: 'CTA tlačítko',
    obsah: 'VYBERTE SI SVŮJ TERMÍN ONLINE',
    kategorie: 'cta',
    popis: 'Text hlavního CTA tlačítka'
  }
]

async function init() {
  try {
    console.log('🚀 Inicializuji databázi pro Salon Zuza...')
    
    for (const item of basicContent) {
      try {
        await ObsahStrankyModel.create(item)
        console.log(`✅ Vytvořen obsah: ${item.klicObsahu}`)
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`⚠️  Obsah ${item.klicObsahu} již existuje`)
        } else {
          console.error(`❌ Chyba při vytváření ${item.klicObsahu}:`, error)
        }
      }
    }
    
    console.log('✨ Databáze úspěšně inicializována!')
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Chyba při inicializaci databáze:', error)
    process.exit(1)
  }
}

init()