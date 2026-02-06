// Sdílené typy pro rezervační systém
export interface Rezervace {
  id: number;
  jmeno: string;
  prijmeni: string;
  email: string;
  telefon: string;
  datum: string;
  // Podpora obou formátů pro kompatibilitu
  casOd?: string;
  casDo?: string;
  cas_od?: string;
  cas_do?: string;
  sluzba?: {
    nazev: string;
    kategorie: {
      nazev: string;
    };
  };
  zamestnanec?: {
    jmeno: string;
    prijmeni: string;
    uroven: string;
  };
  poznamka?: string;
  stav: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  cena: number;
  zpusobPlatby?: string;
  // Podpora obou formátů pro kompatibilitu
  createdAt?: string;
  created_at?: string;
}

export interface CalendarViewProps {
  onDateSelect?: (date: Date) => void;
  onReservationClick?: (rezervace: Rezervace) => void;
  onCreateReservation?: (date: Date, time: string) => void;
  onEditReservation?: (rezervace: Rezervace) => void | Promise<void>;
  onDeleteReservation?: (rezervace: Rezervace) => void | Promise<void>;
  selectedDate?: Date;
}