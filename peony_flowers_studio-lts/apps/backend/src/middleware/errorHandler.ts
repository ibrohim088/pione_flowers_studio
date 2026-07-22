import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { fail } from '../utils/apiResponse';
import { logger } from '../utils/logger';

export class AppError extends Error {
  constructor(public message: string, public status = 400, public errors?: unknown) {
    super(message);
  }
}

interface PrismaKnownRequestErrorLike {
  name: string;
  code: string;
}

function isPrismaKnownRequestError(err: unknown): err is PrismaKnownRequestErrorLike {
  return (
    typeof err === 'object' &&
    err !== null &&
    (err as { name?: unknown }).name === 'PrismaClientKnownRequestError' &&
    typeof (err as { code?: unknown }).code === 'string'
  );
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return fail(res, err.message, err.status, err.errors);
  }

  if (err instanceof ZodError) {
    return fail(res, 'Validatsiya xatosi', 422, err.flatten().fieldErrors);
  }

  if (isPrismaKnownRequestError(err)) {
    if (err.code === 'P2002') {
      return fail(res, 'Bu qiymat allaqachon mavjud (unique constraint)', 409);
    }
    if (err.code === 'P2025') {
      return fail(res, 'Yozuv topilmadi', 404);
    }
  }

  logger.error('Unhandled error:', err);
  return fail(res, 'Server xatosi yuz berdi', 500);
}