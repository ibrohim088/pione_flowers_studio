-- Mavjud "title" va "description" ustunlarini uz tiliga ko'chiramiz,
-- ru tili uchun yangi ustunlar qo'shamiz (hozircha bo'sh, admin to'ldiradi).
ALTER TABLE "Product" RENAME COLUMN "title" TO "titleUz";
ALTER TABLE "Product" RENAME COLUMN "description" TO "descriptionUz";
ALTER TABLE "Product" ADD COLUMN "titleRu" TEXT;
ALTER TABLE "Product" ADD COLUMN "descriptionRu" TEXT;

-- Category uchun ham mahsulotlardagi kabi uz/ru nom qo'llab-quvvatlashi qo'shiladi.
ALTER TABLE "Category" RENAME COLUMN "name" TO "nameUz";
ALTER TABLE "Category" ADD COLUMN "nameRu" TEXT;