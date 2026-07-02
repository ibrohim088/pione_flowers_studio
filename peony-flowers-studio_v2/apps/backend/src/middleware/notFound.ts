import { Request, Response } from 'express';
import { fail } from '../utils/apiResponse';

export function notFound(req: Request, res: Response) {
  return fail(res, `Route topilmadi: ${req.method} ${req.originalUrl}`, 404);
}
