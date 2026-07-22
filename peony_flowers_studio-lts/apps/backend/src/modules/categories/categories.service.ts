import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { slugify } from '../../utils/slugify';
import { CreateCategoryInput, UpdateCategoryInput } from './categories.types';

export const categoriesService = {
  async list() {
    return prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  },

  async create(data: CreateCategoryInput) {
    const existing = await prisma.category.findMany({ select: { slug: true } });
    const slug = slugify(data.name);
    if (existing.some((c) => c.slug === slug)) {
      throw new AppError('Shu nomdagi kategoriya allaqachon mavjud', 409);
    }
    const { name, ...rest } = data;
    return prisma.category.create({ data: { ...rest, nameUz: name, slug } });
  },

  async update(id: string, data: UpdateCategoryInput) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new AppError('Kategoriya topilmadi', 404);

    const { name, ...rest } = data;
    const updateData: Record<string, unknown> = { ...rest };
    if (name) {
      updateData.nameUz = name;
      updateData.slug = slugify(name);
    }

    return prisma.category.update({ where: { id }, data: updateData });
  },

  async remove(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new AppError('Kategoriya topilmadi', 404);
    return prisma.category.update({ where: { id }, data: { isActive: false } });
  },
};