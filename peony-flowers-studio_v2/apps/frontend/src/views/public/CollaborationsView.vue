<template>
  <div class="page container">
    <span class="label-caps eyebrow">{{ $t('collaborations.eyebrow') }}</span>
    <h1 class="display-md title">{{ $t('collaborations.title') }}</h1>
    <p class="body-lg intro">{{ $t('collaborations.intro') }}</p>

    <div class="grid">
      <div v-for="item in items" :key="item.icon" class="card">
        <span class="material-symbols-outlined icon">{{ item.icon }}</span>
        <h3 class="headline-sm">{{ item.title }}</h3>
        <p class="body-md">{{ item.text }}</p>
      </div>
    </div>

    <div class="cta">
      <p class="body-md">{{ $t('collaborations.ctaText') }}</p>
      <a class="btn" href="https://t.me/peony_floboutique" target="_blank" rel="noopener">
        {{ $t('collaborations.ctaButton') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const items = computed(() => [
  { icon: 'diversity_3', title: t('collaborations.influencer.title'), text: t('collaborations.influencer.text') },
  { icon: 'storefront', title: t('collaborations.brand.title'), text: t('collaborations.brand.text') },
  { icon: 'celebration', title: t('collaborations.event.title'), text: t('collaborations.event.text') },
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

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
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
.cta {
  border-top: 1px solid var(--color-hairline);
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: var(--radius-full, 999px);
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-weight: 600;
  font-size: 14px;
  transition: opacity 0.18s;

  &:hover {
    opacity: 0.9;
  }
}
</style>

<!-- <template>
  <div class="page container">
    <span class="label-caps eyebrow">{{ $t('collaborations.eyebrow') }}</span>
    <h1 class="display-md title">{{ $t('collaborations.title') }}</h1>
    <p class="body-lg intro">{{ $t('collaborations.intro') }}</p>

    <div class="grid">
      <div v-for="item in items" :key="item.icon" class="card">
        <span class="material-symbols-outlined icon">{{ item.icon }}</span>
        <h3 class="headline-sm">{{ item.title }}</h3>
        <p class="body-md">{{ item.text }}</p>
      </div>
    </div>

    <div class="cta">
      <p class="body-md">{{ $t('collaborations.ctaText') }}</p>
      <a class="btn" href="https://t.me/peony_floboutique" target="_blank" rel="noopener">
        {{ $t('collaborations.ctaButton') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const items = computed(() => [
  { icon: 'diversity_3', title: t('collaborations.influencer.title'), text: t('collaborations.influencer.text') },
  { icon: 'storefront', title: t('collaborations.brand.title'), text: t('collaborations.brand.text') },
  { icon: 'celebration', title: t('collaborations.event.title'), text: t('collaborations.event.text') },
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

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
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
.cta {
  border-top: 1px solid var(--color-hairline);
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: var(--radius-full, 999px);
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  transition: opacity 0.18s;

  &:hover {
    opacity: 0.9;
  }
}
</style> -->