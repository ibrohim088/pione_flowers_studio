import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';

export const wishlistService = {
  async list(userId: string) {
    return prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: { include: { images: true } } },
      orderBy: { createdAt: 'desc' },
    });
  },

  async add(userId: string, productId: string) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new AppError('Mahsulot topilmadi', 404);

    return prisma.wishlistItem.upsert({
      where: { userId_productId: { userId, productId } },
      update: {},
      create: { userId, productId },
    });
  },

  async remove(userId: string, productId: string) {
    await prisma.wishlistItem.deleteMany({ where: { userId, productId } });
  },
};
