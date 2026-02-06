import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function removeKosmetikaServices() {
  console.log('🗑️ Odstraňování kosmetických služeb...');
  
  try {
    // Najít kosmetické kategorie a služby
    const kosmetickeKategorie = await prisma.kategorieSluzeb.findMany({
      where: {
        nazev: {
          contains: 'kosmetik',
          mode: 'insensitive'
        }
      },
      include: {
        sluzby: true
      }
    });

    console.log(`📋 Nalezeno ${kosmetickeKategorie.length} kosmetických kategorií`);

    // Najít kosmetické služby napříč všemi kategoriemi
    const kosmetickeSluzby = await prisma.sluzba.findMany({
      where: {
        OR: [
          {
            nazev: {
              contains: 'kosmetik',
              mode: 'insensitive'
            }
          },
          {
            popis: {
              contains: 'kosmetik',
              mode: 'insensitive'
            }
          },
          {
            kategorie: {
              nazev: {
                contains: 'kosmetik',
                mode: 'insensitive'
              }
            }
          }
        ]
      }
    });

    console.log(`🧴 Nalezeno ${kosmetickeSluzby.length} kosmetických služeb`);

    // Najít rezervace s kosmetickými službami
    const rezervaceKKosmetice = await prisma.rezervace.findMany({
      where: {
        sluzba: {
          OR: [
            {
              nazev: {
                contains: 'kosmetik',
                mode: 'insensitive'
              }
            },
            {
              kategorie: {
                nazev: {
                  contains: 'kosmetik',
                  mode: 'insensitive'
                }
              }
            }
          ]
        }
      }
    });

    console.log(`📅 Nalezeno ${rezervaceKKosmetice.length} rezervací s kosmetickými službami`);

    // Nejdříve odstranit rezervace (kvůli foreign key constraintům)
    if (rezervaceKKosmetice.length > 0) {
      await prisma.rezervace.deleteMany({
        where: {
          id: {
            in: rezervaceKKosmetice.map(r => r.id)
          }
        }
      });
      console.log(`✅ Odstraněno ${rezervaceKKosmetice.length} rezervací`);
    }

    // Pak odstranit služby
    if (kosmetickeSluzby.length > 0) {
      await prisma.sluzba.deleteMany({
        where: {
          id: {
            in: kosmetickeSluzby.map(s => s.id)
          }
        }
      });
      console.log(`✅ Odstraněno ${kosmetickeSluzby.length} služeb`);
    }

    // Nakonec odstranit kategorie
    if (kosmetickeKategorie.length > 0) {
      await prisma.kategorieSluzeb.deleteMany({
        where: {
          id: {
            in: kosmetickeKategorie.map(k => k.id)
          }
        }
      });
      console.log(`✅ Odstraněno ${kosmetickeKategorie.length} kategorií`);
    }

    // Výsledný přehled
    const zbyvaKategorii = await prisma.kategorieSluzeb.count();
    const zbyvaSluzeb = await prisma.sluzba.count();
    const zbyvaRezervaci = await prisma.rezervace.count();

    console.log('\n📊 Aktuální stav databáze:');
    console.log(`- Kategorie služeb: ${zbyvaKategorii}`);
    console.log(`- Služby: ${zbyvaSluzeb}`);
    console.log(`- Rezervace: ${zbyvaRezervaci}`);

    console.log('\n🎉 Kosmetické služby byly úspěšně odstraněny!');
  } catch (error) {
    console.error('❌ Chyba při odstraňování kosmetických služeb:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeKosmetikaServices();