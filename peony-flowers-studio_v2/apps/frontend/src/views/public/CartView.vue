<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../../stores/cartStore';
import CartItem from '../../components/cart/CartItem.vue';
import CartSummary from '../../components/cart/CartSummary.vue';
import AppButton from '../../components/ui/AppButton.vue';

const cartStore = useCartStore();
const subtotal = computed(() => cartStore.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
</script>

<template>
  <div class="cart container">
    <h1 class="display-lg">{{ $t('cart.title') }}</h1>

    <div v-if="!cartStore.items.length" class="empty">
      <span class="material-symbols-outlined">shopping_cart</span>
      <p class="body-md">{{ $t('cart.empty') }}</p>
      <RouterLink to="/catalog">
        <AppButton>{{ $t('cart.goToCatalog') }}</AppButton>
      </RouterLink>
    </div>

    <div v-else class="layout">
      <div class="items">
        <CartItem v-for="item in cartStore.items" :key="item.productId" :item="item" />
      </div>
      <div class="summary-col">
        <CartSummary :subtotal="subtotal">
          <RouterLink to="/checkout">
            <AppButton style="width: 100%">{{ $t('cart.checkout') }}</AppButton>
          </RouterLink>
        </CartSummary>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart {
  padding-block: var(--stack-lg) var(--section-padding);
}
h1 {
  margin-bottom: var(--stack-lg);
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--stack-md);
  padding: var(--section-padding) 0;
  color: var(--color-on-surface-variant);

  .material-symbols-outlined {
    font-size: 48px;
    opacity: 0.4;
  }
}
.layout {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
}
.items {
  flex: 1;
}
.summary-col {
  width: 100%;

  @media (min-width: 768px) {
    width: 360px;
    position: sticky;
    top: 100px;
  }
}
</style>