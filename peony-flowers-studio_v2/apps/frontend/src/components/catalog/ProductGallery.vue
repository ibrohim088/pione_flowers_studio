<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ images: { url: string }[] }>();
const activeIndex = ref(0);
</script>

<template>
  <div class="gallery">
    <img class="main-image" :src="images[activeIndex]?.url" alt="Mahsulot rasmi" />
    <div class="thumbs">
      <img
        v-for="(img, i) in images"
        :key="i"
        :src="img.url"
        :class="{ active: i === activeIndex }"
        @click="activeIndex = i"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-image { width: 100%; border-radius: var(--radius); aspect-ratio: 1; object-fit: cover; }
.thumbs { display: flex; gap: 8px; margin-top: 10px; }
.thumbs img {
  width: 64px; height: 64px; object-fit: cover;
  border-radius: 8px; cursor: pointer;
  border: 2px solid transparent;
  &.active { border-color: var(--accent); }
}
</style>
