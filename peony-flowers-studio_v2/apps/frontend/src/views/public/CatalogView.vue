<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { useProducts } from '../../composables/useProducts';
import { useCategories } from '../../composables/useCategories';
import ProductGrid from '../../components/catalog/ProductGrid.vue';
import FilterPanel from '../../components/catalog/FilterPanel.vue';
import { debounce } from '../../lib/utils';

const { products, isLoading, fetchProducts } = useProducts();
const { categories, fetchCategories } = useCategories();

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
onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<template>
  <div class="catalog container">
    <header class="page-header">
      <h1 class="display-lg">{{ $t('catalog.title') }}</h1>
      <div class="underline" />
    </header>

    <div class="layout">
      <aside class="sidebar">
        <FilterPanel v-model="filters" :categories="categories" />
      </aside>

      <section class="content">
        <ProductGrid :products="products" :is-loading="isLoading" :columns="3" />
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.catalog {
  padding-block: var(--stack-lg);
}

.page-header {
  margin-bottom: var(--section-padding);
}

.underline {
  width: 96px;
  height: 1px;
  background: var(--color-primary);
  opacity: 0.3;
  margin-top: var(--stack-sm);
}

.layout {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.sidebar {
  width: 100%;

  @media (min-width: 768px) {
    width: 25%;
    position: sticky;
    top: 100px;
  }
}

.content {
  width: 100%;

  @media (min-width: 768px) {
    width: 75%;
  }
}
</style>