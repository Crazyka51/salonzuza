import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTestData() {
  console.log('🌱 Vytváří základní testovací data...');
  
  try {
    // Kategorie služeb
    console.log('📁 Vytváří kategorii služeb...');
    const kategorie = await prisma.kategorieSluzeb.create({
      data: {
        nazev: 'Stříhání a styling',
        popis: 'Všechny druhy střihů a stylingu',
        poradi: 1,
        jeAktivni: true
      }
    });
    console.log('✅ Kategorie vytvořena:', kategorie.nazev);

    // Služby
    console.log('📋 Vytváří služby...');
    const sluzby = await Promise.all([
      prisma.sluzba.create({
        data: {
          nazev: 'Dámský střih',
          popis: 'Klasický dámský střih s úpravou',
          kategorieId: kategorie.id,
          dobaTrvaniMinuty: 45,
          cenaTopStylist: 1000,
          cenaStylist: 800,
          cenaJuniorStylist: 600,
          jeAktivni: true
        }
      }),
      prisma.sluzba.create({
        data: {
          nazev: 'Pánský střih',
          popis: 'Pánský střih s mytím',
          kategorieId: kategorie.id,
          dobaTrvaniMinuty: 30,
          cenaTopStylist: 600,
          cenaStylist: 500,
          cenaJuniorStylist: 400,
          jeAktivni: true
        }
      })
    ]);
    console.log('✅ Služby vytvořeny:', sluzby.length);

    // Zaměstnanci
    console.log('👥 Vytváří zaměstnance...');
    const zamestnanci = await Promise.all([
      prisma.zamestnanec.create({
        data: {
          jmeno: 'Zuzana',
          prijmeni: 'Nováková',
          uroven: 'top_stylist',
          email: 'zuzana@salonzuza01.cz', // Změněný email kvůli unique constraint
          telefon: '+420 777 123 456',
          jeAktivni: true
        }
      }),
      prisma.zamestnanec.create({
        data: {
          jmeno: 'Marie',
          prijmeni: 'Svobodová',
          uroven: 'stylist',
          email: 'marie@salonzuza01.cz',
          telefon: '+420 608 987 654',
          jeAktivni: true
        }
      })
    ]);
    console.log('✅ Zaměstnanci vytvořeni:', zamestnanci.length);

    // Provozní hodiny
    console.log('🕐 Vytváří provozní hodiny...');
    const dnyTydne = [
      { den: 1, otevrani: '09:00', zavreni: '18:00', zavreno: false }, // po
      { den: 2, otevrani: '09:00', zavreni: '18:00', zavreno: false }, // út  
      { den: 3, otevrani: '09:00', zavreni: '18:00', zavreno: false }, // st
      { den: 4, otevrani: '09:00', zavreni: '18:00', zavreno: false }, // čt
      { den: 5, otevrani: '09:00', zavreni: '18:00', zavreno: false }, // pá
      { den: 6, otevrani: '09:00', zavreni: '16:00', zavreno: false }, // so
      { den: 0, otevrani: '00:00', zavreni: '00:00', zavreno: true },  // ne
    ];

    const provozniHodiny = await Promise.all(
      dnyTydne.map(den => 
        prisma.provozniHodiny.create({
          data: {
            denTydne: den.den,
            casOtevrani: den.otevrani,
            casZavreni: den.zavreni,
            jeZavreno: den.zavreno,
            jeAktivni: true
          }
        })
      )
    );
    console.log('✅ Provozní hodiny vytvořeny:', provozniHodiny.length);

    // Ukázkové rezervace pro následující dny
    console.log('📅 Vytváří ukázkové rezervace...');
    const rezervace = await Promise.all([
      prisma.rezervace.create({
        data: {
          jmeno: 'Anna',
          prijmeni: 'Testovací',
          email: 'anna.test@example.com',
          telefon: '+420 777 111 222',
          datum: new Date('2026-02-08'), // zítra
          casOd: '10:00',
          casDo: '10:45',
          sluzbaId: sluzby[0].id,
          zamestnanecId: zamestnanci[0].id,
          stav: 'confirmed',
          cena: 1000,
          zpusobPlatby: 'karta'
        }
      }),
      prisma.rezervace.create({
        data: {
          jmeno: 'Petra',
          prijmeni: 'Ukázková',
          email: 'petra.test@example.com',
          telefon: '+420 608 333 444',
          datum: new Date('2026-02-08'),
          casOd: '14:30',
          casDo: '15:00',
          sluzbaId: sluzby[1].id,
          zamestnanecId: zamestnanci[1].id,
          stav: 'pending',
          cena: 500,
          zpusobPlatby: 'hotove'
        }
      }),
      prisma.rezervace.create({
        data: {
          jmeno: 'Lucie',
          prijmeni: 'Demová',
          email: 'lucie.demo@example.com',
          telefon: '+420 721 555 666',
          datum: new Date('2026-02-09'), // pozítří
          casOd: '11:00',
          casDo: '11:45',
          sluzbaId: sluzby[0].id,
          zamestnanecId: zamestnanci[0].id,
          stav: 'confirmed',
          cena: 1000,
          zpusobPlatby: 'prevod'
        }
      })
    ]);
    console.log('✅ Rezervace vytvořeny:', rezervace.length);
    
    console.log('\n🎉 Testovací data úspěšně vytvořena!');
    console.log('📊 Souhrn dat:');
    
    const pocty = await Promise.all([
      prisma.kategorieSluzeb.count(),
      prisma.sluzba.count(),
      prisma.zamestnanec.count(),
      prisma.provozniHodiny.count(),
      prisma.rezervace.count()
    ]);
    
    console.log(`- Kategorie: ${pocty[0]}`);
    console.log(`- Služby: ${pocty[1]}`);
    console.log(`- Zaměstnanci: ${pocty[2]}`);
    console.log(`- Provozní hodiny: ${pocty[3]}`);
    console.log(`- Rezervace: ${pocty[4]}`);
    
  } catch (error) {
    console.error('❌ Chyba:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  createTestData();
}