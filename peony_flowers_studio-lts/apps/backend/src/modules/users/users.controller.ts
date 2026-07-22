import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { success } from '../../utils/apiResponse';

export const usersController = {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.getMe(req.user!.userId);
      return success(res, user);
    } catch (err) { return next(err); }
  },

  async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.updateMe(req.user!.userId, req.body);
      return success(res, user, 'Profil yangilandi');
    } catch (err) { return next(err); }
  },

  async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      await usersService.deleteMe(req.user!.userId);
      return success(res, null, 'Hisob o\'chirildi');
    } catch (err) { return next(err); }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await usersService.list(req.query as any);
      return success(res, result.items, 'OK', 200);
    } catch (err) { return next(err); }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.getById(req.params.id!);
      return success(res, user);
    } catch (err) { return next(err); }
  },

  async adminUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.adminUpdate(req.params.id!, req.body);
      return success(res, user, 'Foydalanuvchi yangilandi');
    } catch (err) { return next(err); }
  },

  async adminDelete(req: Request, res: Response, next: NextFunction) {
    try {
      await usersService.adminDelete(req.params.id!);
      return success(res, null, 'Foydalanuvchi bloklandi');
    } catch (err) { return next(err); }
  },

  async createStaff(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.createStaff(req.body);
      return success(res, user, 'Xodim yaratildi', 201);
    } catch (err) { return next(err); }
  },
};