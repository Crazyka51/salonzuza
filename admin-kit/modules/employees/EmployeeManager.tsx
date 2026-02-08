"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  Clock,
  Save,
  X
} from "lucide-react"

interface IZamestnanec {
  id: number
  jmeno: string
  prijmeni: string
  uroven: string
  email: string
  telefon?: string
  fotoUrl?: string
  jeAktivni: boolean
}

interface ZamestnanecForm {
  jmeno: string
  prijmeni: string
  uroven: string
  email: string
  telefon: string
  fotoUrl: string
}

const UROVNE_STYLISTU = [
  { value: "top_stylist", label: "Top Stylist", color: "bg-purple-100 text-purple-800" },
  { value: "stylist", label: "Stylist", color: "bg-blue-100 text-blue-800" },
  { value: "junior_stylist", label: "Junior Stylist", color: "bg-green-100 text-green-800" }
]

export function EmployeeManager() {
  const [zamestnanci, setZamestnanci] = useState<IZamestnanec[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<IZamestnanec | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  const [formData, setFormData] = useState<ZamestnanecForm>({
    jmeno: "",
    prijmeni: "",
    uroven: "stylist",
    email: "",
    telefon: "",
    fotoUrl: ""
  })

  const { toast } = useToast()

  // Načtení zaměstnanců
  useEffect(() => {
    loadZamestnanci()
  }, [])

  const loadZamestnanci = async () => {
    try {
      const response = await fetch('/api/admin/zamestnanci')
      if (response.ok) {
        const data = await response.json()
        setZamestnanci(data.zamestnanci || [])
      } else {
        throw new Error('Chyba při načítání')
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst seznam zaměstnanců",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.jmeno || !formData.prijmeni || !formData.email) {
      toast({
        title: "Chyba",
        description: "Vyplňte všechna povinná pole",
        variant: "destructive"
      })
      return
    }

    setIsSaving(true)
    try {
      const method = editingEmployee ? 'PUT' : 'POST'
      const url = editingEmployee ? `/api/admin/zamestnanci/${editingEmployee.id}` : '/api/admin/zamestnanci'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: "Úspěch",
          description: editingEmployee ? "Zaměstnanec byl upraven" : "Zaměstnanec byl přidán"
        })
        
        resetForm()
        loadZamestnanci()
      } else {
        throw new Error('Chyba při ukládání')
      }
    } catch (error) {
      toast({
        title: "Chyba", 
        description: "Nepodařilo se uložit zaměstnance",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (zamestnanec: IZamestnanec) => {
    setEditingEmployee(zamestnanec)
    setFormData({
      jmeno: zamestnanec.jmeno,
      prijmeni: zamestnanec.prijmeni,
      uroven: zamestnanec.uroven,
      email: zamestnanec.email,
      telefon: zamestnanec.telefon || "",
      fotoUrl: zamestnanec.fotoUrl || ""
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Opravdu chcete smazat tohoto zaměstnance?')) return

    try {
      const response = await fetch(`/api/admin/zamestnanci/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Úspěch",
          description: "Zaměstnanec byl smazán"
        })
        loadZamestnanci()
      } else {
        throw new Error('Chyba při mazání')
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se smazat zaměstnance", 
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setFormData({
      jmeno: "",
      prijmeni: "",
      uroven: "stylist", 
      email: "",
      telefon: "",
      fotoUrl: ""
    })
    setEditingEmployee(null)
    setShowForm(false)
  }

  const getUroveňLabel = (uroven: string) => {
    const found = UROVNE_STYLISTU.find(u => u.value === uroven)
    return found ? found.label : uroven
  }

  const getUroveňColor = (uroven: string) => {
    const found = UROVNE_STYLISTU.find(u => u.value === uroven)
    return found ? found.color : "bg-gray-100 text-gray-800"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6" />
            Správa zaměstnanců
          </h1>
          <p className="text-muted-foreground">Spravujte tým stylistů a jejich nastavení</p>
        </div>
        
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Přidat zaměstnance
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{zamestnanci.length}</p>
                <p className="text-sm text-muted-foreground">Celkem zaměstnanců</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {zamestnanci.filter(z => z.uroven === 'top_stylist').length}
                </p>
                <p className="text-sm text-muted-foreground">Top Stylistů</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {zamestnanci.filter(z => z.jeAktivni).length}
                </p>
                <p className="text-sm text-muted-foreground">Aktivních</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Modal/Panel */}
      {showForm && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {editingEmployee ? 'Upravit zaměstnance' : 'Nový zaměstnanec'}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jmeno">Jméno *</Label>
                <Input
                  id="jmeno"
                  value={formData.jmeno}
                  onChange={(e) => setFormData(prev => ({ ...prev, jmeno: e.target.value }))}
                  placeholder="Jméno"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prijmeni">Příjmení *</Label>
                <Input
                  id="prijmeni" 
                  value={formData.prijmeni}
                  onChange={(e) => setFormData(prev => ({ ...prev, prijmeni: e.target.value }))}
                  placeholder="Příjmení"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@priklad.cz"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefon">Telefon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="telefon"
                    value={formData.telefon}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefon: e.target.value }))}
                    placeholder="+420 123 456 789"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Úroveň *</Label>
                <Select
                  value={formData.uroven}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, uroven: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {UROVNE_STYLISTU.map(uroven => (
                      <SelectItem key={uroven.value} value={uroven.value}>
                        {uroven.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fotoUrl">URL fotky</Label>
                <Input
                  id="fotoUrl"
                  value={formData.fotoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, fotoUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Zrušit
                </Button>
                <Button type="submit" disabled={isSaving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isSaving ? "Ukládání..." : "Uložit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Employee List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zamestnanci.map(zamestnanec => (
          <Card key={zamestnanec.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={zamestnanec.fotoUrl || "/zajac.jpg"} />
                  <AvatarFallback>
                    {zamestnanec.jmeno.charAt(0)}{zamestnanec.prijmeni.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold truncate">
                        {zamestnanec.jmeno} {zamestnanec.prijmeni}
                      </h3>
                      <Badge className={`text-xs ${getUroveňColor(zamestnanec.uroven)}`}>
                        {getUroveňLabel(zamestnanec.uroven)}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(zamestnanec)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(zamestnanec.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{zamestnanec.email}</span>
                    </div>
                    {zamestnanec.telefon && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{zamestnanec.telefon}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant={zamestnanec.jeAktivni ? "default" : "secondary"}>
                      {zamestnanec.jeAktivni ? "Aktivní" : "Neaktivní"}
                    </Badge>
                    
                    <Button variant="outline" size="sm" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      Rozvrh
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {zamestnanci.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Žádní zaměstnanci</h3>
            <p className="text-muted-foreground mb-4">
              Přidejte první zaměstnance do systému
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Přidat zaměstnance
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}