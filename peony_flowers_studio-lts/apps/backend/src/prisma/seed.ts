import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed boshlandi...');

  // ==================== FOYDALANUVCHILAR ====================
  await prisma.user.upsert({
    where: { phone: '+998901234567' },
    update: {},
    create: { phone: '+998901234567', fullName: 'Admin User', role: 'admin' },
  });

  await prisma.user.upsert({
    where: { phone: '+998901234568' },
    update: {},
    create: { phone: '+998901234568', fullName: 'Florist Aziza', role: 'florist' },
  });

  await prisma.user.upsert({
    where: { phone: '+998901234569' },
    update: {},
    create: { phone: '+998901234569', fullName: 'Kuryer Jasur', role: 'courier' },
  });

  // 7 ta mijoz (customer)
  const customersData = [
    { phone: '+998901112233', fullName: 'Diyora Karimova', email: 'diyora@example.com' },
    { phone: '+998901112234', fullName: "Sardor G'ulomov", email: 'sardor@example.com' },
    { phone: '+998901112235', fullName: 'Malika Yusupova', email: 'malika@example.com' },
    { phone: '+998901112236', fullName: 'Bekzod Rashidov', email: 'bekzod@example.com' },
    { phone: '+998901112237', fullName: 'Nodira Aliyeva', email: 'nodira@example.com' },
    { phone: '+998901112238', fullName: 'Jasurbek Tursunov', email: 'jasurbek@example.com' },
    { phone: '+998901112239', fullName: 'Sevinch Qodirova', email: 'sevinch@example.com' },
  ];

  const customers: Record<string, { id: string }> = {};
  for (const c of customersData) {
    customers[c.phone] = await prisma.user.upsert({
      where: { phone: c.phone },
      update: {},
      create: { ...c, role: 'customer' },
    });
  }
  const customerList = Object.values(customers);

  // ==================== MANZILLAR (har mijozga 1 tadan, jami 7) ====================
  const addressesData = [
    { city: 'Toshkent', district: 'Chilonzor', street: "Bunyodkor ko'chasi", house: '12' },
    { city: 'Toshkent', district: 'Yunusobod', street: 'Amir Temur shoh ko\'chasi', house: '45' },
    { city: 'Toshkent', district: 'Mirzo Ulug\'bek', street: "Universitet ko'chasi", house: '3' },
    { city: 'Toshkent', district: 'Shayxontohur', street: "Navoiy ko'chasi", house: '78' },
    { city: 'Toshkent', district: 'Yashnobod', street: "Bog'ishamol ko'chasi", house: '21' },
    { city: 'Toshkent', district: 'Sergeli', street: "Qatortol ko'chasi", house: '9' },
    { city: 'Toshkent', district: "Olmazor", street: "Farg'ona yo'li", house: '56' },
  ];

  const addresses: { id: string; userId: string }[] = [];
  for (let i = 0; i < customerList.length; i++) {
    const addr = await prisma.address.create({
      data: {
        userId: customerList[i]!.id,
        label: 'Uy',
        isDefault: true,
        ...addressesData[i]!,
      },
    });
    addresses.push(addr);
  }

  // ==================== KATEGORIYALAR ====================
  const categoriesData = [
    { nameUz: 'Guldastalar', slug: 'buketlar', order: 1 },
    { nameUz: 'Yakka gullar', slug: 'yakka-gullar', order: 2 },
    { nameUz: "Shokolad to'plamlari", slug: 'shokolad', order: 3 },
    { nameUz: 'Sovg`a to`plamlari', slug: 'sovgalar', order: 4 },
  ];

  const categories: Record<string, { id: string }> = {};
  for (const c of categoriesData) {
    categories[c.slug] = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  // ==================== MAHSULOTLAR (uz/ru) ====================
  const productsData = [
    {
      titleUz: "Pion guldastasi 'Nafislik'",
      titleRu: "Букет пионов 'Нежность'",
      slug: 'pion-guldastasi-nafislik',
      descriptionUz: 'Och pushti pionlardan iborat nafis guldasta. Har qanday tabrik uchun mos.',
      descriptionRu: 'Нежный букет из светло-розовых пионов. Подходит для любого поздравления.',
      type: 'Bouquet',
      price: 350000,
      discountPrice: 299000,
      stock: 12,
      categorySlug: 'buketlar',
      images: [
        'https://placehold.co/800x1000/f7e0e6/6f2435?text=Pion+guldastasi+1&font=playfair-display',
        'https://placehold.co/800x1000/f3d6de/6f2435?text=Pion+guldastasi+2&font=playfair-display',
        'https://placehold.co/800x1000/efc9d4/6f2435?text=Pion+guldastasi+3&font=playfair-display',
        'https://placehold.co/800x1000/ebbcc9/6f2435?text=Pion+guldastasi+4&font=playfair-display',
      ],
    },
    {
      titleUz: "Atirgullar guldastasi 'Qizil ehtiros'",
      titleRu: "Букет роз 'Красная страсть'",
      slug: 'atirgullar-qizil-ehtiros',
      descriptionUz: '25 dona qizil atirgul, premium sifat, taze yetkazib beriladi.',
      descriptionRu: '25 красных роз премиум качества, доставка свежими цветами.',
      type: 'Bouquet',
      price: 420000,
      stock: 20,
      categorySlug: 'buketlar',
      images: [
        'https://placehold.co/800x1000/f7e0e6/6f2435?text=Qizil+ehtiros+1&font=playfair-display',
        'https://placehold.co/800x1000/f3d6de/6f2435?text=Qizil+ehtiros+2&font=playfair-display',
        'https://placehold.co/800x1000/efc9d4/6f2435?text=Qizil+ehtiros+3&font=playfair-display',
        'https://placehold.co/800x1000/ebbcc9/6f2435?text=Qizil+ehtiros+4&font=playfair-display',
      ],
    },
    {
      titleUz: "Aralash gullar to'plami 'Bahor'",
      titleRu: "Набор смешанных цветов 'Весна'",
      slug: 'aralash-gullar-bahor',
      descriptionUz: 'Turli xil mavsumiy gullardan tayyorlangan rangdor guldasta.',
      descriptionRu: 'Яркий букет из разнообразных сезонных цветов.',
      type: 'Bouquet',
      price: 280000,
      stock: 15,
      categorySlug: 'buketlar',
      images: [
        'https://placehold.co/800x1000/f7e0e6/6f2435?text=Bahor+toplami+1&font=playfair-display',
        'https://placehold.co/800x1000/f3d6de/6f2435?text=Bahor+toplami+2&font=playfair-display',
        'https://placehold.co/800x1000/efc9d4/6f2435?text=Bahor+toplami+3&font=playfair-display',
        'https://placehold.co/800x1000/ebbcc9/6f2435?text=Bahor+toplami+4&font=playfair-display',
      ],
    },
    {
      titleUz: 'Yakka oq lily',
      titleRu: 'Одиночная белая лилия',
      slug: 'yakka-oq-lily',
      descriptionUz: 'Bitta dona nafis oq lily guli, sovg`a sifatida.',
      descriptionRu: 'Одна изящная белая лилия, идеально в качестве подарка.',
      type: 'Flower',
      price: 45000,
      stock: 40,
      categorySlug: 'yakka-gullar',
      images: [
        'https://placehold.co/800x1000/f7e0e6/6f2435?text=Oq+lily+1&font=playfair-display',
        'https://placehold.co/800x1000/f3d6de/6f2435?text=Oq+lily+2&font=playfair-display',
        'https://placehold.co/800x1000/efc9d4/6f2435?text=Oq+lily+3&font=playfair-display',
        'https://placehold.co/800x1000/ebbcc9/6f2435?text=Oq+lily+4&font=playfair-display',
      ],
    },
    {
      titleUz: 'Yakka qizil atirgul',
      titleRu: 'Одиночная красная роза',
      slug: 'yakka-qizil-atirgul',
      descriptionUz: 'Bitta dona uzun bandli qizil atirgul.',
      descriptionRu: 'Одна красная роза на длинном стебле.',
      type: 'Flower',
      price: 25000,
      stock: 100,
      categorySlug: 'yakka-gullar',
      images: [
        'https://placehold.co/800x1000/f7e0e6/6f2435?text=Qizil+atirgul+1&font=playfair-display',
        'https://placehold.co/800x1000/f3d6de/6f2435?text=Qizil+atirgul+2&font=playfair-display',
        'https://placehold.co/800x1000/efc9d4/6f2435?text=Qizil+atirgul+3&font=playfair-display',
        'https://placehold.co/800x1000/ebbcc9/6f2435?text=Qizil+atirgul+4&font=playfair-display',
      ],
    },
    {
      titleUz: 'Raffaello shokolad qutisi',
      titleRu: 'Коробка конфет Raffaello',
      slug: 'raffaello-shokolad-qutisi',
      descriptionUz: "Premium Raffaello shokoladlar to'plami, 150g.",
      descriptionRu: 'Премиальный набор конфет Raffaello, 150г.',
      type: 'ChocolateBox',
      price: 95000,
      stock: 30,
      categorySlug: 'shokolad',
      images: [
        'https://placehold.co/800x1000/ede3d8/5c3a1e?text=Raffaello+1&font=playfair-display',
        'https://placehold.co/800x1000/e5d6c4/5c3a1e?text=Raffaello+2&font=playfair-display',
        'https://placehold.co/800x1000/ddc9b0/5c3a1e?text=Raffaello+3&font=playfair-display',
        'https://placehold.co/800x1000/d5bc9c/5c3a1e?text=Raffaello+4&font=playfair-display',
      ],
    },
    {
      titleUz: "Gul va shokolad sovg'a to'plami",
      titleRu: "Подарочный набор 'Цветы и шоколад'",
      slug: 'gul-shokolad-sovga-toplami',
      descriptionUz: "Guldasta va premium shokoladlar birgalikda — mukammal sovg'a.",
      descriptionRu: 'Букет и премиальный шоколад вместе — идеальный подарок.',
      type: 'Souvenir',
      price: 380000,
      discountPrice: 340000,
      stock: 10,
      categorySlug: 'sovgalar',
      images: [
        'https://placehold.co/800x1000/f7e0e6/6f2435?text=Gul+va+shokolad+1&font=playfair-display',
        'https://placehold.co/800x1000/f3d6de/6f2435?text=Gul+va+shokolad+2&font=playfair-display',
        'https://placehold.co/800x1000/efc9d4/6f2435?text=Gul+va+shokolad+3&font=playfair-display',
        'https://placehold.co/800x1000/ebbcc9/6f2435?text=Gul+va+shokolad+4&font=playfair-display',
      ],
    },
    {
      titleUz: "Yumshoq ayiqcha va gullar to'plami",
      titleRu: "Набор 'Мягкий мишка и цветы'",
      slug: 'yumshoq-ayiqcha-gullar',
      descriptionUz: "Yumshoq o'yinchoq ayiqcha va kichik guldasta birgalikda.",
      descriptionRu: 'Мягкая игрушка-мишка и небольшой букет вместе.',
      type: 'Souvenir',
      price: 210000,
      stock: 18,
      categorySlug: 'sovgalar',
      images: [
        'https://placehold.co/800x1000/f7e0e6/6f2435?text=Ayiqcha+va+gullar+1&font=playfair-display',
        'https://placehold.co/800x1000/f3d6de/6f2435?text=Ayiqcha+va+gullar+2&font=playfair-display',
        'https://placehold.co/800x1000/efc9d4/6f2435?text=Ayiqcha+va+gullar+3&font=playfair-display',
        'https://placehold.co/800x1000/ebbcc9/6f2435?text=Ayiqcha+va+gullar+4&font=playfair-display',
      ],
    },
  ];

  const products: Record<string, { id: string; price: number; discountPrice: number | null }> = {};
  for (const p of productsData) {
    const { categorySlug, images, ...data } = p;
    const category = categories[categorySlug];
    if (!category) continue;

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
      },
      create: { ...data, categoryId: category.id },
    });
    products[p.slug] = { id: product.id, price: product.price, discountPrice: product.discountPrice };

    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      if (!url) continue;
      await prisma.productImage.create({ data: { productId: product.id, url, order: i } });
    }
  }
  const productList = Object.values(products);
  const productSlugs = Object.keys(products);

  // ==================== BUYURTMALAR (10 ta, turli statusda) ====================
  // "delivered" statusidagilar review qoldirish shartiga mos keladi.
  // Ba'zi mahsulotlarga bir nechta mijoz buyurtma bergan — turli baholar chiqishi uchun.
  const ordersData = [
    { customerIdx: 0, productSlug: 'pion-guldastasi-nafislik', qty: 1, status: 'delivered', paymentMethod: 'click', paymentStatus: 'paid' },
    { customerIdx: 1, productSlug: 'pion-guldastasi-nafislik', qty: 1, status: 'delivered', paymentMethod: 'cash', paymentStatus: 'paid' },
    { customerIdx: 2, productSlug: 'pion-guldastasi-nafislik', qty: 1, status: 'delivered', paymentMethod: 'click', paymentStatus: 'paid' },
    { customerIdx: 3, productSlug: 'pion-guldastasi-nafislik', qty: 1, status: 'delivered', paymentMethod: 'cash', paymentStatus: 'paid' },
    { customerIdx: 4, productSlug: 'atirgullar-qizil-ehtiros', qty: 1, status: 'delivered', paymentMethod: 'click', paymentStatus: 'paid' },
    { customerIdx: 5, productSlug: 'atirgullar-qizil-ehtiros', qty: 1, status: 'delivered', paymentMethod: 'cash', paymentStatus: 'paid' },
    { customerIdx: 6, productSlug: 'raffaello-shokolad-qutisi', qty: 2, status: 'delivered', paymentMethod: 'click', paymentStatus: 'paid' },
    { customerIdx: 0, productSlug: 'raffaello-shokolad-qutisi', qty: 1, status: 'delivered', paymentMethod: 'cash', paymentStatus: 'paid' },
    { customerIdx: 1, productSlug: 'aralash-gullar-bahor', qty: 1, status: 'delivering', paymentMethod: 'cash', paymentStatus: 'pending_cash' },
    { customerIdx: 2, productSlug: 'yakka-oq-lily', qty: 2, status: 'pending', paymentMethod: 'cash', paymentStatus: 'pending' },
  ];

  const orders: { id: string; customerIdx: number; productSlug: string; status: string }[] = [];
  for (const o of ordersData) {
    const product = products[o.productSlug]!;
    const unitPrice = product.discountPrice ?? product.price;
    const subtotal = unitPrice * o.qty;
    const deliveryFee = subtotal >= 300000 ? 0 : 20000;
    const total = subtotal + deliveryFee;

    const order = await prisma.order.create({
      data: {
        userId: customerList[o.customerIdx]!.id,
        addressId: addresses[o.customerIdx]!.id,
        status: o.status,
        paymentMethod: o.paymentMethod,
        paymentStatus: o.paymentStatus,
        deliveryDate: new Date(),
        deliveryTime: '14:00-16:00',
        subtotal,
        deliveryFee,
        total,
        items: {
          create: [{ productId: product.id, quantity: o.qty, price: unitPrice }],
        },
      },
    });
    orders.push({ id: order.id, customerIdx: o.customerIdx, productSlug: o.productSlug, status: o.status });
  }

  // ==================== SHARHLAR (aralash baholar, faqat delivered buyurtmalar uchun) ====================
  const reviewsData = [
    // Pion guldastasi — 4 ta sharh, aralash baholar
    { orderIdx: 0, rating: 5, comment: "Juda chiroyli guldasta, o'z vaqtida yetkazishdi!" },
    { orderIdx: 1, rating: 4, comment: 'Gullar yangi va sifatli edi, rahmat.' },
    { orderIdx: 2, rating: 3, comment: "Yomon emas, lekin narxiga nisbatan o'rtacha." },
    { orderIdx: 3, rating: 2, comment: 'Gullar biroz so\'lgan holatda yetib keldi.' },
    // Atirgullar guldastasi — 2 ta sharh
    { orderIdx: 4, rating: 5, comment: "Ehtiros rangidagi atirgullar juda go'zal edi!" },
    { orderIdx: 5, rating: 4, comment: 'Yaxshi, faqat yetkazib berish biroz kechikdi.' },
    // Raffaello shokolad qutisi — 2 ta sharh
    { orderIdx: 6, rating: 4, comment: 'Shokolad juda mazali, sovg\'a sifatida ajoyib.' },
    { orderIdx: 7, rating: 5, comment: "Har doim shu qutini olaman, sifat doim a'lo." },
  ];

  for (const r of reviewsData) {
    const order = orders[r.orderIdx]!;
    await prisma.review.upsert({
      where: {
        userId_productId: {
          userId: customerList[order.customerIdx]!.id,
          productId: products[order.productSlug]!.id,
        },
      },
      update: { rating: r.rating, comment: r.comment },
      create: {
        userId: customerList[order.customerIdx]!.id,
        productId: products[order.productSlug]!.id,
        rating: r.rating,
        comment: r.comment,
      },
    });
  }

  // ==================== WISHLIST (6 ta) ====================
  const wishlistData = [
    { customerIdx: 0, productSlug: 'atirgullar-qizil-ehtiros' },
    { customerIdx: 1, productSlug: 'pion-guldastasi-nafislik' },
    { customerIdx: 2, productSlug: 'yumshoq-ayiqcha-gullar' },
    { customerIdx: 3, productSlug: 'raffaello-shokolad-qutisi' },
    { customerIdx: 4, productSlug: 'aralash-gullar-bahor' },
    { customerIdx: 5, productSlug: 'gul-shokolad-sovga-toplami' },
  ];

  for (const w of wishlistData) {
    await prisma.wishlistItem.upsert({
      where: {
        userId_productId: {
          userId: customerList[w.customerIdx]!.id,
          productId: products[w.productSlug]!.id,
        },
      },
      update: {},
      create: {
        userId: customerList[w.customerIdx]!.id,
        productId: products[w.productSlug]!.id,
      },
    });
  }

  // ==================== XABARNOMALAR (6 ta) ====================
  const notificationsData = [
    { customerIdx: 0, title: 'Buyurtma yetkazildi', message: 'Sizning buyurtmangiz muvaffaqiyatli yetkazildi.' },
    { customerIdx: 1, title: 'Buyurtma tasdiqlandi', message: 'Buyurtmangiz qabul qilindi va tayyorlanmoqda.' },
    { customerIdx: 2, title: 'Chegirma!', message: "Sizga maxsus 10% chegirma taqdim etildi." },
    { customerIdx: 3, title: 'Buyurtma yo\'lda', message: 'Kuryer buyurtmangizni yetkazib bermoqda.' },
    { customerIdx: 4, title: 'Rahmat!', message: 'Xaridingiz uchun rahmat, sharh qoldirishni unutmang.' },
    { customerIdx: 5, title: 'Yangi mahsulotlar', message: "Do'konimizga yangi guldastalar qo'shildi." },
  ];

  for (const n of notificationsData) {
    await prisma.notification.create({
      data: {
        userId: customerList[n.customerIdx]!.id,
        title: n.title,
        message: n.message,
      },
    });
  }

  // ==================== NEWSLETTER OBUNACHILARI (8 ta) ====================
  const newsletterPhones = [
    '+998901113001',
    '+998901113002',
    '+998901113003',
    '+998901113004',
    '+998901113005',
    '+998901113006',
    '+998901113007',
    '+998901113008',
  ];

  for (const phone of newsletterPhones) {
    await prisma.newsletterSubscriber.upsert({
      where: { phone },
      update: {},
      create: { phone },
    });
  }

  // ==================== SAYT KONTENTI — "Biz haqimizda" ====================
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
  console.log(`   👤 Foydalanuvchilar: 3 xodim + ${customerList.length} mijoz`);
  console.log(`   🌸 Mahsulotlar: ${productList.length}`);
  console.log(`   ⭐ Sharhlar: ${reviewsData.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });