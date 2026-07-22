import { Request, Response, NextFunction } from 'express';
import { flowerImportService } from './flowerImport.service';
import { success } from '../../utils/apiResponse';

export const flowerImportController = {
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const q = String(req.query.q || '');
      const page = req.query.page ? Number(req.query.page) : 1;
      const result = await flowerImportService.search(q, page);
      return success(res, result);
    } catch (err) {
      return next(err);
    }
  },

  async detail(req: Request, res: Response, next: NextFunction) {
    try {
      const externalId = Number(req.params.externalId);
      const result = await flowerImportService.getDetail(externalId);
      return success(res, result);
    } catch (err) {
      return next(err);
    }
  },
};
