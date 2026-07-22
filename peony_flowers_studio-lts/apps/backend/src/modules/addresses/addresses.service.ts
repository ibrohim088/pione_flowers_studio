import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { CreateAddressInput, UpdateAddressInput } from './addresses.types';

export const addressesService = {
  async list(userId: string) {
    return prisma.address.findMany({ where: { userId }, orderBy: { isDefault: 'desc' } });
  },

  async create(userId: string, data: CreateAddressInput) {
    if (data.isDefault) {
      await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    return prisma.address.create({ data: { ...data, userId } });
  },

  async update(userId: string, id: string, data: UpdateAddressInput) {
    const address = await prisma.address.findUnique({ where: { id } });
    if (!address || address.userId !== userId) throw new AppError('Manzil topilmadi', 404);

    if (data.isDefault) {
      await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    return prisma.address.update({ where: { id }, data });
  },

  async remove(userId: string, id: string) {
    const address = await prisma.address.findUnique({ where: { id } });
    if (!address || address.userId !== userId) throw new AppError('Manzil topilmadi', 404);
    return prisma.address.delete({ where: { id } });
  },
};
