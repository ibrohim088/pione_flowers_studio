<script setup lang="ts">
import { useCartStore } from '../../stores/cartStore';
import CartItem from '../../components/cart/CartItem.vue';
import CartSummary from '../../components/cart/CartSummary.vue';

const cartStore = useCartStore();
</script>

<template>
  <div class="cart-page">
    <h1>Savatcha</h1>
    <p v-if="!cartStore.items.length" class="empty">Savatchangiz bo'sh</p>
    <div v-else class="layout">
      <div class="items">
        <CartItem v-for="item in cartStore.items" :key="item.productId" :item="item" />
      </div>
      <CartSummary />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-page { padding: 32px; }
.layout { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; margin-top: 24px; }
.empty { color: var(--text-secondary); }
</style>
