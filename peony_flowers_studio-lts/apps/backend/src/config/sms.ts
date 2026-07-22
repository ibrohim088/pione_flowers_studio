import axios from 'axios';
import { env } from './env';
import { logger } from '../utils/logger';

const ESKIZ_BASE_URL = 'https://notify.eskiz.uz/api';

let cachedToken: string | null = null;

async function getEskizToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const { data } = await axios.post(`${ESKIZ_BASE_URL}/auth/login`, {
    email: env.SMS_EMAIL,
    password: env.SMS_SECRET,
  });

  cachedToken = data?.data?.token;
  if (!cachedToken) throw new Error('Failed to authenticate with Eskiz.uz');
  return cachedToken;
}

export async function sendSms(phone: string, message: string): Promise<void> {
  if (env.NODE_ENV === 'development') {
    logger.info(`[DEV SMS] -> ${phone}: ${message}`);
    return;
  }

  try {
    const token = await getEskizToken();
    await axios.post(
      `${ESKIZ_BASE_URL}/message/sms/send`,
      {
        mobile_phone: phone.replace('+', ''),
        message,
        from: '4546',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    logger.error('SMS yuborishda xato:', err);
    throw new Error('SMS yuborilmadi');
  }
}
