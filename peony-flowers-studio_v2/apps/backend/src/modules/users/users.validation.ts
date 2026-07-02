import { z } from 'zod';

export const updateMeSchema = z.object({
  fullName: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

export const adminUpdateUserSchema = updateMeSchema.extend({
  role: z.enum(['customer', 'florist', 'courier', 'admin']).optional(),
  isActive: z.boolean().optional(),
});

export const listUsersQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  role: z.enum(['customer', 'florist', 'courier', 'admin']).optional(),
  search: z.string().optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().min(1),
});
