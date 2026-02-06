import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Funkce pro generování časových slotů
function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number = 30,
  existingReservations: any[] = []
): { time: string; available: boolean }[] {
  const slots: { time: string; available: boolean }[] = [];
  
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMinute = startMinute;
  
  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute < endMinute)
  ) {
    const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    
    // Kontrola dostupnosti - zda se čas nepřekrývá s existující rezervací
    const isAvailable = !existingReservations.some(reservation => {
      const reservationStart = reservation.casOd;
      const reservationEnd = reservation.casDo;
      
      return timeString >= reservationStart && timeString < reservationEnd;
    });
    
    slots.push({
      time: timeString,
      available: isAvailable,
    });
    
    // Přidání duration minut
    currentMinute += duration;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
  }
  
  return slots;
}

// GET - získání dostupných termínů pro daný den
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datum = searchParams.get('datum');
    const zamestnanecId = searchParams.get('zamestnanecId');
    const sluzbaId = searchParams.get('sluzbaId');

    if (!datum) {
      return NextResponse.json(
        { error: 'Datum je povinný parametr' },
        { status: 400 }
      );
    }

    // Kontrola validity data
    const selectedDate = new Date(datum);
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        { error: 'Neplatný formát data' },
        { status: 400 }
      );
    }

    const dayOfWeek = selectedDate.getDay(); // 0 = neděle, 1 = pondělí, ...

    // Načtení provozních hodin pro daný den
    const provozniHodiny = await prisma.provozniHodiny.findUnique({
      where: { denTydne: dayOfWeek },
    });

    if (!provozniHodiny || provozniHodiny.jeZavreno || !provozniHodiny.jeAktivni) {
      return NextResponse.json({
        datum,
        dostupneTerminy: [],
        provozniHodiny: null,
        zprava: 'Salon má v tento den zavřeno',
      });
    }

    // Načtení existujících rezervací pro daný den
    const startOfDay = new Date(datum);
    const endOfDay = new Date(datum);
    endOfDay.setHours(23, 59, 59, 999);

    const whereCondition: any = {
      datum: {
        gte: startOfDay,
        lte: endOfDay,
      },
      stav: {
        in: ['pending', 'confirmed'],
      },
    };

    if (zamestnanecId) {
      whereCondition.zamestnanecId = parseInt(zamestnanecId);
    }

    const existujiciRezervace = await prisma.rezervace.findMany({
      where: whereCondition,
      select: {
        casOd: true,
        casDo: true,
        zamestnanecId: true,
      },
    });

    // Určení doby trvání služby (pokud je specifikována)
    let dobaTrvaniMinuty = 30; // výchozí
    if (sluzbaId) {
      const sluzba = await prisma.sluzba.findUnique({
        where: { id: parseInt(sluzbaId) },
        select: { dobaTrvaniMinuty: true },
      });
      if (sluzba) {
        dobaTrvaniMinuty = sluzba.dobaTrvaniMinuty;
      }
    }

    // Generování časových slotů
    const dostupneTerminy = generateTimeSlots(
      provozniHodiny.casOtevrani,
      provozniHodiny.casZavreni,
      15, // sloty po 15 minutách pro větší flexibilitu
      existujiciRezervace
    );

    // Filtrování slotů, aby zůstaly jen ty, kde se celá služba vejde
    const filtrovaneTerminy = dostupneTerminy.filter(slot => {
      if (!slot.available) return false;

      // Kontrola, zda se celá služba vejde do provozní doby
      const [slotHour, slotMinute] = slot.time.split(':').map(Number);
      const slotTotalMinutes = slotHour * 60 + slotMinute;
      const serviceDurationSlots = Math.ceil(dobaTrvaniMinuty / 15);
      
      // Kontrola, zda všechny potřebné sloty jsou dostupné
      for (let i = 0; i < serviceDurationSlots; i++) {
        const checkIndex = dostupneTerminy.findIndex(t => t.time === slot.time) + i;
        if (
          checkIndex >= dostupneTerminy.length ||
          !dostupneTerminy[checkIndex]?.available
        ) {
          return false;
        }
      }

      // Kontrola, zda služba končí před zavíracím časem
      const [closeHour, closeMinute] = provozniHodiny.casZavreni.split(':').map(Number);
      const closeTotalMinutes = closeHour * 60 + closeMinute;
      const serviceEndMinutes = slotTotalMinutes + dobaTrvaniMinuty;

      return serviceEndMinutes <= closeTotalMinutes;
    });

    // Načtení informací o zaměstnancích (pokud není specifikován konkrétní)
    let dostupniZamestnanci: any[] = [];
    if (!zamestnanecId) {
      dostupniZamestnanci = await prisma.zamestnanec.findMany({
        where: { jeAktivni: true },
        select: {
          id: true,
          jmeno: true,
          prijmeni: true,
          uroven: true,
        },
      });
    }

    return NextResponse.json({
      datum,
      dostupneTerminy: filtrovaneTerminy,
      provozniHodiny: {
        casOtevrani: provozniHodiny.casOtevrani,
        casZavreni: provozniHodiny.casZavreni,
        denTydne: dayOfWeek,
      },
      dobaTrvaniSluzby: dobaTrvaniMinuty,
      dostupniZamestnanci,
    });

  } catch (error) {
    console.error('Chyba při načítání dostupných termínů:', error);
    return NextResponse.json(
      { error: 'Nepodařilo se načíst dostupné termíny' },
      { status: 500 }
    );
  }
}