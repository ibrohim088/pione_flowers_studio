import { Request, Response, NextFunction } from 'express';
import { newsletterService } from './newsletter.service';
import { success, created } from '../../utils/apiResponse';

export const newsletterController = {
  async subscribe(req: Request, res: Response, next: NextFunction) {
    try {
      const { subscriber, alreadySubscribed } = await newsletterService.subscribe(req.body.email);
      if (alreadySubscribed) {
        return success(res, subscriber, 'Siz allaqachon obuna bo\'lgansiz');
      }
      return created(res, subscriber, 'Muvaffaqiyatli obuna bo\'ldingiz');
    } catch (err) { return next(err); }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const subscribers = await newsletterService.list();
      return success(res, subscribers);
    } catch (err) { return next(err); }
  },
};
