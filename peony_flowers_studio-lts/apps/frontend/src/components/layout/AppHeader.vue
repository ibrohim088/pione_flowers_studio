<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import MobileMenu from './MobileMenu.vue';
import AppSelect from '../ui/AppSelect.vue';
import SearchBar from './SearchBar.vue';
import NotificationBell from './NotificationBell.vue';
import Logo from '../../assets/images/favicons_gold.svg'

const cartStore = useCartStore();
const authStore = useAuthStore();
const uiStore = useUiStore();
const wishlistStore = useWishlistStore();
const mobileMenuOpen = ref(false);

const localeOptions = [
  { label: 'UZ', value: 'uz' },
  { label: 'RU', value: 'ru' },
];
</script>

<template>
  <nav class="header">
    <div class="header__inner container">
      <RouterLink to="/" class="logo display-lg">
        <img :src="Logo" alt="Peony Logo" />
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/catalog" class="label-sm nav-link" active-class="nav-link--active">{{
          $t('nav.catalog')
          }}</RouterLink>
        <RouterLink to="/about" class="label-sm nav-link" active-class="nav-link--active">{{
          $t('nav.about')
          }}</RouterLink>
      </div>

      <div class="actions">
        <div class="locale-select">
          <AppSelect :model-value="uiStore.locale" :options="localeOptions"
            @update:model-value="(v) => uiStore.setLocale(v as 'uz' | 'ru')" />
        </div>

        <NotificationBell v-if="authStore.isAuthenticated" />

        <RouterLink v-if="authStore.isAuthenticated" to="/account/wishlist" class="icon-btn">
          <span class="material-symbols-outlined">favorite</span>
          <span v-if="wishlistStore.totalItems" class="badge">{{ wishlistStore.totalItems }}</span>
        </RouterLink>

        <RouterLink to="/cart" class="icon-btn">
          <span class="material-symbols-outlined">shopping_cart</span>
          <span v-if="cartStore.totalItems" class="badge">{{ cartStore.totalItems }}</span>
        </RouterLink>

        <RouterLink :to="authStore.isAuthenticated ? '/account' : '/login'" class="icon-btn">
          <span class="material-symbols-outlined">person</span>
        </RouterLink>

        <button class="icon-btn hamburger" type="button" @click="mobileMenuOpen = true">
          <span class="material-symbols-outlined">menu</span>
        </button>

        <div class="locale-select">
          <SearchBar />
        </div>
      </div>
    </div>

    <MobileMenu :open="mobileMenuOpen" @close="mobileMenuOpen = false" />
  </nav>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-hairline);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo {
  color: var(--color-primary);
  font-style: italic;
  font-size: 28px;
  flex-shrink: 0;
  display: flex;
  align-items: center;

  img {
    display: block;
  }

  @media (min-width: 768px) {
    font-size: 32px;
  }
}

.nav-links {
  display: none;
  align-items: center;
  justify-content: center;
  gap: var(--stack-lg);
  flex: 1;

  @media (min-width: 768px) {
    display: flex;
  }
}

.nav-link {
  color: var(--color-on-surface-variant);
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }

  &--active {
    color: var(--color-primary);
    font-weight: 600;
    border-color: var(--color-primary);
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--stack-md);
  flex-shrink: 0;

  > * {
    display: flex;
    align-items: center;
  }
}

.locale-select {
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
}

.icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--color-on-surface-variant);
  transition: color 0.2s;
  line-height: 1;

  &:hover {
    color: var(--color-primary);
  }

  .material-symbols-outlined {
    font-size: 24px;
    line-height: 1;
  }
}

.hamburger {
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
}

.badge {
  position: absolute;
  top: -6px;
  right: -8px;
  z-index: 2;
  background: var(--color-primary);
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  pointer-events: none;
}
</style>