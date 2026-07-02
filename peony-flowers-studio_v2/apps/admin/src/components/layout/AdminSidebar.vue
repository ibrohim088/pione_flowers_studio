<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore();

const links = computed(() => {
  if (authStore.isFlorist) {
    return [{ to: '/florist/queue', label: '🌷 Buyurtmalar navbati', icon: '🌷' }];
  }
  if (authStore.isCourier) {
    return [{ to: '/courier/today', label: '🚚 Bugungi yetkazishlar', icon: '🚚' }];
  }
  return [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/products', label: 'Mahsulotlar', icon: '🌸' },
    { to: '/categories', label: 'Kategoriyalar', icon: '📁' },
    { to: '/orders', label: 'Buyurtmalar', icon: '📦' },
    { to: '/users', label: 'Foydalanuvchilar', icon: '👥' },
    { to: '/coupons', label: 'Kuponlar', icon: '🎟️' },
    { to: '/payments', label: "To'lovlar", icon: '💳' },
  ];
});
</script>

<template>
  <aside class="sidebar">
    <div class="logo">🌸 Peony Admin</div>
    <nav>
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="link">
        <span class="icon">{{ link.icon }}</span>
        {{ link.label }}
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 240px;
  background: var(--bg-sidebar);
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.logo { font-weight: 700; font-size: 18px; padding: 0 12px; }
nav { display: flex; flex-direction: column; gap: 4px; }
.link {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius);
  color: var(--text-secondary);
  &.router-link-active { background: var(--accent-light); color: var(--accent); }
}
.icon { font-size: 16px; }
</style>
