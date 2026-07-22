<script setup lang="ts">
import { formatPrice } from '../../lib/utils';

defineProps<{ subtotal: number; deliveryFee?: number; discount?: number }>();
</script>

<template>
  <div class="summary">
    <h2 class="headline-sm">{{ $t('cart.summaryTitle') }}</h2>
    <div class="row body-md">
      <span>{{ $t('cart.productsPrice') }}</span>
      <span>{{ formatPrice(subtotal) }}</span>
    </div>
    <div class="row body-md">
      <span>{{ $t('cart.delivery') }}</span>
      <span>{{ deliveryFee ? formatPrice(deliveryFee) : $t('cart.free') }}</span>
    </div>
    <div v-if="discount" class="row body-md discount">
      <span>{{ $t('cart.discount') }}</span>
      <span>-{{ formatPrice(discount) }}</span>
    </div>
    <div class="divider" />
    <div class="row total headline-sm">
      <span>{{ $t('cart.total') }}</span>
      <span>{{ formatPrice(subtotal + (deliveryFee || 0) - (discount || 0)) }}</span>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.summary {
  background: var(--color-surface-container-lowest);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: var(--stack-lg);
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
}
.row {
  display: flex;
  justify-content: space-between;
  color: var(--color-on-surface-variant);
}
.discount {
  color: var(--color-secondary);
}
.divider {
  height: 1px;
  background: var(--color-hairline);
}
.total {
  color: var(--color-on-surface);
  font-weight: 700;

  span:last-child {
    color: var(--color-primary);
  }
}
</style>