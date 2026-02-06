import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendReservationNotifications } from '../../../lib/notifications';

const prisma = new PrismaClient();

// Validace času ve formátu HH:MM
function validateTime(time: string): boolean {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

// Validace emailu
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// GET - načtení rezervací
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datum = searchParams.get('datum');
    const datumOd = searchParams.get('datum_od');
    const datumDo = searchParams.get('datum_do');
    const zamestnanecId = searchParams.get('zamestnanecId');
    const stav = searchParams.get('stav');

    const where: any = {};

    // Support for single date filter
    if (datum) {
      const startOfDay = new Date(datum);
      const endOfDay = new Date(datum);
      endOfDay.setHours(23, 59, 59, 999);
      
      where.datum = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }
    
    // Support for date range filter (for calendar)
    if (datumOd && datumDo) {
      const startDate = new Date(datumOd);
      const endDate = new Date(datumDo);
      endDate.setHours(23, 59, 59, 999);
      
      where.datum = {
        gte: startDate,
        lte: endDate,
      };
    } else if (datumOd) {
      where.datum = {
        gte: new Date(datumOd),
      };
    } else if (datumDo) {
      const endDate = new Date(datumDo);
      endDate.setHours(23, 59, 59, 999);
      where.datum = {
        lte: endDate,
      };
    }

    if (zamestnanecId) {
      where.zamestnanecId = parseInt(zamestnanecId);
    }

    if (stav) {
      where.stav = stav;
    }

    const rezervace = await prisma.rezervace.findMany({
      where,
      include: {
        sluzba: {
          include: {
            kategorie: true,
          },
        },
        zamestnanec: true,
      },
      orderBy: [
        { datum: 'asc' },
        { casOd: 'asc' },
      ],
    });

    return NextResponse.json({ rezervace }, { status: 200 });
  } catch (error) {
    console.error('Chyba při načítání rezervací:', error);
    return NextResponse.json(
      { error: 'Nepodařilo se načíst rezervace' },
      { status: 500 }
    );
  }
}

// POST - vytvoření nové rezervace
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const {
      jmeno,
      prijmeni,
      email,
      telefon,
      datum,
      casOd,
      casDo,
      sluzbaId,
      zamestnanecId,
      poznamka,
      cena,
      zpusobPlatby = 'hotove',
      notifikaceEmail = true,
      notifikaceSms = false,
    } = data;

    // Validace povinných polí
    if (!jmeno || !prijmeni || !email || !telefon || !datum || !casOd || !casDo) {
      return NextResponse.json(
        { error: 'Chybí povinná pole' },
        { status: 400 }
      );
    }

    // Validace emailu
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Neplatný formát emailu' },
        { status: 400 }
      );
    }

    // Validace časů
    if (!validateTime(casOd) || !validateTime(casDo)) {
      return NextResponse.json(
        { error: 'Neplatný formát času (použijte HH:MM)' },
        { status: 400 }
      );
    }

    // Kontrola, zda čas od je před časem do
    if (casOd >= casDo) {
      return NextResponse.json(
        { error: 'Čas začátku musí být před časem konce' },
        { status: 400 }
      );
    }

    // Kontrola konfliktu s existujícími rezervacemi
    const existujiciRezervace = await prisma.rezervace.findMany({
      where: {
        datum: new Date(datum),
        zamestnanecId: zamestnanecId || null,
        stav: {
          in: ['pending', 'confirmed'],
        },
        OR: [
          {
            AND: [
              { casOd: { lte: casOd } },
              { casDo: { gt: casOd } },
            ],
          },
          {
            AND: [
              { casOd: { lt: casDo } },
              { casDo: { gte: casDo } },
            ],
          },
          {
            AND: [
              { casOd: { gte: casOd } },
              { casDo: { lte: casDo } },
            ],
          },
        ],
      },
    });

    if (existujiciRezervace.length > 0) {
      return NextResponse.json(
        { error: 'V daném čase již existuje rezervace' },
        { status: 409 }
      );
    }

    // Vytvoření rezervace
    const novaRezervace = await prisma.rezervace.create({
      data: {
        jmeno,
        prijmeni,
        email,
        telefon,
        datum: new Date(datum),
        casOd,
        casDo,
        sluzbaId: sluzbaId || null,
        zamestnanecId: zamestnanecId || null,
        poznamka: poznamka || null,
        stav: 'pending',
        cena: cena || 0,
        zpusobPlatby,
        notifikaceEmail,
        notifikaceSms,
      },
      include: {
        sluzba: {
          include: {
            kategorie: true,
          },
        },
        zamestnanec: true,
      },
    });

    // Odeslání notifikací (asynchronně, aby nebrzdilo response)
    sendReservationNotifications(novaRezervace, 'created').catch(error => {
      console.error('Chyba při odesílání notifikací:', error);
    });

    return NextResponse.json({ rezervace: novaRezervace }, { status: 201 });
  } catch (error) {
    console.error('Chyba při vytváření rezervace:', error);
    return NextResponse.json(
      { error: 'Nepodařilo se vytvořit rezervaci' },
      { status: 500 }
    );
  }
}