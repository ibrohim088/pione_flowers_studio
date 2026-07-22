<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ images: { url: string }[] }>();
const activeIndex = ref(0);
</script>

<template>
  <div class="gallery">
    <div class="main-image">
      <img :src="images[activeIndex]?.url || '/placeholder.jpg'" alt="Mahsulot rasmi" />
    </div>
    <div v-if="images.length > 1" class="thumbs">
      <button
        v-for="(img, i) in images"
        :key="i"
        type="button"
        class="thumb"
        :class="{ 'thumb--active': i === activeIndex }"
        @click="activeIndex = i"
      >
        <img :src="img.url" alt="" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
  width: 100%;
  max-width: 420px;
  margin-inline: auto;

  @media (min-width: 768px) {
    max-width: 100%;
  }
}
.main-image {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-hairline);
  background: var(--color-surface-container-low);
  aspect-ratio: 1 / 1;
  max-height: 440px;

  @media (min-width: 768px) {
    aspect-ratio: 4 / 5;
    max-height: 480px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.thumbs {
  display: flex;
  gap: var(--stack-md);
  overflow-x: auto;
}
.thumb {
  flex-shrink: 0;
  width: 72px;
  height: 90px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  border: 1px solid transparent;
  opacity: 0.55;
  transition: all 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &--active {
    opacity: 1;
    border-color: var(--color-primary);
  }
  &:hover {
    opacity: 1;
  }
}
</style>