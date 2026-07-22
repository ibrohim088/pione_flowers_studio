import { prisma } from '../../config/database';

export const newsletterService = {
  async subscribe(phone: string) {
    const normalized = phone.trim();
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { phone: normalized } });
    if (existing) {
      return { subscriber: existing, alreadySubscribed: true as const };
    }
    const subscriber = await prisma.newsletterSubscriber.create({ data: { phone: normalized } });
    return { subscriber, alreadySubscribed: false as const };
  },

  async list() {
    return prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } });
  },
};
