// Test aktualizovaného API s date range parametry
async function testUpdatedAPI() {
  try {
    console.log('🧪 Testování aktualizovaného rezervace API\n');
    
    // Test 1: Načtení všech rezervací (bez parametrů)
    console.log('📋 Test 1: Načítání všech rezervací...');
    const response1 = await fetch('http://localhost:3000/api/rezervace');
    const result1 = await response1.json();
    console.log(`✅ Všechny rezervace: ${result1.rezervace?.length || 0}`);

    // Test 2: Filtrovani podle date range (kalendář)
    console.log('\n📅 Test 2: Filtrovani podle date range...');
    const response2 = await fetch('http://localhost:3000/api/rezervace?datum_od=2026-02-01&datum_do=2026-02-28');
    const result2 = await response2.json();
    console.log(`✅ Rezervace v únoru: ${result2.rezervace?.length || 0}`);
    
    if (result2.rezervace && result2.rezervace.length > 0) {
      console.log('📝 Detaily rezervací:');
      result2.rezervace.forEach((r, i) => {
        console.log(`${i + 1}. ${r.jmeno} ${r.prijmeni}`);
        console.log(`   📅 ${r.datum.split('T')[0]} ${r.casOd}-${r.casDo}`);
        console.log(`   📍 Stav: ${r.stav}, Cena: ${r.cena} CZK`);
        console.log('');
      });
    }

    // Test 3: Filtrovani podle konkretniho dne
    console.log('📋 Test 3: Filtrovani podle konkretniho dne...');
    const response3 = await fetch('http://localhost:3000/api/rezervace?datum=2026-02-10');
    const result3 = await response3.json();
    console.log(`✅ Rezervace na 2026-02-10: ${result3.rezervace?.length || 0}`);

    // Test 4: Test dostupnych terminu
    console.log('\n🕐 Test 4: Dostupne terminy na 2026-02-10...');
    const response4 = await fetch('http://localhost:3000/api/rezervace/dostupne-terminy?datum=2026-02-10');
    const result4 = await response4.json();
    
    if (response4.ok) {
      console.log(`✅ API funguje, dostupne terminy: ${result4.dostupneTerminy?.length || 0}`);
      console.log(`📋 Provozni hodiny: ${result4.provozniHodiny?.casOtevrani}-${result4.provozniHodiny?.casZavreni}`);
    } else {
      console.log('❌ Chyba dostupnych terminu:', result4.error);
    }
    
    console.log('\n🎉 Testování dokončeno - API by mělo fungovat s kalendářem!');
    
  } catch (error) {
    console.error('💥 Chyba při testování:', error);
  }
}

testUpdatedAPI();