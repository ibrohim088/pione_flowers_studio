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

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    productIds: loadGuestWishlist() as string[],
  }),

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
  },
});
