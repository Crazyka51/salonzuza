import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - načtení všech zaměstnanců pro admin formulář
export async function GET(request: NextRequest) {
  try {
    const zamestnanci = await prisma.zamestnanec.findMany({
      where: { jeAktivni: true },
      select: {
        id: true,
        jmeno: true,
        prijmeni: true,
        uroven: true,
        email: true,
        telefon: true,
        fotoUrl: true,
      },
      orderBy: [
        { uroven: 'desc' }, // top_stylist first
        { jmeno: 'asc' },
      ],
    });

    return NextResponse.json({ zamestnanci }, { status: 200 });
  } catch (error) {
    console.error('Chyba při načítání zaměstnanců:', error);
    return NextResponse.json(
      { error: 'Nepodařilo se načíst zaměstnance' },
      { status: 500 }
    );
  }
}

// POST - vytvoření nového zaměstnance
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const zamestnanec = await prisma.zamestnanec.create({
      data: {
        jmeno: data.jmeno,
        prijmeni: data.prijmeni,
        uroven: data.uroven,
        email: data.email,
        telefon: data.telefon || null,
        fotoUrl: data.fotoUrl || null,
        jeAktivni: true,
      },
    });

    return NextResponse.json({ zamestnanec }, { status: 201 });
  } catch (error) {
    console.error('Chyba při vytváření zaměstnance:', error);
    return NextResponse.json(
      { error: 'Nepodařilo se vytvořit zaměstnance' },
      { status: 500 }
    );
  }
}