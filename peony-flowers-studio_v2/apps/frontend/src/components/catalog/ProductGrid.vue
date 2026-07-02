<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import AppSkeleton from '../ui/AppSkeleton.vue';

defineProps<{ products: any[]; isLoading?: boolean }>();
</script>

<template>
  <div class="grid">
    <template v-if="isLoading">
      <AppSkeleton v-for="i in 8" :key="i" height="320px" />
    </template>
    <ProductCard v-else v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
</style>
