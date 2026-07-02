<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

async function logout() {
  await authStore.logout();
  router.push('/login');
}
</script>

<template>
  <header class="header">
    <div />
    <div class="user">
      <span>{{ authStore.user?.fullName || authStore.user?.phone }}</span>
      <button @click="logout">Chiqish</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
}
.user { display: flex; align-items: center; gap: 16px; }
button {
  background: none; border: 1px solid var(--border); color: var(--text-primary);
  padding: 6px 14px; border-radius: var(--radius); cursor: pointer;
}
</style>
