<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '../../composables/useProducts';
import { useCategories } from '../../composables/useCategories';
import { useUiStore } from '../../stores/uiStore';
import ProductGrid from '../../components/catalog/ProductGrid.vue';
import FilterPanel from '../../components/catalog/FilterPanel.vue';
import { debounce } from '../../lib/utils';

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const { products, isLoading, fetchProducts } = useProducts();
const { categories, fetchCategories } = useCategories();

const initialSearch = (route.query.search as string) || uiStore.searchQuery || '';

let filters = reactive({
  categoryId: '',
  minPrice: '',
  maxPrice: '',
  sort: 'newest',
  search: initialSearch,
});

const applyFilters = debounce(() => {
  fetchProducts({
    categoryId: filters.categoryId || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    sort: filters.sort as any,
    search: filters.search || undefined,
  });
}, 400);

watch(filters, applyFilters, { deep: true });

// URL'dagi ?search= o'zgarganda (masalan navbardan qidiruv orqali) filtrni yangilaymiz
watch(
  () => route.query.search,
  (newSearch) => {
    const value = (newSearch as string) || '';
    if (value !== filters.search) {
      filters.search = value;
    }
  }
);

// Foydalanuvchi filtr panelidan search'ni o'zgartirsa, URL va uiStore bilan ham sinxronlaymiz
watch(
  () => filters.search,
  (value) => {
    uiStore.setSearchQuery(value);
    router.replace({ path: '/catalog', query: { ...route.query, search: value || undefined } });
  }
);

onMounted(() => {
  fetchProducts({ search: initialSearch || undefined });
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