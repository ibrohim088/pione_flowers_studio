<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../stores/cartStore';
import { useWishlist } from '../../composables/useWishlist';

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
    <div class="card__image">
      <RouterLink :to="`/product/${product.slug}`">
        <img :src="product.images?.[0]?.url || '/placeholder.jpg'" :alt="product.title" />
      </RouterLink>
      <button class="wishlist-btn" type="button" @click="toggle(product.id)">
        <span
          class="material-symbols-outlined"
          :class="{ filled: isInWishlist(product.id) }"
          >favorite</span
        >
      </button>
      <button
        class="quick-add"
        type="button"
        :disabled="product.stock === 0"
        @click="addToCart"
      >
        <span class="material-symbols-outlined">add_shopping_cart</span>
      </button>
    </div>
    <div class="card__info">
      <RouterLink :to="`/product/${product.slug}`" class="headline-sm title">{{ product.title }}</RouterLink>
      <div class="price-row body-md">
        <span v-if="product.discountPrice" class="old-price">{{ formatPrice(product.price) }}</span>
        <span class="price">{{ formatPrice(product.discountPrice ?? product.price) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: var(--stack-sm);
}
.card__image {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  border: 1px solid var(--color-hairline);
  background: var(--color-surface-container-low);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  &:hover img {
    transform: scale(1.05);
  }
}
.wishlist-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.85);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-primary);
  opacity: 0;
  transition: opacity 0.2s;

  .material-symbols-outlined {
    font-size: 18px;
  }
}
.card__image:hover .wishlist-btn {
  opacity: 1;
}
.quick-add {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-primary);
  transition: all 0.2s;
  backdrop-filter: blur(4px);

  &:hover:not(:disabled) {
    background: var(--color-primary);
    color: white;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
.card__info {
  display: flex;
  flex-direction: column;
  padding-top: 2px;
}
.title {
  color: var(--color-on-surface);
}
.price-row {
  display: flex;
  gap: var(--stack-sm);
  align-items: center;
  color: var(--color-on-surface-variant);
  margin-top: 4px;
}
.old-price {
  text-decoration: line-through;
  opacity: 0.7;
  font-size: 13px;
}
.price {
  color: var(--color-primary);
  font-weight: 600;
}
</style>


<!-- <script setup lang="ts">
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
</style> -->
