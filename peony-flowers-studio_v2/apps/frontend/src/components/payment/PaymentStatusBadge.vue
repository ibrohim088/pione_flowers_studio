<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import AppBadge from '../ui/AppBadge.vue';

const { t } = useI18n();
const props = defineProps<{ status: string }>();

const variants: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'warning',
  pending_cash: 'warning',
  paid: 'success',
  failed: 'danger',
  refunded: 'info',
};
const map = computed(() =>
  Object.fromEntries(
    Object.entries(variants).map(([key, variant]) => [key, { label: t(`paymentStatus.${key}`), variant }])
  )
);
</script>

<template>
  <AppBadge :variant="map[status]?.variant || 'info'">{{ map[status]?.label || status }}</AppBadge>
</template>