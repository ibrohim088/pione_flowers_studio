<script setup lang="ts">
defineProps<{ reviews: any[] }>();
</script>

<template>
  <div class="reviews">
    <p v-if="!reviews.length" class="empty body-md">{{ $t('review.empty') }}</p>
    <div v-for="review in reviews" :key="review.id" class="review">
      <div class="review__header">
        <div class="avatar">{{ (review.user?.fullName || 'M').charAt(0).toUpperCase() }}</div>
        <div class="meta">
          <h4 class="body-md name">{{ review.user?.fullName || $t('review.anonymous') }}</h4>
          <p class="label-sm date">{{ review.createdAt }}</p>
        </div>
      </div>
      <div class="stars">
        <span
          v-for="n in 5"
          :key="n"
          class="material-symbols-outlined"
          :class="{ filled: n <= review.rating }"
        >star</span>
      </div>
      <p v-if="review.comment" class="body-md comment">"{{ review.comment }}"</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reviews {
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);
}
.review__header {
  display: flex;
  align-items: center;
  gap: var(--stack-sm);
  margin-bottom: var(--stack-sm);
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-surface-container-high);
  color: var(--color-on-surface-variant);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}
.name {
  font-weight: 700;
}
.date {
  color: var(--color-on-surface-variant);
}
.stars {
  display: inline-flex;
  gap: 2px;
  color: var(--color-hairline);

  .material-symbols-outlined {
    font-size: 16px;
  }
  .filled {
    color: var(--color-primary);
  }
}
.comment {
  color: var(--color-on-surface-variant);
  font-style: italic;
  margin-top: var(--stack-sm);
}
.empty {
  color: var(--color-on-surface-variant);
}
</style>