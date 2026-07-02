import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { SendNotificationInput } from './notifications.types';

export const notificationsService = {
  async list(userId: string) {
    return prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  },

  async markRead(userId: string, id: string) {
    const notif = await prisma.notification.findUnique({ where: { id } });
    if (!notif || notif.userId !== userId) throw new AppError('Bildirishnoma topilmadi', 404);
    return prisma.notification.update({ where: { id }, data: { isRead: true } });
  },

  async markAllRead(userId: string) {
    return prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
  },

  async send(input: SendNotificationInput) {
    return prisma.notification.create({ data: input });
  },
};
