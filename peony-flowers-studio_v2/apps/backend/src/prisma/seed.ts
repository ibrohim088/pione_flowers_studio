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

  // Sayt kontenti — "Biz haqimizda"
  await prisma.siteContent.upsert({
    where: { key: 'about' },
    update: {},
    create: {
      key: 'about',
      data: {
        uz: {
          title: 'Peony Flower Studio',
          intro:
            "Peony Flower Studio — nafislik, go'zallik va samimiy tuyg'ularni gullar orqali ifoda etuvchi zamonaviy gul studiyasi.\n\n" +
            "2021-yildan buyon faoliyat yuritib kelayotgan studiyamiz shu kungacha 10 000 dan ortiq mijoz ishonchini qozonishga muvaffaq bo'ldi. " +
            "Har bir buyurtma biz uchun alohida ahamiyatga ega bo'lib, mijozlarimizning eng quvonchli va unutilmas lahzalariga go'zallik ulashishni o'z oldimizga maqsad qilganmiz.\n\n" +
            "Biz har bir guldastani tajribali floristlarimiz tomonidan did, mehr va yuqori professionallik bilan tayyorlaymiz. " +
            "Faqat yangi va sifatli gullardan foydalanib, zamonaviy floristika yo'nalishlariga mos, betakror kompozitsiyalar yaratamiz.",
          foundedYear: 2021,
          customersCount: 10000,
          services: [
            'Mualliflik va eksklyuziv guldastalar',
            'Individual buyurtmalar asosida gul kompozitsiyalari',
            "To'y, nikoh, tug'ilgan kun, yubiley va boshqa tadbirlarni gullar bilan bezatish",
            'Korporativ buyurtmalar',
            'Tezkor va ishonchli yetkazib berish xizmati',
          ],
          values: ['Sifat', 'Ishonch', 'Nafis dizayn', 'Mijozlar mamnunligi'],
          address: "Andijon shahar, Mashrab ko'chasi 7",
          lat: 40.7821,
          lng: 72.3442,
        },
        ru: {
          title: 'Peony Flower Studio',
          intro:
            'Peony Flower Studio — современная цветочная студия, передающая изящество, красоту и искренние чувства через цветы.\n\n' +
            'Работая с 2021 года, наша студия завоевала доверие более 10 000 клиентов. Каждый заказ важен для нас — ' +
            'мы стремимся дарить красоту в самые радостные и незабываемые моменты жизни наших клиентов.\n\n' +
            'Каждый букет создаётся нашими опытными флористами со вкусом, любовью и высоким профессионализмом. ' +
            'Мы используем только свежие и качественные цветы, создавая неповторимые композиции в духе современной флористики.',
          foundedYear: 2021,
          customersCount: 10000,
          services: [
            'Авторские и эксклюзивные букеты',
            'Цветочные композиции по индивидуальному заказу',
            'Оформление свадеб, дней рождения, юбилеев и других мероприятий',
            'Корпоративные заказы',
            'Быстрая и надёжная доставка',
          ],
          values: ['Качество', 'Доверие', 'Изысканный дизайн', 'Удовлетворённость клиентов'],
          address: 'г. Андижан, улица Машраб, 7',
          lat: 40.7821,
          lng: 72.3442,
        },
      },
      updatedBy: null,
    },
  });
 
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
 
//   // Kategoriyalar
//   const categoriesData = [
//     { name: "Guldastalar", slug: 'buketlar', order: 1 },
//     { name: 'Yakka gullar', slug: 'yakka-gullar', order: 2 },
//     { name: "Shokolad to'plamlari", slug: 'shokolad', order: 3 },
//     { name: 'Sovg`a to`plamlari', slug: 'sovgalar', order: 4 },
//   ];
 
//   const categories: Record<string, { id: string }> = {};
//   for (const c of categoriesData) {
//     categories[c.slug] = await prisma.category.upsert({
//       where: { slug: c.slug },
//       update: {},
//       create: c,
//     });
//   }
 
//   // Mahsulotlar
//   const productsData = [
//     {
//       title: "Pion guldastasi 'Nafislik'",
//       slug: 'pion-guldastasi-nafislik',
//       description: "Och pushti pionlardan iborat nafis guldasta. Har qanday tabrik uchun mos.",
//       type: 'Bouquet',
//       price: 350000,
//       discountPrice: 299000,
//       stock: 12,
//       categorySlug: 'buketlar',
//       images: [
//         "https://placehold.co/800x1000/f7e0e6/6f2435?text=Pion+guldastasi+1&font=playfair-display",
//         "https://placehold.co/800x1000/f3d6de/6f2435?text=Pion+guldastasi+2&font=playfair-display",
//         "https://placehold.co/800x1000/efc9d4/6f2435?text=Pion+guldastasi+3&font=playfair-display",
//       ],
//     },
//     {
//       title: "Atirgullar guldastasi 'Qizil ehtiros'",
//       slug: 'atirgullar-qizil-ehtiros',
//       description: "25 dona qizil atirgul, premium sifat, taze yetkazib beriladi.",
//       type: 'Bouquet',
//       price: 420000,
//       stock: 20,
//       categorySlug: 'buketlar',
//       images: [
//         "https://placehold.co/800x1000/f7e0e6/6f2435?text=Qizil+ehtiros+1&font=playfair-display",
//         "https://placehold.co/800x1000/f3d6de/6f2435?text=Qizil+ehtiros+2&font=playfair-display",
//         "https://placehold.co/800x1000/efc9d4/6f2435?text=Qizil+ehtiros+3&font=playfair-display",
//       ],
//     },
//     {
//       title: "Aralash gullar to'plami 'Bahor'",
//       slug: 'aralash-gullar-bahor',
//       description: "Turli xil mavsumiy gullardan tayyorlangan rangdor guldasta.",
//       type: 'Bouquet',
//       price: 280000,
//       stock: 15,
//       categorySlug: 'buketlar',
//       images: [
//         "https://placehold.co/800x1000/f7e0e6/6f2435?text=Bahor+toplami+1&font=playfair-display",
//         "https://placehold.co/800x1000/f3d6de/6f2435?text=Bahor+toplami+2&font=playfair-display",
//       ],
//     },
//     {
//       title: 'Yakka oq lily',
//       slug: 'yakka-oq-lily',
//       description: 'Bitta dona nafis oq lily guli, sovg`a sifatida.',
//       type: 'Flower',
//       price: 45000,
//       stock: 40,
//       categorySlug: 'yakka-gullar',
//       images: [
//         "https://placehold.co/800x1000/f7e0e6/6f2435?text=Oq+lily+1&font=playfair-display",
//         "https://placehold.co/800x1000/f3d6de/6f2435?text=Oq+lily+2&font=playfair-display",
//       ],
//     },
//     {
//       title: 'Yakka qizil atirgul',
//       slug: 'yakka-qizil-atirgul',
//       description: "Bitta dona uzun bandli qizil atirgul.",
//       type: 'Flower',
//       price: 25000,
//       stock: 100,
//       categorySlug: 'yakka-gullar',
//       images: [
//         "https://placehold.co/800x1000/f7e0e6/6f2435?text=Qizil+atirgul+1&font=playfair-display",
//         "https://placehold.co/800x1000/f3d6de/6f2435?text=Qizil+atirgul+2&font=playfair-display",
//       ],
//     },
//     {
//       title: "Raffaello shokolad qutisi",
//       slug: 'raffaello-shokolad-qutisi',
//       description: "Premium Raffaello shokoladlar to'plami, 150g.",
//       type: 'ChocolateBox',
//       price: 95000,
//       stock: 30,
//       categorySlug: 'shokolad',
//       images: [
//         "https://placehold.co/800x1000/ede3d8/5c3a1e?text=Raffaello+1&font=playfair-display",
//         "https://placehold.co/800x1000/e5d6c4/5c3a1e?text=Raffaello+2&font=playfair-display",
//       ],
//     },
//     {
//       title: "Gul va shokolad sovg'a to'plami",
//       slug: 'gul-shokolad-sovga-toplami',
//       description: "Guldasta va premium shokoladlar birgalikda — mukammal sovg'a.",
//       type: 'Souvenir',
//       price: 380000,
//       discountPrice: 340000,
//       stock: 10,
//       categorySlug: 'sovgalar',
//       images: [
//         "https://placehold.co/800x1000/f7e0e6/6f2435?text=Gul+va+shokolad+1&font=playfair-display",
//         "https://placehold.co/800x1000/f3d6de/6f2435?text=Gul+va+shokolad+2&font=playfair-display",
//       ],
//     },
//     {
//       title: "Yumshoq ayiqcha va gullar to'plami",
//       slug: 'yumshoq-ayiqcha-gullar',
//       description: "Yumshoq o'yinchoq ayiqcha va kichik guldasta birgalikda.",
//       type: 'Souvenir',
//       price: 210000,
//       stock: 18,
//       categorySlug: 'sovgalar',
//       images: [
//         "https://placehold.co/800x1000/f7e0e6/6f2435?text=Ayiqcha+va+gullar+1&font=playfair-display",
//         "https://placehold.co/800x1000/f3d6de/6f2435?text=Ayiqcha+va+gullar+2&font=playfair-display",
//       ],
//     },
//   ];
 
//   for (const p of productsData) {
//     const { categorySlug, images, ...data } = p;
//     const category = categories[categorySlug];
//     if (!category) continue;
 
//     const product = await prisma.product.upsert({
//       where: { slug: p.slug },
//       update: {},
//       create: {
//         ...data,
//         categoryId: category.id,
//       },
//     });
 
//     await prisma.productImage.deleteMany({ where: { productId: product.id } });
//     for (let i = 0; i < images.length; i++) {
//       const url = images[i];
//       if (!url) continue;
//       await prisma.productImage.create({
//         data: { productId: product.id, url, order: i },
//       });
//     }
//   }

//   // Sayt kontenti — "Biz haqimizda"
//   await prisma.siteContent.upsert({
//     where: { key: 'about' },
//     update: {},
//     create: {
//       key: 'about',
//       data: {
//         uz: {
//           title: 'Peony Flower Studio',
//           intro:
//             "Peony Flower Studio — nafislik, go'zallik va samimiy tuyg'ularni gullar orqali ifoda etuvchi zamonaviy gul studiyasi.\n\n" +
//             "2021-yildan buyon faoliyat yuritib kelayotgan studiyamiz shu kungacha 10 000 dan ortiq mijoz ishonchini qozonishga muvaffaq bo'ldi. " +
//             "Har bir buyurtma biz uchun alohida ahamiyatga ega bo'lib, mijozlarimizning eng quvonchli va unutilmas lahzalariga go'zallik ulashishni o'z oldimizga maqsad qilganmiz.\n\n" +
//             "Biz har bir guldastani tajribali floristlarimiz tomonidan did, mehr va yuqori professionallik bilan tayyorlaymiz. " +
//             "Faqat yangi va sifatli gullardan foydalanib, zamonaviy floristika yo'nalishlariga mos, betakror kompozitsiyalar yaratamiz.",
//           foundedYear: 2021,
//           customersCount: 10000,
//           services: [
//             'Mualliflik va eksklyuziv guldastalar',
//             'Individual buyurtmalar asosida gul kompozitsiyalari',
//             "To'y, nikoh, tug'ilgan kun, yubiley va boshqa tadbirlarni gullar bilan bezatish",
//             'Korporativ buyurtmalar',
//             'Tezkor va ishonchli yetkazib berish xizmati',
//           ],
//           values: ['Sifat', 'Ishonch', 'Nafis dizayn', 'Mijozlar mamnunligi'],
//         },
//         ru: {
//           title: 'Peony Flower Studio',
//           intro:
//             'Peony Flower Studio — современная цветочная студия, передающая изящество, красоту и искренние чувства через цветы.\n\n' +
//             'Работая с 2021 года, наша студия завоевала доверие более 10 000 клиентов. Каждый заказ важен для нас — ' +
//             'мы стремимся дарить красоту в самые радостные и незабываемые моменты жизни наших клиентов.\n\n' +
//             'Каждый букет создаётся нашими опытными флористами со вкусом, любовью и высоким профессионализмом. ' +
//             'Мы используем только свежие и качественные цветы, создавая неповторимые композиции в духе современной флористики.',
//           foundedYear: 2021,
//           customersCount: 10000,
//           services: [
//             'Авторские и эксклюзивные букеты',
//             'Цветочные композиции по индивидуальному заказу',
//             'Оформление свадеб, дней рождения, юбилеев и других мероприятий',
//             'Корпоративные заказы',
//             'Быстрая и надёжная доставка',
//           ],
//           values: ['Качество', 'Доверие', 'Изысканный дизайн', 'Удовлетворённость клиентов'],
//         },
//       },
//       updatedBy: null,
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