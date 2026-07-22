import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { clickProvider } from './providers/click.provider';
import { cashProvider } from './providers/cash.provider';
import { parsePagination, buildMeta } from '../../utils/pagination';

export const paymentsService = {
  async clickPrepare(orderId: string) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError('Buyurtma topilmadi', 404);
    if (order.paymentMethod !== 'click') throw new AppError('Bu buyurtma Click bilan to\'lanmaydi', 400);

    return clickProvider.prepare({ orderId, amount: order.total });
  },

  /** Click webhook: to'lov tugagach chaqiriladi. */
  async clickComplete(payload: {
    click_trans_id: string;
    service_id: string;
    merchant_trans_id: string; // orderId
    amount: string;
    action: string;
    sign_time: string;
    sign_string: string;
    error: string;
  }) {
    const isValid = clickProvider.verifySignature(payload);
    if (!isValid) {
      return { error: -1, error_note: 'SIGN CHECK FAILED' };
    }

    const order = await prisma.order.findUnique({ where: { id: payload.merchant_trans_id } });
    if (!order) {
      return { error: -5, error_note: 'Order not found' };
    }

    if (payload.error !== '0') {
      await prisma.$transaction([
        prisma.order.update({ where: { id: order.id }, data: { paymentStatus: 'failed' } }),
        prisma.transaction.update({
          where: { orderId: order.id },
          data: { status: 'failed', providerData: payload },
        }),
      ]);
      return { error: 0, error_note: 'Failure recorded' };
    }

    await prisma.$transaction([
      prisma.order.update({ where: { id: order.id }, data: { paymentStatus: 'paid' } }),
      prisma.transaction.update({
        where: { orderId: order.id },
        data: {
          status: 'paid',
          externalId: payload.click_trans_id,
          providerData: payload,
          paidAt: new Date(),
        },
      }),
    ]);

    return { error: 0, error_note: 'Success' };
  },

  async cashConfirm(orderId: string, adminId: string) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError('Buyurtma topilmadi', 404);
    if (order.paymentMethod !== 'cash') throw new AppError('Bu buyurtma naqd emas', 400);
    if (order.paymentStatus === 'paid') throw new AppError('Buyurtma allaqachon to\'langan', 400);

    return prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({ where: { id: orderId }, data: { paymentStatus: 'paid' } });
      await tx.transaction.update({
        where: { orderId },
        data: { status: 'paid', confirmedBy: adminId, paidAt: new Date() },
      });
      return updated;
    });
  },

  async cashReject(orderId: string, adminId: string) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError('Buyurtma topilmadi', 404);

    return prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({ where: { id: orderId }, data: { paymentStatus: 'failed' } });
      await tx.transaction.update({
        where: { orderId },
        data: { status: 'failed', confirmedBy: adminId },
      });
      return updated;
    });
  },

  async getStatus(orderId: string) {
    const transaction = await prisma.transaction.findUnique({ where: { orderId } });
    if (!transaction) throw new AppError('Tranzaksiya topilmadi', 404);
    return transaction;
  },

  async history(query: { page?: string; limit?: string; provider?: string; status?: string }) {
    const { skip, take, page, limit } = parsePagination(query);
    const where = {
      ...(query.provider ? { provider: query.provider } : {}),
      ...(query.status ? { status: query.status } : {}),
    };
    const [items, total] = await Promise.all([
      prisma.transaction.findMany({
        where, skip, take, orderBy: { createdAt: 'desc' },
        include: { order: { select: { id: true, user: { select: { fullName: true, phone: true } } } } },
      }),
      prisma.transaction.count({ where }),
    ]);
    return { items, meta: buildMeta(total, page, limit) };
  },

  async refund(transactionId: string, adminId: string) {
    const transaction = await prisma.transaction.findUnique({ where: { id: transactionId } });
    if (!transaction) throw new AppError('Tranzaksiya topilmadi', 404);
    if (transaction.status !== 'paid') throw new AppError('Faqat to\'langan tranzaksiyani qaytarish mumkin', 400);

    return prisma.$transaction(async (tx) => {
      await tx.order.update({ where: { id: transaction.orderId }, data: { paymentStatus: 'refunded' } });
      return tx.transaction.update({
        where: { id: transactionId },
        data: { status: 'refunded', confirmedBy: adminId },
      });
    });
  },
};
