<script setup lang="ts">
import AppBadge from '../ui/AppBadge.vue';

const props = defineProps<{ status: string }>();

const map: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' }> = {
  pending: { label: 'Kutilmoqda', variant: 'warning' },
  pending_cash: { label: 'Naqd (kutilmoqda)', variant: 'warning' },
  paid: { label: "To'landi", variant: 'success' },
  failed: { label: 'Xato', variant: 'danger' },
  refunded: { label: 'Qaytarildi', variant: 'info' },
};
</script>

<template>
  <AppBadge :variant="map[status]?.variant || 'info'">{{ map[status]?.label || status }}</AppBadge>
</template>
