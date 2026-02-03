# 📊 SALON ZUZA - Analýza webu & Design System

## 🎨 BAREVNÁ PALETA

| Název | Hex | RGB | Použití |
|-------|-----|-----|---------|
| Béžová/Gold | `#B8A876` | 184, 168, 118 | CTA tlačítka, akcenty, nadpisy |
| Bílá | `#FFFFFF` | 255, 255, 255 | Hlavní background |
| Tmavá šedá | `#333333` | 51, 51, 51 | Hlavní text, nadpisy |
| Světlá šedá | `#F5F5F5` | 245, 245, 245 | Pozadí sekcí |
| Černá | `#000000` | 0, 0, 0 | Fotografie, kontrast |

---

## 📐 LAYOUT & STRUKTURA

**Typ**: Single-column responsive design (mobile-first)
**Šírka**: Full-width s padding na mobilech, max-width ~1200px na desktop

```
┌─────────────────────────────────────┐
│    HEADER s Hero Image & Text       │  (Full-width foto + overlay)
│    "VÍTEJTE V SALONU ZUZA"         │
│    "PÉČE O VAŠE VLASTY..."         │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│     Loga partnerů (Framesi, Label.M)│  (Horizontální scroll nebo grid)
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  SEKCE: KVALITA                     │  (2-column: text + foto)
│  - Nadpis                           │
│  - Popis                            │
│  - CTA tlačítko [VÍCE INFORMACÍ]   │
│  [FOTO vpravo]                      │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  SEKCE: PÉČE                        │  (2-column: foto + text)
│  [FOTO vlevo]                       │
│  - Nadpis "PÉČE"                    │
│  - Podnadpis "ZKUŠENOSTI & KVALITA" │
│  - Popis                            │
│  - CTA tlačítko [VÍCE INFORMACÍ]   │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│  SEKCE: RECENZE                     │  (3-column card layout)
│  "RECENZE"                          │
│  [Card 1] [Card 2] [Card 3]         │
│  - Hvězdy (rating)                  │
│  - Citát zákazníka                  │
│  - Jméno + iniciály                 │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│    CTA BANNER (темна barva)         │  (Výrazný call-to-action)
│    "VAŠE VLASTY, NAŠE PÉČE."        │
│    "NAPLÁNUJTE SI NOVÝ ÚČES!"       │
│    [GOLD TLAČÍTKO: VYBERTE TERMÍN]  │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│    FOTOGALERIE SALONU               │  (4-6 fotek interiéru)
│    (Carousel nebo grid)              │
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│    FOOTER                           │
│    - Kontakt (adresa, telefon)      │
│    - Otevírací doba                 │
│    - Mapa (Google Maps)             │
│    - Sociální sítě                  │
└─────────────────────────────────────┘
```

---

## 📝 TEXTOVÝ OBSAH

### HEADER
```
VÍTEJTE V SALONU ZUZA
PÉČE O VAŠE VLASTY PODLE VAŠICH PŘEDSTAV

[Popis: Nejdůležitější je pro nás spokojená zákaznice...]
```

### SEKCE: KVALITA
```
KVALITA
PAVOFIGURNÍ PÉČE O VAŠE VLASTY

Désto používáme profesionální produkty značky Framesi a Label.M. 
Jejich bezpečné složení vás ochrání během aplikace. 
Jedinou podmínkou je bezpečná manipulace s vašimi vlasy a 
posloupnost jednotlivých kroků. Právě těchto principů se řídíme.

[TLAČÍTKO: VÍCE INFORMACÍ]
```

### SEKCE: PÉČE
```
PÉČE
ZKUŠENOSTI & KVALITA
Svíce než 10 lety zkušeností víme, jak o vaše vlasy správně pečovat. Používáme moderní techniky a exkluzivní produkty, abychom zajistili maximální kvalitu.

Ať už hledáte jemnou změnu nebo výraznou proměnu, u nás jste v dobrých rukou. Vytváříme účesy, které podtrhnou vaši přirozenou krásu a sebevědomí.

[TLAČÍTKO: VÍCE INFORMACÍ]
```

### SEKCE: RECENZE
```
RECENZE
„Nejlepší kadeřnický salon, jaký jsem kdy navštívila! Profesionální přístup, krásné prostředí a úžasný výsledek. Určitě se vrátím.“

- Kateřina Nováková
Se ženou a našimi dvěma dcerami jsme hledali kadeřnictví, kde se postará o celou rodinu – a v Salonu Zuza jsme našli přesně to, co jsme potřebovali. Profesionální přístup, skvělá atmosféra a hlavně perfektní výsledky! Dcery odcházely nadšené, manželka spokojená a já mám střih přesně podle svých představ. Skvělý zážitek, určitě se sem vrátíme!

- Matěj Hrabák


```

### CTA BANNER
```
VAŠE VLASTY, NAŠE PÉČE.
NAPLÁNUJTE SI NOVÝ ÚČES!

[GOLD TLAČÍTKO: VYBERTE SI SVŮJ TERMÍN ONLINE]
```

### FOOTER
```
KONTAKT
Pražská 1548
[Město, PSČ]

OTEVÍRACÍ DOBA
Po-Pá: 09:00 - 17:00
So:    09:00 - 13:00
Ne:    Zavřeno

[Google Maps]
[Ikony sociálních sítí: Facebook, Instagram]
```

---

## 🎯 TYPOGRAFIE

| Element | Font | Velikost | Váha | Barva |
|---------|------|----------|------|-------|
| Hlavní nadpis (H1) | Serif/Sans | 48-56px | 700 | `#333333` |
| Nadpis sekce (H2) | Serif | 36-42px | 700 | `#333333` |
| Podnadpis (H3) | Sans | 18-24px | 400 | `#666666` |
| Tělo textu (p) | Sans | 16px | 400 | `#555555` |
| CTA tlačítko | Sans | 14px | 600 | `#FFFFFF` bg `#B8A876` |

---

## 🖱️ INTERAKTIVNÍ PRVKY

### Tlačítka
- **Styl**: Rectangular s padding (~16px 32px)
- **Barva**: `#B8A876` (gold)
- **Text**: Bílý (`#FFFFFF`)
- **Hover**: Tmavší gold (`#A39566`) + transition 0.3s
- **Border-radius**: 0px (ostré rohy) nebo 4px (subtilní)

### Recenze (Card)
- **Background**: `#FFFFFF`
- **Border**: 1px solid `#E0E0E0`
- **Padding**: 24px
- **Border-radius**: 8px
- **Stín**: Subtilní shadow (0 2px 8px rgba(0,0,0,0.1))

---

## 📱 RESPONSIVE BREAKPOINTS

| Zařízení | Šírka | Layout |
|----------|-------|--------|
| Mobile | 320px - 640px | Single column, full width |
| Tablet | 641px - 1024px | 2-column kde možné |
| Desktop | 1025px+ | 3-column, optimální šírka |

---

## 🎬 ANIMACE & EFEKTY

- **Smooth scroll**: Při navigaci
- **Hover efekty**: Tlačítka a karty (opacity +0.1, shadow +)
- **Fade-in**: Při načtení sekcí (optional)
- **Fotografie**: Subtle zoom na hover (1.05x)

---

## 🏗️ KOMPONENTY PRO IMPLEMENTACI

```typescript
// Komponenty pro ReactJS/Next.js

1. HeroSection
   - Props: backgroundImage, title, subtitle, ctaButton
   
2. SectionWithImage
   - Props: title, description, image, imagePosition ('left'|'right'), ctaButton
   
3. ReviewCard
   - Props: rating, quote, author
   
4. ReviewSection
   - Props: reviews[]
   
5. CTABanner
   - Props: title, subtitle, buttonText, onButtonClick
   
6. GalleryCarousel
   - Props: images[]
   
7. Footer
   - Props: contact, hours, socialLinks
```

---

## 📋 OBSAH PRO ADMIN PANEL (CMS)

**Editable sekce:**
- Hero nadpis & subtitle
- Texty v sekcích KVALITA a PÉČE
- CTA tlačítka (text, link)
- Recenze (přidání/odebrání)
- Fotogalerie (upload)
- Otevírací doba
- Kontakt

---

## 🎨 FIGMA/DESIGN TOKENŮ

```json
{
  "colors": {
    "primary": "#B8A876",
    "primaryDark": "#A39566",
    "text": "#333333",
    "textSecondary": "#666666",
    "background": "#FFFFFF",
    "backgroundSecondary": "#F5F5F5",
    "border": "#E0E0E0"
  },
  "spacing": {
    "xs": "8px",
    "sm": "16px",
    "md": "24px",
    "lg": "32px",
    "xl": "48px"
  },
  "typography": {
    "h1": { "size": "48px", "weight": 700, "lineHeight": 1.2 },
    "h2": { "size": "36px", "weight": 700, "lineHeight": 1.3 },
    "body": { "size": "16px", "weight": 400, "lineHeight": 1.6 }
  }
}
```

---

## ✅ CHECKLIST PRO VÝVOJ

- [ ] Hero section s backgroundImage
- [ ] Partner logos section
- [ ] Kvalita section (2-col)
- [ ] Péče section (2-col)
- [ ] Recenze section (3-col cards)
- [ ] CTA Banner
- [ ] Galerie fotek salonu
- [ ] Footer s kontaktem a mapou
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Tailwind CSS konfigurace s vlastní paletou
- [ ] Form pro booking (integration s /book-appointment)
