<script setup lang="ts">
import { computed } from 'vue';
import { LogOut } from '@lucide/vue';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const displayName = computed(() => authStore.user?.fullName || authStore.user?.phone || '');
const initial = computed(() => displayName.value.trim().charAt(0).toUpperCase() || '?');

async function logout() {
  await authStore.logout();
  router.push('/login');
}
</script>

<template>
  <header class="header">
    <div />
    <div class="user">
      <span class="avatar">{{ initial }}</span>
      <span class="name">{{ displayName }}</span>
      <button class="logout" @click="logout" title="Chiqish">
        <LogOut :size="16" />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: var(--bg-header);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--accent-light);
  color: var(--accent-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
}

.name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.logout {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--danger-bg);
    color: var(--danger);
    border-color: transparent;
  }
}
</style>