import { ref } from 'vue';
import { api } from '../lib/api';

export function useNotifications() {
  const notifications = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchNotifications() {
    isLoading.value = true;
    try {
      const { data } = await api.get('/notifications');
      notifications.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function markRead(id: string) {
    await api.patch(`/notifications/${id}/read`);
    const n = notifications.value.find((x) => x.id === id);
    if (n) n.isRead = true;
  }

  async function markAllRead() {
    await api.patch('/notifications/read-all');
    notifications.value.forEach((n) => (n.isRead = true));
  }

  return { notifications, isLoading, fetchNotifications, markRead, markAllRead };
}
