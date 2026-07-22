<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import AppSkeleton from '../ui/AppSkeleton.vue';

withDefaults(defineProps<{ products: any[]; isLoading?: boolean; columns?: 2 | 3 | 4 }>(), {
  columns: 3,
});
</script>

<template>
  <div class="grid" :class="`grid--${columns}`">
    <template v-if="isLoading">
      <AppSkeleton v-for="i in columns * 2" :key="i" height="320px" />
    </template>
    <template v-else-if="products.length">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </template>
    <p v-else class="empty body-md">{{ $t('catalog.empty') }}</p>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gutter);

  &--3 {
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  &--4 {
    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
.empty {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--color-on-surface-variant);
  padding: var(--stack-lg) 0;
}
</style>