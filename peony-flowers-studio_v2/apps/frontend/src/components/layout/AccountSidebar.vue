<script setup lang="ts">
import { RouterLink } from 'vue-router';

const links = [
  { to: '/account', label: 'Umumiy' },
  { to: '/account/profile', label: 'Shaxsiy ma\'lumot' },
  { to: '/account/orders', label: 'Buyurtmalar' },
  { to: '/account/addresses', label: 'Manzillar' },
  { to: '/account/wishlist', label: 'Sevimlilar' },
  { to: '/account/notifications', label: 'Bildirishnomalar' },
];
</script>

<template>
  <aside class="sidebar">
    <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="link">
      {{ link.label }}
    </RouterLink>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 220px;
}
.link {
  padding: 10px 16px;
  border-radius: var(--radius);
  color: var(--text-secondary);
  &.router-link-active {
    background: var(--accent-light);
    color: var(--accent);
    font-weight: 600;
  }
}
</style>
