import { ref } from 'vue';
import { api } from '../lib/api';

export function useOrders() {
  const orders = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchOrders() {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/orders');
      orders.value = data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message ?? 'Xatolik yuz berdi';
    } finally {
      isLoading.value = false;
    }
  }

  async function createOrder(payload: Record<string, unknown>) {
    const { data } = await api.post('/orders', payload);
    return data.data;
  }

  async function cancelOrder(orderId: string) {
    const { data } = await api.patch(`/orders/${orderId}/cancel`);
    return data.data;
  }

  return { orders, isLoading, error, fetchOrders, createOrder, cancelOrder };
}
