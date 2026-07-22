import { defineStore } from 'pinia';

const STORAGE_KEY = 'peony_checkout';

interface CheckoutState {
  addressId: string | null;
  deliveryDate: string;
  deliveryTime: string;
  giftMessage: string;
  paymentMethod: 'click' | 'cash';
}

function loadFromSession(): CheckoutState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaults();
  } catch {
    return defaults();
  }
}

function defaults(): CheckoutState {
  return {
    addressId: null,
    deliveryDate: '',
    deliveryTime: '',
    giftMessage: '',
    paymentMethod: 'cash',
  };
}

function saveToSession(state: CheckoutState) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export const useCheckoutStore = defineStore('checkout', {
  state: (): CheckoutState => loadFromSession(),

  actions: {
    update(partial: Partial<CheckoutState>) {
      Object.assign(this, partial);
      saveToSession(this.$state as CheckoutState);
    },

    reset() {
      Object.assign(this, defaults());
      sessionStorage.removeItem(STORAGE_KEY);
    },
  },
});
