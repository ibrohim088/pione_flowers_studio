import { defineStore } from 'pinia';
import { api } from '../lib/api';
import { useAuthStore } from './authStore';

const STORAGE_KEY = 'peony_wishlist';

function loadGuestWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveGuestWishlist(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function clearGuestWishlist() {
  localStorage.removeItem(STORAGE_KEY);
}

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    productIds: [] as string[],
    isReady: false,
  }),

  getters: {
    totalItems: (state) => state.productIds.length,
  },

  actions: {
    async toggle(productId: string) {
      const authStore = useAuthStore();
      const has = this.productIds.includes(productId);

      if (authStore.isAuthenticated) {
        if (has) await api.delete(`/wishlist/${productId}`);
        else await api.post(`/wishlist/${productId}`);
      }

      this.productIds = has
        ? this.productIds.filter((id) => id !== productId)
        : [...this.productIds, productId];

      if (!authStore.isAuthenticated) saveGuestWishlist(this.productIds);
    },

    isInWishlist(productId: string) {
      return this.productIds.includes(productId);
    },

    async syncFromBackend() {
      const { data } = await api.get('/wishlist');
      this.productIds = data.data.map((i: any) => i.productId);
    },

    async migrateGuestWishlist() {
      const guestIds = loadGuestWishlist();
      if (guestIds.length > 0) {
        await Promise.all(guestIds.map((productId) => api.post(`/wishlist/${productId}`)));
      }
      clearGuestWishlist();
      await this.syncFromBackend();
    },

    async init() {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        await this.syncFromBackend();
      } else {
        this.productIds = loadGuestWishlist();
      }
      this.isReady = true;
    },

    reset() {
      this.productIds = [];
      clearGuestWishlist();
    },
  },
});