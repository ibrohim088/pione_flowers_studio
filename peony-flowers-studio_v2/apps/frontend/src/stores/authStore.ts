import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
  id: string;
  phone: string;
  fullName?: string | null;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null; // FAQAT memory'da (Pinia state) — localStorage EMAS
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    accessToken: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user,
  },

  actions: {
    async sendOtp(phone: string) {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { phone });
    },

    async verifyOtp(phone: string, code: string, fullName?: string) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        { phone, code, fullName },
        { withCredentials: true }
      );
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
