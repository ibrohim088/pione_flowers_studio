<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
import AccountSidebar from '../../components/layout/AccountSidebar.vue';

const authStore = useAuthStore();
</script>

<template>
  <div class="account-layout">
    <AccountSidebar />
    <div class="content">
      <h1>Salom, {{ authStore.user?.fullName || 'Mijoz' }}!</h1>
      <p>Bu yerda buyurtmalaringiz, manzillaringiz va sevimli mahsulotlaringizni boshqarishingiz mumkin.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; padding: 32px; }
</style>
