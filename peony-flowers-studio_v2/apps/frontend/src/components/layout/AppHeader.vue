<script setup lang="ts">
import { Flower2, ShoppingCart } from '@lucide/vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';

const cartStore = useCartStore();
const authStore = useAuthStore();
const uiStore = useUiStore();
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo"><Flower2 :size="20" /> Peony Flowers</RouterLink>

    <nav class="nav">
      <RouterLink to="/catalog">{{ $t('nav.catalog') }}</RouterLink>
      <RouterLink to="/about">{{ $t('nav.about') }}</RouterLink>
    </nav>

    <div class="actions">
      <select v-model="uiStore.locale" @change="uiStore.setLocale(uiStore.locale as any)">
        <option value="uz">O'zbekcha</option>
        <option value="ru">Русский</option>
      </select>

      <RouterLink to="/cart" class="cart-link">
        <ShoppingCart :size="18" /> {{ $t('nav.cart') }}
        <span v-if="cartStore.totalItems" class="badge">{{ cartStore.totalItems }}</span>
      </RouterLink>

      <RouterLink v-if="authStore.isAuthenticated" to="/account">{{ $t('nav.account') }}</RouterLink>
      <RouterLink v-else to="/login">{{ $t('nav.login') }}</RouterLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
}
.nav {
  display: flex;
  gap: 24px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
}
.badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background: var(--accent);
  color: white;
  font-size: 11px;
  border-radius: 50%;
  padding: 2px 6px;
}
</style>
