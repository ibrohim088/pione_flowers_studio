import { z } from 'zod';

export const clickPrepareSchema = z.object({
  orderId: z.string().min(1),
});

export const cashActionSchema = z.object({
  orderId: z.string().min(1),
});

export const orderIdParamSchema = z.object({ orderId: z.string().min(1) });

export const refundParamSchema = z.object({ id: z.string().min(1) });
