import { ref } from 'vue';
import { api } from '../lib/api';

export function useAdminPayments() {
  const transactions = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchHistory(params: Record<string, unknown> = {}) {
    isLoading.value = true;
    try {
      const { data } = await api.get('/payments/history', { params });
      transactions.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function confirmCash(orderId: string) {
    await api.post('/payments/cash/confirm', { orderId });
    await fetchHistory();
  }

  async function rejectCash(orderId: string) {
    await api.post('/payments/cash/reject', { orderId });
    await fetchHistory();
  }

  async function refund(transactionId: string) {
    await api.post(`/payments/${transactionId}/refund`);
    await fetchHistory();
  }

  return { transactions, isLoading, fetchHistory, confirmCash, rejectCash, refund };
}
