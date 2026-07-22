import { ref } from 'vue';
import { api } from '../lib/api';

export function useProfile() {
  const isLoading = ref(false);
  const isSaving = ref(false);

  async function fetchMe() {
    isLoading.value = true;
    try {
      const { data } = await api.get('/users/me');
      return data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateProfile(payload: { fullName?: string; email?: string }) {
    isSaving.value = true;
    try {
      const { data } = await api.put('/users/me', payload);
      return data.data;
    } finally {
      isSaving.value = false;
    }
  }

  return { isLoading, isSaving, fetchMe, updateProfile };
}