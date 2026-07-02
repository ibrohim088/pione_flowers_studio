# 🌸 Peony Flowers Studio

Gullar do'koni uchun to'liq platforma — backend, frontend (mijozlar uchun) va admin panel.

## Stack

- **Backend:** Express + TypeScript + Prisma + PostgreSQL + Redis
- **Frontend:** Vue 3 + Vite + Pinia
- **Admin:** Vue 3 + Vite + Pinia
- **Monorepo:** npm workspaces + Turborepo

## Tuzilma

```
apps/
  backend/    — REST API
  frontend/   — mijozlar uchun sayt
  admin/      — admin/florist/courier paneli
packages/
  shared/     — umumiy TypeScript tiplar
```

## Ishga tushirish

1. Bog'liqliklarni o'rnatish:
   ```bash
   npm install
   ```

2. `.env` fayllarini sozlash (`apps/backend/.env.example`, `apps/frontend/.env.example`, `apps/admin/.env.example` dan nusxa oling).

3. Postgres va Redis'ni ishga tushirish:
   ```bash
   docker-compose up -d postgres redis
   ```

4. Prisma migratsiyalari:
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. Barcha ilovalarni ishga tushirish:
   ```bash
   npm run dev
   ```

   - Backend: http://localhost:4000
   - Frontend: http://localhost:5173
   - Admin: http://localhost:5174

## MVP cheklovlari

- To'lov: faqat **Click** va **Naqd** (Payme/Uzum/Karta — Phase 2)
- Super Admin roli yo'q — faqat `admin`, `florist`, `courier`, `customer`
- Google Login yo'q — faqat telefon+SMS OTP (Eskiz.uz)
