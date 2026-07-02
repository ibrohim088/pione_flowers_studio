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
  <div class="account-layout">
    <AccountSidebar />
    <div class="content">
      <h1>Sevimlilar</h1>
      <AppSpinner v-if="isLoading" />
      <p v-else-if="!products.length">Sevimlilar ro'yxati bo'sh</p>
      <ProductGrid v-else :products="products" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; padding: 32px; }
</style>
