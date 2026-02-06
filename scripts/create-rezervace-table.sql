-- Vytvoření tabulky pro rezervace samostatně
CREATE TABLE IF NOT EXISTS rezervace (
  id SERIAL PRIMARY KEY,
  jmeno VARCHAR(255) NOT NULL,
  prijmeni VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefon VARCHAR(255) NOT NULL,
  datum DATE NOT NULL,
  cas_od VARCHAR(10) NOT NULL,
  cas_do VARCHAR(10) NOT NULL,
  sluzba_id INTEGER REFERENCES sluzby(id) ON DELETE SET NULL,
  zamestnanec_id INTEGER REFERENCES zamestnanci(id) ON DELETE SET NULL,
  poznamka TEXT,
  stav VARCHAR(20) DEFAULT 'pending',
  cena INTEGER NOT NULL DEFAULT 0,
  zpusob_platby VARCHAR(20) DEFAULT 'hotove',
  notifikace_email BOOLEAN DEFAULT true,
  notifikace_sms BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Vytvoření tabulky pro provozní hodiny
CREATE TABLE IF NOT EXISTS provozni_hodiny (
  id SERIAL PRIMARY KEY,
  den_tydne INTEGER NOT NULL,
  cas_otevrani VARCHAR(10) NOT NULL,
  cas_zavreni VARCHAR(10) NOT NULL,
  je_zavreno BOOLEAN DEFAULT false,
  je_aktivni BOOLEAN DEFAULT true
);

-- Přidání unique constraint pro den týdne
ALTER TABLE provozni_hodiny ADD CONSTRAINT unique_den_tydne UNIQUE (den_tydne);

-- Vložení základních provozních hodin
INSERT INTO provozni_hodiny (den_tydne, cas_otevrani, cas_zavreni, je_zavreno) VALUES
(1, '09:00', '18:00', false), -- pondělí
(2, '09:00', '18:00', false), -- úterý
(3, '09:00', '18:00', false), -- středa
(4, '09:00', '18:00', false), -- čtvrtek
(5, '09:00', '18:00', false), -- pátek
(6, '09:00', '16:00', false), -- sobota
(0, '00:00', '00:00', true)   -- neděle - zavřeno
ON CONFLICT (den_tydne) DO NOTHING;