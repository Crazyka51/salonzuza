import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Aktivovat všechny neaktivní položky
    const result = await prisma.obsahStranky.updateMany({
      where: {
        jeAktivni: false
      },
      data: {
        jeAktivni: true
      }
    })

    console.log(`✅ Aktivováno ${result.count} položek obsahu`)

    // Statistika podle kategorií
    const stats = await prisma.obsahStranky.groupBy({
      by: ['kategorie'],
      _count: {
        id: true
      },
      where: {
        jeAktivni: true
      }
    })

    console.log('\n📊 Statistika aktivního obsahu:')
    stats.forEach(stat => {
      console.log(`  ${stat.kategorie || 'bez kategorie'}: ${stat._count.id} položek`)
    })
  } catch (error) {
    console.error('❌ Chyba:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
