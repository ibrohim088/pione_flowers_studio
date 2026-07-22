import { ref } from 'vue';
import { api } from '../lib/api';

export function useCategories() {
  const categories = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCategories() {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/categories');
      categories.value = data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message ?? 'Kategoriyalarni yuklab bo\'lmadi';
    } finally {
      isLoading.value = false;
    }
  }

  return { categories, isLoading, error, fetchCategories };
}
