import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testReservations() {
  console.log('🧪 Testování rezervací API...');
  
  try {
    // Test 1: Načtení všech rezervací
    console.log('📋 Načítám všechny rezervace...');
    const reservations = await prisma.rezervace.findMany({
      include: {
        sluzba: {
          include: {
            kategorie: true
          }
        },
        zamestnanec: true
      }
    });
    
    console.log(`✅ Nalezeno ${reservations.length} rezervací`);
    reservations.forEach(r => {
      console.log(`- ${r.jmeno} ${r.prijmeni}: ${r.datum.toISOString().split('T')[0]} ${r.casOd}-${r.casDo} (${r.stav})`);
    });

    // Test 2: Vytvoření nové rezervace
    console.log('\n📝 Vytvářím testovací rezervaci...');
    const newReservation = await prisma.rezervace.create({
      data: {
        jmeno: 'Test',
        prijmeni: 'Uživatel',
        email: 'test@example.com',
        telefon: '+420 123 456 789',
        datum: new Date('2026-02-08'),
        casOd: '14:00',
        casDo: '15:00',
        stav: 'pending',
        cena: 800,
        zpusobPlatby: 'karta',
        notifikaceEmail: true,
        notifikaceSms: false
      },
      include: {
        sluzba: true,
        zamestnanec: true
      }
    });
    
    console.log(`✅ Vytvořena rezervace ID: ${newReservation.id}`);
    
    // Test 3: Dostupné termíny
    console.log('\n🕐 Testuji dostupné termíny...');
    const availableSlots = await checkAvailableSlots('2026-02-08');
    console.log(`✅ Nalezeno ${availableSlots} dostupných slotů pro 2026-02-08`);
    
    console.log('\n🎉 Všechny testy proběhly úspěšně!');
    
  } catch (error) {
    console.error('❌ Chyba při testování:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function checkAvailableSlots(date: string) {
  const startOfDay = new Date(date);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  const existingReservations = await prisma.rezervace.findMany({
    where: {
      datum: {
        gte: startOfDay,
        lte: endOfDay,
      },
      stav: {
        in: ['pending', 'confirmed'],
      },
    },
  });
  
  // Jednoduché počítání - v produkci by to bylo propracovanější
  const totalSlots = 20; // 8:00-18:00 = 20 půlhodinových slotů
  return totalSlots - existingReservations.length;
}

if (require.main === module) {
  testReservations();
}