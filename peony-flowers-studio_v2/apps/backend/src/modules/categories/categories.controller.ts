import { Request, Response, NextFunction } from 'express';
import { categoriesService } from './categories.service';
import { success, created } from '../../utils/apiResponse';

export const categoriesController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoriesService.list();
      return success(res, categories);
    } catch (err) { return next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoriesService.create(req.body);
      return created(res, category, 'Kategoriya yaratildi');
    } catch (err) { return next(err); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoriesService.update(req.params.id!, req.body);
      return success(res, category, 'Kategoriya yangilandi');
    } catch (err) { return next(err); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await categoriesService.remove(req.params.id!);
      return success(res, null, 'Kategoriya o\'chirildi');
    } catch (err) { return next(err); }
  },
};