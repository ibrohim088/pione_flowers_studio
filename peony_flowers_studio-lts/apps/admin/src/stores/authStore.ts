import { defineStore } from 'pinia';
import { api } from '../lib/api';

interface AdminUser {
  id: string;
  phone: string;
  fullName?: string | null;
  email?: string | null;
  role: string;
}

const ALLOWED_ROLES = ['admin', 'florist', 'courier'];

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AdminUser | null,
    accessToken: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isFlorist: (state) => state.user?.role === 'florist',
    isCourier: (state) => state.user?.role === 'courier',
  },

  actions: {
    setUser(user: AdminUser) {
      this.user = user;
    },

    async sendOtp(phone: string) {
      await api.post('/auth/send-otp', { phone });
    },

    async verifyOtp(phone: string, code: string) {
      const { data } = await api.post('/auth/verify-otp', { phone, code });

      if (!ALLOWED_ROLES.includes(data.data.user.role)) {
        throw new Error('Bu panelga kirish huquqingiz yo\'q');
      }

      this.accessToken = data.data.accessToken;
      this.user = data.data.user;
    },

    async refreshAccessToken() {
      const { data } = await api.post('/auth/refresh', {});
      this.accessToken = data.data.accessToken;
    },

    async logout() {
      try {
        await api.post('/auth/logout', {});
      } finally {
        this.user = null;
        this.accessToken = null;
      }
    },
  },
});