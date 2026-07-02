<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { api } from '../../lib/api';
import AccountSidebar from '../../components/layout/AccountSidebar.vue';
import AppInput from '../../components/ui/AppInput.vue';
import AppButton from '../../components/ui/AppButton.vue';

const authStore = useAuthStore();

const form = reactive({
  fullName: authStore.user?.fullName || '',
  email: (authStore.user as any)?.email || '',
});

async function save() {
  const { data } = await api.put('/users/me', form);
  authStore.user = data.data;
}
</script>

<template>
  <div class="account-layout">
    <AccountSidebar />
    <div class="content">
      <h1>Shaxsiy ma'lumot</h1>
      <form class="form" @submit.prevent="save">
        <AppInput v-model="form.fullName" label="To'liq ism" />
        <AppInput v-model="form.email" label="Email" type="email" />
        <AppButton type="submit">Saqlash</AppButton>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; padding: 32px; }
.form { display: flex; flex-direction: column; gap: 16px; max-width: 400px; }
</style>
