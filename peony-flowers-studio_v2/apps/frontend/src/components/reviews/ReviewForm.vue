<script setup lang="ts">
import { Star } from '@lucide/vue';
import { ref } from 'vue';
import AppButton from '../ui/AppButton.vue';
import AppTextarea from '../ui/AppTextarea.vue';

const emit = defineEmits<{ submit: [rating: number, comment: string] }>();

const rating = ref(5);
const comment = ref('');

function submit() {
  emit('submit', rating.value, comment.value);
  comment.value = '';
}
</script>

<template>
  <form class="review-form" @submit.prevent="submit">
    <div class="stars">
      <Star
        v-for="n in 5"
        :key="n"
        :size="24"
        :fill="n <= rating ? 'currentColor' : 'none'"
        :class="{ active: n <= rating }"
        @click="rating = n"
      />
    </div>
    <AppTextarea v-model="comment" placeholder="Fikringizni yozing..." />
    <AppButton type="submit">Sharh qoldirish</AppButton>
  </form>
</template>

<style scoped lang="scss">
.review-form { display: flex; flex-direction: column; gap: 12px; }
.stars { display: flex; gap: 4px; cursor: pointer; }
.stars svg { color: var(--border); }
.stars svg.active { color: var(--warning); }
</style>
