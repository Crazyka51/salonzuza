'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock, 
  Settings, 
  Users, 
  BarChart3,
  CalendarDays,
  Check,
  X,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { CalendarView, ReservationForm } from '../../../admin-kit/ui/Calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Rezervace } from '../../../types/rezervace';

// Typy pro provozní hodiny
interface ProvozniHodiny {
  id: number;
  denTydne: number;
  casOtevrani: string;
  casZavreni: string;
  jeZavreno: boolean;
}

export function BookingWidget() {
  const [activeTab, setActiveTab] = useState('seznam');
  const [rezervace, setRezervace] = useState<Rezervace[]>([]);
  const [provozniHodiny, setProvozniHodiny] = useState<ProvozniHodiny[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingHodiny, setLoadingHodiny] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date());
  const [showReservationForm, setShowReservationForm] = useState(false);

  // Mock data pro demo - v reálnosti by se načítalo z API
  const mockRezervace: Rezervace[] = [
    {
      id: 1,
      jmeno: 'Anna',
      prijmeni: 'Nováková',
      email: 'anna.novakova@email.cz',
      telefon: '+420 777 123 456',
      datum: '2026-02-06',
      cas_od: '10:00',
      cas_do: '10:45',
      sluzba: {
        nazev: 'Dámský střih',
        kategorie: {
          nazev: 'Klasické účesy'
        }
      },
      stav: 'confirmed',
      cena: 800,
      created_at: '2026-02-05T10:30:00Z'
    },
    {
      id: 2,
      jmeno: 'Marie',
      prijmeni: 'Svobodová',
      email: 'marie.svobodova@email.cz',
      telefon: '+420 608 987 654',
      datum: '2026-02-06',
      cas_od: '14:30',
      cas_do: '16:30',
      sluzba: {
        nazev: 'Barvení vlasů',
        kategorie: {
          nazev: 'Barvení a úprava'
        }
      },
      stav: 'pending',
      cena: 2500,
      created_at: '2026-02-05T15:20:00Z'
    },
    {
      id: 3,
      jmeno: 'Petra',
      prijmeni: 'Procházková',
      email: 'petra.prochazka@email.cz',
      telefon: '+420 721 456 789',
      datum: '2026-02-07',
      cas_od: '09:00',
      cas_do: '12:00',
      sluzba: {
        nazev: 'Melírování',
        kategorie: {
          nazev: 'Barvení a úprava'
        }
      },
      poznamka: 'Světlé melíry, přírodnější tón',
      stav: 'confirmed',
      cena: 3200,
      created_at: '2026-02-04T20:15:00Z'
    }
  ];

  const mockProvozniHodiny: ProvozniHodiny[] = []; // Již se nepoužívá, ale necháme prázdné pro jistotu

  useEffect(() => {
    loadReservations();
    loadProvozniHodiny();
  }, []);

  // Načtení provozních hodin z API
  const loadProvozniHodiny = async () => {
    setLoadingHodiny(true);
    try {
      const response = await fetch('/api/admin/provozni-hodiny');
      if (response.ok) {
        const data = await response.json();
        setProvozniHodiny(data);
      }
    } catch (error) {
      console.error('Chyba při načítání provozních hodin:', error);
    } finally {
      setLoadingHodiny(false);
    }
  };

  const handleEditOpeningHours = async (den: ProvozniHodiny) => {
    if (den.jeZavreno) {
      if (confirm(`Chcete otevřít v ${getDayName(den.denTydne)}?`)) {
        await updateOpeningHours(den.id, '09:00', '18:00', false);
      }
      return;
    }

    const input = prompt(
      `Upravit otevírací dobu pro ${getDayName(den.denTydne)} (formát HH:MM-HH:MM nebo 'zavřeno'):`,
      `${den.casOtevrani}-${den.casZavreni}`
    );

    if (input === null) return;
    
    if (input.toLowerCase() === 'zavřeno') {
      await updateOpeningHours(den.id, '00:00', '00:00', true);
      return;
    }

    const match = input.match(/^(\d{2}:\d{2})-(\d{2}:\d{2})$/);
    if (!match) {
      alert('Neplatný formát. Použijte HH:MM-HH:MM');
      return;
    }

    await updateOpeningHours(den.id, match[1], match[2], false);
  };

  const updateOpeningHours = async (id: number, casOtevrani: string, casZavreni: string, jeZavreno: boolean) => {
    try {
      const response = await fetch('/api/admin/provozni-hodiny', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, casOtevrani, casZavreni, jeZavreno })
      });
      
      if (response.ok) {
        alert('Otevírací doba byla aktualizována!');
        loadProvozniHodiny();
      } else {
        alert('Chyba při ukládání.');
      }
    } catch (error) {
      console.error('Error updating hours:', error);
      alert('Chyba při úpravě.');
    }
  };

  // Načtení rezervací z API
  const loadReservations = async () => {
    setLoading(true);
    try {
      // Načteme rezervace za posledních 30 dní a dalších 30 dní
      const today = new Date();
      const startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      const endDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      const response = await fetch(
        `/api/rezervace?datum_od=${startDate.toISOString().split('T')[0]}&datum_do=${endDate.toISOString().split('T')[0]}`
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('načtené rezervace z API:', data.rezervace);
        setRezervace(data.rezervace || []);
      } else {
        console.error('API chyba:', response.status, response.statusText);
        setRezervace([]);
      }
    } catch (error) {
      console.error('Chyba při načítání rezervací:', error);
      setRezervace([]);
    } finally {
      setLoading(false);
    }
  };

  // Handlery pro kalendář
  const handleCalendarDateSelect = (date: Date) => {
    setSelectedCalendarDate(date);
  };

  const handleReservationClick = (rezervace: Rezervace) => {
    console.log('Klik na rezervaci:', rezervace);
    // TODO: Otevřít detail/editaci rezervace
  };

  const handleEditReservation = async (rezervace: Rezervace) => {
    console.log('Editace rezervace:', rezervace);
    // TODO: Otevřít formulář pro editaci s předvyplněnými údaji
    // Prozatím jen zobrazíme alert
    const newNote = prompt('Zadejte novou poznámku:', rezervace.poznamka || '');
    if (newNote !== null) {
      try {
        const response = await fetch(`/api/rezervace/${rezervace.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...rezervace, poznamka: newNote }),
        });
        
        if (response.ok) {
          alert('Rezervace byla upravena!');
          loadReservations(); // Obnovit seznam
        } else {
          alert('Chyba při úpravě rezervace');
        }
      } catch (error) {
        console.error('Chyba při úpravě:', error);
        alert('Chyba při úpravě rezervace');
      }
    }
  };

  const handleDeleteReservation = async (rezervace: Rezervace) => {
    if (confirm(`Opravdu chcete smazat rezervaci pro ${rezervace.jmeno} ${rezervace.prijmeni}?`)) {
      try {
        const response = await fetch(`/api/rezervace/${rezervace.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          alert('Rezervace byla smazána!');
          loadReservations(); // Obnovit seznam
        } else {
          alert('Chyba při mazání rezervace');
        }
      } catch (error) {
        console.error('Chyba při mazání:', error);
        alert('Chyba při mazání rezervace');
      }
    }
  };

  const handleConfirmReservation = async (rezervace: Rezervace) => {
    try {
      const response = await fetch(`/api/rezervace/${rezervace.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...rezervace, stav: 'confirmed' }),
      });
      
      if (response.ok) {
        alert('Rezervace byla potvrzena!');
        loadReservations(); // Obnovit seznam
      } else {
        alert('Chyba při potvrzování rezervace');
      }
    } catch (error) {
      console.error('Chyba při potvrzování:', error);
      alert('Chyba při potvrzování rezervace');
    }
  };

  const handleCreateReservation = (date?: Date, time?: string) => {
    if (date) {
      setSelectedCalendarDate(date);
    }
    setShowReservationForm(true);
  };

  const handleReservationFormSuccess = () => {
    loadReservations(); // Obnovit seznam rezervací
  };

  const getStatusBadge = (stav: string) => {
    const statusConfig = {
      pending: { label: 'Čeká na potvrzení', variant: 'secondary' as const, className: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
      confirmed: { label: 'Potvrzeno', variant: 'default' as const, className: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200' },
      completed: { label: 'Dokončeno', variant: 'outline' as const, className: 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      cancelled: { label: 'Zrušeno', variant: 'destructive' as const, className: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200' }
    };

    const config = statusConfig[stav as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK'
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('cs-CZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDayName = (dayNumber: number) => {
    const days = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
    return days[dayNumber];
  };

  // Statistiky
  const getBookingStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    const todayBookings = rezervace.filter(r => r.datum === today);
    const monthlyBookings = rezervace.filter(r => {
      const bookingDate = new Date(r.datum);
      return bookingDate.getMonth() === thisMonth && bookingDate.getFullYear() === thisYear;
    });
    
    const pendingBookings = rezervace.filter(r => r.stav === 'pending');
    const monthlyRevenue = monthlyBookings.reduce((sum, r) => sum + r.cena, 0);

    return {
      today: todayBookings.length,
      monthly: monthlyBookings.length,
      pending: pendingBookings.length,
      revenue: monthlyRevenue
    };
  };

  const stats = getBookingStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B8A876]"></div>
        <span className="ml-2 text-muted-foreground">Načítání rezervací...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#B8A876]">
            Rezervační systém
          </h1>
          <p className="text-muted-foreground mt-2">
            Správa rezervací, kalendář obsazenosti a nastavení provozních hodin
          </p>
        </div>
        <Button className="bg-[#B8A876] hover:bg-[#A39566]">
          <Plus className="h-4 w-4 mr-2" />
          Nová rezervace
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dnes</CardTitle>
            <CalendarDays className="h-4 w-4 text-[#B8A876]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.today}</div>
            <p className="text-xs text-muted-foreground">rezervací</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tento měsíc</CardTitle>
            <BarChart3 className="h-4 w-4 text-[#B8A876]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthly}</div>
            <p className="text-xs text-muted-foreground">rezervací</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Čeká na potvrzení</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">rezervací</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tržby tento měsíc</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.revenue)}</div>
            <p className="text-xs text-muted-foreground">celková částka</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="seznam">Seznam rezervací</TabsTrigger>
          <TabsTrigger value="kalendar">Kalendář</TabsTrigger>
          <TabsTrigger value="nastaveni">Nastavení</TabsTrigger>
          <TabsTrigger value="statistiky">Statistiky</TabsTrigger>
        </TabsList>

        {/* Seznam rezervací */}
        <TabsContent value="seznam" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Seznam všech rezervací</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={() => handleCreateReservation()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nová rezervace
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrovat
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Klient</TableHead>
                    <TableHead>Datum & Čas</TableHead>
                    <TableHead>Služba</TableHead>
                    <TableHead>Stav</TableHead>
                    <TableHead>Cena</TableHead>
                    <TableHead>Akce</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rezervace.map((rezervace) => (
                    <TableRow key={rezervace.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {rezervace.jmeno} {rezervace.prijmeni}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {rezervace.email}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <PhoneCall className="h-3 w-3 text-muted-foreground" />
                            {rezervace.telefon}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{formatDate(rezervace.datum)}</div>
                          <div className="text-sm text-muted-foreground">
                            {(rezervace.cas_od || rezervace.casOd)} - {(rezervace.cas_do || rezervace.casDo)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rezervace.sluzba?.nazev || 'Služba není specifikována'}</div>
                          {rezervace.poznamka && (
                            <div className="text-sm text-muted-foreground">
                              {rezervace.poznamka}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(rezervace.stav)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(rezervace.cena)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Zobrazit detail"
                            onClick={() => handleReservationClick(rezervace)}
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Upravit rezervaci"
                            onClick={() => handleEditReservation(rezervace)}
                          >
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          {rezervace.stav === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Potvrdit rezervaci"
                              onClick={() => handleConfirmReservation(rezervace)}
                            >
                              <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Zrušit rezervaci"
                            onClick={() => handleDeleteReservation(rezervace)}
                          >
                            <X className="h-4 w-4 text-red-500 dark:text-red-400" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Kalendář */}
        <TabsContent value="kalendar" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Kalendářní pohled</h2>
              <Button onClick={() => handleCreateReservation()}>
                <Plus className="h-4 w-4 mr-2" />
                Nová rezervace
              </Button>
            </div>
            <CalendarView
              selectedDate={selectedCalendarDate}
              onDateSelect={handleCalendarDateSelect}
              onReservationClick={handleReservationClick}
              onCreateReservation={handleCreateReservation}
              onEditReservation={handleEditReservation}
              onDeleteReservation={handleDeleteReservation}
            />
          </div>
        </TabsContent>

        {/* Nastavení */}
        <TabsContent value="nastaveni" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Provozní hodiny</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingHodiny ? (
                    <div className="text-center py-4">Načítání...</div>
                  ) : (
                    provozniHodiny.map((den) => (
                      <div key={den.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="font-medium">
                          {getDayName(den.denTydne)}
                        </div>
                        <div className="flex items-center gap-4">
                          {den.jeZavreno ? (
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">Zavřeno</Badge>
                              <Button variant="outline" size="sm" onClick={() => handleEditOpeningHours(den)}>
                                Otevřít
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{den.casOtevrani} - {den.casZavreni}</span>
                              <Button variant="outline" size="sm" onClick={() => handleEditOpeningHours(den)}>
                                Upravit
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {provozniHodiny.length === 0 && !loadingHodiny && (
                    <div className="text-center py-4 text-muted-foreground">
                      Žádná data nejsou k dispozici.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blokování termínů</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-8 text-center text-muted-foreground">
                  <Settings className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Správa blokovaných termínů</h3>
                  <p>Zde můžete blokovat termíny pro dovolené, údržbu nebo jiné události.</p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Přidat blokovaný termín
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Statistiky */}
        <TabsContent value="statistiky" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistiky rezervací</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-8 text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Detailní statistiky a reporty</h3>
                  <p>Analýzy obsazenosti, nejpopulárnější služby, tržby a další metriky.</p>
                  <p className="text-sm mt-2">Bude implementováno s pokročilými grafy a exporty.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Formulář pro novou rezervaci */}
      <ReservationForm
        isOpen={showReservationForm}
        onClose={() => setShowReservationForm(false)}
        onSuccess={handleReservationFormSuccess}
        preselectedDate={selectedCalendarDate}
      />
    </div>
  );
}