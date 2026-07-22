import { ref } from 'vue';
import { api } from '../lib/api';

export function useNewsletter() {
  const isLoading = ref(false);
  const error = ref('');

  async function subscribe(phone: string) {
    isLoading.value = true;
    error.value = '';
    try {
      const { data } = await api.post('/newsletter/subscribe', { phone });
      return data.message as string;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Xatolik yuz berdi';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, error, subscribe };
}
