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

const avgRating = 4.8;
</script>

<template>
  <AppSpinner v-if="isLoading" />
  <div v-else-if="product" class="detail container">
    <div class="grid">
      <div class="gallery-col">
        <ProductGallery :images="product.images || []" />
      </div>
      <div class="info-col">
        <span class="label-caps eyebrow">{{ product.category?.name || $t('product.premiumBadge') }}</span>
        <h1 class="display-lg">{{ product.title }}</h1>
        <p class="price body-lg">{{ formatPrice(product.discountPrice ?? product.price) }}</p>

        <div class="description-block">
          <p class="body-md description">{{ product.description }}</p>
          <ul class="perks">
            <li class="label-sm">
              <span class="material-symbols-outlined">local_shipping</span>
              {{ $t('product.deliveryPerk') }}
            </li>
            <li class="label-sm">
              <span class="material-symbols-outlined">workspace_premium</span>
              {{ $t('product.qualityPerk') }}
            </li>
          </ul>
        </div>

        <div class="actions">
          <button class="btn-primary" :disabled="product.stock === 0" @click="addToCart">
            {{ product.stock === 0 ? $t('product.outOfStock') : $t('product.addToCart') }}
          </button>
          <RouterLink to="/checkout" class="btn-outline">{{ $t('product.buyNow') }}</RouterLink>
        </div>
      </div>
    </div>

    <section class="reviews-section">
      <div class="reviews-header">
        <div>
          <h2 class="headline-sm">{{ $t('review.customerReviews') }}</h2>
          <div class="rating-row">
            <div class="stars">
              <span v-for="n in 5" :key="n" class="material-symbols-outlined filled-check"
                :class="{ filled: n <= Math.round(avgRating) }">star</span>
            </div>
            <span class="body-md avg">{{ avgRating }} / 5.0</span>
            <span class="label-sm count">({{ reviews.length }} {{ $t('review.reviewsCountSuffix') }})</span>
          </div>
        </div>
      </div>

      <ReviewForm @submit="handleReview" />
      <ReviewList :reviews="reviews" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.detail {
  padding-block: var(--stack-lg);

  @media (min-width: 768px) {
    padding-block: var(--section-padding);
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gutter);

  @media (min-width: 768px) {
    grid-template-columns: 5fr 6fr;
    gap: calc(var(--gutter) * 0.75);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 4fr 5fr;
  }
}

.info-col {
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);

  @media (min-width: 768px) {
    position: sticky;
    top: 128px;
  }
}

.eyebrow {
  color: var(--color-secondary);
  letter-spacing: 0.15em;
}

.price {
  color: var(--color-primary);
  font-weight: 600;
}

.description-block {
  border-top: 1px solid var(--color-hairline);
  padding-top: var(--stack-md);
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
}

.description {
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

.perks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--stack-sm);
  color: var(--color-on-surface-variant);

  li {
    display: flex;
    align-items: center;
    gap: var(--stack-sm);
  }

  .material-symbols-outlined {
    color: var(--color-primary);
    font-size: 18px;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
  padding-top: var(--stack-sm);
}

.btn-primary,
.btn-outline {
  width: 100%;
  padding: 16px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: var(--color-primary-container);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);

  &:hover {
    background: var(--color-surface-container-low);
  }
}

.reviews-section {
  max-width: 48rem;
  margin: 0 auto;
  margin-top: var(--section-padding);
  padding-top: var(--section-padding);
  border-top: 1px solid var(--color-hairline);
}

.reviews-header {
  margin-bottom: var(--stack-lg);
}

.rating-row {
  display: flex;
  align-items: center;
  gap: var(--stack-sm);
  margin-top: var(--stack-sm);
}

.stars {
  display: flex;
  color: var(--color-hairline);

  .filled {
    color: var(--color-primary);
  }
}

.avg {
  font-weight: 700;
}

.count {
  color: var(--color-on-surface-variant);
}
</style>


<!-- <script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProduct } from '../../composables/useProduct';
import { useReviews } from '../../composables/useReviews';
import { useCartStore } from '../../stores/cartStore';
import { formatPrice } from '../../lib/utils';
import ProductGallery from '../../components/catalog/ProductGallery.vue';
import ReviewList from '../../components/reviews/ReviewList.vue';
import ReviewForm from '../../components/reviews/ReviewForm.vue';
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

const avgRating = 4.8;
</script>

<template>
  <AppSpinner v-if="isLoading" />
  <div v-else-if="product" class="detail container">
    <div class="grid">
      <div class="gallery-col">
        <ProductGallery :images="product.images || []" />
      </div>
      <div class="info-col">
        <span class="label-caps eyebrow">{{ product.category?.name || $t('product.premiumBadge') }}</span>
        <h1 class="display-lg">{{ product.title }}</h1>
        <p class="price body-lg">{{ formatPrice(product.discountPrice ?? product.price) }}</p>

        <div class="description-block">
          <p class="body-md description">{{ product.description }}</p>
          <ul class="perks">
            <li class="label-sm">
              <span class="material-symbols-outlined">local_shipping</span>
              {{ $t('product.deliveryPerk') }}
            </li>
            <li class="label-sm">
              <span class="material-symbols-outlined">workspace_premium</span>
              {{ $t('product.qualityPerk') }}
            </li>
          </ul>
        </div>

        <div class="actions">
          <button class="btn-primary" :disabled="product.stock === 0" @click="addToCart">
            {{ product.stock === 0 ? $t('product.outOfStock') : $t('product.addToCart') }}
          </button>
          <RouterLink to="/checkout" class="btn-outline">{{ $t('product.buyNow') }}</RouterLink>
        </div>
      </div>
    </div>

    <section class="reviews-section">
      <div class="reviews-header">
        <div>
          <h2 class="headline-sm">{{ $t('review.customerReviews') }}</h2>
          <div class="rating-row">
            <div class="stars">
              <span
                v-for="n in 5"
                :key="n"
                class="material-symbols-outlined filled-check"
                :class="{ filled: n <= Math.round(avgRating) }"
                >star</span
              >
            </div>
            <span class="body-md avg">{{ avgRating }} / 5.0</span>
            <span class="label-sm count">({{ reviews.length }} {{ $t('review.reviewsCountSuffix') }})</span>
          </div>
        </div>
      </div>

      <ReviewForm @submit="handleReview" />
      <ReviewList :reviews="reviews" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.detail {
  padding-block: var(--stack-lg);

  @media (min-width: 768px) {
    padding-block: var(--section-padding);
  }
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gutter);

  @media (min-width: 768px) {
    grid-template-columns: 7fr 5fr;
  }
}
.info-col {
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);

  @media (min-width: 768px) {
    position: sticky;
    top: 128px;
  }
}
.eyebrow {
  color: var(--color-secondary);
  letter-spacing: 0.15em;
}
.price {
  color: var(--color-primary);
  font-weight: 600;
}
.description-block {
  border-top: 1px solid var(--color-hairline);
  padding-top: var(--stack-md);
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
}
.description {
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}
.perks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--stack-sm);
  color: var(--color-on-surface-variant);

  li {
    display: flex;
    align-items: center;
    gap: var(--stack-sm);
  }
  .material-symbols-outlined {
    color: var(--color-primary);
    font-size: 18px;
  }
}
.actions {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
  padding-top: var(--stack-sm);
}
.btn-primary,
.btn-outline {
  width: 100%;
  padding: 16px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary {
  background: var(--color-primary);
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: var(--color-primary-container);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.btn-outline {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);

  &:hover {
    background: var(--color-surface-container-low);
  }
}
.reviews-section {
  max-width: 48rem;
  margin: 0 auto;
  margin-top: var(--section-padding);
  padding-top: var(--section-padding);
  border-top: 1px solid var(--color-hairline);
}
.reviews-header {
  margin-bottom: var(--stack-lg);
}
.rating-row {
  display: flex;
  align-items: center;
  gap: var(--stack-sm);
  margin-top: var(--stack-sm);
}
.stars {
  display: flex;
  color: var(--color-hairline);

  .filled {
    color: var(--color-primary);
  }
}
.avg {
  font-weight: 700;
}
.count {
  color: var(--color-on-surface-variant);
}
</style> -->