import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { getApiBase } from './apiBase';

export const api = axios.create({
  withCredentials: true,
});

// Har so'rovdan oldin: backend manzilini aniqlaydi (localhost ishlasa — shu,
// bo'lmasa tarmoq IP'siga o'tadi) va token qo'shadi. getApiBase() natijani
// keshlaydi, shuning uchun bu faqat birinchi so'rovda real tekshiruv qiladi.
api.interceptors.request.use(async (config) => {
  if (!config.baseURL) {
    config.baseURL = `${await getApiBase()}/api`;
  }

  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authStore = useAuthStore();

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingQueue.push(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;
      try {
        await authStore.refreshAccessToken();
        pendingQueue.forEach((cb) => cb());
        pendingQueue = [];
        return api(originalRequest);
      } catch (refreshError) {
        authStore.logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);