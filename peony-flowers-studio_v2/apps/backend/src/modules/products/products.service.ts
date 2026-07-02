import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { slugify } from '../../utils/slugify';
import { parsePagination, buildMeta } from '../../utils/pagination';
import { invalidateCache } from '../../config/redis';
import { CreateProductInput, UpdateProductInput, ProductFilterQuery } from './products.types';

function buildOrderBy(sort?: string) {
  switch (sort) {
    case 'price_low': return { price: 'asc' as const };
    case 'price_high': return { price: 'desc' as const };
    case 'popular': return { reviews: { _count: 'desc' as const } };
    default: return { createdAt: 'desc' as const };
  }
}

export const productsService = {
  async list(query: ProductFilterQuery) {
    const { skip, take, page, limit } = parsePagination(query);

    const where = {
      isActive: true,
      ...(query.categoryId ? { categoryId: query.categoryId } : {}),
      ...(query.type ? { type: query.type } : {}),
      ...(query.search
        ? { title: { contains: query.search, mode: 'insensitive' as const } }
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

    return { items, meta: buildMeta(total, page, limit) };
  },

  async getBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { order: 'asc' } },
        category: true,
        reviews: { include: { user: { select: { fullName: true } } }, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!product || !product.isActive) throw new AppError('Mahsulot topilmadi', 404);
    return product;
  },

  async create(data: CreateProductInput) {
    const existingSlugs = (await prisma.product.findMany({ select: { slug: true } })).map((p) => p.slug);
    const slug = slugify(data.title);
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
    if (data.title) updateData.slug = slugify(data.title);

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
