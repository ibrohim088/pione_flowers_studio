<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import MobileMenu from './MobileMenu.vue';
import AppSelect from '../ui/AppSelect.vue';
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

  @media (min-width: 768px) {
    font-size: 32px;
  }
}

.nav-links {
  display: none;
  align-items: center;
  gap: var(--stack-lg);

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
  gap: var(--stack-md);
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
  color: var(--color-on-surface-variant);
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }

  .material-symbols-outlined {
    font-size: 24px;
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



<!-- <script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import MobileMenu from './MobileMenu.vue';
import AppSelect from '../ui/AppSelect.vue';
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

  @media (min-width: 768px) {
    font-size: 32px;
  }
}

.nav-links {
  display: none;
  align-items: center;
  gap: var(--stack-lg);

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
  gap: var(--stack-md);
}

.locale-select {
  display: none;
  width: 84px;

  @media (min-width: 640px) {
    display: block;
  }

  :deep(select) {
    padding: 7px 30px 7px 14px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.03em;
    border-radius: var(--radius-full, 999px);
    border-color: var(--color-outline-variant);
    color: var(--color-on-surface-variant);
    background: var(--color-surface-container-low);

    &:hover {
      color: var(--color-primary);
      border-color: var(--color-primary);
      background: var(--color-surface-container-lowest);
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(111, 36, 53, 0.1);
    }
  }

  :deep(.chevron) {
    right: 10px;
    font-size: 16px;
  }
}

.icon-btn {
  position: relative;
  display: flex;
  color: var(--color-on-surface-variant);
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }

  .material-symbols-outlined {
    font-size: 24px;
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
</style> -->