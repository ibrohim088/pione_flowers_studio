export type OrderStatus =
  | 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';

export type PaymentMethod = 'click' | 'cash';
export type PaymentStatus = 'pending' | 'pending_cash' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  addressId?: string | null;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryDate: string;
  deliveryTime: string;
  giftMessage?: string | null;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
