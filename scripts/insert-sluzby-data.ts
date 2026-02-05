import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Načíst .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Vkládám obsah služeb do databáze...')

  // Smazat staré záznamy před vložením nových
  await prisma.obsahStranky.deleteMany({
    where: {
      kategorie: 'sluzby'
    }
  })
  console.log('🗑️  Staré záznamy služeb smazány')

  const obsah = [
    // Hero sekce
    { klic: 'sluzby_hero_nadpis', hodnota: 'NAŠE SLUŽBY', typ: 'nadpis', stranka: 'sluzby', poradi: 1, popis: 'Nadpis hero sekce na stránce služeb' },
    { klic: 'sluzby_hero_podnadpis', hodnota: 'Profesionální kadeřnické služby s kvalitní péčí', typ: 'popis', stranka: 'sluzby', poradi: 2, popis: 'Podnadpis v hero sekci služeb' },
    
    // Úvodní text
    { klic: 'sluzby_uvod', hodnota: 'V našem salonu nabízíme profesionální kadeřnické služby pro ženy, muže i děti. Pracujeme s kvalitními produkty značek Framesi a LABEL.M, abychom vašim vlasům dopřáli tu nejlepší péči.', typ: 'text', stranka: 'sluzby', poradi: 3, popis: 'Úvodní text na stránce služeb' },
    
    // Střih
    { klic: 'sluzby_strih_nadpis', hodnota: 'Střih', typ: 'nadpis', stranka: 'sluzby', poradi: 10, popis: 'Nadpis sekce Střih' },
    { klic: 'sluzby_strih_popis', hodnota: 'Krátké vlasy – Precizní střih a styling pro svěží a moderní vzhled. Polodlouhé vlasy – Profesionální úprava, která podtrhne přirozenou krásu. Dlouhé vlasy – Perfektní tvar a péče pro zdravé a upravené vlasy. Extra dlouhé vlasy – Individuální střih a styling pro maximální efekt. Pánské střihy – Klasické i moderní účesy pro každého muže. Dětské střihy – Šetrný přístup a trendy účesy pro nejmenší.', typ: 'text', stranka: 'sluzby', poradi: 11, popis: 'Popis služeb Střih' },
    
    // Barvení vlasů
    { klic: 'sluzby_barveni_nadpis', hodnota: 'Barvení vlasů', typ: 'nadpis', stranka: 'sluzby', poradi: 20, popis: 'Nadpis sekce Barvení vlasů' },
    { klic: 'sluzby_barveni_popis', hodnota: 'Krátké vlasy a odrost – Dokonalé sjednocení barvy pro přirozený vzhled. Polodlouhé vlasy – Profesionální barvení pro hloubku a lesk. Dlouhé vlasy – Intenzivní a dlouhotrvající barva pro krásné vlasy. Přeliv – Jemné tónování pro osvěžení a sjednocení barvy.', typ: 'text', stranka: 'sluzby', poradi: 21, popis: 'Popis služeb Barvení vlasů' },
    
    // Melír
    { klic: 'sluzby_melir_nadpis', hodnota: 'Melír', typ: 'nadpis', stranka: 'sluzby', poradi: 30, popis: 'Nadpis sekce Melír' },
    { klic: 'sluzby_melir_popis', hodnota: 'Klasický melír – Přirozené prosvětlení vlasů pro svěží vzhled. 1 ks fólie do účesu (krátká) – Jemný melír pro decentní zvýraznění. 1 ks fólie do účesu (dlouhá) – Efektní melír pro větší kontrast a hloubku.', typ: 'text', stranka: 'sluzby', poradi: 31, popis: 'Popis služeb Melír' },
    
    // Svatební a společenské účesy
    { klic: 'sluzby_svatebni_nadpis', hodnota: 'Svatební a společenské účesy', typ: 'nadpis', stranka: 'sluzby', poradi: 40, popis: 'Nadpis sekce Svatební účesy' },
    { klic: 'sluzby_svatebni_popis', hodnota: 'Připravujeme dokonalé svatební a společenské účesy, které podtrhnou vaši krásu a vydrží celý den. Od romantických vln přes elegantní drdoly až po složité copánkové kreace – pomůžeme vám vytvořit účes, který se perfektně hodí k vašemu stylu a šatům. Rezervujte si svou konzultaci a nechte si vytvořit účes na míru!', typ: 'text', stranka: 'sluzby', poradi: 41, popis: 'Popis služeb Svatební účesy' },
    
    // Regenerace a ošetření vlasů
    { klic: 'sluzby_regenerace_nadpis', hodnota: 'Regenerace a ošetření vlasů', typ: 'nadpis', stranka: 'sluzby', poradi: 50, popis: 'Nadpis sekce Regenerace' },
    { klic: 'sluzby_regenerace_popis', hodnota: 'Dopřejte svým vlasům hloubkovou regeneraci s profesionální péčí Framesi a LABEL.M. Naše ošetření obnovují poškozené vlasy, posilují jejich strukturu a dodávají jim intenzivní hydrataci. Vyzkoušejte Smoothing systém pro dokonale hladké a zdravé vlasy bez krepatění. Rezervujte si svůj termín a nechte své vlasy rozmazlovat!', typ: 'text', stranka: 'sluzby', poradi: 51, popis: 'Popis služeb Regenerace' },
    
    // Zesvětlování a speciální techniky
    { klic: 'sluzby_zesvetlen_nadpis', hodnota: 'Zesvětlování a speciální techniky', typ: 'nadpis', stranka: 'sluzby', poradi: 60, popis: 'Nadpis sekce Zesvětlování' },
    { klic: 'sluzby_zesvetlen_popis', hodnota: 'Oživte své vlasy profesionálním zesvětlením nebo moderními technikami, jako je Ombré, AirTouch nebo Micromelír. Dosáhněte přirozeného přechodu barev, jemného prosvětlení nebo odvážnějšího efektu blond tónů. Naše zesvětlovací metody jsou šetrné k vlasům a zajišťují dlouhotrvající a zdravý vzhled.', typ: 'text', stranka: 'sluzby', poradi: 61, popis: 'Popis služeb Zesvětlování' },
    
    // Nadstandardní péče
    { klic: 'sluzby_plex_nadpis', hodnota: 'Nadstandardní péče PLEX, PRO-FORCE', typ: 'nadpis', stranka: 'sluzby', poradi: 70, popis: 'Nadpis sekce PLEX péče' },
    { klic: 'sluzby_plex_popis', hodnota: 'Chcete svým vlasům dopřát luxusní péči? Naše nadstandardní ošetření PLEX a PRO-FORCE posilují vlasy, chrání je před poškozením a zajišťují jejich zdravý vzhled. Ideální pro regeneraci po barvení nebo jako prevence před lámáním a třepením konečků. Objednejte si VIP péči pro vaše vlasy ještě dnes!', typ: 'text', stranka: 'sluzby', poradi: 71, popis: 'Popis služeb PLEX péče' },
    
    // CTA sekce
    { klic: 'sluzby_cta_nadpis', hodnota: 'Zaujala vás některá služba?', typ: 'nadpis', stranka: 'sluzby', poradi: 100, popis: 'Nadpis CTA sekce na stránce služeb' },
    { klic: 'sluzby_cta_popis', hodnota: 'Rezervujte si termín online nebo se podívejte na náš ceník', typ: 'text', stranka: 'sluzby', poradi: 101, popis: 'Popis CTA sekce na stránce služeb' }
  ]

  for (const item of obsah) {
    await prisma.obsahStranky.create({
      data: {
        klicObsahu: item.klic,
        obsah: item.hodnota,
        typ: item.typ,
        kategorie: item.stranka,
        popis: item.popis,
        poradoveId: item.poradi
      }
    })
    console.log(`✅ ${item.klic}`)
  }

  console.log('✨ Hotovo! Všechny texty služeb byly vloženy do databáze.')
}

main()
  .catch((e) => {
    console.error('❌ Chyba:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
