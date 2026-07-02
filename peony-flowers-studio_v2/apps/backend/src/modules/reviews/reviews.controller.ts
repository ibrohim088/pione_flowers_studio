import { Request, Response, NextFunction } from 'express';
import { reviewsService } from './reviews.service';
import { success, created } from '../../utils/apiResponse';

export const reviewsController = {
  async listByProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const reviews = await reviewsService.listByProduct(req.params.id);
      return success(res, reviews);
    } catch (err) { return next(err); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const review = await reviewsService.create(req.user!.userId, req.params.id, req.body);
      return created(res, review, 'Sharh qo\'shildi');
    } catch (err) { return next(err); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await reviewsService.remove(req.params.id);
      return success(res, null, 'Sharh o\'chirildi');
    } catch (err) { return next(err); }
  },
};
