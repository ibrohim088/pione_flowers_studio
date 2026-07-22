import { Request, Response, NextFunction } from 'express';
import { addressesService } from './addresses.service';
import { success, created } from '../../utils/apiResponse';

export const addressesController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const addresses = await addressesService.list(req.user!.userId);
      return success(res, addresses);
    } catch (err) { return next(err); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const address = await addressesService.create(req.user!.userId, req.body);
      return created(res, address, 'Manzil qo\'shildi');
    } catch (err) { return next(err); }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const address = await addressesService.update(req.user!.userId, req.params.id!, req.body);
      return success(res, address, 'Manzil yangilandi');
    } catch (err) { return next(err); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await addressesService.remove(req.user!.userId, req.params.id!);
      return success(res, null, 'Manzil o\'chirildi');
    } catch (err) { return next(err); }
  },
};