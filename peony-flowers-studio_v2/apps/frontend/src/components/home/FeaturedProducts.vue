<script setup lang="ts">
import { onMounted } from 'vue';
import { useProducts } from '../../composables/useProducts';
import ProductGrid from '../catalog/ProductGrid.vue';

const { products, isLoading, fetchProducts } = useProducts();

onMounted(() => fetchProducts({ sort: 'popular', page: 1 }));
</script>

<template>
  <section class="section">
    <h2>Tanlangan mahsulotlar</h2>
    <ProductGrid :products="products" :is-loading="isLoading" />
  </section>
</template>

<style scoped lang="scss">
.section { padding: 48px 32px; }
h2 { margin-bottom: 24px; }
</style>
