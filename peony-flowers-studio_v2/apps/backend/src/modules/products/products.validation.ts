import { z } from 'zod';

export const createProductSchema = z.object({
  categoryId: z.string().min(1),
  title: z.string().min(2, 'Nom kamida 2 belgi'),
  description: z.string().optional(),
  type: z.string().min(1),
  price: z.number().int().positive('Narx musbat bo\'lishi kerak'),
  discountPrice: z.number().int().positive().optional(),
  stock: z.number().int().min(0).optional(),
  images: z.array(z.string().url()).optional(),
});

export const updateProductSchema = createProductSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const productFilterQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  categoryId: z.string().optional(),
  type: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  sort: z.enum(['price_low', 'price_high', 'newest', 'popular']).optional(),
});

export const productIdParamSchema = z.object({ id: z.string().min(1) });
export const productSlugParamSchema = z.object({ slug: z.string().min(1) });
