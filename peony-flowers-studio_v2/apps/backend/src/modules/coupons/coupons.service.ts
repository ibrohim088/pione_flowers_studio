import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { CreateCouponInput } from './coupons.types';

export const couponsService = {
  async apply(code: string, subtotal: number) {
    const coupon = await prisma.coupon.findUnique({ where: { code } });
    if (!coupon || !coupon.isActive) throw new AppError('Kupon topilmadi yoki faol emas', 404);
    if (coupon.expiresAt && coupon.expiresAt < new Date()) throw new AppError('Kupon muddati o\'tgan', 400);
    if (subtotal < coupon.minOrderTotal) {
      throw new AppError(`Minimal buyurtma summasi: ${coupon.minOrderTotal} so'm`, 400);
    }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      throw new AppError('Kupon limiti tugagan', 400);
    }

    const discount = coupon.discountType === 'percent'
      ? Math.round((subtotal * coupon.discountValue) / 100)
      : coupon.discountValue;

    return { coupon, discount };
  },

  async list() {
    return prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  },

  async create(data: CreateCouponInput) {
    const existing = await prisma.coupon.findUnique({ where: { code: data.code } });
    if (existing) throw new AppError('Bu kod allaqachon mavjud', 409);
    return prisma.coupon.create({
      data: { ...data, expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined },
    });
  },

  async remove(id: string) {
    const coupon = await prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new AppError('Kupon topilmadi', 404);
    return prisma.coupon.delete({ where: { id } });
  },
};
