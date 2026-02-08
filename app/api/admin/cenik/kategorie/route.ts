// API endpoint pro správu kategorií služeb
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

// POST - vytvořit novou kategorii
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!data.nazev) {
      return NextResponse.json(
        { uspech: false, chyba: 'Název kategorie je povinný' },
        { status: 400 }
      )
    }

    // Zjisti maximální pořadí
    const maxPoradi = await prisma.kategorieSluzeb.aggregate({
      _max: { poradi: true }
    })

    const novaKategorie = await prisma.kategorieSluzeb.create({
      data: {
        nazev: data.nazev,
        popis: data.popis || null,
        poradi: (maxPoradi._max.poradi || 0) + 1,
        jeAktivni: data.jeAktivni !== false
      },
      include: {
        sluzby: true
      }
    })

    return NextResponse.json({
      uspech: true,
      data: novaKategorie,
      zprava: 'Kategorie byla vytvořena'
    })
    
  } catch (error) {
    console.error('Chyba při vytváření kategorie:', error)
    return NextResponse.json(
      { uspech: false, chyba: 'Chyba při vytváření kategorie' },
      { status: 500 }
    )
  }
}
