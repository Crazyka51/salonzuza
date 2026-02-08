-- Vložení editovatelných textů pro stránku ceník
INSERT INTO obsah_stranky (klic, hodnota, stranka) VALUES
('hero_nadpis', 'CENÍK SLUŽEB', 'cenik'),
('hero_popis', 'Transparentní ceny za profesionální služby', 'cenik'),
('loading_text', 'Načítání ceníku...', 'cenik'),
('poznamka_text', 'Ceny se mohou lišit v závislosti na délce a struktuře vlasů.', 'cenik'),
('poznamka_kontakt', 'Pro přesnou cenovou nabídku nás kontaktujte nebo si domluvte konzultaci zdarma.', 'cenik'),
('cta_nadpis', 'Chcete si rezervovat termín?', 'cenik'),
('cta_popis', 'Využijte naši online rezervaci nebo nás kontaktujte přímo', 'cenik'),
('cta_tlacitko', 'REZERVOVAT ONLINE', 'cenik')
ON CONFLICT (klic, stranka) DO NOTHING;
