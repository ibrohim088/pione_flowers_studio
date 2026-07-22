import { z } from 'zod';

const phoneRegex = /^\+998\d{9}$/;

export const sendOtpSchema = z.object({
  phone: z.string().regex(phoneRegex, "Telefon raqam formati: +998901234567"),
});

export const verifyOtpSchema = z.object({
  phone: z.string().regex(phoneRegex, "Telefon raqam formati: +998901234567"),
  code: z.string().length(6, 'Kod 6 xonali bo\'lishi kerak'),
  fullName: z.string().min(2).optional(),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10).optional(),
});
