"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Save, User, Mail, Phone, MapPin, Camera } from "lucide-react"
import { useAuth } from "@/admin-kit/core/auth/AuthProvider"

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  avatar?: string
  role: string
  createdAt: string
  updatedAt: string
}

export function ProfileManager() {
  let user
  let toast

  try {
    const auth = useAuth()
    user = auth.user
    const toastHook = useToast()
    toast = toastHook.toast
  } catch (error) {
    // AuthProvider not ready yet
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    role: "",
    createdAt: "",
    updatedAt: ""
  })

  // Update profile when user data is available
  useEffect(() => {
    if (user) {
      setProfile({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar || "",
        role: user.role || "",
        createdAt: user.createdAt || "",
        updatedAt: user.updatedAt || ""
      })
    }
  }, [user])

  // Načtení profilu při mountu
  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/admin/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      console.error('Chyba při načítání profilu:', error)
    }
  }

  const handleSave = async () => {
    if (!profile.name || !profile.email) {
      toast({
        title: "Chyba",
        description: "Vyplňte všechna povinná pole",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })

      if (response.ok) {
        toast({
          title: "Úspěch",
          description: "Profil byl úspěšně aktualizován"
        })
        fetchProfile()
      } else {
        throw new Error('Chyba při ukládání')
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se uložit profil",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Zde by byla logika pro upload avataru
      // Pro tuto ukázku jen simulujeme
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Uživatelský profil</h1>
          <p className="text-muted-foreground">Spravujte své osobní údaje a nastavení účtu</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Levý sloupec - Avatar a základní info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profilová fotka
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar || "/zajac.jpg"} />
                  <AvatarFallback className="text-lg">
                    {profile.name?.charAt(0) || profile.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <p className="font-medium">{profile.name || "Uživatel"}</p>
                  <p className="text-sm text-muted-foreground">{profile.role}</p>
                </div>

                <div className="w-full">
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-2 p-2 border border-dashed border-muted-foreground/25 rounded-md hover:bg-muted/50 transition-colors">
                      <Camera className="h-4 w-4" />
                      <span className="text-sm">Změnit fotku</span>
                    </div>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pravý sloupec - Formulář */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Osobní údaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Jméno *</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Vaše jméno"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="vas.email@priklad.cz"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profile.phone || ""}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+420 123 456 789"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresa</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={profile.address || ""}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Vaše adresa"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Ukládání...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Uložit změny
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Informace o účtu */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Informace o účtu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Vytvořeno:</span>
                  <p className="text-muted-foreground">
                    {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('cs-CZ') : 'Nezadáno'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Poslední aktualizace:</span>
                  <p className="text-muted-foreground">
                    {profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString('cs-CZ') : 'Nezadáno'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}