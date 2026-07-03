import { redisClient } from '../config/redis';

const OTP_TTL_SECONDS = 5 * 60; // 5 daqiqa
const OTP_PREFIX = 'otp:';

export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function saveOtp(phone: string, code: string): Promise<void> {
  await redisClient.set(`${OTP_PREFIX}${phone}`, code, { EX: OTP_TTL_SECONDS });
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const saved = await redisClient.get(`${OTP_PREFIX}${phone}`);
  if (!saved || saved !== code) return false;
  await redisClient.del(`${OTP_PREFIX}${phone}`);
  return true;
}

export async function peekOtpForDev(phone: string): Promise<string | null> {
  return redisClient.get(`${OTP_PREFIX}${phone}`);
}