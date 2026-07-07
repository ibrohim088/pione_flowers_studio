<script setup lang="ts">
import { Flower2, ArrowLeft } from '@lucide/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';
import PhoneInput from '../../components/ui/PhoneInput.vue';
import OtpInput from '../../components/ui/OtpInput.vue';
import AppButton from '../../components/ui/AppButton.vue';
import logo from '../../assets/images/favicons_gold.svg';

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

function backToPhone() {
  step.value = 'phone';
  error.value = '';
}

async function verify() {
  isLoading.value = true;
  error.value = '';
  try {
    await authStore.verifyOtp(phone.value, code.value);

    const role = authStore.user?.role;
    if (role === 'florist') {
      router.push('/florist/queue');
    } else if (role === 'courier') {
      router.push('/courier/today');
    } else {
      router.push('/dashboard');
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Kod noto\'g\'ri';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <main class="card">
        <div class="brand">
          <img :src="logo" alt="Peony Logo" width="120" height="40" />
        </div>

        <button v-if="step === 'otp'" type="button" class="back" @click="backToPhone">
          <ArrowLeft :size="16" /> Orqaga
        </button>

        <form v-if="step === 'phone'" @submit.prevent="sendOtp">
          <div class="intro">
            <h2>Xush kelibsiz</h2>
            <p>Telefon raqamingizni kiriting</p>
          </div>
          <PhoneInput v-model="phone" label="Telefon raqam" v-autofocus/>
          <p v-if="error" class="error">{{ error }}</p>
          <AppButton type="submit" :loading="isLoading">Kod yuborish</AppButton>
        </form>

        <form v-else @submit.prevent="verify">
          <div class="intro">
            <h2>Tasdiqlash</h2>
            <p>{{ phone }} raqamiga yuborilgan kodni kiriting</p>
          </div>
          <OtpInput style="margin: 0 auto;" v-model="code" :length="6" v-autofocus/>
          <p v-if="error" class="error">{{ error }}</p>
          <AppButton type="submit" :loading="isLoading">Kirish</AppButton>
        </form>
      </main>

      <footer>Peony Flowers Studio © 2026</footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  padding: 24px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.brand h1 {
  font-size: 20px;
  letter-spacing: -0.01em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.intro h2 {
  font-size: 20px;
}

.intro p {
  font-size: 14px;
  margin: 0;
}

.back {
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  padding: 0;
  margin-top: -8px;

  &:hover {
    color: var(--accent);
  }
}

.error {
  color: var(--danger);
  font-size: 13px;
  margin: -8px 0 0;
}

footer {
  margin-top: 24px;
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
  opacity: 0.7;
}
</style>
