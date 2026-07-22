import { Response } from 'express';

export function success<T>(res: Response, data: T, message = 'OK', status = 200) {
  return res.status(status).json({ success: true, message, data });
}

export function created<T>(res: Response, data: T, message = 'Yaratildi') {
  return success(res, data, message, 201);
}

export function fail(res: Response, message = 'Xatolik yuz berdi', status = 400, errors?: unknown) {
  return res.status(status).json({ success: false, message, errors });
}
