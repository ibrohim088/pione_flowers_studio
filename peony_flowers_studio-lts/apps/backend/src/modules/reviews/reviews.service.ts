import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { CreateReviewInput } from './reviews.types';

export const reviewsService = {
  async listByProduct(productId: string) {
    return prisma.review.findMany({
      where: { productId },
      include: { user: { select: { fullName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(userId: string, productId: string, data: CreateReviewInput) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new AppError('Mahsulot topilmadi', 404);

    const hasOrdered = await prisma.orderItem.findFirst({
      where: { productId, order: { userId, status: 'delivered' } },
    });
    if (!hasOrdered) {
      throw new AppError('Sharh qoldirish uchun avval mahsulotni xarid qiling', 403);
    }

    return prisma.review.upsert({
      where: { userId_productId: { userId, productId } },
      update: data,
      create: { userId, productId, ...data },
    });
  },

  async remove(id: string) {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) throw new AppError('Sharh topilmadi', 404);
    return prisma.review.delete({ where: { id } });
  },
};
