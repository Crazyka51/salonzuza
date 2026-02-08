import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Vkládám obsah pro všechny stránky...\n')

  // HOMEPAGE
  console.log('📄 Homepage...')
  const homepageObsah = [
    { klicObsahu: 'hero_nadpis', obsah: 'PROFESIONÁLNÍ PÉČE O VAŠE VLASY', kategorie: 'homepage' },
    { klicObsahu: 'hero_popis', obsah: 'Moderní kadeřnický salon v srdci Prahy. Specializujeme se na dámské, pánské a dětské účesy s využitím špičkových produktů Framesi a Label.M.', kategorie: 'homepage' },
    { klicObsahu: 'kvalita_nadpis', obsah: 'KVALITA', kategorie: 'homepage' },
    { klicObsahu: 'kvalita_podnadpis', obsah: 'PRVOTŘÍDNÍ PÉČE O VAŠE VLASY', kategorie: 'homepage' },
    { klicObsahu: 'kvalita_text1', obsah: 'Vlasová péče je více než jen střih nebo barva – je to umění. Sledujeme nejnovější trendy a využíváme kvalitní přípravky, které chrání a vyživují vaše vlasy.', kategorie: 'homepage' },
    { klicObsahu: 'kvalita_text2', obsah: 'Používáme pouze profesionální produkty značek Framesi a Label.M, které zajišťují dlouhotrvající výsledky a zdravý vzhled vašich vlasů.', kategorie: 'homepage' },
    { klicObsahu: 'kvalita_tlacitko', obsah: 'VÍCE O SLUŽBÁCH', kategorie: 'homepage' },
    { klicObsahu: 'pece_nadpis', obsah: 'PÉČE', kategorie: 'homepage' },
    { klicObsahu: 'pece_podnadpis', obsah: 'ZKUŠENOSTI A INDIVIDUÁLNÍ PŘÍSTUP', kategorie: 'homepage' },
    { klicObsahu: 'pece_text1', obsah: 'Každý klient je pro nás jedinečný. Naši kadeřníci mají dlouholeté zkušenosti a průběžně se vzdělávají v nejnovějších technikách střihů a barvení.', kategorie: 'homepage' },
    { klicObsahu: 'pece_text2', obsah: 'Společně s vámi najdeme styl, který perfektně ladí s vaší osobností a životním stylem. Vaše spokojenost je naší prioritou.', kategorie: 'homepage' },
    { klicObsahu: 'pece_tlacitko', obsah: 'PROHLÉDNOUT SLUŽBY', kategorie: 'homepage' },
    { klicObsahu: 'cta_final_nadpis', obsah: 'VAŠE VLASY, NAŠE PÉČE', kategorie: 'homepage' },
    { klicObsahu: 'cta_final_hlavni', obsah: 'NAPLÁNUJTE SI NOVÝ ÚČES!', kategorie: 'homepage' },
    { klicObsahu: 'cta_final_podnadpis', obsah: 'VYBERTE SI SVŮJ TERMÍN ONLINE', kategorie: 'homepage' },
    { klicObsahu: 'cta_final_tlacitko', obsah: '✂️ REZERVOVAT TERMÍN', kategorie: 'homepage' },
  ]

  for (const item of homepageObsah) {
    await prisma.obsahStranky.upsert({
      where: { klicObsahu: item.klicObsahu },
      update: { obsah: item.obsah, kategorie: item.kategorie },
      create: item
    })
    console.log(`  ✅ ${item.klicObsahu}`)
  }

  // SLUZBY
  console.log('\n📄 Služby...')
  const sluzbyObsah = [
    { klicObsahu: 'sluzby_hero_nadpis', obsah: 'NAŠE SLUŽBY', kategorie: 'sluzby' },
    { klicObsahu: 'sluzby_hero_popis', obsah: 'Kompletní péče o vaše vlasy od profesionálů', kategorie: 'sluzby' },
    { klicObsahu: 'sluzby_uvod', obsah: 'V našem salonu nabízíme širokou škálu služeb pro dámy, pány i děti. Všechny naše služby jsou prováděny s použitím špičkových produktů a nejmodernějších technik.', kategorie: 'sluzby' },
    { klicObsahu: 'sluzby_cta_nadpis', obsah: 'Připraveni na změnu?', kategorie: 'sluzby' },
    { klicObsahu: 'sluzby_cta_popis', obsah: 'Rezervujte si termín online a objevte nový styl se Salonem Zuza', kategorie: 'sluzby' },
  ]

  for (const item of sluzbyObsah) {
    await prisma.obsahStranky.upsert({
      where: { klicObsahu: item.klicObsahu },
      update: { obsah: item.obsah, kategorie: item.kategorie },
      create: item
    })
    console.log(`  ✅ ${item.klicObsahu}`)
  }

  // GALERIE
  console.log('\n📄 Galerie...')
  const galerieObsah = [
    { klicObsahu: 'galerie_hero_nadpis', obsah: 'GALERIE', kategorie: 'galerie' },
    { klicObsahu: 'galerie_hero_popis', obsah: 'Podívejte se na naše práce a prostory salonu', kategorie: 'galerie' },
    { klicObsahu: 'galerie_sekce_nadpis', obsah: 'NAŠE PRÁCE', kategorie: 'galerie' },
    { klicObsahu: 'galerie_sekce_popis', obsah: 'Prohlédněte si ukázky našich prací a prostory našeho moderního salonu. Každý obrázek vypovídá o naší vášni pro krásu a kvalitu.', kategorie: 'galerie' },
  ]

  for (const item of galerieObsah) {
    await prisma.obsahStranky.upsert({
      where: { klicObsahu: item.klicObsahu },
      update: { obsah: item.obsah, kategorie: item.kategorie },
      create: item
    })
    console.log(`  ✅ ${item.klicObsahu}`)
  }

  // KONTAKT
  console.log('\n📄 Kontakt...')
  const kontaktObsah = [
    { klicObsahu: 'kontakt_hero_nadpis', obsah: 'KONTAKT', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_hero_popis', obsah: 'Najdete nás v centru města, jsme tu pro vás', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_udaje_nadpis', obsah: 'Kontaktní údaje', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_adresa_nazev', obsah: 'Salon Zuza', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_adresa_ulice', obsah: 'Náměstí Míru 15', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_adresa_mesto', obsah: '123 45 Praha 2', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_telefon', obsah: '+420 123 456 789', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_email', obsah: 'info@salon-zuza.cz', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_web', obsah: 'www.salon-zuza.cz', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_hodiny_nadpis', obsah: 'Otevírací hodiny', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_hodiny_pondeli', obsah: '9:00 - 18:00', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_hodiny_utery', obsah: '9:00 - 18:00', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_hodiny_streda', obsah: '9:00 - 18:00', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_hodiny_ctvrtek', obsah: '9:00 - 20:00', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_hodiny_patek', obsah: '9:00 - 18:00', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_hodiny_sobota', obsah: '8:00 - 14:00', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_hodiny_nedele', obsah: 'ZAVŘENO', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_mapa_nadpis', obsah: 'Kde nás najdete', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_formular_nadpis', obsah: 'Napište nám', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_formular_jmeno', obsah: 'Jméno *', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_formular_email', obsah: 'Email *', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_formular_telefon', obsah: 'Telefon', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_formular_zprava', obsah: 'Zpráva *', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_formular_tlacitko', obsah: 'ODESLAT ZPRÁVU', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_cta_nadpis', obsah: 'Raději si rezervujete online?', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_cta_popis', obsah: 'Využijte náš rezervační systém a vyberte si čas, který vám vyhovuje', kategorie: 'kontakt' },
    { klicObsahu: 'kontakt_cta_tlacitko', obsah: 'ONLINE REZERVACE', kategorie: 'kontakt' },
  ]

  for (const item of kontaktObsah) {
    await prisma.obsahStranky.upsert({
      where: { klicObsahu: item.klicObsahu },
      update: { obsah: item.obsah, kategorie: item.kategorie },
      create: item
    })
    console.log(`  ✅ ${item.klicObsahu}`)
  }

  // GENERAL (obecný obsah)
  console.log('\n📄 Obecný obsah...')
  const generalObsah = [
    { klicObsahu: 'general_loading_text', obsah: 'Načítám obsah...', kategorie: 'general' },
    { klicObsahu: 'general_error_text', obsah: 'Chyba při načítání obsahu', kategorie: 'general' },
    { klicObsahu: 'general_no_data', obsah: 'Žádná data k zobrazení', kategorie: 'general' },
    { klicObsahu: 'general_back_button', obsah: 'Zpět', kategorie: 'general' },
    { klicObsahu: 'general_more_info', obsah: 'Více informací', kategorie: 'general' },
  ]

  for (const item of generalObsah) {
    await prisma.obsahStranky.upsert({
      where: { klicObsahu: item.klicObsahu },
      update: { obsah: item.obsah, kategorie: item.kategorie },
      create: item
    })
    console.log(`  ✅ ${item.klicObsahu}`)
  }

  console.log('\n✨ Hotovo! Vloženo celkem', 
    homepageObsah.length + sluzbyObsah.length + galerieObsah.length + kontaktObsah.length + generalObsah.length,
    'položek obsahu.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Chyba:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
