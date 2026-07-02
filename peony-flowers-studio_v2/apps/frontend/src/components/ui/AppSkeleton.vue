<script setup lang="ts">
withDefaults(defineProps<{ width?: string; height?: string }>(), { width: '100%', height: '20px' });
</script>

<template>
  <div class="skeleton" :style="{ width, height }" />
</template>

<style scoped lang="scss">
.skeleton {
  background: linear-gradient(90deg, var(--border) 25%, var(--bg-secondary) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: var(--radius);
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
