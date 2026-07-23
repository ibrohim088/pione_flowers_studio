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
      <p
        v-if="product.stock > 0"
        class="label-sm stock-info"
        :class="{ low: product.stock <= 5 }"
      >
        {{ product.stock <= 5 ? $t('product.lowStock', { count: product.stock }) : `${product.stock} ${$t('product.inStock')}` }}
      </p>
      <p v-else class="label-sm stock-info out">{{ $t('product.outOfStock') }}</p>
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
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-primary);
  opacity: 0;
  transition: opacity 0.2s;

  .material-symbols-outlined {
    font-size: 20px;
    line-height: 0;
    transform: translateY(1px);
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
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-primary);
  transition: all 0.2s;
  backdrop-filter: blur(4px);

  .material-symbols-outlined {
    font-size: 20px;
    line-height: 0;
  }

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
  font-size: 15px;
  line-height: 20px;
}
.price-row {
  display: flex;
  flex-wrap: wrap;
  row-gap: 2px;
  column-gap: 6px;
  align-items: baseline;
  color: var(--color-on-surface-variant);
  margin-top: 4px;
  font-size: 14px;
  min-width: 0;
}
.old-price {
  text-decoration: line-through;
  opacity: 0.7;
  font-size: 12px;
  white-space: nowrap;
}
.price {
  color: var(--color-primary);
  font-weight: 600;
  white-space: nowrap;
}
.stock-info {
  margin-top: 2px;
  color: var(--color-on-surface-variant);
  font-size: 12px;
}
.stock-info.low {
  color: var(--color-error, #b3261e);
  font-weight: 600;
}
.stock-info.out {
  color: var(--color-on-surface-variant);
  opacity: 0.7;
}
</style>