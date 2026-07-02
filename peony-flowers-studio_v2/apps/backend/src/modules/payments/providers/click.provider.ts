import { paymentConfig } from '../../../config/payment';
import { md5 } from '../../../utils/hash';
import { IPaymentProvider, PreparePaymentInput, PreparePaymentResult } from './payment.provider';

const CLICK_BASE_URL = 'https://my.click.uz/services/pay';

export class ClickProvider implements IPaymentProvider {
  async prepare({ orderId, amount }: PreparePaymentInput): Promise<PreparePaymentResult> {
    const { merchantId, serviceId } = paymentConfig.click;

    const params = new URLSearchParams({
      service_id: serviceId,
      merchant_id: merchantId,
      amount: amount.toString(),
      transaction_param: orderId,
      return_url: paymentConfig.click.completeUrl,
    });

    return {
      redirectUrl: `${CLICK_BASE_URL}?${params.toString()}`,
      message: 'Click to\'lov sahifasiga yo\'naltirilyapti',
    };
  }

  /**
   * Click callback (prepare/complete) uchun MD5 imzoni tekshiradi.
   * Click hujjatlariga ko'ra: sign_string = md5(click_trans_id + service_id + secret_key + merchant_trans_id + amount + action + sign_time)
   */
  verifySignature(payload: {
    click_trans_id: string;
    service_id: string;
    merchant_trans_id: string;
    amount: string;
    action: string;
    sign_time: string;
    sign_string: string;
  }): boolean {
    const { secretKey } = paymentConfig.click;
    const raw = `${payload.click_trans_id}${payload.service_id}${secretKey}${payload.merchant_trans_id}${payload.amount}${payload.action}${payload.sign_time}`;
    const expected = md5(raw);
    return expected === payload.sign_string;
  }
}

export const clickProvider = new ClickProvider();
