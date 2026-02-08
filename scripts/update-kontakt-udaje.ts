import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🔄 Aktualizace kontaktních údajů v databázi...')

    const kontaktyUpdates = [
      { klic: 'kontakt_adresa_ulice', hodnota: 'Fričova 1240' },
      { klic: 'kontakt_adresa_mesto', hodnota: 'Dobříš, 263 01' },
      { klic: 'kontakt_telefon', hodnota: '+420 724 311 258' },
      { klic: 'kontakt_email', hodnota: 'zuzka@salon-zuza.cz' },
    ]

    let updated = 0
    let created = 0

    for (const update of kontaktyUpdates) {
      const existing = await prisma.obsahStranky.findUnique({
        where: { klicObsahu: update.klic }
      })

      if (existing) {
        await prisma.obsahStranky.update({
          where: { klicObsahu: update.klic },
          data: { obsah: update.hodnota }
        })
        console.log(`  ✅ Aktualizováno: ${update.klic} → ${update.hodnota}`)
        updated++
      } else {
        await prisma.obsahStranky.create({
          data: {
            klicObsahu: update.klic,
            obsah: update.hodnota,
            kategorie: 'kontakt',
            jeAktivni: true
          }
        })
        console.log(`  ➕ Vytvořeno: ${update.klic} → ${update.hodnota}`)
        created++
      }
    }

    console.log(`\n✨ Hotovo! Aktualizováno: ${updated}, Vytvořeno: ${created}`)
  } catch (error) {
    console.error('❌ Chyba při aktualizaci kontaktních údajů:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
