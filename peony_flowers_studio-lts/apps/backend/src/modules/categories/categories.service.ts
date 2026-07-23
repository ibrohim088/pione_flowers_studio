import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { slugify } from '../../utils/slugify';
import { CreateCategoryInput, UpdateCategoryInput } from './categories.types';

type Locale = 'uz' | 'ru';

// Admin panel uchun nameUz/nameRu xom holida qaytariladi (frontend uchun locale bo'yicha `name` qo'shiladi)
function localizeCategory<T extends { nameUz: string; nameRu?: string | null }>(
  category: T,
  locale: Locale
) {
  return {
    ...category,
    name: locale === 'ru' && category.nameRu ? category.nameRu : category.nameUz,
  };
}

export const categoriesService = {
  async list(locale: Locale = 'uz') {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return categories.map((c) => localizeCategory(c, locale));
  },

  async create(data: CreateCategoryInput) {
    const existing = await prisma.category.findMany({ select: { slug: true } });
    const slug = slugify(data.nameUz);
    if (existing.some((c) => c.slug === slug)) {
      throw new AppError('Shu nomdagi kategoriya allaqachon mavjud', 409);
    }
    return prisma.category.create({ data: { ...data, slug } });
  },

  async update(id: string, data: UpdateCategoryInput) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new AppError('Kategoriya topilmadi', 404);

    const updateData: Record<string, unknown> = { ...data };
    if (data.nameUz) {
      updateData.slug = slugify(data.nameUz);
    }

    return prisma.category.update({ where: { id }, data: updateData });
  },

  async remove(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new AppError('Kategoriya topilmadi', 404);
    return prisma.category.update({ where: { id }, data: { isActive: false } });
  },
};