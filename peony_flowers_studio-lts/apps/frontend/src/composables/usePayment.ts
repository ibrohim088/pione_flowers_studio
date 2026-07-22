import { ref } from 'vue';
import { api } from '../lib/api';

export function usePayment() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function initiateClickPayment(orderId: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.post('/payments/click/prepare', { orderId });
      if (data.data.redirectUrl) {
        window.location.href = data.data.redirectUrl;
      }
      return data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message ?? 'To\'lovni boshlashda xato';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function getPaymentStatus(orderId: string) {
    const { data } = await api.get(`/payments/${orderId}/status`);
    return data.data;
  }

  return { isLoading, error, initiateClickPayment, getPaymentStatus };
}
