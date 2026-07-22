import { z } from 'zod';

export const updateMeSchema = z.object({
  fullName: z.string().min(2).optional(),
  email: z.union([z.string().email(), z.literal('')]).optional(),
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

const phoneRegex = /^\+998\d{9}$/;

export const createStaffSchema = z.object({
  phone: z.string().regex(phoneRegex, "Telefon raqam formati: +998901234567"),
  fullName: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
  role: z.enum(['florist', 'courier', 'admin'], {
    errorMap: () => ({ message: "Rol faqat florist, courier yoki admin bo'lishi mumkin" }),
  }),
});