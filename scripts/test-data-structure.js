// Simulace test dat pro kalendář
const testData = {
  rezervace: [
    {
      id: 1,
      jmeno: "Test",
      prijmeni: "Uživatel", 
      email: "test@example.com",
      telefon: "+420 123 456 789",
      datum: "2026-02-08T00:00:00.000Z",
      casOd: "14:00",
      casDo: "15:00",
      sluzbaId: null,
      zamestnanecId: null,
      poznamka: null,
      stav: "pending",
      cena: 800,
      zpusobPlatby: "karta",
      notifikaceEmail: true,
      notifikaceSms: false,
      createdAt: "2026-02-06T13:17:45.487Z",
      updatedAt: "2026-02-06T13:17:45.487Z",
      sluzba: null,
      zamestnanec: null
    },
    {
      id: 2,
      jmeno: "Jan",
      prijmeni: "Novák",
      email: "jan.novak@email.cz",
      telefon: "+420 777 888 999",
      datum: "2026-02-10T00:00:00.000Z",
      casOd: "10:00", 
      casDo: "11:00",
      sluzbaId: null,
      zamestnanecId: null,
      poznamka: null,
      stav: "pending",
      cena: 800,
      zpusobPlatby: "karta",
      notifikaceEmail: true,
      notifikaceSms: false,
      createdAt: "2026-02-06T13:19:45.115Z",
      updatedAt: "2026-02-06T13:19:45.115Z",
      sluzba: null,
      zamestnanec: null
    }
  ]
};

console.log('📝 Test data pro kalendář:');
console.log(JSON.stringify(testData, null, 2));

console.log('\n📊 Analýza dat:');
testData.rezervace.forEach((r, i) => {
  console.log(`${i + 1}. ${r.jmeno} ${r.prijmeni}`);
  console.log(`   📅 ${r.datum.split('T')[0]}`);
  console.log(`   🕐 ${r.casOd}-${r.casDo}`);
  console.log(`   💰 ${r.cena} CZK, ${r.zpusobPlatby}`);
  console.log(`   📌 ${r.stav}`);
  console.log('');
});

// Kontrola property names 
console.log('🔍 Kontrola property names:');
const prvniRezervace = testData.rezervace[0];
console.log('Má casOd?', 'casOd' in prvniRezervace);
console.log('Má casDo?', 'casDo' in prvniRezervace);
console.log('Má cas_od?', 'cas_od' in prvniRezervace);
console.log('Má cas_do?', 'cas_do' in prvniRezervace);

console.log('\n✅ Data by měla fungovat s aktualizovanými komponentami!');