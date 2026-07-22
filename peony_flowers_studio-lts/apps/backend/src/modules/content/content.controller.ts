import { Request, Response, NextFunction } from 'express';
import { contentService } from './content.service';
import { success } from '../../utils/apiResponse';
import { ContentLocale } from './content.types';

export const contentController = {
  // GET /api/content/:key?locale=uz — public
  async getPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const key = req.params.key as string;
      const locale = req.query.locale as ContentLocale | undefined;
      const data = await contentService.getPublic(key, locale);
      return success(res, data);
    } catch (err) { return next(err); }
  },

  // GET /api/content — admin, ro'yxat
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const rows = await contentService.listAll();
      return success(res, rows);
    } catch (err) { return next(err); }
  },

  // GET /api/content/:key/raw — admin, bitta kalit (barcha tillar bilan, tahrirlash uchun)
  async getRaw(req: Request, res: Response, next: NextFunction) {
    try {
      const row = await contentService.getByKeyRaw(req.params.key as string);
      return success(res, row);
    } catch (err) { return next(err); }
  },

  // PUT /api/content/:key — admin, yaratish/yangilash
  async upsert(req: Request, res: Response, next: NextFunction) {
    try {
      const key = req.params.key as string;
      const row = await contentService.upsert(key, req.body.data, req.user?.userId);
      return success(res, row, 'Kontent saqlandi');
    } catch (err) { return next(err); }
  },
};