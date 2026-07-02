import { ref } from 'vue';
import { api } from '../lib/api';

export function useProduct() {
  const product = ref<any | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchBySlug(slug: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/products/${slug}`);
      product.value = data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message ?? 'Mahsulot topilmadi';
    } finally {
      isLoading.value = false;
    }
  }

  return { product, isLoading, error, fetchBySlug };
}
