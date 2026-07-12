import { Request, Response, NextFunction } from 'express';
import { uploadService } from './upload.service';
import { success } from '../../utils/apiResponse';
import { AppError } from '../../middleware/errorHandler';

export const uploadController = {
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new AppError('Fayl yuborilmadi', 400);
      const url = await uploadService.uploadImage(req.file);
      return success(res, { url }, 'Fayl yuklandi');
    } catch (err) { return next(err); }
  },

  async getImage(req: Request, res: Response, next: NextFunction) {
    try {
      const key = req.params[0];
      if (!key) throw new AppError('Fayl kaliti topilmadi', 400);
      await uploadService.streamImage(key, res);
    } catch (err) { return next(err); }
  },

  async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = req.body;
      if (!url) throw new AppError('URL yuborilmadi', 400);
      await uploadService.deleteImage(url);
      return success(res, null, 'Fayl o\'chirildi');
    } catch (err) { return next(err); }
  },
};