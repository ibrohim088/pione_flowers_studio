import { prisma } from '../../config/database';
import { generateOtpCode, saveOtp, verifyOtp } from '../../utils/otp';
import { sendSms } from '../../config/sms';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { AppError } from '../../middleware/errorHandler';
import { Role } from '../../constants/roles';
import { SendOtpInput, VerifyOtpInput, AuthTokens } from './auth.types';

export const authService = {
  async sendOtp({ phone }: SendOtpInput): Promise<void> {
    const code = generateOtpCode();
    await saveOtp(phone, code);
    await sendSms(phone, `Peony Flowers Studio tasdiqlash kodi: ${code}`);
  },

  async verifyOtp({ phone, code, fullName }: VerifyOtpInput): Promise<AuthTokens & { user: unknown }> {
    const isValid = await verifyOtp(phone, code);
    if (!isValid) {
      throw new AppError('Kod noto\'g\'ri yoki muddati o\'tgan', 400);
    }

    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      user = await prisma.user.create({
        data: { phone, fullName: fullName ?? null, role: 'customer' },
      });
    }

    if (!user.isActive) {
      throw new AppError('Hisobingiz bloklangan. Administratsiyaga murojaat qiling.', 403);
    }

    const payload = { userId: user.id, role: user.role as Role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return { accessToken, refreshToken, user };
  },

  async refresh(refreshToken: string): Promise<AuthTokens> {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError('Refresh token yaroqsiz', 401);
    }

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || !user.isActive) {
      throw new AppError('Foydalanuvchi topilmadi yoki bloklangan', 401);
    }

    const newPayload = { userId: user.id, role: user.role as Role };
    return {
      accessToken: signAccessToken(newPayload),
      refreshToken: signRefreshToken(newPayload),
    };
  },
};
