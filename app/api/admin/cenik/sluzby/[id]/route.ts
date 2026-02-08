// API endpoint pro správu konkrétní služby
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

// PUT - aktualizovat službu
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    
    const aktualizovanaSluzba = await prisma.sluzba.update({
      where: { id },
      data: {
        nazev: data.nazev,
        popis: data.popis || null,
        cenaTopStylist: data.cenaTopStylist || 0,
        cenaStylist: data.cenaStylist || 0,
        cenaJuniorStylist: data.cenaJuniorStylist || 0,
        dobaTrvaniMinuty: data.dobaTrvaniMinuty || 60,
        jeAktivni: data.jeAktivni !== false,
      }
    })

    return NextResponse.json({
      uspech: true,
      data: aktualizovanaSluzba,
      zprava: 'Služba byla aktualizována'
    })
    
  } catch (error) {
    console.error('Admin chyba při aktualizaci služby:', error)
    return NextResponse.json(
      { uspech: false, chyba: 'Chyba při aktualizaci služby' },
      { status: 500 }
    )
  }
}

// DELETE - smazat službu
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    await prisma.sluzba.delete({
      where: { id }
    })

    return NextResponse.json({
      uspech: true,
      zprava: 'Služba byla smazána'
    })
    
  } catch (error) {
    console.error('Admin chyba při mazání služby:', error)
    return NextResponse.json(
      { uspech: false, chyba: 'Chyba při mazání služby' },
      { status: 500 }
    )
  }
}
