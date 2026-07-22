import { ref } from 'vue';
import { api } from '../lib/api';

export function useAddresses() {
  const addresses = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchAddresses() {
    isLoading.value = true;
    try {
      const { data } = await api.get('/addresses');
      addresses.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function createAddress(payload: Record<string, unknown>) {
    const { data } = await api.post('/addresses', payload);
    addresses.value.push(data.data);
    return data.data;
  }

  async function updateAddress(id: string, payload: Record<string, unknown>) {
    const { data } = await api.put(`/addresses/${id}`, payload);
    const idx = addresses.value.findIndex((a) => a.id === id);
    if (idx !== -1) addresses.value[idx] = data.data;
    return data.data;
  }

  async function deleteAddress(id: string) {
    await api.delete(`/addresses/${id}`);
    addresses.value = addresses.value.filter((a) => a.id !== id);
  }

  return { addresses, isLoading, fetchAddresses, createAddress, updateAddress, deleteAddress };
}
