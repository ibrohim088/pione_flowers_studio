import { defineStore } from 'pinia';
import { api } from '../lib/api';
import { useWishlistStore } from './wishlistStore';

interface User {
  id: string;
  phone: string;
  fullName?: string | null;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

const STORAGE_KEY = 'peony_auth';

function readFromStorage(): { accessToken: string | null; user: User | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { accessToken: null, user: null };
    const parsed = JSON.parse(raw);
    return { accessToken: parsed.accessToken ?? null, user: parsed.user ?? null };
  } catch {
    return { accessToken: null, user: null };
  }
}

function writeToStorage(accessToken: string | null, user: User | null) {
  if (accessToken && user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, user }));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => readFromStorage(),

  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user,
  },

  actions: {
    async sendOtp(phone: string) {
      await api.post('/auth/send-otp', { phone });
    },

    async verifyOtp(phone: string, code: string, fullName?: string) {
      const { data } = await api.post('/auth/verify-otp', { phone, code, fullName });
      this.accessToken = data.data.accessToken;
      this.user = data.data.user;
      writeToStorage(this.accessToken, this.user);

      const wishlistStore = useWishlistStore();
      await wishlistStore.migrateGuestWishlist();
    },

    async refreshAccessToken() {
      const { data } = await api.post('/auth/refresh', {});
      this.accessToken = data.data.accessToken;
      writeToStorage(this.accessToken, this.user);
    },

    updateUser(user: Partial<User>) {
      if (!this.user) return;
      this.user = { ...this.user, ...user };
      writeToStorage(this.accessToken, this.user);
    },

    async logout() {
      try {
        await api.post('/auth/logout', {});
      } finally {
        this.user = null;
        this.accessToken = null;
        writeToStorage(null, null);

        const wishlistStore = useWishlistStore();
        wishlistStore.reset();
      }
    },
  },
});