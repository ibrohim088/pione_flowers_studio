import { ref } from 'vue';
import { api } from '../lib/api';

export function useDashboard() {
  const data = ref<any>(null);
  const isLoading = ref(false);

  async function fetchDashboard(days = 30) {
    isLoading.value = true;
    try {
      const { data: res } = await api.get('/analytics/dashboard', { params: { days } });
      data.value = res.data;
    } finally {
      isLoading.value = false;
    }
  }

  return { data, isLoading, fetchDashboard };
}
