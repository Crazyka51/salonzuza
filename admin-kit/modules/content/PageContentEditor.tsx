'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Save, Plus, Trash2, Edit } from 'lucide-react'

interface ObsahItem {
  id?: number
  klic: string
  hodnota: string
  stranka: string
}

const STRANKY = [
  'homepage',
  'o-nas', 
  'sluzby',
  'cenik',
  'galerie',
  'kontakt',
  'general'
]

export function PageContentEditor() {
  const [obsahy, setObsahy] = useState<ObsahItem[]>([])
  const [editingItem, setEditingItem] = useState<ObsahItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [selectedStranka, setSelectedStranka] = useState<string>('all')

  // Načtení všech obsahů při načtení komponenty
  useEffect(() => {
    fetchObsahy()
  }, [])

  const fetchObsahy = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/page-content')
      if (response.ok) {
        const result = await response.json()
        setObsahy(result.data || [])
      }
    } catch (error) {
      setMessage({type: 'error', text: 'Chyba při načítání obsahu'})
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editingItem || !editingItem.klic || !editingItem.hodnota) {
      setMessage({type: 'error', text: 'Vyplňte všechna povinná pole'})
      return
    }

    try {
      setIsSaving(true)
      const url = editingItem.id 
        ? `/api/admin/page-content?id=${editingItem.id}`
        : '/api/admin/page-content'
      
      const method = editingItem.id ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editingItem)
      })

      if (response.ok) {
        setMessage({type: 'success', text: editingItem.id ? 'Obsah byl upraven' : 'Obsah byl vytvořen'})
        setEditingItem(null)
        fetchObsahy()
      } else {
        const error = await response.json()
        setMessage({type: 'error', text: error.chyba || 'Chyba při ukládání'})
      }
    } catch (error) {
      setMessage({type: 'error', text: 'Chyba při ukládání obsahu'})
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Opravdu chcete smazat tento obsah?')) return

    try {
      const response = await fetch(`/api/admin/page-content?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessage({type: 'success', text: 'Obsah byl smazán'})
        fetchObsahy()
      } else {
        setMessage({type: 'error', text: 'Chyba při mazání obsahu'})
      }
    } catch (error) {
      setMessage({type: 'error', text: 'Chyba při mazání obsahu'})
    }
  }

  const filteredObsahy = selectedStranka === 'all' 
    ? obsahy 
    : obsahy.filter(item => item.stranka === selectedStranka)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#B8A876]">Editor obsahu</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">Spravujte textový obsah všech stránek webu</p>
        </div>
        <Button onClick={() => setEditingItem({klic: '', hodnota: '', stranka: 'homepage'})} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Přidat obsah
        </Button>
      </div>

      {message && (
        <Alert className={message.type === 'success' ? 'border-green-500' : 'border-red-500'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Editor form */}
      {editingItem && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem.id ? 'Upravit obsah' : 'Nový obsah'}</CardTitle>
            <CardDescription>
              Upravte textový obsah, který se zobrazí na webu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="klic">Klíč obsahu *</Label>
                <Input
                  id="klic"
                  value={editingItem.klic}
                  onChange={(e) => setEditingItem({...editingItem, klic: e.target.value})}
                  placeholder="např. hero_nadpis"
                />
              </div>
              <div>
                <Label htmlFor="stranka">Stránka *</Label>
                <Select 
                  value={editingItem.stranka}
                  onValueChange={(value) => setEditingItem({...editingItem, stranka: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STRANKY.map(str => (
                      <SelectItem key={str} value={str}>{str}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="hodnota">Obsah *</Label>
              <Textarea
                id="hodnota"
                value={editingItem.hodnota}
                onChange={(e) => setEditingItem({...editingItem, hodnota: e.target.value})}
                placeholder="Zadejte textový obsah..."
                rows={4}
                className="sm:rows-6"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Uložit
              </Button>
              <Button variant="outline" onClick={() => setEditingItem(null)} className="w-full sm:w-auto">
                Zrušit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seznam obsahů */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-base sm:text-lg">Existující obsah</CardTitle>
            <Select value={selectedStranka} onValueChange={setSelectedStranka}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny stránky</SelectItem>
                {STRANKY.map(str => (
                  <SelectItem key={str} value={str}>{str}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredObsahy.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start justify-between p-3 sm:p-4 border rounded-lg gap-3">
                <div className="flex-1 w-full sm:w-auto min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <code className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs sm:text-sm font-mono break-all">
                      {item.klic}
                    </code>
                    <span className="text-xs sm:text-sm text-muted-foreground bg-accent text-accent-foreground px-2 py-1 rounded w-fit">
                      {item.stranka}
                    </span>
                  </div>
                  <p className="text-foreground text-xs sm:text-sm line-clamp-3 break-words">
                    {item.hodnota}
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto sm:ml-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setEditingItem(item)}
                    className="flex-1 sm:flex-none"
                  >
                    <Edit className="h-4 w-4 mr-1 sm:mr-0" />
                    <span className="sm:hidden">Upravit</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => item.id && handleDelete(item.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <Trash2 className="h-4 w-4 mr-1 sm:mr-0" />
                    <span className="sm:hidden">Smazat</span>
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredObsahy.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Žádný obsah nebyl nalezen
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}