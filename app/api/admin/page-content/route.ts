// API endpoint pro správu obsahu stránek v adminu
import { NextRequest, NextResponse } from 'next/server'
import { ObsahStrankyModel } from '@/models/ObsahStrankyModel'
import { IObsahStranky } from '@/types/booking'

// GET - získat obsah pro admin
export async function GET(request: NextRequest) {
  try {
    // TODO: Přidat admin autentizaci
    // const session = await getAdminSession(request)
    // if (!session) return NextResponse.json({ uspech: false, chyba: 'Neautorizován' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const stranka = searchParams.get('stranka')

    let obsah
    if (stranka) {
      obsah = await ObsahStrankyModel.ziskatPodleStranky(stranka)
    } else {
      obsah = await ObsahStrankyModel.ziskatVsechny()
    }

    return NextResponse.json({
      uspech: true,
      data: obsah
    })
    
  } catch (error) {
    console.error('Admin chyba při načítání obsahu:', error)
    return NextResponse.json(
      { uspech: false, chyba: 'Chyba serveru' },
      { status: 500 }
    )
  }
}

// POST - vytvořit nový obsah
export async function POST(request: NextRequest) {
  try {
    // TODO: Přidat admin autentizaci
    
    const data: Omit<IObsahStranky, '_id' | 'vytvořeno' | 'upraveno'> = await request.json()
    
    // Validace
    if (!data.klic || !data.nazev || !data.hodnota || !data.typ || !data.stranka) {
      return NextResponse.json(
        { uspech: false, chyba: 'Povinná pole: klic, nazev, hodnota, typ, stranka' },
        { status: 400 }
      )
    }

    const novyObsah = await ObsahStrankyModel.vytvorit(data)

    return NextResponse.json({
      uspech: true,
      data: novyObsah,
      zprava: 'Obsah byl vytvořen'
    })
    
  } catch (error) {
    console.error('Admin chyba při vytváření obsahu:', error)
    return NextResponse.json(
      { uspech: false, chyba: 'Chyba při vytváření obsahu' },
      { status: 500 }
    )
  }
}

// PUT - aktualizovat obsah
export async function PUT(request: NextRequest) {
  try {
    // TODO: Přidat admin autentizaci
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const klic = searchParams.get('klic')
    
    const data: Partial<IObsahStranky> = await request.json()
    
    let aktualizovanyObsah
    
    if (id) {
      // Aktualizace podle ID
      aktualizovanyObsah = await ObsahStrankyModel.aktualizovat(id, data)
    } else if (klic) {
      // Rychlá aktualizace hodnoty podle klíče
      if (data.hodnota) {
        aktualizovanyObsah = await ObsahStrankyModel.aktualizovatHodnotu(klic, data.hodnota)
      } else {
        return NextResponse.json(
          { uspech: false, chyba: 'Chybí hodnota pro aktualizaci' },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { uspech: false, chyba: 'Chybí ID nebo klíč pro aktualizaci' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      uspech: true,
      data: aktualizovanyObsah,
      zprava: 'Obsah byl aktualizován'
    })
    
  } catch (error) {
    console.error('Admin chyba při aktualizaci obsahu:', error)
    return NextResponse.json(
      { uspech: false, chyba: 'Chyba při aktualizaci obsahu' },
      { status: 500 }
    )
  }
}

// DELETE - smazat obsah (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Přidat admin autentizaci
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { uspech: false, chyba: 'Chybí ID pro smazání' },
        { status: 400 }
      )
    }

    await ObsahStrankyModel.smazat(id)

    return NextResponse.json({
      uspech: true,
      zprava: 'Obsah byl smazán'
    })
    
  } catch (error) {
    console.error('Admin chyba při mazání obsahu:', error)
    return NextResponse.json(
      { uspech: false, chyba: 'Chyba při mazání obsahu' },
      { status: 500 }
    )
  }
}