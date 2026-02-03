// Model pro správu služeb
import prisma from '@/lib/db'
import { ISluzba, IKategorieSluzeb } from '@/types/booking'

export class SluzbaModel {
  
  /**
   * Získat všechny aktivní služby s kategoriemi
   */
  static async ziskatVsechny(): Promise<ISluzba[]> {
    const sluzby = await prisma.sluzba.findMany({
      where: { jeAktivni: true },
      include: { kategorie: true },
      orderBy: [
        { kategorie: { poradi: 'asc' } },
        { nazev: 'asc' }
      ]
    })
    
    return sluzby.map(this.prismaToInterface)
  }

  /**
   * Získat služby podle kategorie
   */
  static async ziskatPodleKategorie(kategorieId: string): Promise<ISluzba[]> {
    const sluzby = await prisma.sluzba.findMany({
      where: { 
        kategorieId,
        jeAktivni: true 
      },
      include: { kategorie: true },
      orderBy: { nazev: 'asc' }
    })
    
    return sluzby.map(this.prismaToInterface)
  }

  /**
   * Získat službu podle ID
   */
  static async ziskatPodleId(id: string): Promise<ISluzba | null> {
    const sluzba = await prisma.sluzba.findUnique({
      where: { id },
      include: { kategorie: true }
    })
    
    return sluzba ? this.prismaToInterface(sluzba) : null
  }

  /**
   * Vytvořit novou službu
   */
  static async vytvorit(data: Omit<ISluzba, '_id' | 'vytvořeno' | 'upraveno' | 'kategorie'>): Promise<ISluzba> {
    const sluzba = await prisma.sluzba.create({
      data: {
        nazev: data.nazev,
        kategorieId: data.kategorieId,
        popis: data.popis,
        dobaTrvaniMinuty: data.dobaTrvaniMinuty,
        cena: data.cena as any,
        jeAktivni: data.jeAktivni
      },
      include: { kategorie: true }
    })
    
    return this.prismaToInterface(sluzba)
  }

  /**
   * Aktualizovat službu
   */
  static async aktualizovat(id: string, data: Partial<ISluzba>): Promise<ISluzba> {
    const sluzba = await prisma.sluzba.update({
      where: { id },
      data: {
        nazev: data.nazev,
        kategorieId: data.kategorieId,
        popis: data.popis,
        dobaTrvaniMinuty: data.dobaTrvaniMinuty,
        cena: data.cena as any,
        jeAktivni: data.jeAktivni
      },
      include: { kategorie: true }
    })
    
    return this.prismaToInterface(sluzba)
  }

  /**
   * Smazat službu (soft delete)
   */
  static async smazat(id: string): Promise<void> {
    await prisma.sluzba.update({
      where: { id },
      data: { jeAktivni: false }
    })
  }

  /**
   * Převést Prisma objekt na TypeScript interface
   */
  private static prismaToInterface(prismaObj: any): ISluzba {
    return {
      _id: prismaObj.id,
      nazev: prismaObj.nazev,
      kategorie: prismaObj.kategorie.nazev,
      kategorieId: prismaObj.kategorieId,
      popis: prismaObj.popis,
      dobaTrvaniMinuty: prismaObj.dobaTrvaniMinuty,
      cena: prismaObj.cena,
      jeAktivni: prismaObj.jeAktivni,
      vytvořeno: prismaObj.vytvořeno,
      upraveno: prismaObj.upraveno
    }
  }
}

export class KategorieSluzebModel {
  
  /**
   * Získat všechny aktivní kategorie
   */
  static async ziskatVsechny(): Promise<IKategorieSluzeb[]> {
    const kategorie = await prisma.kategorieSluzeb.findMany({
      where: { jeAktivni: true },
      orderBy: { poradi: 'asc' }
    })
    
    return kategorie.map(this.prismaToInterface)
  }

  /**
   * Získat kategorii podle ID
   */
  static async ziskatPodleId(id: string): Promise<IKategorieSluzeb | null> {
    const kategorie = await prisma.kategorieSluzeb.findUnique({
      where: { id }
    })
    
    return kategorie ? this.prismaToInterface(kategorie) : null
  }

  /**
   * Vytvořit novou kategorii
   */
  static async vytvorit(data: Omit<IKategorieSluzeb, '_id' | 'vytvořeno' | 'upraveno'>): Promise<IKategorieSluzeb> {
    const kategorie = await prisma.kategorieSluzeb.create({
      data: {
        nazev: data.nazev,
        popis: data.popis,
        poradi: data.poradi,
        jeAktivni: data.jeAktivni
      }
    })
    
    return this.prismaToInterface(kategorie)
  }

  /**
   * Aktualizovat kategorii
   */
  static async aktualizovat(id: string, data: Partial<IKategorieSluzeb>): Promise<IKategorieSluzeb> {
    const kategorie = await prisma.kategorieSluzeb.update({
      where: { id },
      data: {
        nazev: data.nazev,
        popis: data.popis,
        poradi: data.poradi,
        jeAktivni: data.jeAktivni
      }
    })
    
    return this.prismaToInterface(kategorie)
  }

  /**
   * Smazat kategorii (soft delete)
   */
  static async smazat(id: string): Promise<void> {
    await prisma.kategorieSluzeb.update({
      where: { id },
      data: { jeAktivni: false }
    })
  }

  /**
   * Převést Prisma objekt na TypeScript interface
   */
  private static prismaToInterface(prismaObj: any): IKategorieSluzeb {
    return {
      _id: prismaObj.id,
      nazev: prismaObj.nazev,
      popis: prismaObj.popis,
      poradi: prismaObj.poradi,
      jeAktivni: prismaObj.jeAktivni,
      vytvořeno: prismaObj.vytvořeno,
      upraveno: prismaObj.upraveno
    }
  }
}