import { ref } from 'vue';
import { api } from '../lib/api';

export function useOrder() {
  const order = ref<any | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchById(id: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/orders/${id}`);
      order.value = data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message ?? 'Buyurtma topilmadi';
    } finally {
      isLoading.value = false;
    }
  }

  return { order, isLoading, error, fetchById };
}
