import { ref } from 'vue';
import { api } from '../lib/api';

export function useFlorist() {
  const queue = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchQueue() {
    isLoading.value = true;
    try {
      const { data } = await api.get('/orders/florist/queue');
      queue.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function markPrepared(orderId: string, preparedPhotoUrl: string) {
    await api.post(`/orders/${orderId}/prepared`, { preparedPhotoUrl });
    await fetchQueue();
  }

  async function uploadPhoto(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data.url;
  }

  return { queue, isLoading, fetchQueue, markPrepared, uploadPhoto };
}
