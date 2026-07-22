import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const authStore = useAuthStore();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function sendOtp(phone: string) {
    isLoading.value = true;
    error.value = null;
    try {
      await authStore.sendOtp(phone);
    } catch (err: any) {
      error.value = err.response?.data?.message ?? 'SMS yuborilmadi';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function verifyOtp(phone: string, code: string, fullName?: string) {
    isLoading.value = true;
    error.value = null;
    try {
      await authStore.verifyOtp(phone, code, fullName);
    } catch (err: any) {
      error.value = err.response?.data?.message ?? 'Kod noto\'g\'ri';
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, error, sendOtp, verifyOtp };
}
