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
  <div class="account-layout container">
    <AccountSidebar />
    <div class="content">
      <h1 class="headline-md">{{ $t('account.personalInfo.title') }}</h1>
      <form class="form" @submit.prevent="save">
        <AppInput v-model="form.fullName" :label="$t('account.personalInfo.fullName')" />
        <AppInput v-model="form.email" :label="$t('account.personalInfo.email')" type="email" />
        <AppButton type="submit">{{ $t('account.personalInfo.save') }}</AppButton>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-layout {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  padding-block: var(--stack-lg) var(--section-padding);

  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.content {
  flex: 1;
  min-width: 0;
}
.form { display: flex; flex-direction: column; gap: 16px; max-width: 400px; }
</style>