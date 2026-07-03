<script setup lang="ts">
import { Star } from '@lucide/vue';

defineProps<{ reviews: any[] }>();
</script>

<template>
  <div class="reviews">
    <p v-if="!reviews.length" class="empty">Hozircha sharhlar yo'q</p>
    <div v-for="review in reviews" :key="review.id" class="review">
      <div class="header">
        <strong>{{ review.user?.fullName || 'Mijoz' }}</strong>
        <span class="stars">
          <Star v-for="n in 5" :key="n" :size="14" :fill="n <= review.rating ? 'currentColor' : 'none'" />
        </span>
      </div>
      <p v-if="review.comment">{{ review.comment }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reviews { display: flex; flex-direction: column; gap: 16px; }
.review { padding: 14px; border: 1px solid var(--border); border-radius: var(--radius); }
.header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.stars { display: inline-flex; gap: 2px; color: var(--warning); }
.empty { color: var(--text-secondary); }
</style>
