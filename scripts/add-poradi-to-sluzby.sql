-- Přidání pole poradi do tabulky sluzby pro drag and drop
ALTER TABLE sluzby ADD COLUMN poradi INTEGER DEFAULT 0;

-- Nastavit pořadí podle aktuálního id
UPDATE sluzby SET poradi = id WHERE poradi = 0;
