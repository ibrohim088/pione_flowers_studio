import { ref } from 'vue';
import { api } from '../lib/api';

export function useAdminCoupons() {
  const coupons = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchAll() {
    isLoading.value = true;
    try {
      const { data } = await api.get('/coupons');
      coupons.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function createCoupon(payload: Record<string, unknown>) {
    const { data } = await api.post('/coupons', payload);
    coupons.value.unshift(data.data);
  }

  async function deleteCoupon(id: string) {
    await api.delete(`/coupons/${id}`);
    coupons.value = coupons.value.filter((c) => c.id !== id);
  }

  return { coupons, isLoading, fetchAll, createCoupon, deleteCoupon };
}
