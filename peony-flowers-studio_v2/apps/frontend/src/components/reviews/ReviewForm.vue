<script setup lang="ts">
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
      <span
        v-for="n in 5"
        :key="n"
        :class="{ active: n <= rating }"
        @click="rating = n"
      >★</span>
    </div>
    <AppTextarea v-model="comment" placeholder="Fikringizni yozing..." />
    <AppButton type="submit">Sharh qoldirish</AppButton>
  </form>
</template>

<style scoped lang="scss">
.review-form { display: flex; flex-direction: column; gap: 12px; }
.stars { font-size: 24px; cursor: pointer; }
.stars span { color: var(--border); }
.stars span.active { color: var(--warning); }
</style>
