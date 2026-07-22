<script setup lang="ts">
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../stores/cartStore';

const props = defineProps<{ item: any }>();
const cartStore = useCartStore();

function inc() {
  cartStore.updateQuantity(props.item.productId, props.item.quantity + 1);
}
function dec() {
  if (props.item.quantity > 1) cartStore.updateQuantity(props.item.productId, props.item.quantity - 1);
}
</script>

<template>
  <div class="cart-item">
    <div class="image">
      <img :src="item.image || '/placeholder.jpg'" :alt="item.title" />
    </div>
    <div class="info">
      <RouterLink :to="`/product/${item.slug}`" class="body-md title">{{ item.title }}</RouterLink>
      <p class="body-md price">{{ formatPrice(item.price) }}</p>
    </div>
    <div class="qty">
      <button type="button" @click="dec">
        <span class="material-symbols-outlined">remove</span>
      </button>
      <span class="label-sm">{{ item.quantity }}</span>
      <button type="button" @click="inc">
        <span class="material-symbols-outlined">add</span>
      </button>
    </div>
    <p class="body-md subtotal">{{ formatPrice(item.price * item.quantity) }}</p>
    <button class="remove" type="button" @click="cartStore.removeItem(item.productId)">
      <span class="material-symbols-outlined">delete</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  align-items: center;
  gap: var(--stack-md);
  padding-block: var(--stack-md);
  border-bottom: 1px solid var(--color-hairline);
}
.image {
  width: 80px;
  height: 96px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface-container-low);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.title {
  color: var(--color-on-surface);
  font-weight: 600;
}
.price {
  color: var(--color-on-surface-variant);
}
.qty {
  display: flex;
  align-items: center;
  gap: var(--stack-sm);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-full);
  padding: 4px 8px;

  button {
    background: none;
    border: none;
    display: flex;
    cursor: pointer;
    color: var(--color-on-surface-variant);

    .material-symbols-outlined {
      font-size: 18px;
    }
    &:hover {
      color: var(--color-primary);
    }
  }
}
.subtotal {
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
}
.remove {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-on-surface-variant);
  display: flex;

  &:hover {
    color: var(--color-error);
  }
}
</style>


<!-- <script setup lang="ts">
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
</style> -->
