import { z } from 'zod';

export const createAddressSchema = z.object({
  label: z.string().optional(),
  city: z.string().min(2),
  district: z.string().optional(),
  street: z.string().min(2),
  house: z.string().optional(),
  entrance: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  landmark: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();
export const addressIdParamSchema = z.object({ id: z.string().min(1) });
