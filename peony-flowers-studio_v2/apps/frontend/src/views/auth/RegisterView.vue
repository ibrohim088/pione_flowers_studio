<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import AppInput from '../../components/ui/AppInput.vue';
import AppButton from '../../components/ui/AppButton.vue';
import OtpInput from '../../components/ui/OtpInput.vue';

const router = useRouter();
const { isLoading, error, sendOtp, verifyOtp } = useAuth();

const step = ref<'form' | 'otp'>('form');
const phone = ref('+998');
const fullName = ref('');
const code = ref('');

async function handleSendOtp() {
  await sendOtp(phone.value);
  step.value = 'otp';
}

async function handleVerify() {
  await verifyOtp(phone.value, code.value, fullName.value);
  router.push('/account');
}
</script>

<template>
  <div class="register">
    <h1>Ro'yxatdan o'tish</h1>

    <form v-if="step === 'form'" @submit.prevent="handleSendOtp">
      <AppInput v-model="fullName" :label="$t('auth.fullName')" />
      <AppInput v-model="phone" :label="$t('auth.phone')" placeholder="+998901234567" />
      <p v-if="error" class="error">{{ error }}</p>
      <AppButton type="submit" :loading="isLoading">{{ $t('auth.sendCode') }}</AppButton>
    </form>

    <form v-else @submit.prevent="handleVerify">
      <p>{{ phone }} raqamiga yuborilgan kodni kiriting</p>
      <OtpInput v-model="code" />
      <p v-if="error" class="error">{{ error }}</p>
      <AppButton type="submit" :loading="isLoading">{{ $t('auth.verify') }}</AppButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
.register { max-width: 400px; margin: 80px auto; padding: 24px; display: flex; flex-direction: column; gap: 20px; }
form { display: flex; flex-direction: column; gap: 16px; }
.error { color: var(--danger); font-size: 14px; }
</style>
