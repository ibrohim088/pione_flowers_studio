import { ref } from 'vue';
import { api } from '../lib/api';

export function useCourier() {
  const deliveries = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchToday() {
    isLoading.value = true;
    try {
      const { data } = await api.get('/orders/courier/today');
      deliveries.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function markDelivered(orderId: string) {
    await api.patch(`/orders/${orderId}/delivered`);
    await fetchToday();
  }

  return { deliveries, isLoading, fetchToday, markDelivered };
}
