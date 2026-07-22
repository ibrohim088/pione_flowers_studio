import { IPaymentProvider, PreparePaymentInput, PreparePaymentResult } from './payment.provider';

/**
 * Naqd pul provider — Click kabi tashqi redirect kerak emas.
 * Order paymentStatus='pending_cash' bilan yaratiladi, admin panelda tasdiqlanadi.
 */
export class CashProvider implements IPaymentProvider {
  async prepare(_input: PreparePaymentInput): Promise<PreparePaymentResult> {
    return {
      message: 'Buyurtma naqd to\'lov bilan qabul qilindi. Yetkazib berishda to\'lov qiling.',
    };
  }
}

export const cashProvider = new CashProvider();
