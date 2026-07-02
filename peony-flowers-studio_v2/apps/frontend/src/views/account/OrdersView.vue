<script setup lang="ts">
import { onMounted } from 'vue';
import { useOrders } from '../../composables/useOrders';
import AccountSidebar from '../../components/layout/AccountSidebar.vue';
import OrderCard from '../../components/account/OrderCard.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { orders, isLoading, fetchOrders } = useOrders();
onMounted(fetchOrders);
</script>

<template>
  <div class="account-layout">
    <AccountSidebar />
    <div class="content">
      <h1>Buyurtmalarim</h1>
      <AppSpinner v-if="isLoading" />
      <p v-else-if="!orders.length">Hozircha buyurtmalar yo'q</p>
      <div v-else class="orders-list">
        <OrderCard v-for="order in orders" :key="order.id" :order="order" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; padding: 32px; }
.orders-list { display: flex; flex-direction: column; gap: 12px; }
</style>
