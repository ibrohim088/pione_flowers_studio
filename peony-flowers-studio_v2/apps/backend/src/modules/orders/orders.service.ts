import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { canTransition, OrderStatus } from '../../constants/orderStatus';
import { parsePagination, buildMeta } from '../../utils/pagination';
import { CreateOrderInput } from './orders.types';

const DELIVERY_FEE = 25000;

export const ordersService = {
  async create(userId: string, input: CreateOrderInput) {
    const productIds = input.items.map((i) => i.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

    if (products.length !== productIds.length) {
      throw new AppError('Ba\'zi mahsulotlar topilmadi', 404);
    }

    for (const item of input.items) {
      const product = products.find((p) => p.id === item.productId)!;
      if (product.stock < item.quantity) {
        throw new AppError(`"${product.title}" uchun yetarli stok yo'q`, 400);
      }
    }

    let subtotal = 0;
    const orderItemsData = input.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      const price = product.discountPrice ?? product.price;
      subtotal += price * item.quantity;
      return { productId: item.productId, quantity: item.quantity, price };
    });

    let discount = 0;
    let couponId: string | undefined;

    if (input.couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: input.couponCode } });
      if (!coupon || !coupon.isActive) throw new AppError('Kupon topilmadi yoki faol emas', 400);
      if (coupon.expiresAt && coupon.expiresAt < new Date()) throw new AppError('Kupon muddati o\'tgan', 400);
      if (subtotal < coupon.minOrderTotal) {
        throw new AppError(`Minimal buyurtma summasi: ${coupon.minOrderTotal} so'm`, 400);
      }
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        throw new AppError('Kupon limiti tugagan', 400);
      }
      discount = coupon.discountType === 'percent'
        ? Math.round((subtotal * coupon.discountValue) / 100)
        : coupon.discountValue;
      couponId = coupon.id;
    }

    const total = subtotal - discount + DELIVERY_FEE;

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userId,
          addressId: input.addressId,
          paymentMethod: input.paymentMethod,
          paymentStatus: input.paymentMethod === 'cash' ? 'pending_cash' : 'pending',
          deliveryDate: new Date(input.deliveryDate),
          deliveryTime: input.deliveryTime,
          giftMessage: input.giftMessage,
          subtotal,
          discount,
          deliveryFee: DELIVERY_FEE,
          total,
          couponId,
          items: { create: orderItemsData },
        },
        include: { items: { include: { product: true } } },
      });

      for (const item of input.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      if (couponId) {
        await tx.coupon.update({ where: { id: couponId }, data: { usedCount: { increment: 1 } } });
      }

      await tx.transaction.create({
        data: {
          orderId: created.id,
          provider: input.paymentMethod,
          amount: total * 100,
          status: input.paymentMethod === 'cash' ? 'pending' : 'pending',
        },
      });

      return created;
    });

    return order;
  },

  async listByUser(userId: string, query: { page?: string; limit?: string }) {
    const { skip, take, page, limit } = parsePagination(query);
    const where = { userId };
    const [items, total] = await Promise.all([
      prisma.order.findMany({
        where, skip, take, orderBy: { createdAt: 'desc' },
        include: { items: { include: { product: true } }, transaction: true },
      }),
      prisma.order.count({ where }),
    ]);
    return { items, meta: buildMeta(total, page, limit) };
  },

  async getById(id: string, requesterId?: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        address: true,
        transaction: true,
        user: { select: { id: true, fullName: true, phone: true } },
      },
    });
    if (!order) throw new AppError('Buyurtma topilmadi', 404);
    if (requesterId && order.userId !== requesterId) {
      throw new AppError('Bu buyurtmaga ruxsatingiz yo\'q', 403);
    }
    return order;
  },

  async cancel(id: string, userId: string) {
    const order = await this.getById(id, userId);
    if (!canTransition(order.status as OrderStatus, 'cancelled')) {
      throw new AppError(`"${order.status}" holatidan bekor qilib bo'lmaydi`, 400);
    }
    return prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({ where: { id }, data: { status: 'cancelled' } });
      for (const item of order.items) {
        await tx.product.update({ where: { id: item.productId }, data: { stock: { increment: item.quantity } } });
      }
      return updated;
    });
  },

  async listAllForAdmin(query: { page?: string; limit?: string; status?: string; paymentStatus?: string }) {
    const { skip, take, page, limit } = parsePagination(query);
    const where = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.paymentStatus ? { paymentStatus: query.paymentStatus } : {}),
    };
    const [items, total] = await Promise.all([
      prisma.order.findMany({
        where, skip, take, orderBy: { createdAt: 'desc' },
        include: { user: { select: { fullName: true, phone: true } }, items: true },
      }),
      prisma.order.count({ where }),
    ]);
    return { items, meta: buildMeta(total, page, limit) };
  },

  async updateStatus(id: string, newStatus: OrderStatus) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new AppError('Buyurtma topilmadi', 404);
    if (!canTransition(order.status as OrderStatus, newStatus)) {
      throw new AppError(`"${order.status}" dan "${newStatus}" ga o'tish mumkin emas`, 400);
    }
    return prisma.order.update({ where: { id }, data: { status: newStatus } });
  },

  async floristQueue() {
    return prisma.order.findMany({
      where: { status: { in: ['confirmed', 'preparing'] } },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'asc' },
    });
  },

  async markPrepared(id: string, floristId: string, preparedPhotoUrl: string) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new AppError('Buyurtma topilmadi', 404);
    if (!canTransition(order.status as OrderStatus, 'ready')) {
      throw new AppError('Bu buyurtma tayyor deb belgilanishi mumkin emas', 400);
    }
    return prisma.order.update({
      where: { id },
      data: { status: 'ready', preparedPhotoUrl, preparedById: floristId },
    });
  },

  async courierToday(courierId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return prisma.order.findMany({
      where: {
        courierId,
        status: 'delivering',
        deliveryDate: { gte: startOfDay, lte: endOfDay },
      },
      include: { address: true, user: { select: { fullName: true, phone: true } } },
    });
  },

  async markDelivered(id: string, courierId: string) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new AppError('Buyurtma topilmadi', 404);
    if (!canTransition(order.status as OrderStatus, 'delivered')) {
      throw new AppError('Bu buyurtma yetkazildi deb belgilanishi mumkin emas', 400);
    }
    return prisma.order.update({
      where: { id },
      data: { status: 'delivered', courierId },
    });
  },
};
