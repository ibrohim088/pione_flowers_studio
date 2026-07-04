<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore();

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const links = computed(() => [
  { to: '/account', label: t('account.sidebar.overview'), icon: 'dashboard' },
  { to: '/account/profile', label: t('account.sidebar.personalInfo'), icon: 'person' },
  { to: '/account/orders', label: t('account.sidebar.orders'), icon: 'shopping_bag' },
  { to: '/account/addresses', label: t('account.sidebar.addresses'), icon: 'location_on' },
  { to: '/account/wishlist', label: t('account.sidebar.wishlist'), icon: 'favorite' },
  { to: '/account/notifications', label: t('account.sidebar.notifications'), icon: 'notifications' },
]);
</script>

<template>
  <aside class="sidebar">
    <div class="profile-summary">
      <div class="avatar">{{ (authStore.user?.fullName || 'M').charAt(0).toUpperCase() }}</div>
      <div>
        <p class="body-md name">{{ authStore.user?.fullName || $t('account.guest') }}</p>
        <p class="label-sm phone">{{ authStore.user?.phone }}</p>
      </div>
    </div>

    <nav class="links">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="link label-sm"
        active-class="link--active"
        exact-active-class="link--active"
      >
        <span class="material-symbols-outlined">{{ link.icon }}</span>
        {{ link.label }}
      </RouterLink>
      <button class="link logout label-sm" type="button" @click="authStore.logout()">
        <span class="material-symbols-outlined">logout</span>
        {{ $t('account.sidebar.logout') }}
      </button>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);
  width: 100%;

  @media (min-width: 768px) {
    width: 260px;
    flex-shrink: 0;
    position: sticky;
    top: 100px;
  }
}
.profile-summary {
  display: flex;
  align-items: center;
  gap: var(--stack-sm);
  padding-bottom: var(--stack-md);
  border-bottom: 1px solid var(--color-hairline);
}
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-surface-container-high);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}
.name {
  font-weight: 700;
}
.phone {
  color: var(--color-on-surface-variant);
}
.links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.link {
  display: flex;
  align-items: center;
  gap: var(--stack-sm);
  padding: 10px 14px;
  border-radius: var(--radius-lg);
  color: var(--color-on-surface-variant);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-body);
  transition: all 0.2s;

  .material-symbols-outlined {
    font-size: 20px;
  }

  &:hover {
    background: var(--color-surface-container-low);
  }
  &--active {
    background: var(--color-surface-container-low);
    color: var(--color-primary);
    font-weight: 600;
  }
}
.logout {
  color: var(--color-error);
  margin-top: var(--stack-sm);
  border-top: 1px solid var(--color-hairline);
  padding-top: 14px;
}
</style>