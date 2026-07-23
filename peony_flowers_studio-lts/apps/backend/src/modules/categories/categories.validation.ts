import { z } from 'zod';

export const createCategorySchema = z.object({
  nameUz: z.string().min(2, 'Nom kamida 2 belgi bo\'lishi kerak'),
  nameRu: z.string().min(2, 'Название должно содержать минимум 2 символа').optional(),
  imageUrl: z.string().url().optional(),
  order: z.number().int().optional(),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const categoryIdParamSchema = z.object({ id: z.string().min(1) });