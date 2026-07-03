<script setup lang="ts">
import { Flower2 } from '@lucide/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';
import AppInput from '../../components/ui/AppInput.vue';
import AppButton from '../../components/ui/AppButton.vue';

const router = useRouter();
const authStore = useAuthStore();

const step = ref<'phone' | 'otp'>('phone');
const phone = ref('+998');
const code = ref('');
const isLoading = ref(false);
const error = ref('');

async function sendOtp() {
  isLoading.value = true;
  error.value = '';
  try {
    await authStore.sendOtp(phone.value);
    step.value = 'otp';
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Xatolik yuz berdi';
  } finally {
    isLoading.value = false;
  }
}

async function verify() {
  isLoading.value = true;
  error.value = '';
  try {
    await authStore.verifyOtp(phone.value, code.value);
    router.push('/');
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Kod noto\'g\'ri';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-page">
    <div class="card">
      <h1><Flower2 :size="24" /> Peony Admin</h1>

      <form v-if="step === 'phone'" @submit.prevent="sendOtp">
        <AppInput v-model="phone" label="Telefon raqam" placeholder="+998901234567" />
        <p v-if="error" class="error">{{ error }}</p>
        <AppButton type="submit" :loading="isLoading">Kod yuborish</AppButton>
      </form>

      <form v-else @submit.prevent="verify">
        <AppInput v-model="code" label="Tasdiqlash kodi" placeholder="123456" />
        <p v-if="error" class="error">{{ error }}</p>
        <AppButton type="submit" :loading="isLoading">Kirish</AppButton>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: var(--bg-secondary);
}
.card {
  background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 32px; width: 360px;
}
h1 { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 24px; }
form { display: flex; flex-direction: column; gap: 16px; }
.error { color: var(--danger); font-size: 13px; }
</style>
