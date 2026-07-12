<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useOrders } from '../../composables/useOrders';
import OrderCard from '../../components/account/OrderCard.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';
import AppSelect from '../../components/ui/AppSelect.vue';

const { t } = useI18n();
const { orders, isLoading, fetchOrders } = useOrders();
onMounted(fetchOrders);

const STATUSES = ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled'] as const;

const activeStatus = ref<string>('all');

const filters = computed(() => [
  { value: 'all', label: t('account.orders.all') },
  ...STATUSES.map((status) => ({ value: status, label: t(`orderStatus.${status}`) })),
]);

const filteredOrders = computed(() => {
  if (activeStatus.value === 'all') return orders.value;
  return orders.value.filter((order) => order.status === activeStatus.value);
});
</script>

<template>

  <div class="filters">
    <h1 class="headline-md">{{ $t('account.orders.title') }}</h1>

    <AppSelect v-model="activeStatus" :options="filters" />
  </div>

  <AppSpinner v-if="isLoading" />
  <p v-else-if="!orders.length" class="body-md empty">{{ $t('account.orders.empty') }}</p>
  <p v-else-if="!filteredOrders.length" class="body-md empty">{{ $t('account.orders.emptyFiltered') }}</p>
  <div v-else class="orders-list">
    <OrderCard v-for="order in filteredOrders" :key="order.id" :order="order" />
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--stack-md);
}

.empty {
  color: var(--color-on-surface-variant);
  margin-top: var(--stack-md);
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
  margin-top: var(--stack-lg);
}
</style>