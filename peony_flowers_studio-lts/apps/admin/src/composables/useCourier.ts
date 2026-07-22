import { ref } from 'vue';
import { api } from '../lib/api';

export function useCourier() {
  const deliveries = ref<any[]>([]);
  const available = ref<any[]>([]);
  const isLoading = ref(false);
  const isLoadingAvailable = ref(false);

  async function fetchToday() {
    isLoading.value = true;
    try {
      const { data } = await api.get('/orders/courier/today');
      deliveries.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchAvailable() {
    isLoadingAvailable.value = true;
    try {
      const { data } = await api.get('/orders/courier/available');
      available.value = data.data;
    } finally {
      isLoadingAvailable.value = false;
    }
  }

  async function acceptDelivery(orderId: string) {
    await api.patch(`/orders/${orderId}/accept`);
    await Promise.all([fetchAvailable(), fetchToday()]);
  }

  async function markDelivered(orderId: string) {
    await api.patch(`/orders/${orderId}/delivered`);
    await fetchToday();
  }

  return {
    deliveries,
    available,
    isLoading,
    isLoadingAvailable,
    fetchToday,
    fetchAvailable,
    acceptDelivery,
    markDelivered,
  };
}