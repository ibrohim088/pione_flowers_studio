import { defineStore } from 'pinia';

export interface CartItem {
  productId: string;
  title: string;
  slug: string;
  price: number;
  image?: string;
  quantity: number;
}

const STORAGE_KEY = 'peony_cart';

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadFromStorage() as CartItem[],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  },

  actions: {
    addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
      const existing = this.items.find((i) => i.productId === item.productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({ ...item, quantity });
      }
      saveToStorage(this.items);
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveToStorage(this.items);
      }
    },

    removeItem(productId: string) {
      this.items = this.items.filter((i) => i.productId !== productId);
      saveToStorage(this.items);
    },

    clear() {
      this.items = [];
      saveToStorage(this.items);
    },
  },
});
