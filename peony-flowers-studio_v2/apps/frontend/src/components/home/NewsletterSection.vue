<script setup lang="ts">
import { ref } from 'vue';
import { useNewsletter } from '../../composables/useNewsletter';

const email = ref('');
const sent = ref(false);
const { isLoading, error, subscribe } = useNewsletter();

async function submit() {
  if (!email.value || isLoading.value) return;
  try {
    await subscribe(email.value);
    sent.value = true;
    email.value = '';
  } catch {
    // error.value composable ichida o'rnatiladi, shablonda ko'rsatiladi
  }
}
</script>

<template>
  <section class="newsletter container">
    <div class="card">
      <span class="material-symbols-outlined watermark">nature</span>
      <h2 class="headline-md">{{ $t('home.newsletter.title') }}</h2>
      <p class="body-md">{{ $t('home.newsletter.text') }}</p>
      <form class="form" @submit.prevent="submit">
        <input v-model="email" type="email" :placeholder="$t('home.newsletter.placeholder')" required />
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? '...' : sent ? `${$t('home.newsletter.sent')} ✓` : $t('home.newsletter.submit') }}
        </button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.newsletter {
  padding-block: var(--section-padding);
  text-align: center;
}

.card {
  position: relative;
  overflow: hidden;
  background: var(--color-surface-container-low);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: var(--margin-desktop) var(--margin-mobile);
}

.watermark {
  position: absolute;
  right: -20px;
  bottom: -20px;
  font-size: 200px;
  opacity: 0.05;
  pointer-events: none;
}

h2 {
  margin-bottom: var(--stack-md);
  position: relative;
}

p {
  color: var(--color-on-surface-variant);
  max-width: 32rem;
  margin: 0 auto var(--stack-lg);
  position: relative;
}

.error {
  color: var(--color-error);
  font-size: 14px;
  margin-top: var(--stack-sm);
  position: relative;
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--stack-sm);
  max-width: 28rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (min-width: 640px) {
    flex-direction: row;
  }

  input {
    flex: 1;
    background: var(--color-surface);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-lg);
    padding: 12px 16px;
    font-family: var(--font-body);

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }

  button {
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    padding: 12px 32px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>