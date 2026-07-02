import { ref } from 'vue';
import { api } from '../lib/api';

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

  async function fetchProducts(filters: ProductFilters = {}) {
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

  return { products, isLoading, error, fetchProducts };
}
