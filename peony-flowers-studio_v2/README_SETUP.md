# 🌸 Peony Flowers Studio — O'rnatish va sozlash qo'llanmasi

Bu hujjat loyihani noldan ishga tushirish uchun kerak bo'lgan **barcha dasturlar**,
**muhit o'zgaruvchilari (.env)** va **API kalitlarini** qanday olish haqida to'liq
ma'lumot beradi.

---

## 1. Laptopga o'rnatilishi kerak bo'lgan dasturlar

| Dastur | Versiya | Nima uchun kerak | Yuklab olish |
|---|---|---|---|
| **Node.js** | v20 LTS yoki undan yuqori | Backend, frontend, admin — hammasi Node.js'da ishlaydi | https://nodejs.org |
| **npm** | Node bilan birga keladi | Paket menejeri (workspaces) | Node.js bilan avtomatik |
| **Docker Desktop** | Eng so'nggi | PostgreSQL va Redis'ni konteynerda ishga tushirish uchun | https://www.docker.com/products/docker-desktop |
| **Git** | Eng so'nggi | Versiyalarni boshqarish (agar GitHub'ga yuklamoqchi bo'lsangiz) | https://git-scm.com |
| **VS Code** (tavsiya) | — | Kod tahrirlash, Vue/TS uchun qulay | https://code.visualstudio.com |

### VS Code uchun tavsiya etilgan extensionlar
- **Volar** (Vue 3 + TypeScript qo'llab-quvvatlash)
- **Prisma** (schema.prisma uchun syntax highlighting)
- **ESLint**, **Prettier**

> **Eslatma:** PostgreSQL va Redis'ni laptopingizga alohida o'rnatishingiz shart emas —
> ular Docker orqali `docker-compose up -d` bilan avtomatik ko'tariladi. Agar Docker
> ishlatmoqchi bo'lmasangiz, PostgreSQL 16 va Redis 7'ni qo'lda o'rnatishingiz kerak bo'ladi.

---

## 2. Ishga tushirishdan oldin bajarilishi kerak bo'lgan qadamlar

1. Arxivni oching va papkaga kiring:
   ```bash
   cd peony-flowers-studio
   ```

2. Barcha workspace'lar uchun paketlarni o'rnating (root papkadan bitta buyruq bilan):
   ```bash
   npm install
   ```

3. Har uch ilova uchun `.env` fayllarini tayyorlang (pastda batafsil — 3-bo'lim):
   - `apps/backend/.env`
   - `apps/frontend/.env`
   - `apps/admin/.env`

4. Docker orqali ma'lumotlar bazasi va cache'ni ishga tushiring:
   ```bash
   docker-compose up -d postgres redis
   ```

5. Prisma sxemasini bazaga qo'llang va boshlang'ich ma'lumotlarni yuklang:
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

6. Loyihani ishga tushiring:
   ```bash
   npm run dev
   ```
   - Backend → http://localhost:4000
   - Frontend (mijozlar sayti) → http://localhost:5173
   - Admin panel → http://localhost:5174

---

## 3. `.env` fayllari — barcha kalitlar va ularni qayerdan olish

### 3.1. `apps/backend/.env` (eng muhimi)

```env
# ==== Umumiy ====
NODE_ENV=development
PORT=4000

# ==== Ma'lumotlar bazasi ====
# docker-compose.yml dagi standart qiymatlar bilan mos keladi.
# Agar docker-compose'dagi user/password/db nomini o'zgartirsangiz, shu yerda ham o'zgartiring.
DATABASE_URL=postgresql://peony:peony_pass@localhost:5432/peony_flowers

# ==== JWT (token imzolash uchun maxfiy kalitlar) ====
# Bu qiymatlarni O'ZINGIZ o'ylab toping — kamida 32 belgili tasodifiy matn.
# Terminalda generatsiya qilish mumkin: openssl rand -hex 32
JWT_SECRET=<32+ belgili tasodifiy matn>
JWT_REFRESH_SECRET=<JWT_SECRET dan farqli, yana bir tasodifiy matn>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d

# ==== Redis ====
REDIS_URL=redis://localhost:6379

# ==== SMS (Eskiz.uz) — telefon orqali OTP yuborish uchun ====
# Ro'yxatdan o'ting: https://notify.eskiz.uz
# Shaxsiy kabinetda "email" va "parol" (SMS_SECRET) bilan tizimga kiriladi.
SMS_EMAIL=<eskiz.uz ga ro'yxatdan o'tgan email>
SMS_SECRET=<eskiz.uz paroli yoki API kaliti>

# ==== S3 (mahsulot rasmlari uchun fayl saqlash) ====
# AWS S3, yoki S3-mos xizmat (masalan Cloudflare R2, DigitalOcean Spaces) ishlatilishi mumkin.
S3_ACCESS_KEY_ID=<access key>
S3_SECRET_ACCESS_KEY=<secret key>
S3_BUCKET_NAME=<bucket nomi>
S3_REGION=<masalan: eu-central-1>

# ==== Click to'lov tizimi ====
# Pastda 4-bo'limda batafsil yozilgan.
CLICK_MERCHANT_ID=<Click merchant kabinetidan>
CLICK_SERVICE_ID=<Click merchant kabinetidan>
CLICK_SECRET_KEY=<Click merchant kabinetidan>

# ==== Webhook va frontend manzillari ====
PAYMENT_CALLBACK_BASE_URL=http://localhost:4000
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

**Development uchun minimal talab:** loyihani faqat lokal sinash uchun ishga
tushirmoqchi bo'lsangiz, `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `REDIS_URL`
yetarli. `SMS_EMAIL`/`SMS_SECRET` bo'sh qolsa ham backend ishlayveradi — chunki
`NODE_ENV=development` bo'lganda SMS yuborish o'rniga OTP kodi **backend terminaliga
konsolga chiqariladi** (`[DEV SMS] -> +99890...: kod`).

### 3.2. `apps/frontend/.env`

```env
VITE_API_URL=http://localhost:4000
```

### 3.3. `apps/admin/.env`

```env
VITE_API_URL=http://localhost:4000
```

Bu ikkalasida boshqa hech narsa o'zgartirish shart emas (agar backend boshqa portda
ishlamasa).

---

## 4. To'lov tizimlarini ulash — Click va Payme

### ⚠️ Muhim eslatma
Joriy MVP kodida **faqat Click va Naqd pul** to'lov usullari ishlab chiqilgan.
**Payme hali integratsiya qilinmagan** — bu Phase 2 (keyingi bosqich) uchun rejalashtirilgan.
Agar Payme kerak bo'lsa, buni alohida so'rov sifatida ayting — men
`apps/backend/src/modules/payments/providers/payme.provider.ts` qo'shib beraman.

### 4.1. Click uchun kerakli qadamlar

1. **Merchant kabinet oching:** https://merchant.click.uz — biznes sifatida ro'yxatdan o'tasiz
   (STIR/guvohnoma kabi hujjatlar talab qilinishi mumkin).
2. Kabinetga kirgach, yangi **servis (xizmat)** yarating — bu sizning onlayn-do'koningiz.
3. Servis sozlamalaridan quyidagilarni oling:
   - **Merchant ID** → `.env`dagi `CLICK_MERCHANT_ID`
   - **Service ID** → `.env`dagi `CLICK_SERVICE_ID`
   - **Secret Key** → `.env`dagi `CLICK_SECRET_KEY`
4. Click kabinetida **Webhook (callback) manzilini** ko'rsating:
   ```
   http://<sizning-domeningiz>/api/payments/click/complete
   ```
   Lokal test uchun bu manzilga tashqaridan yetish kerak bo'ladi — buning uchun
   [ngrok](https://ngrok.com) kabi tunnel xizmatidan foydalaning:
   ```bash
   ngrok http 4000
   ```
   va ngrok bergan `https://xxxx.ngrok.io/api/payments/click/complete` manzilini
   Click kabinetiga kiriting.
5. Click test (sandbox) rejimida ishlashni xohlasangiz, ularning texnik yordamidan
   test kartalar so'rang — production kalitlar bilan sinov to'lovlari amalga oshmaydi.

**Texnik hujjat:** https://docs.click.uz

### 4.2. Payme uchun (kelajakda qo'shiladigan integratsiya)

Agar keyinchalik Payme qo'shilsa, quyidagi kalitlar kerak bo'ladi:

1. **Merchant kabinet:** https://business.payme.uz orqali ro'yxatdan o'ting.
2. Kabinetdan olinadigan qiymatlar:
   - **Merchant ID** (Kassa ID)
   - **Test key** va **Production key** (Checkout uchun)
3. Webhook manzili (Payme buni "Callback URL" deb ataydi):
   ```
   http://<domeningiz>/api/payments/payme/complete
   ```

**Texnik hujjat:** https://developer.help.paycom.uz

---

## 5. Tez-tez uchraydigan xatoliklar

| Xatolik | Sabab | Yechim |
|---|---|---|
| `Invalid environment variables` | `.env` faylida majburiy qiymat (`DATABASE_URL`, `JWT_SECRET` va h.k.) yo'q | `.env.example`ni qayta tekshiring, barcha majburiy maydonlarni to'ldiring |
| `ECONNREFUSED` (Postgres/Redis) | Docker konteynerlar ishga tushmagan | `docker ps` bilan tekshiring, kerak bo'lsa `docker-compose up -d postgres redis` qayta bajaring |
| `P1001: Can't reach database server` (Prisma) | `DATABASE_URL` noto'g'ri yoki Postgres hali tayyor emas | Bir necha soniya kutib, `npm run prisma:migrate` qayta ishga tushiring |
| Admin panelga kirib bo'lmayapti | Foydalanuvchi roli `customer` — admin panel faqat `admin/florist/courier` rollariga ruxsat beradi | `npm run prisma:seed` orqali yaratilgan test raqamlaridan foydalaning yoki bazada rolni qo'lda o'zgartiring |
| Click webhook ishlamayapti (lokal) | Click serverlari `localhost`ga yeta olmaydi | `ngrok` yoki shunga o'xshash tunnel ishlating |

---

## 6. Xavfsizlik bo'yicha eslatma

- `.env` fayllarini hech qachon Git'ga yoki ochiq joyga yuklamang (`.gitignore`da
  allaqachon istisno qilingan).
- Production'ga chiqarishdan oldin `JWT_SECRET` va `JWT_REFRESH_SECRET`'ni albatta
  **yangi, kuchli, tasodifiy qiymatlar** bilan almashtiring.
- Click/Payme **Secret Key**larini hech kimga (shu jumladan frontend kodiga) oshkor
  qilmang — ular faqat backend `.env`da bo'lishi kerak.