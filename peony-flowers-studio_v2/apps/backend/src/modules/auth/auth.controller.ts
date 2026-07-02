import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { success } from '../../utils/apiResponse';
import { env } from '../../config/env';

const REFRESH_COOKIE_NAME = 'refreshToken';

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 kun
  });
}

export const authController = {
  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.sendOtp(req.body);
      return success(res, null, 'OTP kod yuborildi');
    } catch (err) {
      return next(err);
    }
  },

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken, user } = await authService.verifyOtp(req.body);
      setRefreshCookie(res, refreshToken);
      return success(res, { accessToken, user }, 'Muvaffaqiyatli kirildi');
    } catch (err) {
      return next(err);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.[REFRESH_COOKIE_NAME] ?? req.body.refreshToken;
      if (!token) {
        return res.status(401).json({ success: false, message: 'Refresh token topilmadi' });
      }
      const { accessToken, refreshToken } = await authService.refresh(token);
      setRefreshCookie(res, refreshToken);
      return success(res, { accessToken }, 'Token yangilandi');
    } catch (err) {
      return next(err);
    }
  },

  async logout(req: Request, res: Response) {
    res.clearCookie(REFRESH_COOKIE_NAME);
    return success(res, null, 'Chiqildi');
  },
};
