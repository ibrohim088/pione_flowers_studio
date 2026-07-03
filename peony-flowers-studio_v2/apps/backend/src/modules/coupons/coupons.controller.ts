import { Request, Response, NextFunction } from 'express';
import { couponsService } from './coupons.service';
import { success, created } from '../../utils/apiResponse';

export const couponsController = {
  async apply(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await couponsService.apply(req.body.code, req.body.subtotal);
      return success(res, result, 'Kupon qo\'llandi');
    } catch (err) { return next(err); }
  },
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const coupons = await couponsService.list();
      return success(res, coupons);
    } catch (err) { return next(err); }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const coupon = await couponsService.create(req.body);
      return created(res, coupon, 'Kupon yaratildi');
    } catch (err) { return next(err); }
  },
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await couponsService.remove(req.params.id!);
      return success(res, null, 'Kupon o\'chirildi');
    } catch (err) { return next(err); }
  },
};