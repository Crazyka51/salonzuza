import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Aktivovat všechny neaktivní položky pro homepage
    const result = await prisma.obsahStranky.updateMany({
      where: {
        kategorie: 'homepage',
        jeAktivni: false
      },
      data: {
        jeAktivni: true
      }
    })

    console.log(`✅ Aktivováno ${result.count} položek obsahu pro homepage`)

    // Zobrazit všechny homepage položky
    const homepage = await prisma.obsahStranky.findMany({
      where: { kategorie: 'homepage' },
      select: {
        klicObsahu: true,
        obsah: true,
        jeAktivni: true
      }
    })

    console.log('\n📋 Homepage obsah:')
    homepage.forEach(item => {
      console.log(`  ${item.jeAktivni ? '✓' : '✗'} ${item.klicObsahu}: ${item.obsah.substring(0, 50)}...`)
    })
  } catch (error) {
    console.error('❌ Chyba:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
