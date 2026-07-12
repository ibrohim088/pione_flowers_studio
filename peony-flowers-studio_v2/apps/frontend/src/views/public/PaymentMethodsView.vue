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

    <h2 class="headline-md section-title">{{ $t('paymentMethodsPage.stepsTitle') }}</h2>
    <div class="steps">
      <div v-for="(step, i) in steps" :key="i" class="step">
        <span class="step-num">{{ i + 1 }}</span>
        <div>
          <h4 class="headline-sm">{{ step.title }}</h4>
          <p class="body-md">{{ step.text }}</p>
        </div>
      </div>
    </div>

    <h2 class="headline-md section-title">{{ $t('paymentMethodsPage.faqTitle') }}</h2>
    <div class="faq">
      <details v-for="(item, i) in faq" :key="i" class="faq-item">
        <summary class="body-lg">{{ item.question }}</summary>
        <p class="body-md">{{ item.answer }}</p>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();

const items = computed(() => [
  { icon: 'payments', title: t('paymentMethodsPage.cash.title'), text: t('paymentMethodsPage.cash.text') },
  { icon: 'credit_card', title: t('paymentMethodsPage.click.title'), text: t('paymentMethodsPage.click.text') },
]);

const steps = computed(() => [
  { title: t('paymentMethodsPage.steps.step1.title'), text: t('paymentMethodsPage.steps.step1.text') },
  { title: t('paymentMethodsPage.steps.step2.title'), text: t('paymentMethodsPage.steps.step2.text') },
  { title: t('paymentMethodsPage.steps.step3.title'), text: t('paymentMethodsPage.steps.step3.text') },
  { title: t('paymentMethodsPage.steps.step4.title'), text: t('paymentMethodsPage.steps.step4.text') },
]);

const faq = computed(() => [
  { question: t('paymentMethodsPage.faq.q1.question'), answer: t('paymentMethodsPage.faq.q1.answer') },
  { question: t('paymentMethodsPage.faq.q2.question'), answer: t('paymentMethodsPage.faq.q2.answer') },
  { question: t('paymentMethodsPage.faq.q3.question'), answer: t('paymentMethodsPage.faq.q3.answer') },
  { question: t('paymentMethodsPage.faq.q4.question'), answer: t('paymentMethodsPage.faq.q4.answer') },
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
  margin-bottom: var(--section-padding, 40px);

  .material-symbols-outlined {
    color: var(--color-primary);
  }
  p {
    color: var(--color-on-surface-variant);
  }
}
.section-title {
  margin-bottom: var(--stack-lg, 20px);
}
.steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: var(--section-padding, 40px);
}
.step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.step-num {
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-on-primary, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.faq {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.faq-item {
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: 16px 20px;

  summary {
    cursor: pointer;
    color: var(--color-on-surface);
    font-weight: 500;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }
  }

  p {
    margin-top: 10px;
    color: var(--color-on-surface-variant);
  }
}
</style>