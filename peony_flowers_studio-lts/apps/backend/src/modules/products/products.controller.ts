import { Request, Response, NextFunction } from 'express';
import { productsService } from './products.service';
import { success, created } from '../../utils/apiResponse';

function resolveLocale(req: Request): 'uz' | 'ru' {
  const raw = (req.query.locale as string) || (req.headers['x-locale'] as string) || 'uz';
  return raw === 'ru' ? 'ru' : 'uz';
}

export const productsController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productsService.list(req.query as any, resolveLocale(req));
      return success(res, result.items, 'OK', 200);
    } catch (err) { return next(err); }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productsService.getBySlug(req.params.slug!, resolveLocale(req));
      return success(res, product);
    } catch (err) { return next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productsService.create(req.body);
      return created(res, product, 'Mahsulot yaratildi');
    } catch (err) { return next(err); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productsService.update(req.params.id!, req.body);
      return success(res, product, 'Mahsulot yangilandi');
    } catch (err) { return next(err); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await productsService.remove(req.params.id!);
      return success(res, null, 'Mahsulot o\'chirildi');
    } catch (err) { return next(err); }
  },
};