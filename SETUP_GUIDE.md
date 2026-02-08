# 🚀 SALON ZUZA - KOMPLETNÍ SETUP GUIDE

## 📋 PŘED SPUŠTĚNÍM

### 1. 🔐 Nastavení Database Connection (.env.local)

**Potřebujete Neon PostgreSQL databázi:**

1. **Registrujte se/přihlaste:** [https://console.neon.tech/](https://console.neon.tech/)
2. **Vytvořte projekt:** "salon-zuza" 
3. **Zkopírujte Connection String** z Dashboard
4. **Nahraďte v `.env.local`:**

```bash
# Z Neon Dashboard zkopírujte:
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
DIRECT_URL="postgresql://username:password@hostname/database?sslmode=require&connect_timeout=10"

# Vaš admin email:
ADMIN_EMAIL="vas-email@example.com"

# Vygenerujte náhodný token:
CRON_SECRET_TOKEN="nahodny-bezpecny-token-123"
```

## 🎯 SPUŠTĚNÍ APLIKACE (pnpm)

### 2. 📦 Ověření Dependencies

```bash
# Kontrola instalace
pnpm list prisma @prisma/client

# Měli byste vidět:
# prisma 5.22.0
# @prisma/client 5.22.0
```

### 3. 🗄️ Setup Databáze

```bash
# Krok 1: Test připojení
pnpm run db:test

# Krok 2: Vytvoření tabulek
pnpm prisma db push

# Krok 3: Generování Prisma Client
pnpm prisma generate

# Krok 4: Seed základní data
pnpm run salon:init
```

### 4. 🧪 Testování Setup

```bash
# Test API endpoints
node scripts/test-api.js

# Test rezervací
tsx --env-file=.env.local scripts/test-reservations.ts

# Test kalendáře
tsx --env-file=.env.local scripts/seed-calendar-data.ts
```

### 5. 🚀 Spuštění Aplikace

```bash
# Development server
pnpm dev

# Aplikace bude dostupná na:
# http://localhost:3000
```

## 🎨 TESTOVÁNÍ REZERVAČNÍHO SYSTÉMU

### Frontend Test:
1. **Otevřete:** [http://localhost:3000/online-rezervace](http://localhost:3000/online-rezervace)
2. **Vyplňte formulář** a odešlete rezervaci
3. **Ověřte:** Odpověď "✅ Rezervace odeslána!"

### Admin Panel Test:
1. **Otevřete:** [http://localhost:3000/admin](http://localhost:3000/admin)
2. **Přejděte na:** Rezervace → Kalendář
3. **Ověřte:** Zobrazení rezervací v kalendáři

## 📊 DATABÁZOVÉ TABULKY (po setup)

```
✅ obsah_stranky        # CMS obsah
✅ kategorie_sluzeb     # Kategorie služeb
✅ sluzby               # Seznam služeb
✅ galerie_obrazky      # Fotogalerie
✅ recenze             # Zákaznické recenze
✅ zamestnanci         # Kadeřnice/stylisté
✅ rezervace           # 🎯 HLAVNÍ - rezervace
✅ provozni_hodiny     # Otevírací doba
```

## 🔧 MOŽNÉ PROBLÉMY & ŘEŠENÍ

### ❌ "Database connection failed"
```bash
# Zkontrolujte .env.local connection string
# Ověřte, zda máte internet a přístup k Neon DB
pnpm run db:test
```

### ❌ "Prisma client not found"  
```bash
# Regenerujte Prisma client
pnpm prisma generate
```

### ❌ "Port 3000 already in use"
```bash
# Změňte port nebo ukončete jiný proces
export PORT=3001 && pnpm dev
# nebo
netstat -ano | findstr :3000
taskkill /PID <proces_id> /F
```

## 📱 PRODUKČNÍ DEPLOYMENT

### Vercel Deployment:
1. **Push do GitHub** repozitáře
2. **Connect Vercel** k GitHub
3. **Add Environment Variables** z .env.local
4. **Deploy** 🚀

### Database Migration:
```bash
# Pro produkci
pnpm prisma migrate deploy
pnpm prisma generate
```

## 📧 EMAIL NOTIFIKACE (volitelné)

Pro skutečné email notifikace přidejte do `.env.local`:

```bash
# Gmail SMTP
SMTP_HOST="smtp.gmail.com"  
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Pro Gmail: Vygenerujte App Password v Google Account Settings
```

---

## 🎉 HOTOVO!

Po dokončení setup budete mít **plně funkční rezervační systém**:

- ✅ **Frontend rezervace** na /online-rezervace
- ✅ **Admin kalendář** na /admin/rezervace  
- ✅ **Email notifikace** pro zákazníky i admin
- ✅ **CRUD operace** rezervací
- ✅ **Dostupné termíny** API
- ✅ **Mobilní responzivní** design

**🚀 Ready for production!**