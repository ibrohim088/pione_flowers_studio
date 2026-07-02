import { defineStore } from 'pinia';
import axios from 'axios';

interface AdminUser {
  id: string;
  phone: string;
  fullName?: string | null;
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
    async sendOtp(phone: string) {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { phone });
    },

    async verifyOtp(phone: string, code: string) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        { phone, code },
        { withCredentials: true }
      );

      if (!ALLOWED_ROLES.includes(data.data.user.role)) {
        throw new Error('Bu panelga kirish huquqingiz yo\'q');
      }

      this.accessToken = data.data.accessToken;
      this.user = data.data.user;
    },

    async refreshAccessToken() {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );
      this.accessToken = data.data.accessToken;
    },

    async logout() {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      } finally {
        this.user = null;
        this.accessToken = null;
      }
    },
  },
});
