<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ points: { date: string; total: number }[] }>();

const max = computed(() => Math.max(...props.points.map((p) => p.total), 1));

const pathD = computed(() => {
  if (!props.points.length) return '';
  const width = 600;
  const height = 160;
  const step = width / Math.max(props.points.length - 1, 1);
  return props.points
    .map((p, i) => {
      const x = i * step;
      const y = height - (p.total / max.value) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
});
</script>

<template>
  <svg viewBox="0 0 600 160" class="line-chart">
    <path :d="pathD" fill="none" stroke="var(--accent)" stroke-width="2" />
  </svg>
</template>

<style scoped lang="scss">
.line-chart { width: 100%; height: 160px; }
</style>
