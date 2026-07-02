import { Request, Response, NextFunction } from 'express';
import { ordersService } from './orders.service';
import { success, created } from '../../utils/apiResponse';

export const ordersController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await ordersService.create(req.user!.userId, req.body);
      return created(res, order, 'Buyurtma yaratildi');
    } catch (err) { return next(err); }
  },

  async listMine(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ordersService.listByUser(req.user!.userId, req.query as any);
      return success(res, result.items);
    } catch (err) { return next(err); }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const isAdminOrStaff = ['admin', 'florist', 'courier'].includes(req.user!.role);
      const order = await ordersService.getById(req.params.id, isAdminOrStaff ? undefined : req.user!.userId);
      return success(res, order);
    } catch (err) { return next(err); }
  },

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await ordersService.cancel(req.params.id, req.user!.userId);
      return success(res, order, 'Buyurtma bekor qilindi');
    } catch (err) { return next(err); }
  },

  async listAllForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ordersService.listAllForAdmin(req.query as any);
      return success(res, result.items);
    } catch (err) { return next(err); }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await ordersService.updateStatus(req.params.id, req.body.status);
      return success(res, order, 'Status yangilandi');
    } catch (err) { return next(err); }
  },

  async floristQueue(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await ordersService.floristQueue();
      return success(res, orders);
    } catch (err) { return next(err); }
  },

  async markPrepared(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await ordersService.markPrepared(req.params.id, req.user!.userId, req.body.preparedPhotoUrl);
      return success(res, order, 'Buyurtma tayyor deb belgilandi');
    } catch (err) { return next(err); }
  },

  async courierToday(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await ordersService.courierToday(req.user!.userId);
      return success(res, orders);
    } catch (err) { return next(err); }
  },

  async markDelivered(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await ordersService.markDelivered(req.params.id, req.user!.userId);
      return success(res, order, 'Buyurtma yetkazildi deb belgilandi');
    } catch (err) { return next(err); }
  },
};
