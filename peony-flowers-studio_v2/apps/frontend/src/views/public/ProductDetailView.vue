<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProduct } from '../../composables/useProduct';
import { useReviews } from '../../composables/useReviews';
import { useCartStore } from '../../stores/cartStore';
import { formatPrice } from '../../lib/utils';
import ProductGallery from '../../components/catalog/ProductGallery.vue';
import ReviewList from '../../components/reviews/ReviewList.vue';
import ReviewForm from '../../components/reviews/ReviewForm.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const route = useRoute();
const { product, isLoading, fetchBySlug } = useProduct();
const { reviews, fetchByProduct, submitReview } = useReviews();
const cartStore = useCartStore();

async function load() {
  await fetchBySlug(route.params.slug as string);
  if (product.value) await fetchByProduct(product.value.id);
}

onMounted(load);
watch(() => route.params.slug, load);

function addToCart() {
  if (!product.value) return;
  cartStore.addItem({
    productId: product.value.id,
    title: product.value.title,
    slug: product.value.slug,
    price: product.value.discountPrice ?? product.value.price,
    image: product.value.images?.[0]?.url,
  });
}

async function handleReview(rating: number, comment: string) {
  if (!product.value) return;
  await submitReview(product.value.id, rating, comment);
}
</script>

<template>
  <AppSpinner v-if="isLoading" />
  <div v-else-if="product" class="detail">
    <ProductGallery :images="product.images" />
    <div class="info">
      <h1>{{ product.title }}</h1>
      <p class="category">{{ product.category?.name }}</p>
      <div class="price">
        <span v-if="product.discountPrice" class="old">{{ formatPrice(product.price) }}</span>
        {{ formatPrice(product.discountPrice ?? product.price) }}
      </div>
      <p class="description">{{ product.description }}</p>
      <AppButton :disabled="product.stock === 0" @click="addToCart">
        {{ product.stock === 0 ? "Sotuvda yo'q" : "Savatga qo'shish" }}
      </AppButton>
    </div>
    <div class="reviews-section">
      <h2>Sharhlar</h2>
      <ReviewForm @submit="handleReview" />
      <ReviewList :reviews="reviews" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 32px;
}
.old { text-decoration: line-through; color: var(--text-secondary); margin-right: 8px; }
.price { font-size: 24px; font-weight: 700; color: var(--accent); margin: 12px 0; }
.reviews-section { grid-column: 1 / -1; margin-top: 32px; }
</style>
