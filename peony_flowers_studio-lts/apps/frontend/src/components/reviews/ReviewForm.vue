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
      <button
        v-for="n in 5"
        :key="n"
        type="button"
        class="star-btn"
        @click="rating = n"
      >
        <span class="material-symbols-outlined" :class="{ filled: n <= rating }">star</span>
      </button>
    </div>
    <AppTextarea v-model="comment" :placeholder="$t('review.placeholder')" />
    <AppButton type="submit">{{ $t('review.submit') }}</AppButton>
  </form>
</template>

<style scoped lang="scss">
.review-form {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
  padding: var(--stack-md);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  margin-bottom: var(--stack-lg);
}
.stars {
  display: flex;
  gap: 4px;
}
.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--color-hairline);

  .material-symbols-outlined {
    font-size: 28px;
  }
  .filled {
    color: var(--color-primary);
  }
}
</style>