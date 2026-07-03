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