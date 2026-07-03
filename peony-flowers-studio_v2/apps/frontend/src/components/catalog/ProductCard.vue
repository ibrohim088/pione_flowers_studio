<script setup lang="ts">
import { Heart } from '@lucide/vue';
import { RouterLink } from 'vue-router';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../stores/cartStore';
import { useWishlist } from '../../composables/useWishlist';
import AppButton from '../ui/AppButton.vue';

const props = defineProps<{ product: any }>();
const cartStore = useCartStore();
const { toggle, isInWishlist } = useWishlist();

function addToCart() {
  cartStore.addItem({
    productId: props.product.id,
    title: props.product.title,
    slug: props.product.slug,
    price: props.product.discountPrice ?? props.product.price,
    image: props.product.images?.[0]?.url,
  });
}
</script>

<template>
  <div class="card">
    <RouterLink :to="`/product/${product.slug}`">
      <img :src="product.images?.[0]?.url || '/placeholder.jpg'" :alt="product.title" />
    </RouterLink>
    <button class="wishlist-btn" @click="toggle(product.id)">
      <Heart
        :size="16"
        :fill="isInWishlist(product.id) ? 'currentColor' : 'none'"
        :class="{ 'wishlist-active': isInWishlist(product.id) }"
      />
    </button>
    <div class="info">
      <RouterLink :to="`/product/${product.slug}`" class="title">{{ product.title }}</RouterLink>
      <div class="price-row">
        <span v-if="product.discountPrice" class="old-price">{{ formatPrice(product.price) }}</span>
        <span class="price">{{ formatPrice(product.discountPrice ?? product.price) }}</span>
      </div>
      <AppButton :disabled="product.stock === 0" @click="addToCart">
        {{ product.stock === 0 ? "Sotuvda yo'q" : "Savatga qo'shish" }}
      </AppButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-primary);
}
img { width: 100%; aspect-ratio: 1; object-fit: cover; }
.wishlist-btn {
  position: absolute; top: 10px; right: 10px;
  background: white; border: none; border-radius: 50%;
  width: 32px; height: 32px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary);
}
.wishlist-active { color: var(--danger); }
.info { padding: 14px; display: flex; flex-direction: column; gap: 8px; }
.title { font-weight: 600; }
.price-row { display: flex; gap: 8px; align-items: center; }
.old-price { text-decoration: line-through; color: var(--text-secondary); font-size: 13px; }
.price { color: var(--accent); font-weight: 700; }
</style>
