export interface PreparePaymentInput {
  orderId: string;
  amount: number; // so'm
}

export interface PreparePaymentResult {
  redirectUrl?: string;
  message: string;
}

export interface IPaymentProvider {
  prepare(input: PreparePaymentInput): Promise<PreparePaymentResult>;
}
