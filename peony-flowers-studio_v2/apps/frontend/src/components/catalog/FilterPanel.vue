<script setup lang="ts">
import AppSelect from '../ui/AppSelect.vue';
import AppInput from '../ui/AppInput.vue';

const filters = defineModel<{
  categoryId: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}>({ default: () => ({ categoryId: '', minPrice: '', maxPrice: '', sort: 'newest' }) });

const sortOptions = [
  { label: 'Yangilar', value: 'newest' },
  { label: 'Narx: pastdan', value: 'price_low' },
  { label: 'Narx: yuqoridan', value: 'price_high' },
  { label: 'Ommabop', value: 'popular' },
];
</script>

<template>
  <div class="filters">
    <AppInput v-model="filters.minPrice" label="Min narx" placeholder="0" />
    <AppInput v-model="filters.maxPrice" label="Max narx" placeholder="1000000" />
    <AppSelect v-model="filters.sort" label="Saralash" :options="sortOptions" />
  </div>
</template>

<style scoped lang="scss">
.filters { display: flex; flex-direction: column; gap: 16px; }
</style>
