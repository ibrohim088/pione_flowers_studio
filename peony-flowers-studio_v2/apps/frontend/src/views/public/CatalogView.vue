<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { useProducts } from '../../composables/useProducts';
import ProductGrid from '../../components/catalog/ProductGrid.vue';
import FilterPanel from '../../components/catalog/FilterPanel.vue';
import { debounce } from '../../lib/utils';

const { products, isLoading, fetchProducts } = useProducts();

const filters = reactive({ categoryId: '', minPrice: '', maxPrice: '', sort: 'newest' });

const applyFilters = debounce(() => {
  fetchProducts({
    categoryId: filters.categoryId || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    sort: filters.sort as any,
  });
}, 400);

watch(filters, applyFilters, { deep: true });
onMounted(() => fetchProducts());
</script>

<template>
  <div class="catalog">
    <aside>
      <FilterPanel v-model="filters" />
    </aside>
    <div class="content">
      <h1>Katalog</h1>
      <ProductGrid :products="products" :is-loading="isLoading" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.catalog { display: grid; grid-template-columns: 240px 1fr; gap: 32px; padding: 32px; }
</style>
