<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { formatPrice, formatDate } from '../../lib/utils';
import AppBadge from '../ui/AppBadge.vue';

const { t } = useI18n();
defineProps<{ order: any }>();

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'warning',
  confirmed: 'info',
  preparing: 'info',
  ready: 'info',
  delivering: 'info',
  delivered: 'success',
  cancelled: 'danger',
};
const statusMap = computed(() =>
  Object.fromEntries(
    Object.entries(statusVariants).map(([key, variant]) => [key, { label: t(`orderStatus.${key}`), variant }])
  )
);
</script>

<template>
  <RouterLink :to="`/account/orders/${order.id}`" class="order-card">
    <div class="row">
      <span class="body-md id">{{ $t('account.orderDetail.title') }} #{{ order.id.slice(-8) }}</span>
      <AppBadge :variant="statusMap[order.status]?.variant || 'info'">
        {{ statusMap[order.status]?.label || order.status }}
      </AppBadge>
    </div>
    <p class="label-sm date">{{ formatDate(order.createdAt) }}</p>
    <div class="row">
      <span class="label-sm items-count">{{ order.items?.length || 0 }} {{ $t('account.orders.itemsCount') }}</span>
      <span class="body-md total">{{ formatPrice(order.total) }}</span>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.order-card {
  display: flex;
  flex-direction: column;
  gap: var(--stack-sm);
  padding: var(--stack-lg);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface-container-lowest);
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--color-outline);
  }
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.id {
  font-weight: 700;
}
.date {
  color: var(--color-on-surface-variant);
}
.items-count {
  color: var(--color-on-surface-variant);
}
.total {
  font-weight: 700;
  color: var(--color-primary);
}
</style>