// API endpoint pro načítání obsahu stránek (veřejné)
import { NextRequest, NextResponse } from 'next/server'
import { ObsahStrankyModel } from '@/models/ObsahStrankyModel'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stranka = searchParams.get('stranka')
    const klic = searchParams.get('klic')

    let obsah
    
    if (klic) {
      // Získat konkrétní obsah podle klíče
      obsah = await ObsahStrankyModel.ziskatPodleKlice(klic)
      if (!obsah) {
        return NextResponse.json(
          { uspech: false, chyba: 'Obsah nenalezen' },
          { status: 404 }
        )
      }
    } else if (stranka) {
      // Získat všechen obsah pro stránku
      obsah = await ObsahStrankyModel.ziskatPodleStranky(stranka)
    } else {
      // Získat všechen obsah
      obsah = await ObsahStrankyModel.ziskatVsechny()
    }

    return NextResponse.json({
      uspech: true,
      data: obsah
    })
    
  } catch (error) {
    console.error('Chyba při načítání obsahu:', error)
    return NextResponse.json(
      { uspech: false, chyba: 'Chyba serveru při načítání obsahu' },
      { status: 500 }
    )
  }
}