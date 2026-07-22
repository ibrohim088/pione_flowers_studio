import { Request, Response, NextFunction } from 'express';
import { fail } from '../utils/apiResponse';
import { Role } from '../constants/roles';

export function requireRole(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return fail(res, 'Avtorizatsiya talab qilinadi', 401);
    }
    if (!allowedRoles.includes(req.user.role)) {
      return fail(res, 'Bu amal uchun ruxsatingiz yo\'q', 403);
    }
    return next();
  };
}
