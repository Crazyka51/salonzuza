"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Image as ImageIcon, Upload, FileText } from "lucide-react"

export function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Správa médií</h1>
          <p className="text-muted-foreground">
            Spravujte obrázky a soubory vašeho webu
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Nahrát soubor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="mr-2 h-5 w-5" />
            Přehled médií
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Modul v přípravě</h3>
            <p className="mt-2 text-muted-foreground">
              Správa médií bude brzy dostupná
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}