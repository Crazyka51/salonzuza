import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Zkontrolovat, jestli klíč už existuje
    const existing = await prisma.obsahStranky.findUnique({
      where: { klicObsahu: 'hero_nadpis' }
    })

    if (existing) {
      console.log('Klíč hero_nadpis už existuje:', existing)
      return
    }

    // Přidat nový obsah
    const result = await prisma.obsahStranky.create({
      data: {
        klicObsahu: 'hero_nadpis',
        obsah: 'PROFESIONÁLNÍ PÉČE O VAŠE VLASY',
        kategorie: 'homepage',
        jeAktivni: true
      }
    })

    console.log('✅ Obsah byl úspěšně přidán:', result)
  } catch (error) {
    console.error('❌ Chyba při přidávání obsahu:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
