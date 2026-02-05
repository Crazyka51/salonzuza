import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Vkládám ceník do databáze...')

  // Nejprve smažeme staré kategorie a služby
  await prisma.sluzba.deleteMany({})
  await prisma.kategorieSluzeb.deleteMany({})
  console.log('🗑️  Smazány staré kategorie a služby')

  // Vytvoříme nové kategorie podle skutečného ceníku
  const strih = await prisma.kategorieSluzeb.create({
    data: { id: 1, nazev: 'STŘIH', popis: 'poradenství, mytí, střih, foukaná a závěrečný styling', poradi: 1 }
  })
  console.log('✅ Kategorie: STŘIH')

  const barveni = await prisma.kategorieSluzeb.create({
    data: { id: 2, nazev: 'BARVENÍ', popis: null, poradi: 2 }
  })
  console.log('✅ Kategorie: BARVENÍ')

  const melirovani = await prisma.kategorieSluzeb.create({
    data: { id: 3, nazev: 'MELÍROVÁNÍ', popis: null, poradi: 3 }
  })
  console.log('✅ Kategorie: MELÍROVÁNÍ')

  const zesvetlen = await prisma.kategorieSluzeb.create({
    data: { id: 4, nazev: 'ZESVĚTLOVÁNÍ', popis: null, poradi: 4 }
  })
  console.log('✅ Kategorie: ZESVĚTLOVÁNÍ')

  const dalsi = await prisma.kategorieSluzeb.create({
    data: { id: 5, nazev: 'DALŠÍ SLUŽBY', popis: null, poradi: 5 }
  })
  console.log('✅ Kategorie: DALŠÍ SLUŽBY')

  // STŘIH služby
  const strihSluby = [
    { nazev: 'Krátké vlasy', cena: 520, dobaTrvani: 60 },
    { nazev: 'Polodlouhé vlasy', cena: 680, dobaTrvani: 75 },
    { nazev: 'Dlouhé vlasy', cena: 850, dobaTrvani: 90 },
    { nazev: 'Extra dlouhé vlasy', cena: 1130, dobaTrvani: 120 },
    { nazev: 'Pánské střihy', cena: 350, dobaTrvani: 45, popis: '250,- — 450,- Kč' },
    { nazev: 'Dětské střihy', cena: 220, dobaTrvani: 30 }
  ]

  for (const sluzba of strihSluby) {
    await prisma.sluzba.create({
      data: {
        nazev: sluzba.nazev,
        popis: sluzba.popis || null,
        kategorieId: strih.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      }
    })
    console.log(`  ✅ ${sluzba.nazev} - ${sluzba.cena} Kč`)
  }

  // BARVENÍ služby
  const barveniSluby = [
    { nazev: 'Krátké vlasy a odrost', cena: 550, dobaTrvani: 90 },
    { nazev: 'Polodlouhé vlasy', cena: 760, dobaTrvani: 120 },
    { nazev: 'Dlouhé vlasy', cena: 940, dobaTrvani: 150 },
    { nazev: 'Přeliv', cena: 525, dobaTrvani: 60, popis: '350,- — 700,- Kč' }
  ]

  for (const sluzba of barveniSluby) {
    await prisma.sluzba.create({
      data: {
        nazev: sluzba.nazev,
        popis: sluzba.popis || null,
        kategorieId: barveni.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      }
    })
    console.log(`  ✅ ${sluzba.nazev} - ${sluzba.cena} Kč`)
  }

  // MELÍROVÁNÍ služby
  const melirovaniSluby = [
    { nazev: 'Klasický melír', cena: 2350, dobaTrvani: 150, popis: '700,- — 4 000,- Kč' },
    { nazev: '1 ks folie do účesu (krátká)', cena: 100, dobaTrvani: 15 },
    { nazev: '1 ks folie do účesu (dlouhá)', cena: 180, dobaTrvani: 20 }
  ]

  for (const sluzba of melirovaniSluby) {
    await prisma.sluzba.create({
      data: {
        nazev: sluzba.nazev,
        popis: sluzba.popis || null,
        kategorieId: melirovani.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      }
    })
    console.log(`  ✅ ${sluzba.nazev} - ${sluzba.cena} Kč`)
  }

  // ZESVĚTLOVÁNÍ služby
  const zesvetneniSluby = [
    { nazev: 'Zesvětlování', cena: 3750, dobaTrvani: 180, popis: '500,- — 7 000,- Kč' },
    { nazev: 'Ombré, Airouch, Micromelír', cena: 2600, dobaTrvani: 150, popis: '1 200,- — 4 000,- Kč' },
    { nazev: 'Nadstandardní péče PLEX, PRO-FORCE', cena: 300, dobaTrvani: 30, popis: '250,- — 350,- Kč' }
  ]

  for (const sluzba of zesvetneniSluby) {
    await prisma.sluzba.create({
      data: {
        nazev: sluzba.nazev,
        popis: sluzba.popis || null,
        kategorieId: zesvetlen.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      }
    })
    console.log(`  ✅ ${sluzba.nazev} - ${sluzba.cena} Kč`)
  }

  // DALŠÍ SLUŽBY
  const dalsiSluby = [
    { nazev: 'Svatební a společenské účesy', cena: 3075, dobaTrvani: 120, popis: '650,- — 5 500,- Kč' },
    { nazev: 'Ošetření vlasů Smoothing systém', cena: 2400, dobaTrvani: 150, popis: '1 300,- — 3 500,- Kč' }
  ]

  for (const sluzba of dalsiSluby) {
    await prisma.sluzba.create({
      data: {
        nazev: sluzba.nazev,
        popis: sluzba.popis || null,
        kategorieId: dalsi.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      }
    })
    console.log(`  ✅ ${sluzba.nazev} - ${sluzba.cena} Kč`)
  }

  console.log('✨ Hotovo! Všechny položky ceníku byly vloženy do databáze.')
}

main()
  .catch((e) => {
    console.error('❌ Chyba:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
