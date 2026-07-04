<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useProducts } from '../../composables/useProducts';
import ProductGrid from '../catalog/ProductGrid.vue';

const { products, isLoading, fetchProducts } = useProducts();

onMounted(() => fetchProducts({ sort: 'popular', page: 1 }));
</script>

<template>
  <section class="section container">
    <div class="section__header">
      <h2 class="headline-md">{{ $t('home.featured.title') }}</h2>
      <RouterLink to="/catalog" class="label-caps view-all">{{ $t('home.featured.viewAll') }}</RouterLink>
    </div>
    <ProductGrid :products="products" :is-loading="isLoading" :columns="4" />
  </section>
</template>

<style scoped lang="scss">
.section {
  padding-block: var(--section-padding);
}
.section__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--stack-lg);
}
.view-all {
  color: var(--color-primary);
  border-bottom: 1px solid var(--color-primary);
  padding-bottom: 2px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
}
</style>