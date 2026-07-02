import { Request, Response, NextFunction } from 'express';
import { paymentsService } from './payments.service';
import { success } from '../../utils/apiResponse';

export const paymentsController = {
  async clickPrepare(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentsService.clickPrepare(req.body.orderId);
      return success(res, result);
    } catch (err) { return next(err); }
  },

  async cashConfirm(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await paymentsService.cashConfirm(req.body.orderId, req.user!.userId);
      return success(res, order, 'Naqd to\'lov tasdiqlandi');
    } catch (err) { return next(err); }
  },

  async cashReject(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await paymentsService.cashReject(req.body.orderId, req.user!.userId);
      return success(res, order, 'Naqd to\'lov rad etildi');
    } catch (err) { return next(err); }
  },

  async getStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await paymentsService.getStatus(req.params.orderId);
      return success(res, transaction);
    } catch (err) { return next(err); }
  },

  async history(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentsService.history(req.query as any);
      return success(res, result.items);
    } catch (err) { return next(err); }
  },

  async refund(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await paymentsService.refund(req.params.id, req.user!.userId);
      return success(res, transaction, 'To\'lov qaytarildi');
    } catch (err) { return next(err); }
  },
};
