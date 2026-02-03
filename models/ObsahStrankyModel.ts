// Model pro editovatelný obsah stránky
import { PrismaClient } from '@prisma/client'
import { prisma } from '../lib/db'

export class ObsahStrankyModel {
  static async findByKey(klicObsahu: string) {
    return await prisma.obsahStranky.findUnique({
      where: { klicObsahu }
    })
  }

  static async findByCategory(kategorie: string) {
    return await prisma.obsahStranky.findMany({
      where: { 
        kategorie,
        jeAktivni: true 
      },
      orderBy: { poradoveId: 'asc' }
    })
  }

  static async create(data: {
    klicObsahu: string
    nazev: string
    obsah: string
    kategorie: string
    popis?: string
    typ?: string
    jeAktivni?: boolean
    poradoveId?: number
  }) {
    return await prisma.obsahStranky.create({
      data: {
        ...data,
        typ: data.typ || 'text',
        jeAktivni: data.jeAktivni ?? true
      }
    })
  }

  static async update(klicObsahu: string, data: Partial<{
    nazev: string
    obsah: string
    kategorie: string
    popis: string
    typ: string
    jeAktivni: boolean
    poradoveId: number
  }>) {
    return await prisma.obsahStranky.update({
      where: { klicObsahu },
      data
    })
  }

  static async delete(klicObsahu: string) {
    return await prisma.obsahStranky.delete({
      where: { klicObsahu }
    })
  }

  static async findAll() {
    return await prisma.obsahStranky.findMany({
      where: { jeAktivni: true },
      orderBy: [
        { kategorie: 'asc' },
        { poradoveId: 'asc' }
      ]
    })
  }
}