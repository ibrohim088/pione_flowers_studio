import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { parsePagination, buildMeta } from '../../utils/pagination';
import { UpdateUserInput, AdminUpdateUserInput, CreateStaffInput } from './users.types';

export const usersService = {
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError('Foydalanuvchi topilmadi', 404);
    return user;
  },

  async updateMe(userId: string, data: UpdateUserInput) {
    return prisma.user.update({ where: { id: userId }, data });
  },

  async deleteMe(userId: string) {
    return prisma.user.update({ where: { id: userId }, data: { isActive: false } });
  },

  async list(query: { page?: string; limit?: string; role?: string; search?: string }) {
    const { skip, take, page, limit } = parsePagination(query);
    const where = {
      ...(query.role ? { role: query.role } : {}),
      ...(query.search
        ? {
            OR: [
              { fullName: { contains: query.search, mode: 'insensitive' as const } },
              { phone: { contains: query.search } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      prisma.user.count({ where }),
    ]);

    return { items, meta: buildMeta(total, page, limit) };
  },

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { orders: { take: 5, orderBy: { createdAt: 'desc' } }, addresses: true },
    });
    if (!user) throw new AppError('Foydalanuvchi topilmadi', 404);
    return user;
  },

  async adminUpdate(id: string, data: AdminUpdateUserInput) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError('Foydalanuvchi topilmadi', 404);
    return prisma.user.update({ where: { id }, data });
  },

  async adminDelete(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError('Foydalanuvchi topilmadi', 404);
    return prisma.user.update({ where: { id }, data: { isActive: false } });
  },

  async createStaff(data: CreateStaffInput) {
    const existing = await prisma.user.findUnique({ where: { phone: data.phone } });
    if (existing) {
      throw new AppError("Bu telefon raqam bilan foydalanuvchi allaqachon mavjud", 409);
    }

    return prisma.user.create({
      data: {
        phone: data.phone,
        fullName: data.fullName,
        role: data.role,
        isActive: true,
      },
    });
  },
};
