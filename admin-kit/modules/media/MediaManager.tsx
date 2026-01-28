"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, UploadIcon, Trash2, Search, Image as ImageIcon, Calendar, FolderOpen } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"

type MediaFile = {
  name: string
  originalName: string
  url: string
  size: number
  createdAt: string
  updatedAt: string
}

interface MediaManagerProps {
  onSelectMedia?: (url: string) => void
}

export default function MediaManager({ onSelectMedia }: MediaManagerProps) {
  const [years, setYears] = useState<string[]>([])
  const [months, setMonths] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("browse")
  
  const { toast } = useToast()

  useEffect(() => {
    fetchYears()
  }, [])

  useEffect(() => {
    if (selectedYear) {
      fetchMonths(selectedYear)
    } else {
      setMonths([])
      setSelectedMonth(null)
      setMediaFiles([])
    }
  }, [selectedYear])

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      fetchMediaFiles(selectedYear, selectedMonth)
    } else {
      setMediaFiles([])
    }
  }, [selectedYear, selectedMonth])

  const fetchYears = async () => {
    try {
      setLoading(true)
      // Simulace dat - později nahradit API
      setYears(["2026", "2025", "2024"])
      setSelectedYear("2026")
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst roky médií",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchMonths = async (year: string) => {
    try {
      setLoading(true)
      // Simulace dat
      setMonths(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"])
      setSelectedMonth("01")
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst měsíce médií",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchMediaFiles = async (year: string, month: string) => {
    try {
      setLoading(true)
      // Simulace dat
      setMediaFiles([])
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst média",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          toast({ 
            title: "Nepodporovaný formát", 
            description: `Soubor "${file.name}" není obrázek`, 
            variant: "destructive" 
          })
          continue
        }

        if (file.size > 5 * 1024 * 1024) {
          toast({ 
            title: "Soubor je příliš velký", 
            description: `Soubor "${file.name}" je větší než 5MB`, 
            variant: "destructive" 
          })
          continue
        }

        toast({ 
          title: "Soubor nahrán", 
          description: `Soubor "${file.name}" byl úspěšně nahrán` 
        })
      }
    } catch (error) {
      toast({ 
        title: "Chyba", 
        description: "Nepodařilo se nahrát soubory", 
        variant: "destructive" 
      })
    } finally {
      setUploading(false)
      event.target.value = ""
    }
  }

  const deleteMedia = async (file: MediaFile) => {
    if (!confirm(`Opravdu chcete smazat soubor "${file.originalName}"?`)) {
      return
    }
    
    try {
      toast({
        title: "Soubor smazán",
        description: `Soubor "${file.originalName}" byl úspěšně smazán`,
      })
      
      setMediaFiles(mediaFiles.filter(m => m.url !== file.url))
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se smazat soubor",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const filteredMediaFiles = searchTerm 
    ? mediaFiles.filter(file => 
        file.originalName.toLowerCase().includes(searchTerm.toLowerCase()))
    : mediaFiles

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <ImageIcon className="h-8 w-8 text-[oklch(0.55_0.15_264)]" />
            Správa médií
          </h1>
          <p className="text-muted-foreground">Nahrajte a spravujte obrázky a soubory</p>
        </div>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6 bg-secondary">
              <TabsTrigger value="browse" className="data-[state=active]:bg-accent">
                <FolderOpen className="h-4 w-4 mr-2" />
                Procházet média
              </TabsTrigger>
              <TabsTrigger value="upload" className="data-[state=active]:bg-accent">
                <UploadIcon className="h-4 w-4 mr-2" />
                Nahrát média
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Select
                    value={selectedYear || undefined}
                    onValueChange={(value) => setSelectedYear(value)}
                  >
                    <SelectTrigger className="w-32 bg-secondary border-border">
                      <SelectValue placeholder="Rok" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {years.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={selectedMonth || undefined}
                    onValueChange={(value) => setSelectedMonth(value)}
                    disabled={!selectedYear || months.length === 0}
                  >
                    <SelectTrigger className="w-32 bg-secondary border-border">
                      <SelectValue placeholder="Měsíc" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {months.map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Hledat média..."
                    className="pl-9 bg-secondary border-border"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[oklch(0.55_0.15_264)]" />
                </div>
              ) : filteredMediaFiles.length === 0 ? (
                <div className="text-center p-12 bg-secondary rounded-lg border border-border">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  {searchTerm ? (
                    <p className="text-muted-foreground">Žádná média neodpovídají vyhledávání.</p>
                  ) : (
                    <p className="text-muted-foreground">Pro tento měsíc nejsou k dispozici žádná média.</p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMediaFiles.map((file) => (
                    <Card key={file.url} className="overflow-hidden group relative bg-secondary border-border hover:border-accent transition-all">
                      <div className="aspect-square relative bg-muted">
                        <Image
                          src={file.url}
                          alt={file.originalName}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <p className="text-xs truncate font-medium">{file.originalName}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {onSelectMedia && (
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => onSelectMedia(file.url)}
                            >
                              Vybrat
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteMedia(file)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="upload">
              <Card className="bg-secondary border-border">
                <CardContent className="p-8">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent transition-colors">
                    <UploadIcon className="h-16 w-16 mx-auto mb-4 text-[oklch(0.55_0.15_264)]" />
                    <h3 className="text-lg font-semibold mb-2">Nahrajte média</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Přetáhněte soubory sem nebo klikněte pro výběr souborů.
                      <br />
                      <span className="text-sm">
                        Podporované formáty: JPG, PNG, GIF, WebP, SVG
                        <br />
                        Maximální velikost souboru: 5MB
                      </span>
                    </p>
                    
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    
                    <Button 
                      asChild
                      disabled={uploading}
                      size="lg"
                    >
                      <label htmlFor="file-upload" className="cursor-pointer">
                        {uploading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Nahrávání...
                          </>
                        ) : (
                          <>
                            <UploadIcon className="h-4 w-4 mr-2" />
                            Vybrat soubory
                          </>
                        )}
                      </label>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
