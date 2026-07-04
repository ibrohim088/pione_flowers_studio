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
  <div class="account-layout container">
    <AccountSidebar />
    <div class="content">
      <h1 class="headline-md">{{ $t('account.orders.title') }}</h1>
      <AppSpinner v-if="isLoading" />
      <p v-else-if="!orders.length" class="body-md empty">{{ $t('account.orders.empty') }}</p>
      <div v-else class="orders-list">
        <OrderCard v-for="order in orders" :key="order.id" :order="order" />
      </div>
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
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);
}
.empty {
  color: var(--color-on-surface-variant);
}
.orders-list {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
}
</style>