'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Edit,
  Trash2,
  Plus,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Rezervace, CalendarViewProps } from '../../../types/rezervace';
import { Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';

const DAYS_NAMES = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
const MONTHS_NAMES = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

const STATUS_STYLES = {
  pending: { className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: 'Čeká na potvrzení' },
  confirmed: { className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200', label: 'Potvrzeno' },
  completed: { className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', label: 'Dokončeno' },
  cancelled: { className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: 'Zrušeno' },
};

export function CalendarView({ 
  onDateSelect, 
  onReservationClick, 
  onCreateReservation,
  onEditReservation,
  onDeleteReservation,
  selectedDate = new Date() 
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rezervace, setRezervace] = useState<Rezervace[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState<Rezervace | null>(null);
  const [showReservationDetails, setShowReservationDetails] = useState(false);

  // Načtení rezervací pro aktuální měsíc
  useEffect(() => {
    loadReservations();
  }, [currentDate]);

  const loadReservations = async () => {
    setLoading(true);
    try {
      // Načtení rezervací pro celý měsíc
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const response = await fetch(
        `/api/rezervace?datum_od=${startOfMonth.toISOString().split('T')[0]}&datum_do=${endOfMonth.toISOString().split('T')[0]}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setRezervace(data.rezervace || []);
      }
    } catch (error) {
      console.error('Chyba při načítání rezervací:', error);
    } finally {
      setLoading(false);
    }
  };

  // Navigace ve kalendáři
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Získání prvního dne měsíce a počtu dnů
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  // Generování kalendářních dnů
  const calendarDays = [];
  
  // Prázdné buňky před prvním dnem měsíce
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Dny aktuálního měsíce
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Získání rezervací pro konkrétní den
  const getReservationsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return rezervace.filter(r => r.datum.startsWith(dateStr));
  };

  // Kliknutí na den
  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect?.(clickedDate);
  };

  // Kliknutí na rezervaci
  const handleReservationClick = (rezervace: Rezervace) => {
    setSelectedReservation(rezervace);
    setShowReservationDetails(true);
    onReservationClick?.(rezervace);
  };

  const formatCena = (cena: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(cena);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="space-y-4">
      {/* Hlavička kalendáře */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Calendar className="h-5 w-5" />
                <span>Kalendář rezervací</span>
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Dnes
              </Button>
              <Button variant="ghost" size="sm" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium min-w-30 text-center text-foreground">
                {MONTHS_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Button variant="ghost" size="sm" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {/* Hlavička s názvy dnů */}
            {DAYS_NAMES.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Kalendářní dny */}
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2 h-20"></div>;
              }

              const dayReservations = getReservationsForDay(day);
              const hasReservations = dayReservations.length > 0;

              return (
                <div
                  key={day}
                  className={`
                    p-1 h-20 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50
                    ${isToday(day) ? 'bg-primary/10 border-primary' : 'border-border'}
                    ${isSelected(day) ? 'ring-2 ring-primary' : ''}
                  `}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="flex flex-col h-full">
                    <div className={`text-sm font-medium ${isToday(day) ? 'text-primary' : ''}`}>
                      {day}
                    </div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                      {dayReservations.slice(0, 2).map((rezervace, idx) => (
                        <TooltipProvider key={rezervace.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={`
                                  text-xs p-1 rounded cursor-pointer truncate
                                  ${STATUS_STYLES[rezervace.stav].className}
                                `}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReservationClick(rezervace);
                                }}
                              >
                                {(rezervace.casOd || rezervace.cas_od)} {rezervace.jmeno}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                <div className="font-medium">{rezervace.jmeno} {rezervace.prijmeni}</div>
                                <div>{(rezervace.casOd || rezervace.cas_od)} - {(rezervace.casDo || rezervace.cas_do)}</div>
                                <div>{rezervace.sluzba?.nazev}</div>
                                <div className="text-muted-foreground">{STATUS_STYLES[rezervace.stav].label}</div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                      {dayReservations.length > 2 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{dayReservations.length - 2} dalších
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialog s detailem rezervace */}
      <Dialog open={showReservationDetails} onOpenChange={setShowReservationDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detail rezervace</DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={STATUS_STYLES[selectedReservation.stav].className}>
                  {STATUS_STYLES[selectedReservation.stav].label}
                </Badge>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="hover:bg-muted"
                    onClick={() => onEditReservation?.(selectedReservation)}
                  >
                    <Edit className="h-3 w-3 text-foreground" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="hover:bg-muted"
                    onClick={() => onDeleteReservation?.(selectedReservation)}
                  >
                    <Trash2 className="h-3 w-3 text-foreground" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{selectedReservation.jmeno} {selectedReservation.prijmeni}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{(selectedReservation.casOd || selectedReservation.cas_od)} - {(selectedReservation.casDo || selectedReservation.cas_do)}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedReservation.telefon}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{selectedReservation.email}</span>
                </div>

                {selectedReservation.sluzba && (
                  <div>
                    <div className="font-medium text-foreground">{selectedReservation.sluzba.nazev}</div>
                    <div className="text-sm text-muted-foreground">{selectedReservation.sluzba.kategorie.nazev}</div>
                  </div>
                )}

                {selectedReservation.zamestnanec && (
                  <div>
                    <div className="font-medium text-foreground">
                      {selectedReservation.zamestnanec.jmeno} {selectedReservation.zamestnanec.prijmeni}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {selectedReservation.zamestnanec.uroven.replace('_', ' ')}
                    </div>
                  </div>
                )}

                <div className="font-medium text-lg text-foreground">
                  {formatCena(selectedReservation.cena)}
                </div>

                {selectedReservation.poznamka && (
                  <div>
                    <div className="font-medium text-sm text-foreground">Poznámka:</div>
                    <div className="text-sm text-muted-foreground">{selectedReservation.poznamka}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}