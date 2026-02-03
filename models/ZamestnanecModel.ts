// Model pro správu zaměstnanců
import prisma from '@/lib/db'
import { IZamestnanec, IRozvrh, UroveňStylisty, DenVTydnu } from '@/types/booking'

export class ZamestnanecModel {
  
  /**
   * Získat všechny aktivní zaměstnance
   */
  static async ziskatVsechny(): Promise<IZamestnanec[]> {
    const zamestnanci = await prisma.zamestnanec.findMany({
      where: { jeAktivni: true },
      orderBy: { uroveň: 'desc' }
    })
    
    return zamestnanci.map(this.prismaToInterface)
  }

  /**
   * Získat zaměstnance podle ID
   */
  static async ziskatPodleId(id: string): Promise<IZamestnanec | null> {
    const zamestnanec = await prisma.zamestnanec.findUnique({
      where: { id }
    })
    
    return zamestnanec ? this.prismaToInterface(zamestnanec) : null
  }

  /**
   * Vytvořit nového zaměstnance
   */
  static async vytvorit(data: Omit<IZamestnanec, '_id' | 'vytvořeno' | 'upraveno'>): Promise<IZamestnanec> {
    const zamestnanec = await prisma.zamestnanec.create({
      data: {
        jmeno: data.jmeno,
        prijmeni: data.prijmeni,
        uroveň: data.uroveň,
        email: data.email,
        telefon: data.telefon,
        fotoUrl: data.fotoUrl,
        rozvrh: data.rozvrh as any,
        dnyVolna: data.dnyVolna,
        jeAktivni: data.jeAktivni
      }
    })
    
    return this.prismaToInterface(zamestnanec)
  }

  /**
   * Aktualizovat zaměstnance
   */
  static async aktualizovat(id: string, data: Partial<IZamestnanec>): Promise<IZamestnanec> {
    const zamestnanec = await prisma.zamestnanec.update({
      where: { id },
      data: {
        jmeno: data.jmeno,
        prijmeni: data.prijmeni,
        uroveň: data.uroveň,
        email: data.email,
        telefon: data.telefon,
        fotoUrl: data.fotoUrl,
        rozvrh: data.rozvrh as any,
        dnyVolna: data.dnyVolna,
        jeAktivni: data.jeAktivni
      }
    })
    
    return this.prismaToInterface(zamestnanec)
  }

  /**
   * Smazat zaměstnance (soft delete)
   */
  static async smazat(id: string): Promise<void> {
    await prisma.zamestnanec.update({
      where: { id },
      data: { jeAktivni: false }
    })
  }

  /**
   * Získat zaměstnance, kteří poskytují určitou službu
   */
  static async ziskatPodleSluzby(sluzby: string[]): Promise<IZamestnanec[]> {
    // TODO: Implementovat logiku podle kvalifikací zaměstnanců
    // Prozatím vrátíme všechny aktivní
    return this.ziskatVsechny()
  }

  /**
   * Převést Prisma objekt na TypeScript interface
   */
  private static prismaToInterface(prismaObj: any): IZamestnanec {
    return {
      _id: prismaObj.id,
      jmeno: prismaObj.jmeno,
      prijmeni: prismaObj.prijmeni,
      uroveň: prismaObj.uroveň as UroveňStylisty,
      email: prismaObj.email,
      telefon: prismaObj.telefon,
      fotoUrl: prismaObj.fotoUrl,
      rozvrh: prismaObj.rozvrh as IRozvrh[],
      dnyVolna: prismaObj.dnyVolna,
      jeAktivni: prismaObj.jeAktivni,
      vytvořeno: prismaObj.vytvořeno,
      upraveno: prismaObj.upraveno
    }
  }

  /**
   * Zkontrolovat dostupnost zaměstnance v určitý den a čas
   */
  static async zkontrolovatDostupnost(
    zamestnanecId: string, 
    datum: Date, 
    dobaTrvaniMinuty: number
  ): Promise<boolean> {
    const zamestnanec = await this.ziskatPodleId(zamestnanecId)
    if (!zamestnanec) return false

    // TODO: Implementovat logiku kontroly:
    // 1. Zkontrolovat rozvrh na daný den
    // 2. Zkontrolovat dny volna
    // 3. Zkontrolovat existující rezervace
    
    return true // Blank implementace
  }
}