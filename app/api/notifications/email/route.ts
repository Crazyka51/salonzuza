import { NextRequest, NextResponse } from 'next/server';

// Mock email service - v produkci by se použil skutečný email provider
export async function POST(request: NextRequest) {
  try {
    const { to, subject, template, data } = await request.json();

    if (!to || !subject) {
      return NextResponse.json(
        { error: 'Email a předmět jsou povinné' },
        { status: 400 }
      );
    }

    // Simulace odesílání emailu
    console.log('📧 Email Service - Odesílám email:', {
      to,
      subject,
      template,
      data: JSON.stringify(data, null, 2),
    });

    // Vygenerování obsahu emailu podle šablony
    const emailContent = generateEmailContent(template, data);

    // V produkci by zde bylo volání skutečného email providera:
    // - Resend: https://resend.com/
    // - SendGrid: https://sendgrid.com/
    // - NodeMailer s SMTP
    // - Amazon SES
    
    // Simulace úspěšného odeslání
    await new Promise(resolve => setTimeout(resolve, 100));

    console.log('✅ Email simulace úspěšná');
    console.log('📨 Obsah emailu:');
    console.log('---');
    console.log(emailContent);
    console.log('---');

    return NextResponse.json({
      success: true,
      messageId: `mock_${Date.now()}`,
      message: 'Email byl simulován a odeslán'
    });

  } catch (error) {
    console.error('Chyba email service:', error);
    return NextResponse.json(
      { error: 'Nepodařilo se odeslat email' },
      { status: 500 }
    );
  }
}

function generateEmailContent(template: string, data: any): string {
  switch (template) {
    case 'reservation-confirmation':
      return `
Předmět: Potvrzení rezervace - Salon Zuza

Vážený/á ${data.jmeno} ${data.prijmeni},

děkujeme za Vaši rezervaci v Salonu Zuza!

📅 Datum: ${data.datum}
🕒 Čas: ${data.casOd} - ${data.casDo}
💅 Služba: ${data.sluzba}
👩‍💼 Kadeřník: ${data.zamestnanec}
💰 Cena: ${data.cena}

Číslo rezervace: #${data.rezervaceId}

V případě jakýchkoli dotazů nebo potřeby změny termínu nás neváhejte kontaktovat:
📞 +420 777 123 456
📧 info@salonzuza.cz

Těšíme se na Vás!

S pozdravem,
Tým Salon Zuza
      `.trim();

    case 'status-change':
      return `
Předmět: ${data.statusMessage} - Salon Zuza

Vážený/á ${data.jmeno} ${data.prijmeni},

informujeme Vás o změně stavu Vaší rezervace #${data.rezervaceId}.

${data.statusMessage}

📅 Datum: ${data.datum}
🕒 Čas: ${data.casOd} - ${data.casDo}
💅 Služba: ${data.sluzba}

V případě jakýchkoli dotazů nás neváhejte kontaktovat:
📞 +420 777 123 456
📧 info@salonzuza.cz

S pozdravem,
Tým Salon Zuza
      `.trim();

    case 'admin-new-reservation':
      return `
Předmět: Nová rezervace - Salon Zuza

Nová rezervace byla vytvořena:

👤 Zákazník: ${data.customerName}
📧 Email: ${data.customerEmail}
📞 Telefon: ${data.customerPhone}

📅 Datum: ${data.datum}
🕒 Čas: ${data.casOd} - ${data.casDo}
💅 Služba: ${data.sluzba}
💰 Cena: ${data.cena}

Číslo rezervace: #${data.rezervaceId}

Pro správu rezervace použijte admin panel:
${data.adminUrl}
      `.trim();

    default:
      return `
Obsah emailu pro šablonu "${template}" s daty:
${JSON.stringify(data, null, 2)}
      `.trim();
  }
}