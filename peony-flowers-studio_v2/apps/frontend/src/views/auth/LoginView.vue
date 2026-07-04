<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import AppInput from '../../components/ui/AppInput.vue';
import AppButton from '../../components/ui/AppButton.vue';
import OtpInput from '../../components/ui/OtpInput.vue';
import logo from '../../assets/images/favicons.svg'

const router = useRouter();
const route = useRoute();
const { isLoading, error, sendOtp, verifyOtp } = useAuth();

const step = ref<'phone' | 'otp'>('phone');
const phone = ref('+998');
const code = ref('');
const secondsLeft = ref(0);
let timer: ReturnType<typeof setInterval> | undefined;

function startCountdown() {
  secondsLeft.value = 119;
  clearInterval(timer);
  timer = setInterval(() => {
    if (secondsLeft.value > 0) secondsLeft.value--;
    else clearInterval(timer);
  }, 1000);
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

async function handleSendOtp() {
  await sendOtp(phone.value);
  step.value = 'otp';
  startCountdown();
}

async function handleVerify() {
  await verifyOtp(phone.value, code.value);
  const redirect = (route.query.redirect as string) || '/account';
  router.push(redirect);
}

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="auth-page">
    <div class="card">
      <div class="brand">
        <img :src="logo" alt="Peony Logo" width="120" height="40"/>
        <div class="divider" />
      </div>

      <div class="heading">
        <p class="label-caps welcome">{{ $t('auth.welcome') }}</p>
        <h1 class="headline-sm">{{ $t('auth.loginTitle') }}</h1>
      </div>

      <form v-if="step === 'phone'" @submit.prevent="handleSendOtp">
        <AppInput v-model="phone" :label="$t('auth.phoneLabel')" icon="call" placeholder="+998 90 000 00 00" />
        <p v-if="error" class="error-text">{{ error }}</p>
        <AppButton type="submit" :loading="isLoading" style="width: 100%">{{ $t('auth.continue') }}</AppButton>
      </form>

      <form v-else @submit.prevent="handleVerify">
        <AppInput v-model="phone" :label="$t('auth.phoneLabel')" icon="call" disabled />
        <div class="field">
          <label class="label-caps">{{ $t('auth.code') }}</label>
          <OtpInput v-model="code" :length="4" />
        </div>
        <div class="resend-row label-sm">
          <span v-if="secondsLeft > 0">{{ $t('auth.waitCode') }}: {{ formatTime(secondsLeft) }}</span>
          <button v-else type="button" class="resend-btn" @click="handleSendOtp">{{ $t('auth.resend') }}</button>
        </div>
        <p v-if="error" class="error-text">{{ error }}</p>
        <AppButton type="submit" :loading="isLoading" style="width: 100%">{{ $t('auth.continue') }}</AppButton>
      </form>

      <div class="footer-row">
        <div class="divider" />
        <p class="body-md">
          {{ $t('auth.noAccount') }}
          <RouterLink to="/register" class="link">{{ $t('auth.registerLink') }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  padding: var(--margin-mobile);
}

.card {
  width: 100%;
  max-width: 420px;
  background: var(--color-surface-container-lowest);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: var(--margin-desktop) var(--stack-lg);
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);
}

.brand {
  text-align: center;
}

.logo {
  color: var(--color-primary);
  font-style: italic;
  font-size: 28px;
}

.divider {
  height: 1px;
  background: var(--color-hairline);
  margin-top: var(--stack-md);
}

.heading {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.welcome {
  color: var(--color-on-surface-variant);
  font-style: italic;
}

form {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--unit);

  label {
    color: var(--color-on-surface-variant);
  }
}

.resend-row {
  display: flex;
  justify-content: space-between;
  color: var(--color-on-surface-variant);
}

.resend-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.error-text {
  color: var(--color-error);
  font-size: 13px;
}

.footer-row {
  text-align: center;
}

.footer-row .divider {
  margin-bottom: var(--stack-md);
}

.link {
  color: var(--color-primary);
  font-weight: 700;
}
</style>