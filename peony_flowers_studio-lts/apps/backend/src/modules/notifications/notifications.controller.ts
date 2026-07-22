import { Request, Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';
import { success, created } from '../../utils/apiResponse';

export const notificationsController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const notifications = await notificationsService.list(req.user!.userId);
      return success(res, notifications);
    } catch (err) { return next(err); }
  },
  async markRead(req: Request, res: Response, next: NextFunction) {
    try {
      const n = await notificationsService.markRead(req.user!.userId, req.params.id!);
      return success(res, n, 'O\'qilgan deb belgilandi');
    } catch (err) { return next(err); }
  },
  async markAllRead(req: Request, res: Response, next: NextFunction) {
    try {
      await notificationsService.markAllRead(req.user!.userId);
      return success(res, null, 'Barchasi o\'qilgan deb belgilandi');
    } catch (err) { return next(err); }
  },
  async send(req: Request, res: Response, next: NextFunction) {
    try {
      const n = await notificationsService.send(req.body);
      return created(res, n, 'Bildirishnoma yuborildi');
    } catch (err) { return next(err); }
  },
};