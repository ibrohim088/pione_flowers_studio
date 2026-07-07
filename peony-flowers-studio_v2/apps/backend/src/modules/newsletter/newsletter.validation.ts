import { z } from 'zod';

const phoneRegex = /^\+998\d{9}$/;

export const subscribeSchema = z.object({
  phone: z.string().regex(phoneRegex, 'Telefon raqam formati: +998901234567'),
});
