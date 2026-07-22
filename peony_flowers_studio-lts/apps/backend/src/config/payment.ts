import { env } from './env';

export const paymentConfig = {
  click: {
    merchantId: env.CLICK_MERCHANT_ID || '',
    serviceId: env.CLICK_SERVICE_ID || '',
    secretKey: env.CLICK_SECRET_KEY || '',
    prepareUrl: `${env.PAYMENT_CALLBACK_BASE_URL}/api/payments/click/prepare`,
    completeUrl: `${env.PAYMENT_CALLBACK_BASE_URL}/api/payments/click/complete`,
    isTestMode: env.NODE_ENV !== 'production',
  },
  cash: {
    maxAmount: 10_000_000, // so'm, tiyinga o'girilganda x100
  },
};
