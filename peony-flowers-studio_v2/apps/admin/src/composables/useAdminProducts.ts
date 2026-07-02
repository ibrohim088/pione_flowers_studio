import { ref } from 'vue';
import { api } from '../lib/api';

export function useAdminProducts() {
  const products = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchAll(params: Record<string, unknown> = {}) {
    isLoading.value = true;
    try {
      const { data } = await api.get('/products', { params: { limit: 100, ...params } });
      products.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function createProduct(payload: Record<string, unknown>) {
    const { data } = await api.post('/products', payload);
    products.value.unshift(data.data);
    return data.data;
  }

  async function updateProduct(id: string, payload: Record<string, unknown>) {
    const { data } = await api.put(`/products/${id}`, payload);
    const idx = products.value.findIndex((p) => p.id === id);
    if (idx !== -1) products.value[idx] = data.data;
    return data.data;
  }

  async function deleteProduct(id: string) {
    await api.delete(`/products/${id}`);
    products.value = products.value.filter((p) => p.id !== id);
  }

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data.url;
  }

  return { products, isLoading, fetchAll, createProduct, updateProduct, deleteProduct, uploadImage };
}
