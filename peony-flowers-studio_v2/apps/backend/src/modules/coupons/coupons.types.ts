export interface CreateCouponInput {
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderTotal?: number;
  usageLimit?: number;
  expiresAt?: string;
}
