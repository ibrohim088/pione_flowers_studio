import { z } from 'zod';

export const createOrderSchema = z.object({
  addressId: z.string().optional(),
  items: z
    .array(z.object({ productId: z.string().min(1), quantity: z.number().int().positive() }))
    .min(1, 'Kamida 1 mahsulot bo\'lishi kerak'),
  paymentMethod: z.enum(['click', 'cash']),
  deliveryDate: z.string().min(1),
  deliveryTime: z.string().min(1),
  giftMessage: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled']),
});

export const orderIdParamSchema = z.object({ id: z.string().min(1) });

export const preparedOrderSchema = z.object({
  preparedPhotoUrl: z.string().url('Rasm URL noto\'g\'ri'),
});