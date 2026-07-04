<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrder } from '../../composables/useOrder';
import { useOrders } from '../../composables/useOrders';
import { formatPrice, formatDate } from '../../lib/utils';
import AccountSidebar from '../../components/layout/AccountSidebar.vue';
import PaymentStatusBadge from '../../components/payment/PaymentStatusBadge.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const route = useRoute();
const { order, isLoading, fetchById } = useOrder();
const { cancelOrder } = useOrders();

onMounted(() => fetchById(route.params.id as string));

async function handleCancel() {
  if (!order.value) return;
  await cancelOrder(order.value.id);
  await fetchById(order.value.id);
}
</script>

<template>
  <div class="account-layout container">
    <AccountSidebar />
    <div class="content">
      <AppSpinner v-if="isLoading" />
      <template v-else-if="order">
        <h1 class="headline-md">{{ $t('account.orderDetail.title') }} #{{ order.id.slice(-8) }}</h1>
        <p>{{ formatDate(order.createdAt) }}</p>
        <PaymentStatusBadge :status="order.paymentStatus" />

        <div class="items">
          <div v-for="item in order.items" :key="item.id" class="item">
            <span>{{ item.product.title }} × {{ item.quantity }}</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
        </div>

        <div class="total">{{ $t('account.orderDetail.total') }}: {{ formatPrice(order.total) }}</div>

        <AppButton v-if="order.status === 'pending'" variant="danger" @click="handleCancel">
          {{ $t('account.orderDetail.cancel') }}
        </AppButton>
      </template>
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
.items { margin: 20px 0; display: flex; flex-direction: column; gap: 8px; }
.item { display: flex; justify-content: space-between; }
.total { font-size: 18px; font-weight: 700; color: var(--accent); margin-bottom: 16px; }
</style>