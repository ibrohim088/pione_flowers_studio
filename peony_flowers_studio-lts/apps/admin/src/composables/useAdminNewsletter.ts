import { ref } from 'vue';
import { api } from '../lib/api';

export function useAdminNewsletter() {
  const subscribers = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchAll() {
    isLoading.value = true;
    try {
      const { data } = await api.get('/newsletter');
      subscribers.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  return { subscribers, isLoading, fetchAll };
}
