import { prisma } from '../../config/database';

export const newsletterService = {
  async subscribe(email: string) {
    const normalized = email.trim().toLowerCase();
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: normalized } });
    if (existing) {
      return { subscriber: existing, alreadySubscribed: true as const };
    }
    const subscriber = await prisma.newsletterSubscriber.create({ data: { email: normalized } });
    return { subscriber, alreadySubscribed: false as const };
  },

  async list() {
    return prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } });
  },
};
