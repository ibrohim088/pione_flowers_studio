<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProduct } from '../../composables/useProduct';
import { useReviews } from '../../composables/useReviews';
import { useCartStore } from '../../stores/cartStore';
import { formatPrice } from '../../lib/utils';
import ProductGallery from '../../components/catalog/ProductGallery.vue';
import ReviewList from '../../components/reviews/ReviewList.vue';
import ReviewForm from '../../components/reviews/ReviewForm.vue';
import StarRating from '../../components/reviews/StarRating.vue';
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

// Haqiqiy o'rtacha reyting — sharhlar asosida hisoblanadi (hardcoded emas)
const avgRating = computed(() => {
  if (!reviews.value.length) return 0;
  const sum = reviews.value.reduce((acc, r) => acc + (r.rating || 0), 0);
  return sum / reviews.value.length;
});

// Har bir yulduz (1..5) qancha foiz sharhda uchraganini hisoblaydi
const ratingDistribution = computed(() => {
  const counts = [0, 0, 0, 0, 0]; // index 0 => 1 yulduz ... index 4 => 5 yulduz
  reviews.value.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++;
  });
  const total = reviews.value.length;
  return [5, 4, 3, 2, 1].map((star) => ({
    star,
    percent: total ? Math.round((counts[star - 1] / total) * 100) : 0,
  }));
});
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
        <h1 class="display-lg title">{{ product.title }}</h1>

        <div class="price-row">
          <span class="price">{{ formatPrice(product.discountPrice ?? product.price) }}</span>
          <span v-if="product.discountPrice" class="price-old">{{ formatPrice(product.price) }}</span>
          <span v-if="product.discountPrice" class="price-save label-sm">
            -{{ Math.round(100 - (product.discountPrice / product.price) * 100) }}%
          </span>
        </div>

        <p class="stock-info label-sm" :class="{ low: product.stock > 0 && product.stock <= 5, out: product.stock === 0 }">
          <span class="stock-dot" :class="{ low: product.stock > 0 && product.stock <= 5, out: product.stock === 0 }"></span>
          {{
            product.stock === 0
              ? $t('product.outOfStock')
              : product.stock <= 5
              ? $t('product.lowStock', { count: product.stock })
              : `${product.stock} ${$t('product.inStock')}`
          }}
        </p>

        <p class="body-md description">{{ product.description }}</p>

        <ul class="perks">
          <li class="perk">
            <span class="perk-icon material-symbols-outlined">local_shipping</span>
            <span class="label-sm">{{ $t('product.deliveryPerk') }}</span>
          </li>
          <li class="perk">
            <span class="perk-icon material-symbols-outlined">workspace_premium</span>
            <span class="label-sm">{{ $t('product.qualityPerk') }}</span>
          </li>
        </ul>

        <div class="buy-box actions--desktop">
          <button class="btn-primary" :disabled="product.stock === 0" @click="addToCart">
            {{ product.stock === 0 ? $t('product.outOfStock') : $t('product.addToCart') }}
          </button>
          <RouterLink to="/checkout" class="btn-link">{{ $t('product.buyNow') }}</RouterLink>
        </div>
      </div>
    </div>

    <section class="reviews-section">
      <h2 class="headline-sm reviews-title">{{ $t('review.customerReviews') }}</h2>

      <div class="reviews-summary">
        <div class="summary-score">
          <span class="score-number">{{ avgRating.toFixed(1) }}</span>
          <div class="score-meta">
            <StarRating :rating="avgRating" :size="20" />
            <span class="label-sm score-count">{{ reviews.length }} {{ $t('review.reviewsCountSuffix') }}</span>
          </div>
        </div>

        <div v-if="reviews.length" class="summary-bars">
          <div v-for="row in ratingDistribution" :key="row.star" class="bar-row">
            <span class="label-sm bar-label">{{ row.star }}</span>
            <span class="material-symbols-outlined bar-star filled">star</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: `${row.percent}%` }"></div>
            </div>
            <span class="label-sm bar-pct">{{ row.percent }}%</span>
          </div>
        </div>
      </div>

      <ReviewForm @submit="handleReview" />
      <ReviewList :reviews="reviews" />
    </section>

    <!-- Mobile sticky purchase bar -->
    <div class="mobile-buybar">
      <div class="mobile-buybar-price">
        <span class="mobile-buybar-label">{{ $t('product.totalPriceLabel') }}</span>
        <span class="mobile-buybar-value">{{ formatPrice(product.discountPrice ?? product.price) }}</span>
      </div>
      <button class="btn-primary mobile-buybar-btn" :disabled="product.stock === 0" @click="addToCart">
        {{ product.stock === 0 ? $t('product.outOfStock') : $t('product.addToCart') }}
      </button>
    </div>
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
  display: flex;
  flex-direction: column;
  gap: var(--gutter);

  @media (min-width: 768px) {
    flex-direction: row;
    gap: calc(var(--gutter) * 0.75);
    align-items: flex-start;
  }
}

.gallery-col {
  @media (min-width: 768px) {
    flex: 0 0 440px;
    max-width: 440px;
  }
}

.info-col {
  display: flex;
  flex-direction: column;
  gap: var(--stack-sm);

  @media (min-width: 768px) {
    flex: 0 1 420px;
    padding-top: 4px;
  }
}

.eyebrow {
  color: var(--color-primary);
  letter-spacing: 0.15em;
}

.title {
  margin-top: 6px;
  margin-bottom: 4px;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.price {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.5rem;
}

.price-old {
  color: var(--color-on-surface-variant);
  text-decoration: line-through;
  font-size: 0.95rem;
  opacity: 0.7;
}

.price-save {
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
  border-radius: 999px;
  padding: 2px 10px;
  font-weight: 600;
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-on-surface-variant);
}
.stock-info.low {
  color: var(--color-error);
  font-weight: 600;
}
.stock-info.out {
  opacity: 0.7;
}

.stock-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-primary);
  flex-shrink: 0;
}
.stock-dot.low {
  background: var(--color-error);
}
.stock-dot.out {
  background: var(--color-on-surface-variant);
}

.description {
  color: var(--color-on-surface-variant);
  line-height: 1.6;
  border-top: 1px solid var(--color-hairline);
  padding-top: var(--stack-md);
}

.perks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.perk {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-on-surface-variant);
  font-size: 0.85rem;
}

.perk-icon {
  color: var(--color-primary);
  font-size: 18px;
  flex-shrink: 0;
}

.buy-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;
  padding-top: var(--stack-md);
  border-top: 1px solid var(--color-hairline);
}

.actions--desktop {
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
}

.btn-primary {
  width: 100%;
  padding: 14px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: var(--color-primary);
  color: var(--color-on-primary);

  &:hover:not(:disabled) {
    background: var(--color-primary-container);
    color: var(--color-on-primary-container);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn-link {
  text-align: center;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 4px;

  &:hover {
    opacity: 0.8;
  }
}

.reviews-section {
  max-width: 48rem;
  margin: 0 auto;
  margin-top: var(--section-padding);
  padding-top: var(--section-padding);
  border-top: 1px solid var(--color-hairline);
  padding-bottom: 96px;

  @media (min-width: 768px) {
    padding-bottom: 0;
  }
}

.reviews-title {
  margin-bottom: var(--stack-lg);
}

.reviews-summary {
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);
  padding: var(--stack-lg);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  margin-bottom: var(--stack-lg);
  background: var(--color-surface-container-low);

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
}

.summary-score {
  display: flex;
  align-items: center;
  gap: var(--stack-md);
  flex-shrink: 0;

  @media (min-width: 640px) {
    padding-right: var(--stack-lg);
    border-right: 1px solid var(--color-hairline);
  }
}

.score-number {
  font-size: 2.75rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.score-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.score-count {
  color: var(--color-on-surface-variant);
}

.summary-bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  width: 100%;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.bar-label {
  width: 10px;
  text-align: right;
  color: var(--color-on-surface-variant);
}

.bar-star {
  font-size: 14px;
  color: var(--color-primary);
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.bar-track {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: var(--color-hairline);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.bar-pct {
  width: 34px;
  text-align: right;
  color: var(--color-on-surface-variant);
}

/* ==== Mobile sticky buy bar ==== */
.mobile-buybar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--stack-md);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  background: var(--color-surface-dim);
  border-top: 1px solid var(--color-hairline);
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));

  @media (min-width: 768px) {
    display: none;
  }
}

.mobile-buybar-price {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.mobile-buybar-label {
  font-size: 10px;
  color: var(--color-on-surface-variant);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.mobile-buybar-value {
  color: var(--color-primary);
  font-size: 18px;
  font-weight: 600;
}

.mobile-buybar-btn {
  width: auto;
  flex-shrink: 0;
  padding: 12px 26px;
}
</style>