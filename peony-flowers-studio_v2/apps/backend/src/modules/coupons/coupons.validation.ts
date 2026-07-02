import { z } from 'zod';

export const applyCouponSchema = z.object({
  code: z.string().min(2),
  subtotal: z.number().int().positive(),
});

export const createCouponSchema = z.object({
  code: z.string().min(2).toUpperCase(),
  discountType: z.enum(['percent', 'fixed']),
  discountValue: z.number().int().positive(),
  minOrderTotal: z.number().int().min(0).optional(),
  usageLimit: z.number().int().positive().optional(),
  expiresAt: z.string().datetime().optional(),
});

export const couponIdParamSchema = z.object({ id: z.string().min(1) });
