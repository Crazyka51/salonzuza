// Script pro vložení obsahu stránky ceník do databáze
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const cenikObsah = [
  { klicObsahu: 'cenik_hero_nadpis', obsah: 'CENÍK SLUŽEB', kategorie: 'cenik' },
  { klicObsahu: 'cenik_hero_popis', obsah: 'Transparentní ceny za profesionální služby', kategorie: 'cenik' },
  { klicObsahu: 'cenik_loading_text', obsah: 'Načítání ceníku...', kategorie: 'cenik' },
  { klicObsahu: 'cenik_poznamka_text', obsah: 'Ceny se mohou lišit v závislosti na délce a struktuře vlasů.', kategorie: 'cenik' },
  { klicObsahu: 'cenik_poznamka_kontakt', obsah: 'Pro přesnou cenovou nabídku nás kontaktujte nebo si domluvte konzultaci zdarma.', kategorie: 'cenik' },
  { klicObsahu: 'cenik_cta_nadpis', obsah: 'Chcete si rezervovat termín?', kategorie: 'cenik' },
  { klicObsahu: 'cenik_cta_popis', obsah: 'Využijte naši online rezervaci nebo nás kontaktujte přímo', kategorie: 'cenik' },
  { klicObsahu: 'cenik_cta_tlacitko', obsah: 'REZERVOVAT ONLINE', kategorie: 'cenik' },
]

async function main() {
  console.log('🔄 Vkládám obsah pro stránku ceník...')

  for (const item of cenikObsah) {
    try {
      await prisma.obsahStranky.upsert({
        where: {
          klicObsahu: item.klicObsahu
        },
        update: {
          obsah: item.obsah,
          kategorie: item.kategorie
        },
        create: {
          ...item,
          typ: 'text',
          jeAktivni: true
        }
      })
      console.log(`✅ ${item.klicObsahu}`)
    } catch (error) {
      console.error(`❌ Chyba při vkládání ${item.klicObsahu}:`, error)
    }
  }

  console.log('✨ Hotovo!')
}

main()
  .catch((e) => {
    console.error('Chyba:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
