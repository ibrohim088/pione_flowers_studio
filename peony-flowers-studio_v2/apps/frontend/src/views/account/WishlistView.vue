<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../../lib/api';
import AccountSidebar from '../../components/layout/AccountSidebar.vue';
import ProductGrid from '../../components/catalog/ProductGrid.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const products = ref<any[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    const { data } = await api.get('/wishlist');
    products.value = data.data.map((i: any) => i.product);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="account-layout container">
    <AccountSidebar />
    <div class="content">
      <h1 class="headline-md">{{ $t('account.wishlist.title') }}</h1>
      <AppSpinner v-if="isLoading" />
      <p v-else-if="!products.length">{{ $t('account.wishlist.empty') }}</p>
      <ProductGrid v-else :products="products" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-layout {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  padding-block: var(--stack-lg) var(--section-padding);

  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.content {
  flex: 1;
  min-width: 0;
}
</style>