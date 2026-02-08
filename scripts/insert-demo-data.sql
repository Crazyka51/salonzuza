-- Vložení základních dat pro testování kalendáře

-- Kategorie služeb
INSERT INTO kategorie_sluzeb (nazev, popis, poradi, je_aktivni) VALUES
('Stříhání', 'Pánské a dámské stříhání vlasů', 1, true),
('Barvení', 'Barvení a melírování vlasů', 2, true),
('Úpravy', 'Speciální úpravy a styling', 3, true)
ON CONFLICT DO NOTHING;

-- Služby
INSERT INTO sluzby (nazev, popis, kategorie_id, doba_trvani_minuty, cena_top_stylist, cena_stylist, cena_junior_stylist, je_aktivni) VALUES
('Dámský střih', 'Klasický dámský střih s úpravou', 1, 45, 1000, 800, 600, true),
('Pánský střih', 'Pánský střih s mytím a styling', 1, 30, 600, 500, 400, true),
('Barvení vlasů', 'Kompletní barvení vlasů', 2, 120, 3000, 2500, 2000, true),
('Melírování', 'Melírování s tónováním', 2, 150, 3500, 3000, 2500, true),
('Svatební účes', 'Slavnostní úprava pro zvláštní příležitosti', 3, 90, 1500, 1200, 1000, true)
ON CONFLICT DO NOTHING;

-- Zaměstnanci
INSERT INTO zamestnanci (jmeno, prijmeni, uroven, email, telefon, je_aktivni) VALUES
('Zuzana', 'Slamáková ', 'top_stylist', 'zuzana@salon-zuza.cz', '+420 724 311 258', true),
('Tereza', 'Brichtová', 'stylist', 'tereza@salon-zuza.cz', '+420 724 311 258', true),

ON CONFLICT (email) DO NOTHING;

-- Ukázkové rezervace pro dnešek a další dny
INSERT INTO rezervace (jmeno, prijmeni, email, telefon, datum, cas_od, cas_do, sluzba_id, zamestnanec_id, stav, cena, zpusob_platby) VALUES
('Petra', 'Nováková', 'petra.novakova@email.cz', '+420 777 111 222', '2026-02-06', '10:00', '10:45', 1, 1, 'confirmed', 1000, 'karta'),
('Jana', 'Svobodová', 'jana.svobodova@email.cz', '+420 608 333 444', '2026-02-06', '14:30', '16:30', 3, 2, 'pending', 2500, 'hotove'),
('Lucie', 'Procházková', 'lucie.prochazka@email.cz', '+420 721 555 666', '2026-02-07', '09:00', '12:00', 4, 1, 'confirmed', 3500, 'prevod'),
('Tereza', 'Dvořáková', 'tereza.dvorakova@email.cz', '+420 606 777 888', '2026-02-07', '15:00', '16:30', 5, 3, 'pending', 1000, 'karta'),
('Veronika', 'Krejčová', 'veronika.krejcova@email.cz', '+420 730 999 111', '2026-02-08', '11:00', '11:30', 2, 2, 'confirmed', 500, 'hotove')
ON CONFLICT DO NOTHING;