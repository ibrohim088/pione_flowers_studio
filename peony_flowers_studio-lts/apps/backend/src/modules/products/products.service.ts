import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { slugify } from '../../utils/slugify';
import { parsePagination, buildMeta } from '../../utils/pagination';
import { invalidateCache } from '../../config/redis';
import { CreateProductInput, UpdateProductInput, ProductFilterQuery } from './products.types';

type Locale = 'uz' | 'ru';

// Admin panel uchun titleUz/titleRu/descriptionUz/descriptionRu xom holida
// qoladi, frontend uchun esa joriy tilga mos "title"/"description" hisoblanadi
// (ru tarjimasi bo'lmasa uz'ga qaytadi).
function localizeProduct<T extends { titleUz: string; titleRu?: string | null; descriptionUz?: string | null; descriptionRu?: string | null }>(
  product: T,
  locale: Locale
) {
  return {
    ...product,
    title: locale === 'ru' && product.titleRu ? product.titleRu : product.titleUz,
    description: locale === 'ru' && product.descriptionRu ? product.descriptionRu : product.descriptionUz,
  };
}

function buildOrderBy(sort?: string) {
  switch (sort) {
    case 'price_low': return { price: 'asc' as const };
    case 'price_high': return { price: 'desc' as const };
    case 'popular': return { reviews: { _count: 'desc' as const } };
    default: return { createdAt: 'desc' as const };
  }
}

export const productsService = {
  async list(query: ProductFilterQuery, locale: Locale = 'uz') {
    const { skip, take, page, limit } = parsePagination(query);

    const where = {
      isActive: true,
      ...(query.categoryId ? { categoryId: query.categoryId } : {}),
      ...(query.type ? { type: query.type } : {}),
      ...(query.search
        ? {
            OR: [
              { titleUz: { contains: query.search, mode: 'insensitive' as const } },
              { titleRu: { contains: query.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
      ...(query.minPrice || query.maxPrice
        ? {
            price: {
              ...(query.minPrice ? { gte: Number(query.minPrice) } : {}),
              ...(query.maxPrice ? { lte: Number(query.maxPrice) } : {}),
            },
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: buildOrderBy(query.sort),
        include: { images: true, category: true },
      }),
      prisma.product.count({ where }),
    ]);

    return { items: items.map((p) => localizeProduct(p, locale)), meta: buildMeta(total, page, limit) };
  },

  async getBySlug(slug: string, locale: Locale = 'uz') {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { order: 'asc' } },
        category: true,
        reviews: { include: { user: { select: { fullName: true } } }, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!product || !product.isActive) throw new AppError('Mahsulot topilmadi', 404);
    return localizeProduct(product, locale);
  },

  async create(data: CreateProductInput) {
    const existingSlugs = (await prisma.product.findMany({ select: { slug: true } })).map((p) => p.slug);
    const slug = slugify(data.titleUz);
    const finalSlug = existingSlugs.includes(slug) ? `${slug}-${Date.now()}` : slug;

    const { images, ...rest } = data;

    const product = await prisma.product.create({
      data: {
        ...rest,
        slug: finalSlug,
        images: images?.length
          ? { create: images.map((url, order) => ({ url, order })) }
          : undefined,
      },
      include: { images: true },
    });

    await invalidateCache('products:*');
    return product;
  },

  async update(id: string, data: UpdateProductInput) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new AppError('Mahsulot topilmadi', 404);

    const { images, ...rest } = data;
    const updateData: Record<string, unknown> = { ...rest };
    if (data.titleUz) updateData.slug = slugify(data.titleUz);

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        ...(images
          ? {
              images: {
                deleteMany: {},
                create: images.map((url, order) => ({ url, order })),
              },
            }
          : {}),
      },
      include: { images: true },
    });

    await invalidateCache('products:*');
    return updated;
  },

  async remove(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new AppError('Mahsulot topilmadi', 404);
    await prisma.product.update({ where: { id }, data: { isActive: false } });
    await invalidateCache('products:*');
  },
};
