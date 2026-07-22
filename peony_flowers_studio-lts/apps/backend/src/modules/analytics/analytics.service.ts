import { prisma } from '../../config/database';
import { getOrSetCache } from '../../config/redis';

function getStartDate(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
}

export const analyticsService = {
  async overview(days = 30) {
    return getOrSetCache(`analytics:overview:${days}`, 300, async () => {
      const startDate = getStartDate(days);
      const [totalRevenue, totalOrders, totalUsers, activeProducts] = await Promise.all([
        prisma.transaction.aggregate({ where: { status: 'paid', createdAt: { gte: startDate } }, _sum: { amount: true } }),
        prisma.order.count({ where: { createdAt: { gte: startDate } } }),
        prisma.user.count({ where: { role: 'customer' } }),
        prisma.product.count({ where: { isActive: true } }),
      ]);

      return {
        totalRevenue: (totalRevenue._sum.amount ?? 0) / 100,
        totalOrders,
        totalUsers,
        activeProducts,
      };
    });
  },

  async revenue(days = 30) {
    return getOrSetCache(`analytics:revenue:${days}`, 300, async () => {
      const startDate = getStartDate(days);
      const transactions = await prisma.transaction.findMany({
        where: { status: 'paid', createdAt: { gte: startDate } },
        select: { amount: true, createdAt: true },
      });

      const byDay: Record<string, number> = {};
      for (const t of transactions) {
        const key = t.createdAt.toISOString().slice(0, 10);
        byDay[key] = (byDay[key] ?? 0) + t.amount / 100;
      }
      return Object.entries(byDay).map(([date, total]) => ({ date, total }));
    });
  },

  async orders(days = 30) {
    return getOrSetCache(`analytics:orders:${days}`, 300, async () => {
      const startDate = getStartDate(days);
      const orders = await prisma.order.groupBy({
        by: ['status'],
        where: { createdAt: { gte: startDate } },
        _count: { _all: true },
      });
      return orders.map((o) => ({ status: o.status, count: o._count._all }));
    });
  },

  async products(days = 30) {
    return getOrSetCache(`analytics:products:${days}`, 300, async () => {
      const startDate = getStartDate(days);
      const topProducts = await prisma.orderItem.groupBy({
        by: ['productId'],
        where: { order: { createdAt: { gte: startDate } } },
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 10,
      });

      const productIds = topProducts.map((p) => p.productId);
      const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

      return topProducts.map((tp) => ({
        product: products.find((p) => p.id === tp.productId),
        soldQuantity: tp._sum.quantity ?? 0,
      }));
    });
  },

  async users(days = 30) {
    return getOrSetCache(`analytics:users:${days}`, 300, async () => {
      const startDate = getStartDate(days);
      const newUsers = await prisma.user.count({ where: { createdAt: { gte: startDate }, role: 'customer' } });
      const totalUsers = await prisma.user.count({ where: { role: 'customer' } });
      return { newUsers, totalUsers };
    });
  },

  async getDashboard(days = 30) {
    const [overview, revenue, orders, products, users] = await Promise.all([
      this.overview(days),
      this.revenue(days),
      this.orders(days),
      this.products(days),
      this.users(days),
    ]);
    return { overview, revenue, orders, products, users };
  },
};
