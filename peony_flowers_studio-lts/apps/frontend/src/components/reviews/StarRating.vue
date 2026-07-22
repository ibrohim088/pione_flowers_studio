<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    rating: number; // 0..5, kasr son bo'lishi mumkin (masalan 4.2)
    size?: number; // px
  }>(),
  { size: 18 }
);

// Har bir yulduz uchun to'ldirilish foizi (0..100)
const percent = computed(() => Math.max(0, Math.min(100, (props.rating / 5) * 100)));
</script>

<template>
  <span class="star-rating" :style="{ '--star-size': `${size}px` }">
    <span class="star-rating__track">
      <span v-for="n in 5" :key="n" class="material-symbols-outlined">star</span>
    </span>
    <span class="star-rating__fill" :style="{ width: `${percent}%` }">
      <span v-for="n in 5" :key="n" class="material-symbols-outlined filled">star</span>
    </span>
  </span>
</template>

<style scoped lang="scss">
.star-rating {
  position: relative;
  display: inline-flex;
  line-height: 1;

  .material-symbols-outlined {
    font-size: var(--star-size);
  }
}

.star-rating__track {
  display: inline-flex;
  color: var(--color-hairline);
}

.star-rating__fill {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
  overflow: hidden;
  white-space: nowrap;
  color: var(--color-primary);

  .filled {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
}
</style>