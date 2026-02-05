import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Vkládám ceník do databáze...')

  // Nejprve vytvoříme kategorie
  const damske = await prisma.kategorieSluzeb.upsert({
    where: { id: 1 },
    update: { nazev: 'Dámské kadeřnictví', popis: 'Kompletní péče o dámské vlasy', poradi: 1 },
    create: { id: 1, nazev: 'Dámské kadeřnictví', popis: 'Kompletní péče o dámské vlasy', poradi: 1 }
  })
  console.log('✅ Kategorie: Dámské kadeřnictví')

  const panske = await prisma.kategorieSluzeb.upsert({
    where: { id: 2 },
    update: { nazev: 'Pánské kadeřnictví', popis: 'Střihy a úpravy pro pány', poradi: 2 },
    create: { id: 2, nazev: 'Pánské kadeřnictví', popis: 'Střihy a úpravy pro pány', poradi: 2 }
  })
  console.log('✅ Kategorie: Pánské kadeřnictví')

  const barveni = await prisma.kategorieSluzeb.upsert({
    where: { id: 3 },
    update: { nazev: 'Barvení vlasů', popis: 'Profesionální barvení a melíry', poradi: 3 },
    create: { id: 3, nazev: 'Barvení vlasů', popis: 'Profesionální barvení a melíry', poradi: 3 }
  })
  console.log('✅ Kategorie: Barvení vlasů')

  const kosmetika = await prisma.kategorieSluzeb.upsert({
    where: { id: 4 },
    update: { nazev: 'Kosmetické služby', popis: 'Péče o pleť a obočí', poradi: 4 },
    create: { id: 4, nazev: 'Kosmetické služby', popis: 'Péče o pleť a obočí', poradi: 4 }
  })
  console.log('✅ Kategorie: Kosmetické služby')

  // Dámské kadeřnictví služby
  const damskeSluby = [
    { nazev: 'Mytí + foukaná', cena: 450, dobaTrvani: 45 },
    { nazev: 'Střih + mytí + foukaná', cena: 650, dobaTrvani: 60 },
    { nazev: 'Střih + barvení + foukaná', cena: 1200, dobaTrvani: 120 },
    { nazev: 'Melírování + tónování', cena: 1400, dobaTrvani: 150 },
    { nazev: 'Svatební účes', cena: 800, dobaTrvani: 90 },
    { nazev: 'Společenský účes', cena: 600, dobaTrvani: 60 },
    { nazev: 'Úprava obočí', cena: 200, dobaTrvani: 15 },
    { nazev: 'Keratinová kúra', cena: 2500, dobaTrvani: 180 }
  ]

  for (const sluzba of damskeSluby) {
    await prisma.sluzba.upsert({
      where: { id: damskeSluby.indexOf(sluzba) + 1 },
      update: {
        nazev: sluzba.nazev,
        kategorieId: damske.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      },
      create: {
        nazev: sluzba.nazev,
        kategorieId: damske.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      }
    })
    console.log(`  ✅ ${sluzba.nazev} - ${sluzba.cena} Kč`)
  }

  // Pánské kadeřnictví služby
  const panskeSluby = [
    { nazev: 'Mytí + střih + foukaná', cena: 450, dobaTrvani: 45 },
    { nazev: 'Klasický střih', cena: 350, dobaTrvani: 30 },
    { nazev: 'Moderní střih', cena: 400, dobaTrvani: 40 },
    { nazev: 'Úprava vousů', cena: 200, dobaTrvani: 20 },
    { nazev: 'Oholení', cena: 250, dobaTrvani: 30 },
    { nazev: 'Kompletní služba', cena: 600, dobaTrvani: 60 }
  ]

  for (const sluzba of panskeSluby) {
    await prisma.sluzba.upsert({
      where: { id: damskeSluby.length + panskeSluby.indexOf(sluzba) + 1 },
      update: {
        nazev: sluzba.nazev,
        kategorieId: panske.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      },
      create: {
        nazev: sluzba.nazev,
        kategorieId: panske.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      }
    })
    console.log(`  ✅ ${sluzba.nazev} - ${sluzba.cena} Kč`)
  }

  // Barvení vlasů služby
  const barveniSluby = [
    { nazev: 'Celobarvení krátké vlasy', cena: 800, dobaTrvani: 90 },
    { nazev: 'Celobarvení dlouhé vlasy', cena: 1200, dobaTrvani: 120 },
    { nazev: 'Melírování částečné', cena: 900, dobaTrvani: 90 },
    { nazev: 'Melírování kompletní', cena: 1400, dobaTrvani: 150 },
    { nazev: 'Balayage', cena: 1600, dobaTrvani: 180 },
    { nazev: 'Tónování', cena: 400, dobaTrvani: 45 }
  ]

  for (const sluzba of barveniSluby) {
    await prisma.sluzba.upsert({
      where: { id: damskeSluby.length + panskeSluby.length + barveniSluby.indexOf(sluzba) + 1 },
      update: {
        nazev: sluzba.nazev,
        kategorieId: barveni.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      },
      create: {
        nazev: sluzba.nazev,
        kategorieId: barveni.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      }
    })
    console.log(`  ✅ ${sluzba.nazev} - ${sluzba.cena} Kč`)
  }

  // Kosmetické služby
  const kosmetikaSluby = [
    { nazev: 'Základní ošetření pleti', cena: 600, dobaTrvani: 60 },
    { nazev: 'Hloubkové čištění', cena: 800, dobaTrvani: 75 },
    { nazev: 'Hydratační ošetření', cena: 700, dobaTrvani: 60 },
    { nazev: 'Anti-age ošetření', cena: 900, dobaTrvani: 90 },
    { nazev: 'Úprava a barvení obočí', cena: 300, dobaTrvani: 30 },
    { nazev: 'Úprava řas', cena: 250, dobaTrvani: 20 }
  ]

  for (const sluzba of kosmetikaSluby) {
    await prisma.sluzba.upsert({
      where: { id: damskeSluby.length + panskeSluby.length + barveniSluby.length + kosmetikaSluby.indexOf(sluzba) + 1 },
      update: {
        nazev: sluzba.nazev,
        kategorieId: kosmetika.id,
        cenaTopStylist: sluzba.cena,
        cenaStylist: sluzba.cena,
        cenaJuniorStylist: sluzba.cena,
        dobaTrvaniMinuty: sluzba.dobaTrvani
      },
      create: {
        nazev: sluzba.nazev,
        kategorieId: kosmetika.id,
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
