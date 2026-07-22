import { ref } from 'vue';
import { api } from '../lib/api';

export function useAdminCategories() {
  const categories = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchAll() {
    isLoading.value = true;
    try {
      const { data } = await api.get('/categories');
      categories.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function createCategory(payload: Record<string, unknown>) {
    const { data } = await api.post('/categories', payload);
    categories.value.push(data.data);
    return data.data;
  }

  async function updateCategory(id: string, payload: Record<string, unknown>) {
    const { data } = await api.put(`/categories/${id}`, payload);
    const idx = categories.value.findIndex((c) => c.id === id);
    if (idx !== -1) categories.value[idx] = data.data;
  }

  async function deleteCategory(id: string) {
    await api.delete(`/categories/${id}`);
    categories.value = categories.value.filter((c) => c.id !== id);
  }

  return { categories, isLoading, fetchAll, createCategory, updateCategory, deleteCategory };
}
