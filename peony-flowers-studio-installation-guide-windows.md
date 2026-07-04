# 🌸 Peony Flowers Studio — Ishga tushirishdan oldin kerak bo'lgan o'rnatmalar (Docker'siz)

Bu qo'llanma loyihani **Docker ishlatmasdan**, PostgreSQL va Redis'ni to'g'ridan-to'g'ri
kompyuteringizga o'rnatib, noldan ishga tushirish uchun kerak bo'lgan barcha dasturlar
va qadamlarni tartib bilan ko'rsatadi.

---

## 1-QADAM: Kompyuteringizga o'rnatilishi shart bo'lgan dasturlar

| № | Dastur | Versiya | Nima uchun kerak | Qayerdan olish |
|---|---|---|---|---|
| 1 | **Node.js** | v20 LTS yoki yuqori | Frontend, admin, backend — barchasi shu orqali ishlaydi | https://nodejs.org |
| 2 | **npm** | Node bilan birga keladi | Paketlarni o'rnatish (workspaces) | Node.js bilan avtomatik keladi |
| 3 | **PostgreSQL** | 16 versiya | Asosiy ma'lumotlar bazasi | https://www.postgresql.org/download |
| 4 | **Redis** | 7 versiya | Kesh / sessiya saqlash | Windows: https://github.com/tporadowski/redis/releases ; Mac: `brew install redis` ; Linux: `apt install redis-server` |
| 5 | **Git** | Eng so'nggi versiya | Kodni versiyalash / GitHub bilan ishlash | https://git-scm.com |
| 6 | **VS Code** *(tavsiya)* | — | Kodni tahrirlash uchun qulay muhit | https://code.visualstudio.com |

### PostgreSQL o'rnatishda diqqat qiling
O'rnatish jarayonida sizdan **superuser (postgres) paroli** so'raladi — uni eslab
qoling, keyinroq kerak bo'ladi. O'rnatish tugagach, **pgAdmin** dasturi ham birga
o'rnatiladi (PostgreSQL bilan grafik ishlash uchun, ixtiyoriy).

### Redis haqida eslatma (Windows uchun)
Redis rasmiy ravishda Windows'ni qo'llab-quvvatlamaydi, shuning uchun Windows
foydalanuvchilari uchun ikkita variant bor:
- **Memurai** (Redis'ning Windows uchun rasmiy analogi): https://www.memurai.com
- Yoki yuqoridagi jamoat tomonidan qo'llab-quvvatlanadigan `tporadowski/redis` versiyasi

Mac yoki Linux ishlatsangiz, oddiy `brew install redis` yoki `sudo apt install redis-server`
yetarli.

### VS Code uchun qo'shimcha (tavsiya etiladigan) kengaytmalar
- **Volar** — Vue 3 + TypeScript qo'llab-quvvatlash
- **Prisma** — `schema.prisma` fayli uchun rang berish (syntax highlighting)
- **ESLint** va **Prettier** — kodni avtomatik tozalash

---

## 2-QADAM: Loyihani ishga tayyorlash (birinchi marta)

Terminalni (yoki VS Code'dagi terminal) oching va quyidagilarni **ketma-ket** bajaring:

### 1) Loyiha papkasiga kiring
```bash
cd peony-flowers-studio_v2
```

### 2) Barcha paketlarni o'rnating
Bitta buyruq bilan **frontend, admin, backend va shared** — hammasi uchun paketlar o'rnatiladi:
```bash
npm install
```

### 3) PostgreSQL'da ma'lumotlar bazasini qo'lda yarating
Docker o'rniga, PostgreSQL'ga terminal orqali kiring va bazani o'zingiz yarating.

**Windows** (agar PostgreSQL PATH'ga qo'shilmagan bo'lsa, "SQL Shell (psql)" dasturini
Boshlash menyusidan oching) yoki **Mac/Linux**:
```bash
psql -U postgres
```
So'ralgan parolni kiritganingizdan so'ng, `psql` ichida quyidagini bajaring:
```sql
CREATE USER peony WITH PASSWORD 'peony_pass';
CREATE DATABASE peony_flowers OWNER peony;
\q
```

### 4) Redis'ni ishga tushiring
- **Windows (Memurai yoki tporadowski/redis):** o'rnatgandan so'ng u fon xizmati
  (Windows Service) sifatida avtomatik ishga tushadi — qo'shimcha buyruq kerak emas.
  Tekshirish uchun: `redis-cli ping` → javob `PONG` bo'lishi kerak.
- **Mac:**
  ```bash
  brew services start redis
  ```
- **Linux:**
  ```bash
  sudo systemctl start redis-server
  ```

### 5) `.env` fayllarini tayyorlang
Har bir ilova papkasida `.env.example` fayli bor — undan nusxa oling:
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
cp apps/admin/.env.example apps/admin/.env
```
Keyin `apps/backend/.env` faylini oching va kamida quyidagilarni to'ldiring:
- `DATABASE_URL=postgresql://peony:peony_pass@localhost:5432/peony_flowers`
  (3-qadamda yaratgan user/parol/baza nomi bilan bir xil bo'lishi kerak)
- `JWT_SECRET` va `JWT_REFRESH_SECRET` — ixtiyoriy tasodifiy uzun matn
  (terminalda generatsiya qilish mumkin: `openssl rand -hex 32`)
- `REDIS_URL=redis://localhost:6379`

> `SMS_EMAIL`, `S3_...`, `CLICK_...` kabi maydonlarni hozircha bo'sh qoldirsangiz ham
> backend ishlayveradi (development rejimida SMS o'rniga kod terminalga chiqadi).

### 6) Ma'lumotlar bazasi sxemasini yarating va boshlang'ich ma'lumot yuklang
```bash
npm run prisma:migrate
npm run prisma:seed
```

### 7) Loyihani ishga tushiring 🚀
```bash
npm run dev
```
Bu bir vaqtning o'zida **backend, frontend va admin**ni ishga tushiradi:

| Ilova | Manzil |
|---|---|
| Backend (API) | http://localhost:4000 |
| Frontend (mijozlar sayti) | http://localhost:5173 |
| Admin panel | http://localhost:5174 |

---

## 3-QADAM: Keyingi safarlarda ishga tushirish (qisqacha)

Birinchi marta yuqoridagi barcha qadamlarni bajargandan so'ng, keyingi safar
faqat shu narsalar kifoya:

1. PostgreSQL va Redis fon xizmatlari (odatda tizim yoqilganda avtomatik ishga
   tushadi — Windows'da xizmatlar, Mac/Linux'da esa quyidagicha tekshiring):
   ```bash
   # Mac
   brew services list
   # Linux
   sudo systemctl status postgresql redis-server
   ```
2. Loyihani ishga tushirish:
   ```bash
   npm run dev
   ```

---

## Tez-tez uchraydigan xatoliklar

| Xatolik | Sababi | Yechimi |
|---|---|---|
| `Invalid environment variables` | `.env`da majburiy qiymat yo'q | `.env.example` bilan solishtirib, hammasini to'ldiring |
| `ECONNREFUSED` (Postgres) | PostgreSQL xizmati ishlamayapti | Windows: Xizmatlar (Services)dan "postgresql" ni ishga tushiring. Mac: `brew services start postgresql@16`. Linux: `sudo systemctl start postgresql` |
| `ECONNREFUSED` (Redis) | Redis ishlamayapti | Yuqoridagi 4-qadamdagi buyruqlarni qayta bajaring, `redis-cli ping` bilan tekshiring |
| `P1001: Can't reach database server` | `DATABASE_URL` xato yoki baza hali yaratilmagan | 3-qadamni qaytadan tekshiring, user/parol/baza nomi `.env` bilan bir xilligiga ishonch hosil qiling |
| `role "peony" does not exist` | 3-qadamdagi SQL buyruqlar bajarilmagan | `psql -U postgres` orqali qayta kirib, `CREATE USER` va `CREATE DATABASE` buyruqlarini bajaring |
| Admin panelga kira olmayapti | Foydalanuvchi roli oddiy "customer" | `npm run prisma:seed` orqali yaratilgan test hisobidan foydalaning |

---

## Xulosa — o'rnatiladigan dasturlar (Docker'siz):
1. ✅ Node.js (v20+)
2. ✅ PostgreSQL 16
3. ✅ Redis 7 (Windows'da Memurai)
4. ✅ Git
5. ✅ VS Code (ixtiyoriy, lekin tavsiya etiladi)

Qolgan hamma narsa (Vue, Express, Prisma va boshqa kutubxonalar) `npm install`
orqali avtomatik o'rnatiladi — ularni qo'lda alohida o'rnatish shart emas. Faqat
PostgreSQL va Redis'ni endi Docker o'rniga to'g'ridan-to'g'ri kompyuterga o'rnatib,
xizmat sifatida ishga tushirasiz.