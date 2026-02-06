import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedBasicData() {
  console.log('🌱 Vytváním základní data pro kalendář...');
  
  try {
    // Kategorie služeb
    console.log('📁 Vytváří kategorie služeb...');
    let kategorie = await prisma.kategorieSluzeb.findFirst({
      where: { nazev: 'Stříhání' }
    });
    
    if (!kategorie) {
      kategorie = await prisma.kategorieSluzeb.create({
        data: {
          nazev: 'Stříhání',
          popis: 'Pánské a dámské stříhání vlasů',
          poradi: 1,
          jeAktivni: true
        }
      });
    }
    console.log('✅ Kategorie vytvořena');

    // Služby
    console.log('📋 Vytváří služby...');
    let sluzba = await prisma.sluzba.findFirst({
      where: { nazev: 'Dámský střih' }
    });
    
    if (!sluzba) {
      sluzba = await prisma.sluzba.create({
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
      });
    }
    console.log('✅ Služba vytvořena');

    // Zaměstnanci
    console.log('👥 Vytváří zaměstnance...');
    let zamestnanec = await prisma.zamestnanec.findUnique({
      where: { email: 'zuzana@salonzuza.cz' }
    });
    
    if (!zamestnanec) {
      zamestnanec = await prisma.zamestnanec.create({
        data: {
          jmeno: 'Zuzana',
          prijmeni: 'Nováková',
          uroven: 'top_stylist',
          email: 'zuzana@salonzuza.cz',
          telefon: '+420 777 123 456',
          jeAktivni: true
        }
      });
    }
    console.log('✅ Zaměstnanec vytvořen');

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

    for (const den of dnyTydne) {
      await prisma.provozniHodiny.upsert({
        where: { denTydne: den.den },
        update: {
          casOtevrani: den.otevrani,
          casZavreni: den.zavreni,
          jeZavreno: den.zavreno
        },
        create: {
          denTydne: den.den,
          casOtevrani: den.otevrani,
          casZavreni: den.zavreni,
          jeZavreno: den.zavreno,
          jeAktivni: true
        }
      });
    }
    console.log('✅ Provozní hodiny vytvořeny');

    // Několik ukázkových rezervací
    console.log('📅 Vytváří ukázkové rezervace...');
    const rezervace = [
      {
        jmeno: 'Anna',
        prijmeni: 'Nováková',
        email: 'anna@example.com',
        telefon: '+420 777 111 222',
        datum: new Date('2026-02-06'),
        casOd: '10:00',
        casDo: '10:45',
        sluzbaId: sluzba.id,
        zamestnanecId: zamestnanec.id,
        stav: 'confirmed',
        cena: 1000
      },
      {
        jmeno: 'Marie',
        prijmeni: 'Svobodová',
        email: 'marie@example.com',
        telefon: '+420 608 333 444',
        datum: new Date('2026-02-07'),
        casOd: '14:30',
        casDo: '15:15',
        sluzbaId: sluzba.id,
        zamestnanecId: zamestnanec.id,
        stav: 'pending',
        cena: 1000
      }
    ];

    for (const rez of rezervace) {
      await prisma.rezervace.create({
        data: rez
      });
    }
    console.log('✅ Ukázkové rezervace vytvořeny');
    
    console.log('\n🎉 Základní data úspěšně vytvořena!');
    console.log('📊 Sumarizace:');
    
    const counts = await Promise.all([
      prisma.kategorieSluzeb.count(),
      prisma.sluzba.count(),
      prisma.zamestnanec.count(),
      prisma.provozniHodiny.count(),
      prisma.rezervace.count()
    ]);
    
    console.log(`- Kategorie služeb: ${counts[0]}`);
    console.log(`- Služby: ${counts[1]}`);
    console.log(`- Zaměstnanci: ${counts[2]}`);
    console.log(`- Provozní hodiny: ${counts[3]}`);
    console.log(`- Rezervace: ${counts[4]}`);
    
  } catch (error) {
    console.error('❌ Chyba při vytváření dat:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedBasicData();
}