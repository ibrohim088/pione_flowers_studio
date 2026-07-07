<template>
  <div class="page container">
    <template v-if="isLoading && !content">
      <AppSpinner />
    </template>

    <template v-else-if="content">
      <span class="label-caps eyebrow">{{ $t('about.title') }}</span>
      <h1 class="display-md title">{{ content.title }}</h1>
      <p class="body-lg intro">{{ content.intro }}</p>

      <div v-if="content.foundedYear || content.customersCount" class="stats">
        <div v-if="content.foundedYear" class="stat">
          <span class="stat-value display-sm">{{ content.foundedYear }}</span>
          <span class="stat-label body-md">{{ $t('about.foundedYear') }}</span>
        </div>
        <div v-if="content.customersCount" class="stat">
          <span class="stat-value display-sm">{{ formattedCustomersCount }}+</span>
          <span class="stat-label body-md">{{ $t('about.customersCount') }}</span>
        </div>
      </div>

      <section v-if="content.services?.length" class="section">
        <h2 class="headline-sm section-title">{{ $t('about.servicesTitle') }}</h2>
        <div class="grid">
          <div v-for="(service, i) in content.services" :key="i" class="card">
            <span class="material-symbols-outlined icon">local_florist</span>
            <p class="body-md">{{ service }}</p>
          </div>
        </div>
      </section>

      <section v-if="content.values?.length" class="section">
        <h2 class="headline-sm section-title">{{ $t('about.valuesTitle') }}</h2>
        <div class="values">
          <span v-for="(value, i) in content.values" :key="i" class="value-chip body-md">{{ value }}</span>
        </div>
      </section>
    </template>

    <template v-else>
      <p class="body-md error">{{ $t('about.loadError') }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useContentStore, type AboutContent } from '../../stores/contentStore';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { locale } = useI18n();
const contentStore = useContentStore();

const content = computed<AboutContent | null>(
  () => (contentStore.cache[`about:${locale.value}`] as AboutContent) ?? null
);
const isLoading = computed(() => contentStore.isLoading('about', locale.value));

function load() {
  contentStore.fetchContent<AboutContent>('about', locale.value);
}

onMounted(load);
watch(locale, load);

const formattedCustomersCount = computed(() =>
  content.value?.customersCount ? new Intl.NumberFormat('uz-UZ').format(content.value.customersCount) : ''
);
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
  max-width: 640px;
  white-space: pre-line;
}

.stats {
  display: flex;
  gap: var(--gutter);
  margin-block: var(--stack-lg);
  flex-wrap: wrap;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 2px solid var(--color-primary);
  padding-left: 16px;
}
.stat-value {
  color: var(--color-on-surface);
}
.stat-label {
  color: var(--color-on-surface-variant);
}

.section {
  margin-top: var(--section-padding, 40px);
}
.section-title {
  margin-bottom: var(--stack-md);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gutter);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
.card {
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;

  .icon {
    color: var(--color-primary);
    font-size: 22px;
    flex-shrink: 0;
  }
  p {
    color: var(--color-on-surface);
  }
}

.values {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.value-chip {
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-full);
  padding: 8px 18px;
  color: var(--color-on-surface);
}

.error {
  color: var(--color-on-surface-variant);
}
</style>
