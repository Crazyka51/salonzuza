'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CreditCard,
  MessageSquare,
  Save,
  X,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';
import { Badge } from '../../../components/ui/badge';
import {
  Alert,
  AlertDescription,
} from '../../../components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';

interface Sluzba {
  id: number;
  nazev: string;
  dobaTrvaniMinuty: number;
  cenaTopStylist: number;
  cenaStylist: number;
  cenaJuniorStylist: number;
  kategorie: {
    nazev: string;
  };
}

interface Zamestnanec {
  id: number;
  jmeno: string;
  prijmeni: string;
  uroven: string;
}

interface DostupnyTermin {
  time: string;
  available: boolean;
}

interface ReservationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  preselectedDate?: Date;
  preselectedTime?: string;
}

export function ReservationForm({ 
  isOpen, 
  onClose, 
  onSuccess, 
  preselectedDate,
  preselectedTime 
}: ReservationFormProps) {
  const [formData, setFormData] = useState({
    jmeno: '',
    prijmeni: '',
    email: '',
    telefon: '',
    datum: preselectedDate?.toISOString().split('T')[0] || '',
    casOd: preselectedTime || '',
    sluzbaId: '',
    zamestnanecId: '',
    poznamka: '',
    zpusobPlatby: 'hotove',
    notifikaceEmail: true,
    notifikaceSms: false,
  });

  const [sluzby, setSluzby] = useState<Sluzba[]>([]);
  const [zamestnanci, setZamestnanci] = useState<Zamestnanec[]>([]);
  const [dostupneTerminy, setDostupneTerminy] = useState<DostupnyTermin[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTerminy, setLoadingTerminy] = useState(false);
  const [error, setError] = useState('');
  const [selectedSluzba, setSelectedSluzba] = useState<Sluzba | null>(null);
  const [selectedZamestnanec, setSelectedZamestnanec] = useState<Zamestnanec | null>(null);

  // Načtení služeb a zaměstnanců při otevření formuláře
  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  // Načtení dostupných termínů při změně data nebo služby
  useEffect(() => {
    if (formData.datum && (formData.sluzbaId || selectedSluzba)) {
      loadDostupneTerminy();
    }
  }, [formData.datum, formData.sluzbaId, formData.zamestnanecId]);

  const loadInitialData = async () => {
    try {
      // Načtení služeb
      const sluzbyResponse = await fetch('/api/admin/sluzby');
      if (sluzbyResponse.ok) {
        const sluzbyData = await sluzbyResponse.json();
        setSluzby(sluzbyData.sluzby || []);
      }

      // Načtení zaměstnanců
      const zamestnaniResponse = await fetch('/api/admin/zamestnanci');
      if (zamestnaniResponse.ok) {
        const zamestnaniData = await zamestnaniResponse.json();
        setZamestnanci(zamestnaniData.zamestnanci || []);
      }
    } catch (error) {
      console.error('Chyba při načítání dat:', error);
      setError('Nepodařilo se načíst data pro formulář');
    }
  };

  const loadDostupneTerminy = async () => {
    setLoadingTerminy(true);
    try {
      const params = new URLSearchParams({
        datum: formData.datum,
      });

      if (formData.sluzbaId) {
        params.append('sluzbaId', formData.sluzbaId);
      }

      if (formData.zamestnanecId) {
        params.append('zamestnanecId', formData.zamestnanecId);
      }

      const response = await fetch(`/api/rezervace/dostupne-terminy?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setDostupneTerminy(data.dostupneTerminy || []);
      }
    } catch (error) {
      console.error('Chyba při načítání dostupných termínů:', error);
    } finally {
      setLoadingTerminy(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setError('');
  };

  const handleSluzbaChange = (sluzbaId: string) => {
    const sluzba = sluzby.find(s => s.id.toString() === sluzbaId);
    setSelectedSluzba(sluzba || null);
    handleInputChange('sluzbaId', sluzbaId);
  };

  const handleZamestnanecChange = (zamestnanecId: string) => {
    const zamestnanec = zamestnanci.find(z => z.id.toString() === zamestnanecId);
    setSelectedZamestnanec(zamestnanec || null);
    handleInputChange('zamestnanecId', zamestnanecId);
  };

  const calculateCena = () => {
    if (!selectedSluzba || !selectedZamestnanec) return 0;
    
    switch (selectedZamestnanec.uroven) {
      case 'top_stylist':
        return selectedSluzba.cenaTopStylist;
      case 'stylist':
        return selectedSluzba.cenaStylist;
      case 'junior_stylist':
        return selectedSluzba.cenaJuniorStylist;
      default:
        return selectedSluzba.cenaStylist;
    }
  };

  const calculateEndTime = () => {
    if (!formData.casOd || !selectedSluzba) return '';
    
    const [hours, minutes] = formData.casOd.split(':').map(Number);
    const endMinutes = minutes + selectedSluzba.dobaTrvaniMinuty;
    const endHours = hours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
  };

  const validateForm = () => {
    if (!formData.jmeno.trim()) return 'Jméno je povinné';
    if (!formData.prijmeni.trim()) return 'Příjmení je povinné';
    if (!formData.email.trim()) return 'Email je povinný';
    if (!formData.telefon.trim()) return 'Telefon je povinný';
    if (!formData.datum) return 'Datum je povinné';
    if (!formData.casOd) return 'Čas začátku je povinný';
    if (!formData.sluzbaId) return 'Služba je povinná';

    // Validace emailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Neplatný formát emailu';
    }

    // Validace telefonu
    const phoneRegex = /^(\+420)?[0-9]{9}$/;
    if (!phoneRegex.test(formData.telefon.replace(/\s/g, ''))) {
      return 'Neplatný formát telefonu';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endTime = calculateEndTime();
      const cena = calculateCena();

      const reservationData = {
        ...formData,
        casDo: endTime,
        cena,
        sluzbaId: parseInt(formData.sluzbaId),
        zamestnanecId: formData.zamestnanecId ? parseInt(formData.zamestnanecId) : null,
      };

      const response = await fetch('/api/rezervace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        onSuccess();
        onClose();
        resetForm();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Nepodařilo se vytvořit rezervaci');
      }
    } catch (error) {
      console.error('Chyba při vytváření rezervace:', error);
      setError('Nepodařilo se vytvořit rezervaci');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      jmeno: '',
      prijmeni: '',
      email: '',
      telefon: '',
      datum: '',
      casOd: '',
      sluzbaId: '',
      zamestnanecId: '',
      poznamka: '',
      zpusobPlatby: 'hotove',
      notifikaceEmail: true,
      notifikaceSms: false,
    });
    setSelectedSluzba(null);
    setSelectedZamestnanec(null);
    setError('');
  };

  const formatCena = (cena: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(cena);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nová rezervace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Zákazník */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <User className="h-5 w-5" />
                <span>Kontaktní údaje zákazníka</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jmeno">Jméno *</Label>
                  <Input
                    id="jmeno"
                    value={formData.jmeno}
                    onChange={(e) => handleInputChange('jmeno', e.target.value)}
                    placeholder="Zadejte jméno"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prijmeni">Příjmení *</Label>
                  <Input
                    id="prijmeni"
                    value={formData.prijmeni}
                    onChange={(e) => handleInputChange('prijmeni', e.target.value)}
                    placeholder="Zadejte příjmení"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="priklad@email.cz"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefon">Telefon *</Label>
                <Input
                  id="telefon"
                  value={formData.telefon}
                  onChange={(e) => handleInputChange('telefon', e.target.value)}
                  placeholder="+420 777 123 456"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Termín a služba */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Calendar className="h-5 w-5" />
                <span>Termín a služba</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="datum">Datum *</Label>
                  <Input
                    id="datum"
                    type="date"
                    value={formData.datum}
                    onChange={(e) => handleInputChange('datum', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sluzba">Služba *</Label>
                  <Select value={formData.sluzbaId} onValueChange={handleSluzbaChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Vyberte službu" />
                    </SelectTrigger>
                    <SelectContent>
                      {sluzby.map(sluzba => (
                        <SelectItem key={sluzba.id} value={sluzba.id.toString()}>
                          <div>
                            <div>{sluzba.nazev}</div>
                            <div className="text-sm text-muted-foreground">
                              {sluzba.dobaTrvaniMinuty} min • {sluzba.kategorie.nazev}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedSluzba && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm">
                    <strong>Doba trvání:</strong> {selectedSluzba.dobaTrvaniMinuty} minut
                  </div>
                  <div className="text-sm">
                    <strong>Ceny:</strong> {formatCena(selectedSluzba.cenaJuniorStylist)} - {formatCena(selectedSluzba.cenaTopStylist)}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="zamestnanec">Kadeřník (volitelné)</Label>
                <Select value={formData.zamestnanecId} onValueChange={handleZamestnanecChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte kadeřníka nebo nechte prázdné" />
                  </SelectTrigger>
                  <SelectContent>
                    {zamestnanci.map(zamestnanec => (
                      <SelectItem key={zamestnanec.id} value={zamestnanec.id.toString()}>
                        <div>
                          <div>{zamestnanec.jmeno} {zamestnanec.prijmeni}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {zamestnanec.uroven.replace('_', ' ')}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="casOd">Dostupné termíny *</Label>
                {loadingTerminy ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Načítám dostupné termíny...
                  </div>
                ) : dostupneTerminy.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {dostupneTerminy.filter(t => t.available).map(termin => (
                      <Button
                        key={termin.time}
                        type="button"
                        variant={formData.casOd === termin.time ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInputChange('casOd', termin.time)}
                      >
                        {termin.time}
                      </Button>
                    ))}
                  </div>
                ) : formData.datum && selectedSluzba ? (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Pro vybraný den nejsou k dispozici žádné termíny.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <p className="text-sm text-muted-foreground">Vyberte datum a službu pro zobrazení dostupných termínů.</p>
                )}
              </div>

              {formData.casOd && selectedSluzba && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">
                      {formData.casOd} - {calculateEndTime()}
                    </span>
                  </div>
                  {selectedZamestnanec && (
                    <div className="mt-1 font-medium text-lg">
                      {formatCena(calculateCena())}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dodatečné informace */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <MessageSquare className="h-5 w-5" />
                <span>Dodatečné informace</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="poznamka">Poznámka</Label>
                <Textarea
                  id="poznamka"
                  value={formData.poznamka}
                  onChange={(e) => handleInputChange('poznamka', e.target.value)}
                  placeholder="Speciální požadavky, poznámky..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="zpusobPlatby">Způsob platby</Label>
                <Select value={formData.zpusobPlatby} onValueChange={(value) => handleInputChange('zpusobPlatby', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotove">Hotově</SelectItem>
                    <SelectItem value="karta">Kartou</SelectItem>
                    <SelectItem value="prevod">Bankovní převod</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notifikace</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifikaceEmail"
                    checked={formData.notifikaceEmail}
                    onCheckedChange={(checked) => handleInputChange('notifikaceEmail', checked as boolean)}
                  />
                  <Label htmlFor="notifikaceEmail" className="text-sm">Poslat potvrzovací email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifikaceSms"
                    checked={formData.notifikaceSms}
                    onCheckedChange={(checked) => handleInputChange('notifikaceSms', checked as boolean)}
                  />
                  <Label htmlFor="notifikaceSms" className="text-sm">Poslat SMS připomínku</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Akce */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              <X className="h-4 w-4 mr-2" />
              Zrušit
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Vytváření...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Vytvořit rezervaci
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}