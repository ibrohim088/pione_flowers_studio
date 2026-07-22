import { ref } from 'vue';
import { api } from '../lib/api';

export function useAdminUsers() {
  const users = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchAll(params: Record<string, unknown> = {}) {
    isLoading.value = true;
    try {
      const { data } = await api.get('/users', { params: { limit: 100, ...params } });
      users.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateUser(id: string, payload: Record<string, unknown>) {
    const { data } = await api.put(`/users/${id}`, payload);
    const idx = users.value.findIndex((u) => u.id === id);
    if (idx !== -1) users.value[idx] = data.data;
  }

  async function deleteUser(id: string) {
    await api.delete(`/users/${id}`);
    await fetchAll();
  }

  async function createStaff(payload: { phone: string; fullName: string; role: string }) {
    const { data } = await api.post('/users/staff', payload);
    users.value.unshift(data.data);
    return data.data;
  }

  return { users, isLoading, fetchAll, updateUser, deleteUser, createStaff };
}
