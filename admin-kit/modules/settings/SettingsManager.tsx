"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Save, RefreshCw, Mail, FileText, Bell, Settings } from "lucide-react"

interface CMSSettings {
  defaultCategory: string | null
  autoSaveInterval: number
  allowImageUpload: boolean
  maxFileSize: number
  requireApproval: boolean
  defaultVisibility: "public" | "draft"
  enableScheduling: boolean
  emailNotifications: boolean
  newArticleNotification: boolean
  adminEmail: string
  updatedAt?: string
}

interface CategoryOption {
  id: string
  name: string
}

// Mock kategorie
const mockCategories: CategoryOption[] = [
  { id: "1", name: "Technologie" },
  { id: "2", name: "Programování" },
  { id: "3", name: "Design" },
  { id: "4", name: "Business" }
]

export function SettingsManager() {
  const [settings, setSettings] = useState<CMSSettings>({
    defaultCategory: null,
    autoSaveInterval: 3000,
    allowImageUpload: true,
    maxFileSize: 5,
    requireApproval: false,
    defaultVisibility: "draft",
    enableScheduling: true,
    emailNotifications: true,
    newArticleNotification: true,
    adminEmail: "admin@example.com",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>(mockCategories)

  const { toast } = useToast()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      // Simulace načtení nastavení
      await new Promise(resolve => setTimeout(resolve, 300))
      setLastSaved(new Date().toLocaleString("cs-CZ"))
    } catch (error) {
      toast({
        title: "Chyba při načítání nastavení",
        variant: "destructive",
      })
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLastSaved(new Date().toLocaleString("cs-CZ"))
      toast({ title: "Nastavení úspěšně uloženo!" })
    } catch (error) {
      toast({
        title: "Chyba při ukládání nastavení",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = async () => {
    if (confirm("Opravdu chcete obnovit výchozí nastavení? Všechny změny budou ztraceny.")) {
      try {
        setSettings({
          defaultCategory: null,
          autoSaveInterval: 3000,
          allowImageUpload: true,
          maxFileSize: 5,
          requireApproval: false,
          defaultVisibility: "draft",
          enableScheduling: true,
          emailNotifications: true,
          newArticleNotification: true,
          adminEmail: "admin@example.com",
        })
        toast({ title: "Nastavení bylo obnoveno na výchozí hodnoty" })
      } catch (error) {
        toast({
          title: "Chyba při obnovování nastavení",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            Nastavení systému
          </h1>
          <p className="text-muted-foreground mt-1">Konfigurace CMS systému a preferencí</p>
          {lastSaved && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
              Naposledy uloženo: {lastSaved}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Obnovit výchozí
          </Button>

          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? "Ukládání..." : "Uložit nastavení"}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <Tabs defaultValue="editor" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="editor" className="gap-2">
                <FileText className="w-4 h-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                Notifikace
              </TabsTrigger>
            </TabsList>

            {/* Editor Settings */}
            <TabsContent value="editor" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Výchozí kategorie</label>
                  <Select
                    value={settings.defaultCategory || "none"}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, defaultCategory: value === "none" ? null : value }))
                    }
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="-- Vyberte kategorii --" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="none">-- Vyberte kategorii --</SelectItem>
                      {categoryOptions.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Interval auto-uložení (ms)</label>
                  <Input
                    type="number"
                    min="1000"
                    max="60000"
                    step="1000"
                    value={settings.autoSaveInterval}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, autoSaveInterval: Number(e.target.value) }))
                    }
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximální velikost souboru (MB)</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={settings.maxFileSize}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, maxFileSize: Number(e.target.value) }))
                    }
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Výchozí viditelnost článků</label>
                  <Select
                    value={settings.defaultVisibility}
                    onValueChange={(value: "public" | "draft") =>
                      setSettings(prev => ({ ...prev, defaultVisibility: value }))
                    }
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="draft">Koncept</SelectItem>
                      <SelectItem value="public">Publikováno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="allowImageUpload"
                    checked={settings.allowImageUpload}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, allowImageUpload: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-border cursor-pointer"
                  />
                  <label htmlFor="allowImageUpload" className="text-sm cursor-pointer">
                    Povolit upload obrázků
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enableScheduling"
                    checked={settings.enableScheduling}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, enableScheduling: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-border cursor-pointer"
                  />
                  <label htmlFor="enableScheduling" className="text-sm cursor-pointer">
                    Povolit plánování publikování
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="requireApproval"
                    checked={settings.requireApproval}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, requireApproval: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-border cursor-pointer"
                  />
                  <label htmlFor="requireApproval" className="text-sm cursor-pointer">
                    Vyžadovat schválení před publikováním
                  </label>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))
                    }
                    className="h-4 w-4 rounded border-border cursor-pointer"
                  />
                  <label htmlFor="emailNotifications" className="text-sm cursor-pointer">
                    Povolit emailové notifikace
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newArticleNotification"
                    checked={settings.newArticleNotification}
                    onChange={(e) => 
                      setSettings(prev => ({ ...prev, newArticleNotification: e.target.checked }))
                    }
                    disabled={!settings.emailNotifications}
                    className="h-4 w-4 rounded border-border cursor-pointer disabled:opacity-50"
                  />
                  <label
                    htmlFor="newArticleNotification"
                    className={`text-sm cursor-pointer ${
                      !settings.emailNotifications ? "opacity-50" : ""
                    }`}
                  >
                    Notifikace při publikování nového článku
                  </label>
                </div>
              </div>

              <Card className="bg-purple-100 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold">Emailové notifikace</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Notifikace budou odesílány na email:{" "}
                        <strong className="text-foreground">{settings.adminEmail}</strong>
                      </p>
                    </div>
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
