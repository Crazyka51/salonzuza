interface NotificationConfig {
  email?: string;
  telefon?: string;
  jmeno?: string;
  prijmeni?: string;
}

interface ReservationData {
  id: number;
  datum: Date;
  casOd: string;
  casDo: string;
  sluzba?: {
    nazev: string;
  };
  zamestnanec?: {
    jmeno: string;
    prijmeni: string;
  };
  cena: number;
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export class NotificationService {
  // Email notifikace při vytvoření rezervace
  static async sendReservationConfirmation(
    config: NotificationConfig,
    reservation: ReservationData
  ): Promise<boolean> {
    try {
      console.log('📧 Odesílám potvrzovací email...');
      
      const emailData = {
        to: config.email,
        subject: 'Potvrzení rezervace - Salon Zuza',
        template: 'reservation-confirmation',
        data: {
          jmeno: config.jmeno,
          prijmeni: config.prijmeni,
          datum: reservation.datum.toLocaleDateString('cs-CZ'),
          casOd: reservation.casOd,
          casDo: reservation.casDo,
          sluzba: reservation.sluzba?.nazev || 'Služba',
          zamestnanec: reservation.zamestnanec 
            ? `${reservation.zamestnanec.jmeno} ${reservation.zamestnanec.prijmeni}`
            : 'Bude přidělen',
          cena: this.formatCena(reservation.cena),
          rezervaceId: reservation.id,
        },
      };

      // V produkci by se posílalo přes email service (Resend, SendGrid, apod.)
      const response = await fetch(`${getBaseUrl()}/api/notifications/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('✅ Email úspěšně odeslán');
        return true;
      } else {
        console.error('❌ Chyba při odesílání emailu:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('❌ Chyba při odesílání emailu:', error);
      return false;
    }
  }

  // Email notifikace při změně stavu rezervace
  static async sendStatusChangeNotification(
    config: NotificationConfig,
    reservation: ReservationData,
    newStatus: 'confirmed' | 'cancelled' | 'completed',
    oldStatus: string
  ): Promise<boolean> {
    try {
      console.log(`📧 Odesílám notifikaci o změně stavu ${oldStatus} → ${newStatus}...`);

      const statusMessages = {
        confirmed: 'Vaše rezervace byla potvrzena',
        cancelled: 'Vaše rezervace byla zrušena',
        completed: 'Děkujeme za návštěvu'
      };

      const emailData = {
        to: config.email,
        subject: `${statusMessages[newStatus]} - Salon Zuza`,
        template: 'status-change',
        data: {
          jmeno: config.jmeno,
          prijmeni: config.prijmeni,
          statusMessage: statusMessages[newStatus],
          datum: reservation.datum.toLocaleDateString('cs-CZ'),
          casOd: reservation.casOd,
          casDo: reservation.casDo,
          sluzba: reservation.sluzba?.nazev || 'Služba',
          rezervaceId: reservation.id,
        },
      };

      const response = await fetch(`${getBaseUrl()}/api/notifications/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('✅ Email notifikace úspěšně odeslána');
        return true;
      } else {
        console.error('❌ Chyba při odesílání notifikace:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('❌ Chyba při odesílání notifikace:', error);
      return false;
    }
  }

  // SMS připomínka před rezervací
  static async sendSmsReminder(
    config: NotificationConfig,
    reservation: ReservationData,
    hoursBeforeReminder: number = 24
  ): Promise<boolean> {
    try {
      console.log(`📱 Odesílám SMS připomínku ${hoursBeforeReminder}h před rezervací...`);

      const smsData = {
        to: config.telefon,
        message: `Připomínka: Zítra máte rezervaci v Salonu Zuza v ${reservation.casOd}. ${reservation.sluzba?.nazev || 'Služba'}. Tel: +420 777 123 456`,
        scheduledFor: new Date(reservation.datum.getTime() - (hoursBeforeReminder * 60 * 60 * 1000)),
      };

      // V produkci by se posílalo přes SMS service (Twilio, apod.)
      const response = await fetch(`${getBaseUrl()}/api/notifications/sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smsData),
      });

      if (response.ok) {
        console.log('✅ SMS připomínka naplánována');
        return true;
      } else {
        console.error('❌ Chyba při plánování SMS:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('❌ Chyba při plánování SMS:', error);
      return false;
    }
  }

  // Admin notifikace o nové rezervaci
  static async notifyAdminNewReservation(
    reservation: ReservationData,
    customerConfig: NotificationConfig
  ): Promise<boolean> {
    try {
      console.log('🔔 Odesílám admin notifikaci o nové rezervaci...');

      const adminEmailData = {
        to: process.env.ADMIN_EMAIL || 'admin@salonzuza.cz',
        subject: 'Nová rezervace - Salon Zuza',
        template: 'admin-new-reservation',
        data: {
          customerName: `${customerConfig.jmeno} ${customerConfig.prijmeni}`,
          customerEmail: customerConfig.email,
          customerPhone: customerConfig.telefon,
          datum: reservation.datum.toLocaleDateString('cs-CZ'),
          casOd: reservation.casOd,
          casDo: reservation.casDo,
          sluzba: reservation.sluzba?.nazev || 'Služba',
          cena: this.formatCena(reservation.cena),
          rezervaceId: reservation.id,
          adminUrl: `${getBaseUrl()}/admin/rezervace/${reservation.id}`,
        },
      };

      const response = await fetch(`${getBaseUrl()}/api/notifications/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminEmailData),
      });

      if (response.ok) {
        console.log('✅ Admin notifikace odeslána');
        return true;
      } else {
        console.error('❌ Chyba při odesílání admin notifikace:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('❌ Chyba při odesílání admin notifikace:', error);
      return false;
    }
  }

  // Hromadné notifikace pro připomínky (cron job)
  static async sendDailyReminders(): Promise<void> {
    try {
      console.log('🔄 Zpracovávám denní připomínky...');

      // Získání rezervací na následující den
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const response = await fetch(
        `${getBaseUrl()}/api/rezervace?datum=${tomorrow.toISOString().split('T')[0]}&stav=confirmed`
      );

      if (!response.ok) {
        throw new Error('Nepodařilo se načíst rezervace pro připomínky');
      }

      const { rezervace } = await response.json();

      // Odeslání připomínek pro rezervace, kde je povolen SMS
      const remindersPromises = rezervace
        .filter((r: any) => r.notifikaceSms)
        .map((r: any) => this.sendSmsReminder(
          {
            telefon: r.telefon,
            jmeno: r.jmeno,
            prijmeni: r.prijmeni,
          },
          {
            id: r.id,
            datum: new Date(r.datum),
            casOd: r.casOd,
            casDo: r.casDo,
            sluzba: r.sluzba,
            zamestnanec: r.zamestnanec,
            cena: r.cena,
          }
        ));

      const results = await Promise.allSettled(remindersPromises);
      const successful = results.filter(r => r.status === 'fulfilled').length;
      
      console.log(`✅ Odesláno ${successful}/${results.length} připomínek`);
    } catch (error) {
      console.error('❌ Chyba při zpracování denních připomínek:', error);
    }
  }

  private static formatCena(cena: number): string {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(cena);
  }
}

// Helper funkce pro použití v API endpointech
export const sendReservationNotifications = async (
  reservation: any,
  type: 'created' | 'updated' | 'cancelled'
) => {
  const config = {
    email: reservation.email,
    telefon: reservation.telefon,
    jmeno: reservation.jmeno,
    prijmeni: reservation.prijmeni,
  };

  const reservationData = {
    id: reservation.id,
    datum: new Date(reservation.datum),
    casOd: reservation.casOd,
    casDo: reservation.casDo,
    sluzba: reservation.sluzba,
    zamestnanec: reservation.zamestnanec,
    cena: reservation.cena,
  };

  const notifications = [];

  switch (type) {
    case 'created':
      if (reservation.notifikaceEmail) {
        notifications.push(NotificationService.sendReservationConfirmation(config, reservationData));
      }
      if (reservation.notifikaceSms) {
        notifications.push(NotificationService.sendSmsReminder(config, reservationData));
      }
      notifications.push(NotificationService.notifyAdminNewReservation(reservationData, config));
      break;

    case 'updated':
      if (reservation.notifikaceEmail && reservation.stav) {
        notifications.push(
          NotificationService.sendStatusChangeNotification(
            config,
            reservationData,
            reservation.stav,
            reservation.previousStatus || 'pending'
          )
        );
      }
      break;

    case 'cancelled':
      if (reservation.notifikaceEmail) {
        notifications.push(
          NotificationService.sendStatusChangeNotification(
            config,
            reservationData,
            'cancelled',
            reservation.previousStatus || 'pending'
          )
        );
      }
      break;
  }

  try {
    await Promise.allSettled(notifications);
  } catch (error) {
    console.error('Chyba při odesílání notifikací:', error);
  }
};