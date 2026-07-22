import { Request, Response, NextFunction } from 'express';
import { analyticsService } from './analytics.service';
import { success } from '../../utils/apiResponse';

function getDays(req: Request): number {
  return Number(req.query.days) || 30;
}

export const analyticsController = {
  async overview(req: Request, res: Response, next: NextFunction) {
    try { return success(res, await analyticsService.overview(getDays(req))); }
    catch (err) { return next(err); }
  },
  async revenue(req: Request, res: Response, next: NextFunction) {
    try { return success(res, await analyticsService.revenue(getDays(req))); }
    catch (err) { return next(err); }
  },
  async orders(req: Request, res: Response, next: NextFunction) {
    try { return success(res, await analyticsService.orders(getDays(req))); }
    catch (err) { return next(err); }
  },
  async products(req: Request, res: Response, next: NextFunction) {
    try { return success(res, await analyticsService.products(getDays(req))); }
    catch (err) { return next(err); }
  },
  async users(req: Request, res: Response, next: NextFunction) {
    try { return success(res, await analyticsService.users(getDays(req))); }
    catch (err) { return next(err); }
  },
  async dashboard(req: Request, res: Response, next: NextFunction) {
    try { return success(res, await analyticsService.getDashboard(getDays(req))); }
    catch (err) { return next(err); }
  },
};
