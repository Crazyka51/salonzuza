import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/admin/provozni-hodiny - Získání všech provozních hodin
export async function GET() {
  try {
    const hodiny = await prisma.provozniHodiny.findMany({
      orderBy: { denTydne: 'asc' }
    });
    return NextResponse.json(hodiny);
  } catch (error) {
    console.error('Chyba při načítání provozních hodin:', error);
    return NextResponse.json({ error: 'Nezdařilo se načíst provozní hodiny' }, { status: 500 });
  }
}

// PUT /api/admin/provozni-hodiny - Aktualizace konkrétního dne
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, casOtevrani, casZavreni, jeZavreno } = body;

    if (id === undefined) {
      return NextResponse.json({ error: 'Chybí ID provozní hodiny' }, { status: 400 });
    }

    const updated = await prisma.provozniHodiny.update({
      where: { id: Number(id) },
      data: {
        casOtevrani,
        casZavreni,
        jeZavreno
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Chyba při aktualizaci provozních hodin:', error);
    return NextResponse.json({ error: 'Nezdařilo se aktualizovat provozní hodiny' }, { status: 500 });
  }
}
