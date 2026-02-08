// API endpoint pro správu ceníku v adminu
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

// GET - získat ceník pro admin (včetně neaktivních)
export async function GET(request: NextRequest) {
  try {
    const kategorie = await prisma.kategorieSluzeb.findMany({
      include: {
        sluzby: {
          orderBy: { poradi: 'asc' }
        }
      },
      orderBy: { poradi: 'asc' }
    })

    return NextResponse.json({
      uspech: true,
      data: kategorie
    })
  } catch (error) {
    console.error('Admin chyba při načítání ceníku:', error)
    return NextResponse.json(
      { uspech: false, chyba: 'Chyba serveru' },
      { status: 500 }
    )
  }
}
