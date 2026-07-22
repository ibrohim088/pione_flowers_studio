<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { api } from '../../lib/api';
import AppInput from '../../components/ui/AppInput.vue';
import AppButton from '../../components/ui/AppButton.vue';

const authStore = useAuthStore();

const form = reactive({
  fullName: authStore.user?.fullName || '',
  email: (authStore.user as any)?.email || '',
});

const isSaving = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

async function save() {
  isSaving.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    const { data } = await api.put('/users/me', form);
    authStore.updateUser(data.data);
    successMessage.value = data.message || 'Ma\'lumotlar saqlandi';
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message ?? 'Saqlashda xatolik yuz berdi';
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <h1 class="headline-md">{{ $t('account.personalInfo.title') }}</h1>
  <form class="form" @submit.prevent="save">
    <AppInput v-model="form.fullName" :label="$t('account.personalInfo.fullName')" />
    <AppInput v-model="form.email" :label="$t('account.personalInfo.email')" type="email" />
    <p v-if="successMessage" class="feedback success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="feedback error">{{ errorMessage }}</p>
    <AppButton type="submit" :disabled="isSaving">
      {{ isSaving ? '...' : $t('account.personalInfo.save') }}
    </AppButton>
  </form>
</template>

<style scoped lang="scss">
.form { display: flex; flex-direction: column; gap: 16px; max-width: 400px; margin-top: var(--stack-lg); }
.feedback { font-size: 14px; margin: 0; }
.feedback.success { color: var(--color-primary); }
.feedback.error { color: var(--color-error, #b3261e); }
</style>