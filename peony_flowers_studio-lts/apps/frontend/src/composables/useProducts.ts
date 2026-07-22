import { ref, watch } from 'vue';
import { api } from '../lib/api';
import { i18n } from '../i18n';

interface ProductFilters {
  page?: number;
  categoryId?: string;
  type?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export function useProducts() {
  const products = ref<any[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  let lastFilters: ProductFilters = {};

  async function fetchProducts(filters: ProductFilters = {}) {
    lastFilters = filters;
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/products', { params: filters });
      products.value = data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message ?? 'Xatolik yuz berdi';
    } finally {
      isLoading.value = false;
    }
  }

  // Til (uz/ru) almashtirilganda ro'yxatni oxirgi ishlatilgan filtrlar bilan
  // yangi tilda qayta yuklaymiz.
  watch(
    () => i18n.global.locale.value,
    () => fetchProducts(lastFilters)
  );

  return { products, isLoading, error, fetchProducts };
}
