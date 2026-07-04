<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import AppInput from '../../components/ui/AppInput.vue';
import AppButton from '../../components/ui/AppButton.vue';
import OtpInput from '../../components/ui/OtpInput.vue';
import logo from '../../assets/images/favicons.svg'

const router = useRouter();
const { isLoading, error, sendOtp, verifyOtp } = useAuth();

const step = ref<'form' | 'otp'>('form');
const phone = ref('+998');
const fullName = ref('');
const code = ref('');
const agreed = ref(false);

async function handleSendOtp() {
  if (!agreed.value) return;
  await sendOtp(phone.value);
  step.value = 'otp';
}

async function handleVerify() {
  await verifyOtp(phone.value, code.value, fullName.value);
  router.push('/account');
}
</script>

<template>
  <div class="auth-page">
    <div class="card">
      <div class="brand">
        <img :src="logo" alt="Peony Logo" width="120" height="40" />
      </div>

      <h1 class="headline-md heading">{{ $t('auth.registerTitle') }}</h1>

      <form v-if="step === 'form'" @submit.prevent="handleSendOtp">
        <div class="field">
          <label class="label-caps">{{ $t('auth.fullNameLabel') }}</label>
          <AppInput v-model="fullName" :placeholder="$t('auth.namePlaceholder')" />
        </div>
        <div class="field">
          <label class="label-caps">{{ $t('auth.phoneLabel') }}</label>
          <AppInput v-model="phone" placeholder="+998" />
        </div>

        <label class="agree">
          <input v-model="agreed" type="checkbox" />
          <span class="body-md">
            {{ $t('auth.agreePrefix') }} <a href="#" class="link">{{ $t('auth.terms') }}</a> {{ $t('auth.agreeSuffix')
            }}
          </span>
        </label>

        <p v-if="error" class="error-text">{{ error }}</p>
        <AppButton type="submit" :disabled="!agreed" :loading="isLoading" style="width: 100%">
          {{ $t('auth.registerTitle') }}
        </AppButton>
      </form>

      <form v-else @submit.prevent="handleVerify">
        <p class="body-md">{{ phone }} {{ $t('auth.enterCodeText') }}</p>
        <OtpInput v-model="code" :length="4" />
        <p v-if="error" class="error-text">{{ error }}</p>
        <AppButton type="submit" :loading="isLoading" style="width: 100%">{{ $t('auth.confirm') }}</AppButton>
      </form>

      <div class="footer-row">
        <div class="divider" />
        <p class="body-md">
          {{ $t('auth.haveAccount') }}
          <RouterLink to="/login" class="link">{{ $t('auth.loginLink') }}</RouterLink>
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
  font-size: 24px;
}

.heading {
  text-align: center;
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

.agree {
  display: flex;
  align-items: flex-start;
  gap: var(--stack-sm);
  cursor: pointer;
  color: var(--color-on-surface-variant);

  input {
    margin-top: 4px;
    accent-color: var(--color-primary);
  }
}

.link {
  color: var(--color-primary);
  font-weight: 700;
}

.error-text {
  color: var(--color-error);
  font-size: 13px;
}

.footer-row {
  text-align: center;
}

.divider {
  height: 1px;
  background: var(--color-hairline);
  margin-bottom: var(--stack-md);
}
</style>