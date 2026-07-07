# Peony Flower Studio — Foydalanish qo'llanmasi

Bu qo'llanma **admin panel** (`http://localhost:5174`) orqali do'konni qanday boshqarish haqida — mahsulot, kategoriya qo'shish, buyurtmalarni kuzatish va h.k.

---

## 1. Tizimga kirish

`http://localhost:5174` ochiladi → telefon raqamingizni kiritasiz (masalan admin uchun `+998901234567`) → SMS kod keladi (dev rejimda kod backend terminalida yoki `/api/auth/dev-otp/:phone` orqali ko'rinadi) → kodni kiritib tasdiqlaysiz.

Kirgach, chap tomonda menyu chiqadi — sizning rolingizga qarab (admin/florist/kuryer) turli bo'limlar ko'rinadi.

---

## 2. Kategoriya qo'shish

**Chap menyu → Kategoriyalar**

1. **"+ Yangi kategoriya"** tugmasini bosing
2. Faqat **nomi**ni kiritasiz (masalan: "Guldastalar")
3. **Saqlash** — tizim `slug`ni (URL uchun, masalan `guldastalar`) avtomatik yaratadi

Tahrirlash yoki o'chirish — jadvaldagi qator oldidagi tugmalar orqali.

> ⚠️ Kategoriyani o'chirishdan oldin, unga bog'langan mahsulotlar bo'lsa, avval ularni boshqa kategoriyaga o'tkazing yoki o'chiring — aks holda xatolik chiqishi mumkin.

---

## 3. Mahsulot qo'shish

**Chap menyu → Mahsulotlar**

1. **"+ Yangi mahsulot"** tugmasini bosing
2. Formani to'ldiring:

| Maydon | Izoh |
|---|---|
| Kategoriya | Oldindan yaratilgan kategoriyalardan tanlanadi |
| Nomi | Mahsulot nomi |
| Tavsif | Batafsil tavsif matni |
| Turi | `Bouquet`, `Flower`, `ChocolateBox`, `Souvenir` — shulardan birini qo'lda yozasiz (aniq shu so'zlar bilan, katta harf bilan boshlanadi) |
| Narx | So'mda, butun son |
| Chegirma narxi | Ixtiyoriy — agar aksiya bo'lsa |
| Stok | Omborda nechta dona bor |

3. **Rasm qo'shish** — "+ Rasm" tugmasi orqali kompyuteringizdan fayl tanlaysiz, avtomatik yuklanadi (bir nechta rasm qo'shish mumkin, birinchisi asosiy rasm bo'ladi)
4. **Saqlash**

Tahrirlash — jadvaldagi **"Tahrirlash"** tugmasi orqali xuddi shu forma ochiladi, o'zgartirib qayta saqlaysiz.

O'chirish — **"O'chirish"** tugmasi (darhol o'chadi, tasdiqlash so'ralmaydi — ehtiyot bo'ling).

---

## 4. Buyurtmalarni boshqarish

**Chap menyu → Buyurtmalar**

- Yuqoridagi filtr orqali statusi bo'yicha saralash mumkin (Kutilmoqda, Tasdiqlandi, Tayyorlanmoqda, Tayyor, Yetkazilmoqda, Yetkazildi, Bekor qilindi)
- Har bir qatordagi buyurtma ID'siga bosib, **batafsil sahifaga** o'tasiz
- U yerda buyurtma statusini o'zgartirish mumkin (dropdown orqali) — status o'zgarganda mijozga bildirishnoma boradi

**Buyurtma oqimi odatda shunday ketadi:**
```
pending (kutilmoqda) → confirmed (tasdiqlandi) → preparing (tayyorlanmoqda)
→ ready (tayyor) → delivering (yetkazilmoqda) → delivered (yetkazildi)
```
Istalgan bosqichda `cancelled` (bekor qilindi) qilish mumkin.

---

## 5. Florist bo'limi (agar florist rolida kirsangiz)

**Buyurtmalar navbati** sahifasida tayyorlanishi kerak bo'lgan buyurtmalar ro'yxati chiqadi. Har birini tayyorlab bo'lgach:
1. Tayyor guldasta rasmini yuklaysiz
2. **"Tayyor"** deb belgilaysiz — status avtomatik `ready`ga o'tadi

---

## 6. Kuryer bo'limi (agar kuryer rolida kirsangiz)

**Bugungi yetkazishlar** sahifasida sizga tayinlangan manzillar ro'yxati. Yetkazib bergach, **"Yetkazildi deb belgilash"** tugmasini bosasiz.

---

## 7. To'lovlar

**Chap menyu → To'lovlar**

Barcha tranzaksiyalar tarixi (Click orqali yoki naqd pul). Naqd pul bilan to'langan buyurtmalar uchun:
- **"Tasdiqlash"** — pul qabul qilinganini tasdiqlaysiz
- **"Rad etish"** — agar mijoz to'lamagan bo'lsa

---

## 8. Foydalanuvchilar

**Chap menyu → Foydalanuvchilar**

- Barcha ro'yxatdan o'tgan mijozlar va xodimlar ro'yxati
- Har bir foydalanuvchining rolini o'zgartirish mumkin (dropdown orqali: Mijoz / Florist / Kuryer / Admin)
- **"+ Yangi xodim"** — yangi florist yoki kuryer qo'shish (telefon raqam va ism kiritiladi, ular keyin OTP orqali kirishadi)
- **"Bloklash"** — foydalanuvchini faolsizlantiradi (butunlay o'chirmaydi)

---

## 9. Sayt kontenti ("Biz haqimizda")

**Chap menyu → Kontent**

Bu yerda saytdagi **"Biz haqimizda"** sahifasi matnini ikkala tilda (O'zbekcha/Ruscha tab orqali) tahrirlash mumkin:
- Sarlavha, kirish matni
- Tashkil topgan yil, mijozlar soni
- Xizmatlar ro'yxati (qo'shish/o'chirish tugmalari bilan)
- Qadriyatlar ro'yxati

**"Saqlash"** tugmasi bosilgach, o'zgarish saytda **darhol** ko'rinadi — kodga tegish yoki qayta deploy qilish shart emas.

---

## 10. Obunachilar (Newsletter)

**Chap menyu → Obunachilar**

Bosh sahifadagi "Yangiliklardan xabardor bo'ling" formasi orqali telefon raqamini qoldirgan mijozlar ro'yxati. Bu yerdan:
- Telefon raqam bo'yicha qidirish mumkin
- **"CSV yuklab olish"** — ro'yxatni fayl sifatida eksport qilib, SMS-rassilka xizmatlariga yuklash uchun

---

## 11. Dashboard

**Chap menyu → Dashboard** — umumiy statistika: sotuvlar, buyurtmalar soni, eng ko'p sotilgan mahsulotlar va h.k. grafik ko'rinishida.

---

## Qisqacha — eng ko'p ishlatiladigan amallar

| Vazifa | Qayerda |
|---|---|
| Yangi mahsulot qo'shish | Mahsulotlar → + Yangi mahsulot |
| Yangi kategoriya qo'shish | Kategoriyalar → + Yangi kategoriya |
| Buyurtma statusini o'zgartirish | Buyurtmalar → buyurtmani oching → status dropdown |
| "Biz haqimizda" matnini o'zgartirish | Kontent |
| Yangi xodim (florist/kuryer) qo'shish | Foydalanuvchilar → + Yangi xodim |
| Obunachilar ro'yxatini olish | Obunachilar → CSV yuklab olish |