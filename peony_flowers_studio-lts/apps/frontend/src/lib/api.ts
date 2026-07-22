import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { router } from '../router';
import { getApiBase } from './apiBase';
import { i18n } from '../i18n';

export const api = axios.create({
  withCredentials: true, // httpOnly refresh token cookie uchun shart
});

// Har so'rovdan oldin: backend manzilini aniqlaydi (localhost ishlasa — shu,
// bo'lmasa tarmoq IP'siga o'tadi), joriy tilni (uz/ru) header sifatida
// qo'shadi va tokenni qo'shadi. getApiBase() natijani keshlaydi, shuning
// uchun bu faqat birinchi so'rovda real tekshiruv qiladi.
api.interceptors.request.use(async (config) => {
  if (!config.baseURL) {
    config.baseURL = `${await getApiBase()}/api`;
  }

  config.headers['x-locale'] = i18n.global.locale.value;

  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
});

// 401 bo'lganda avtomatik /auth/refresh chaqirish
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
        await authStore.logout();
        if (router.currentRoute.value.meta.requiresAuth) {
          router.push('/');
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);