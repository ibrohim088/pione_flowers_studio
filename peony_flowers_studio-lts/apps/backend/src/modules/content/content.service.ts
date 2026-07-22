import { Prisma } from '@prisma/client';
import { prisma } from '../../config/database';
import { getOrSetCache, invalidateCache } from '../../config/redis';
import { AppError } from '../../middleware/errorHandler';
import { ContentLocale } from './content.types';

const CACHE_TTL = 60 * 60; // 1 soat — kontent kamdan-kam o'zgaradi
const cacheKey = (key: string) => `content:${key}`;

export const contentService = {
  /**
   * Ommaviy (public) o'qish — frontend shu orqali chaqiradi.
   * locale berilsa, faqat o'sha til obyekti qaytadi, aks holda hammasi.
   */
  async getPublic(key: string, locale?: ContentLocale) {
    const content = await getOrSetCache(cacheKey(key), CACHE_TTL, async () => {
      const row = await prisma.siteContent.findUnique({ where: { key } });
      if (!row) throw new AppError(`"${key}" uchun kontent topilmadi`, 404);
      return row.data as Record<string, unknown>;
    });

    if (locale) return content[locale] ?? null;
    return content;
  },

  /** Admin panel uchun — barcha kalitlar ro'yxati */
  async listAll() {
    return prisma.siteContent.findMany({ orderBy: { key: 'asc' } });
  },

  /** Admin panel uchun — bitta kalitni to'liq (barcha tillar) olish */
  async getByKeyRaw(key: string) {
    const row = await prisma.siteContent.findUnique({ where: { key } });
    if (!row) throw new AppError(`"${key}" uchun kontent topilmadi`, 404);
    return row;
  },

  /** Admin panelda saqlash — yaratadi yoki yangilaydi, keshni tozalaydi */
  async upsert(key: string, data: Record<string, unknown>, updatedBy?: string) {
    const row = await prisma.siteContent.upsert({
      where: { key },
      create: { key, data: data as Prisma.InputJsonValue, updatedBy },
      update: { data: data as Prisma.InputJsonValue, updatedBy },
    });
    await invalidateCache(cacheKey(key));
    return row;
  },
};