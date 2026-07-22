import { ref } from 'vue';
import { api } from '../lib/api';

export function useAdminOrders() {
  const orders = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchAll(params: Record<string, unknown> = {}) {
    isLoading.value = true;
    try {
      const { data } = await api.get('/orders/admin/all', { params: { limit: 100, ...params } });
      orders.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateStatus(id: string, status: string) {
    const { data } = await api.patch(`/orders/${id}/status`, { status });
    const idx = orders.value.findIndex((o) => o.id === id);
    if (idx !== -1) orders.value[idx] = data.data;
  }

  return { orders, isLoading, fetchAll, updateStatus };
}