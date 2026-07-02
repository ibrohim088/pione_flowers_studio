import { Request, Response, NextFunction } from 'express';
import { wishlistService } from './wishlist.service';
import { success, created } from '../../utils/apiResponse';

export const wishlistController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await wishlistService.list(req.user!.userId);
      return success(res, items);
    } catch (err) { return next(err); }
  },
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await wishlistService.add(req.user!.userId, req.params.productId);
      return created(res, item, 'Sevimlilarga qo\'shildi');
    } catch (err) { return next(err); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await wishlistService.remove(req.user!.userId, req.params.productId);
      return success(res, null, 'Sevimlilardan olib tashlandi');
    } catch (err) { return next(err); }
  },
};
