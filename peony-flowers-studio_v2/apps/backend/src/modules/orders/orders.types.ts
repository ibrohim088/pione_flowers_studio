export interface CreateOrderInput {
  addressId?: string;
  items: { productId: string; quantity: number }[];
  paymentMethod: 'click' | 'cash';
  deliveryDate: string;
  deliveryTime: string;
  giftMessage?: string;
  couponCode?: string;
}

export interface UpdateOrderStatusInput {
  status: string;
}
