<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { formatPrice, formatDate } from '../../lib/utils';
import AppBadge from '../ui/AppBadge.vue';

defineProps<{ order: any }>();

const statusMap: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' }> = {
  pending: { label: 'Kutilmoqda', variant: 'warning' },
  confirmed: { label: 'Tasdiqlandi', variant: 'info' },
  preparing: { label: 'Tayyorlanmoqda', variant: 'info' },
  ready: { label: 'Tayyor', variant: 'info' },
  delivering: { label: 'Yetkazilmoqda', variant: 'info' },
  delivered: { label: 'Yetkazildi', variant: 'success' },
  cancelled: { label: 'Bekor qilindi', variant: 'danger' },
};
</script>

<template>
  <RouterLink :to="`/account/orders/${order.id}`" class="order-card">
    <div class="row">
      <span class="id">#{{ order.id.slice(-8) }}</span>
      <AppBadge :variant="statusMap[order.status]?.variant || 'info'">
        {{ statusMap[order.status]?.label || order.status }}
      </AppBadge>
    </div>
    <p class="date">{{ formatDate(order.createdAt) }}</p>
    <p class="total">{{ formatPrice(order.total) }}</p>
  </RouterLink>
</template>

<style scoped lang="scss">
.order-card {
  display: block;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
}
.row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.id { font-weight: 600; }
.date { color: var(--text-secondary); font-size: 13px; }
.total { font-weight: 700; color: var(--accent); }
</style>
