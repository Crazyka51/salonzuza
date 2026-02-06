// Test script pro vytvoření rezervace přes API
async function testCreateReservation() {
  try {
    const rezervaceData = {
      jmeno: 'Jan',
      prijmeni: 'Novák',
      email: 'jan.novak@email.cz',
      telefon: '+420 777 888 999',
      datum: '2026-02-10',
      casOd: '10:00',
      casDo: '11:00',
      cena: 800,
      zpusobPlatby: 'karta',
      notifikaceEmail: true,
      notifikaceSms: false
    };

    console.log('📝 Vytváří novou rezervaci...');
    console.log('Data:', JSON.stringify(rezervaceData, null, 2));

    const response = await fetch('http://localhost:3000/api/rezervace', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rezervaceData)
    });

    console.log('🔄 Response status:', response.status);
    const result = await response.json();
    console.log('📨 Response data:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('✅ Rezervace vytvořena úspěšně!');
      return result.rezervace;
    } else {
      console.log('❌ Chyba při vytváření rezervace:', result.error);
      return null;
    }

  } catch (error) {
    console.error('💥 Síťová chyba:', error);
    return null;
  }
}

// Test načtení rezervací
async function testGetReservations() {
  try {
    console.log('\n📋 Načítá rezervace...');
    
    const response = await fetch('http://localhost:3000/api/rezervace');
    console.log('🔄 Response status:', response.status);
    
    const result = await response.json();
    console.log('📨 Nalezeno rezervací:', result.rezervace?.length || 0);
    
    if (result.rezervace) {
      result.rezervace.forEach((r, i) => {
        console.log(`${i + 1}. ${r.jmeno} ${r.prijmeni} - ${r.datum.split('T')[0]} ${r.casOd}-${r.casDo} (${r.stav})`);
      });
    }
    
    return result.rezervace;
    
  } catch (error) {
    console.error('💥 Chyba při načítání:', error);
    return null;
  }
}

// Spuštění testů
async function main() {
  console.log('🧪 Testování rezervace API\n');
  
  // Test 1: Načtení existujících rezervací
  await testGetReservations();
  
  // Test 2: Vytvoření nové rezervace
  const novaRezervace = await testCreateReservation();
  
  // Test 3: Načtení po vytvoření nové rezervace
  if (novaRezervace) {
    console.log('\n🔄 Ověřuje že rezervace byla vytvořena...');
    await testGetReservations();
  }
  
  console.log('\n🏁 Testování dokončeno');
}

main();