import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT - úprava zaměstnance
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    
    const updatedZamestnanec = await prisma.zamestnanec.update({
      where: { id },
      data: {
        jmeno: data.jmeno,
        prijmeni: data.prijmeni,
        uroven: data.uroven,
        email: data.email,
        telefon: data.telefon || null,
        fotoUrl: data.fotoUrl || null,
      },
    });

    return NextResponse.json({ zamestnanec: updatedZamestnanec }, { status: 200 });
  } catch (error) {
    console.error('Chyba při úpravě zaměstnance:', error);
    return NextResponse.json(
      { error: 'Nepodařilo se upravit zaměstnance' },
      { status: 500 }
    );
  }
}

// DELETE - deaktivace zaměstnance (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Soft delete - pouze deaktivujeme zaměstnance
    const deactivatedZamestnanec = await prisma.zamestnanec.update({
      where: { id },
      data: { jeAktivni: false },
    });

    return NextResponse.json({ 
      message: 'Zaměstnanec byl deaktivován',
      zamestnanec: deactivatedZamestnanec 
    }, { status: 200 });
  } catch (error) {
    console.error('Chyba při deaktivaci zaměstnance:', error);
    return NextResponse.json(
      { error: 'Nepodařilo se deaktivovat zaměstnance' },
      { status: 500 }
    );
  }
}