export interface Transaction {
  id: string;
  orderId: string;
  provider: 'click' | 'cash';
  externalId?: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  paidAt?: string | null;
}
