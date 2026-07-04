import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();
 
async function main() {
  console.log('🌱 Seed boshlandi...');
 
  // Admin foydalanuvchi
  await prisma.user.upsert({
    where: { phone: '+998901234567' },
    update: {},
    create: {
      phone: '+998901234567',
      fullName: 'Admin User',
      role: 'admin',
    },
  });
 
  // Florist
  await prisma.user.upsert({
    where: { phone: '+998901234568' },
    update: {},
    create: {
      phone: '+998901234568',
      fullName: 'Florist Aziza',
      role: 'florist',
    },
  });
 
  // Courier
  await prisma.user.upsert({
    where: { phone: '+998901234569' },
    update: {},
    create: {
      phone: '+998901234569',
      fullName: 'Kuryer Jasur',
      role: 'courier',
    },
  });
 
  // Kategoriyalar
  const categoriesData = [
    { name: "Guldastalar", slug: 'buketlar', order: 1 },
    { name: 'Yakka gullar', slug: 'yakka-gullar', order: 2 },
    { name: "Shokolad to'plamlari", slug: 'shokolad', order: 3 },
    { name: 'Sovg`a to`plamlari', slug: 'sovgalar', order: 4 },
  ];
 
  const categories: Record<string, { id: string }> = {};
  for (const c of categoriesData) {
    categories[c.slug] = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }
 
  // Mahsulotlar
  const productsData = [
    {
      title: "Pion guldastasi 'Nafislik'",
      slug: 'pion-guldastasi-nafislik',
      description: "Och pushti pionlardan iborat nafis guldasta. Har qanday tabrik uchun mos.",
      type: 'Bouquet',
      price: 350000,
      discountPrice: 299000,
      stock: 12,
      categorySlug: 'buketlar',
      images: [
        "https://placehold.co/800x1000/f7e0e6/6f2435?text=Pion+guldastasi+1&font=playfair-display",
        "https://placehold.co/800x1000/f3d6de/6f2435?text=Pion+guldastasi+2&font=playfair-display",
        "https://placehold.co/800x1000/efc9d4/6f2435?text=Pion+guldastasi+3&font=playfair-display",
      ],
    },
    {
      title: "Atirgullar guldastasi 'Qizil ehtiros'",
      slug: 'atirgullar-qizil-ehtiros',
      description: "25 dona qizil atirgul, premium sifat, taze yetkazib beriladi.",
      type: 'Bouquet',
      price: 420000,
      stock: 20,
      categorySlug: 'buketlar',
      images: [
        "https://placehold.co/800x1000/f7e0e6/6f2435?text=Qizil+ehtiros+1&font=playfair-display",
        "https://placehold.co/800x1000/f3d6de/6f2435?text=Qizil+ehtiros+2&font=playfair-display",
        "https://placehold.co/800x1000/efc9d4/6f2435?text=Qizil+ehtiros+3&font=playfair-display",
      ],
    },
    {
      title: "Aralash gullar to'plami 'Bahor'",
      slug: 'aralash-gullar-bahor',
      description: "Turli xil mavsumiy gullardan tayyorlangan rangdor guldasta.",
      type: 'Bouquet',
      price: 280000,
      stock: 15,
      categorySlug: 'buketlar',
      images: [
        "https://placehold.co/800x1000/f7e0e6/6f2435?text=Bahor+toplami+1&font=playfair-display",
        "https://placehold.co/800x1000/f3d6de/6f2435?text=Bahor+toplami+2&font=playfair-display",
      ],
    },
    {
      title: 'Yakka oq lily',
      slug: 'yakka-oq-lily',
      description: 'Bitta dona nafis oq lily guli, sovg`a sifatida.',
      type: 'Flower',
      price: 45000,
      stock: 40,
      categorySlug: 'yakka-gullar',
      images: [
        "https://placehold.co/800x1000/f7e0e6/6f2435?text=Oq+lily+1&font=playfair-display",
        "https://placehold.co/800x1000/f3d6de/6f2435?text=Oq+lily+2&font=playfair-display",
      ],
    },
    {
      title: 'Yakka qizil atirgul',
      slug: 'yakka-qizil-atirgul',
      description: "Bitta dona uzun bandli qizil atirgul.",
      type: 'Flower',
      price: 25000,
      stock: 100,
      categorySlug: 'yakka-gullar',
      images: [
        "https://placehold.co/800x1000/f7e0e6/6f2435?text=Qizil+atirgul+1&font=playfair-display",
        "https://placehold.co/800x1000/f3d6de/6f2435?text=Qizil+atirgul+2&font=playfair-display",
      ],
    },
    {
      title: "Raffaello shokolad qutisi",
      slug: 'raffaello-shokolad-qutisi',
      description: "Premium Raffaello shokoladlar to'plami, 150g.",
      type: 'ChocolateBox',
      price: 95000,
      stock: 30,
      categorySlug: 'shokolad',
      images: [
        "https://placehold.co/800x1000/ede3d8/5c3a1e?text=Raffaello+1&font=playfair-display",
        "https://placehold.co/800x1000/e5d6c4/5c3a1e?text=Raffaello+2&font=playfair-display",
      ],
    },
    {
      title: "Gul va shokolad sovg'a to'plami",
      slug: 'gul-shokolad-sovga-toplami',
      description: "Guldasta va premium shokoladlar birgalikda — mukammal sovg'a.",
      type: 'Souvenir',
      price: 380000,
      discountPrice: 340000,
      stock: 10,
      categorySlug: 'sovgalar',
      images: [
        "https://placehold.co/800x1000/f7e0e6/6f2435?text=Gul+va+shokolad+1&font=playfair-display",
        "https://placehold.co/800x1000/f3d6de/6f2435?text=Gul+va+shokolad+2&font=playfair-display",
      ],
    },
    {
      title: "Yumshoq ayiqcha va gullar to'plami",
      slug: 'yumshoq-ayiqcha-gullar',
      description: "Yumshoq o'yinchoq ayiqcha va kichik guldasta birgalikda.",
      type: 'Souvenir',
      price: 210000,
      stock: 18,
      categorySlug: 'sovgalar',
      images: [
        "https://placehold.co/800x1000/f7e0e6/6f2435?text=Ayiqcha+va+gullar+1&font=playfair-display",
        "https://placehold.co/800x1000/f3d6de/6f2435?text=Ayiqcha+va+gullar+2&font=playfair-display",
      ],
    },
  ];
 
  for (const p of productsData) {
    const { categorySlug, images, ...data } = p;
    const category = categories[categorySlug];
    if (!category) continue;
 
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...data,
        categoryId: category.id,
      },
    });
 
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      if (!url) continue;
      await prisma.productImage.create({
        data: { productId: product.id, url, order: i },
      });
    }
  }
 
  console.log('✅ Seed muvaffaqiyatli yakunlandi');
}
 
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🌱 Seed boshlandi...');

//   // Admin foydalanuvchi
//   await prisma.user.upsert({
//     where: { phone: '+998901234567' },
//     update: {},
//     create: {
//       phone: '+998901234567',
//       fullName: 'Admin User',
//       role: 'admin',
//     },
//   });

//   // Florist
//   await prisma.user.upsert({
//     where: { phone: '+998901234568' },
//     update: {},
//     create: {
//       phone: '+998901234568',
//       fullName: 'Florist Aziza',
//       role: 'florist',
//     },
//   });

//   // Courier
//   await prisma.user.upsert({
//     where: { phone: '+998901234569' },
//     update: {},
//     create: {
//       phone: '+998901234569',
//       fullName: 'Kuryer Jasur',
//       role: 'courier',
//     },
//   });

//   console.log('✅ Seed muvaffaqiyatli yakunlandi');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });