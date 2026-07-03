<script setup lang="ts">
import { Minus, Plus, X } from '@lucide/vue';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../stores/cartStore';
import type { CartItem } from '../../stores/cartStore';

const props = defineProps<{ item: CartItem }>();
const cartStore = useCartStore();
</script>

<template>
  <div class="cart-item">
    <img :src="item.image || '/placeholder.jpg'" :alt="item.title" />
    <div class="details">
      <p class="title">{{ item.title }}</p>
      <p class="price">{{ formatPrice(item.price) }}</p>
    </div>
    <div class="qty">
      <button @click="cartStore.updateQuantity(item.productId, item.quantity - 1)"><Minus :size="14" /></button>
      <span>{{ item.quantity }}</span>
      <button @click="cartStore.updateQuantity(item.productId, item.quantity + 1)"><Plus :size="14" /></button>
    </div>
    <button class="remove" @click="cartStore.removeItem(item.productId)"><X :size="16" /></button>
  </div>
</template>

<style scoped lang="scss">
.cart-item {
  display: flex; align-items: center; gap: 16px;
  padding: 12px 0; border-bottom: 1px solid var(--border);
}
img { width: 64px; height: 64px; border-radius: 8px; object-fit: cover; }
.details { flex: 1; }
.title { font-weight: 600; }
.price { color: var(--accent); }
.qty { display: flex; align-items: center; gap: 8px; }
.qty button {
  width: 28px; height: 28px; border-radius: 50%;
  border: 1px solid var(--border); background: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.remove { border: none; background: none; cursor: pointer; color: var(--danger); display: flex; align-items: center; }
</style>
