import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Inicializuji pořadí služeb...\n')

  // Získat všechny kategorie
  const kategorie = await prisma.kategorieSluzeb.findMany({
    include: {
      sluzby: {
        orderBy: { id: 'asc' }
      }
    }
  })

  let updatedCount = 0

  for (const kat of kategorie) {
    console.log(`📦 Kategorie: ${kat.nazev}`)
    
    for (let i = 0; i < kat.sluzby.length; i++) {
      const sluzba = kat.sluzby[i]
      
      // Aktualizovat pořadí podle indexu
      await prisma.sluzba.update({
        where: { id: sluzba.id },
        data: { poradi: i }
      })
      
      console.log(`  ✅ ${sluzba.nazev} - pořadí: ${i}`)
      updatedCount++
    }
  }

  console.log(`\n✨ Hotovo! Inicializováno pořadí pro ${updatedCount} služeb.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Chyba:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
