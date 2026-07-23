<script setup lang="ts">
const filters = defineModel<{
  categoryId: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  search?: string;
}>({ default: () => ({ categoryId: '', minPrice: '', maxPrice: '', sort: 'newest', search: '' }) });

defineProps<{ categories?: { id: string; name: string }[] }>();

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const sortOptions = computed(() => [
  { label: t('catalog.filters.newest'), value: 'newest' },
  { label: t('catalog.filters.priceLow'), value: 'price_low' },
  { label: t('catalog.filters.priceHigh'), value: 'price_high' },
  { label: t('catalog.filters.popular'), value: 'popular' },
]);
</script>

<template>
  <div class="filters">
    <h2 class="label-caps title">{{ $t('catalog.filters.title') }}</h2>

    <div class="group">
      <label class="label-caps">{{ $t('nav.searchPlaceholder') }}</label>
      <input v-model="filters.search" type="text" :placeholder="$t('nav.searchPlaceholder')" />
    </div>

    <div class="group">
      <label class="label-caps">{{ $t('catalog.filters.sort') }}</label>
      <div class="select-wrap">
        <select v-model="filters.sort">
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
        <span class="material-symbols-outlined chevron">expand_more</span>
      </div>
    </div>

    <div class="group">
      <label class="label-caps">{{ $t('catalog.filters.priceRange') }}</label>
      <div class="range">
        <input v-model="filters.minPrice" type="number" :placeholder="$t('catalog.filters.min')" />
        <span class="dash">—</span>
        <input v-model="filters.maxPrice" type="number" :placeholder="$t('catalog.filters.max')" />
      </div>
    </div>

    <div v-if="categories?.length" class="group">
      <label class="label-caps">{{ $t('catalog.filters.categories') }}</label>
      <div class="chips">
        <button type="button" class="chip label-sm" :class="{ 'chip--active': !filters.categoryId }"
          @click="filters.categoryId = ''">
          {{ $t('catalog.filters.all') }}
        </button>
        <button v-for="cat in categories" :key="cat.id" type="button" class="chip label-sm"
          :class="{ 'chip--active': filters.categoryId === cat.id }" @click="filters.categoryId = cat.id">
          {{ cat.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters {
  background: var(--color-surface-container-lowest);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: var(--stack-md);
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);
}

.title {
  color: var(--color-on-surface-variant);
}

.group {
  display: flex;
  flex-direction: column;
  gap: var(--unit);
}

label {
  color: var(--color-on-surface-variant);
  display: block;
}

.select-wrap {
  position: relative;
}

select,
input {
  width: 100%;
  background: transparent;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: 12px;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-on-surface);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}

select {
  appearance: none;
  padding-right: 36px;
}

.chevron {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-on-surface-variant);
  pointer-events: none;
}

.range {
  display: flex;
  align-items: center;
  gap: var(--unit);

  .dash {
    color: var(--color-outline);
  }
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  background: var(--color-surface-container-low);
  color: var(--color-on-surface-variant);
  border: none;
  border-radius: var(--radius-full);
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--color-surface-container-high);
  }

  &--active {
    background: var(--color-surface-container-high);
    color: var(--color-primary);
  }
}
</style>