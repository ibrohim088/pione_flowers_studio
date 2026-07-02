import { PrismaClient } from '@prisma/client';
import { slugify } from '../utils/slugify';

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
    { name: 'Guldastalar', type: 'Bouquet' },
    { name: 'Donali gullar', type: 'Flower' },
    { name: 'Shokoladlar', type: 'ChocolateBox' },
    { name: 'Suvenirlar', type: 'Souvenir' },
  ];

  for (const c of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: slugify(c.name) },
      update: {},
      create: {
        name: c.name,
        slug: slugify(c.name),
      },
    });

    await prisma.product.upsert({
      where: { slug: `${slugify(c.name)}-demo` },
      update: {},
      create: {
        categoryId: category.id,
        title: `${c.name} — Demo mahsulot`,
        slug: `${slugify(c.name)}-demo`,
        description: 'Demo mahsulot tavsifi',
        type: c.type,
        price: 150000,
        stock: 20,
      },
    });
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
