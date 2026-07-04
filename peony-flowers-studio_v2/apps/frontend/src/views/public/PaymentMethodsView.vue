<template>
  <div class="page container">
    <span class="label-caps eyebrow">{{ $t('paymentMethodsPage.eyebrow') }}</span>
    <h1 class="display-md title">{{ $t('paymentMethodsPage.title') }}</h1>
    <p class="body-lg intro">{{ $t('paymentMethodsPage.intro') }}</p>

    <div class="grid">
      <div v-for="item in items" :key="item.icon" class="card">
        <span class="material-symbols-outlined icon">{{ item.icon }}</span>
        <h3 class="headline-sm">{{ item.title }}</h3>
        <p class="body-md">{{ item.text }}</p>
      </div>
    </div>

    <div class="note">
      <span class="material-symbols-outlined">verified_user</span>
      <p class="body-md">{{ $t('paymentMethodsPage.note') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const items = computed(() => [
  { icon: 'payments', title: t('paymentMethodsPage.cash.title'), text: t('paymentMethodsPage.cash.text') },
  { icon: 'credit_card', title: 'Click', text: t('paymentMethodsPage.click.text') },
]);
</script>

<style scoped lang="scss">
.page {
  max-width: 860px;
  padding-block: 56px;
}
.eyebrow {
  color: var(--color-primary);
}
.title {
  margin: var(--stack-sm) 0 var(--stack-md);
}
.intro {
  color: var(--color-on-surface-variant);
  max-width: 560px;
  margin-bottom: var(--section-padding, 40px);
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gutter);
  margin-bottom: var(--section-padding, 40px);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
.card {
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.icon {
  color: var(--color-primary);
  font-size: 28px;
}
.note {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--color-surface-container-low);
  border-radius: var(--radius-lg);
  padding: 18px 20px;

  .material-symbols-outlined {
    color: var(--color-primary);
  }
  p {
    color: var(--color-on-surface-variant);
  }
}
</style>