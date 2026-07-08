import { z } from 'zod';

// Bitta til uchun "about" kontenti. Boshqa kalitlar qo'shilganda
// mos schema qo'shib, upsertContentSchema ichida key bo'yicha tanlash mumkin.
const aboutLocaleSchema = z.object({
  title: z.string().min(1, "Sarlavha kiritilishi shart"),
  intro: z.string().min(1, "Matn kiritilishi shart"),
  foundedYear: z.number().int().optional(),
  customersCount: z.number().int().optional(),
  services: z.array(z.string().min(1)).default([]),
  values: z.array(z.string().min(1)).default([]),
  address: z.string().min(1).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const upsertContentSchema = z.object({
  data: z.object({
    uz: aboutLocaleSchema,
    ru: aboutLocaleSchema,
  }),
});

export const contentKeyParamSchema = z.object({
  key: z.string().min(1),
});

export const contentQuerySchema = z.object({
  locale: z.enum(['uz', 'ru']).optional(),
});