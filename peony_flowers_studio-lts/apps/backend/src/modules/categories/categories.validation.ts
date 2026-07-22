import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(2, 'Nom kamida 2 belgi bo\'lishi kerak'),
  imageUrl: z.string().url().optional(),
  order: z.number().int().optional(),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const categoryIdParamSchema = z.object({ id: z.string().min(1) });
