<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ data: { label: string; value: number }[] }>();

const max = computed(() => Math.max(...props.data.map((d) => d.value), 1));
</script>

<template>
  <div class="chart">
    <div v-for="(item, i) in data" :key="i" class="bar-row">
      <span class="label">{{ item.label }}</span>
      <div class="track">
        <div class="fill" :style="{ width: (item.value / max) * 100 + '%' }" />
      </div>
      <span class="value">{{ item.value }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart { display: flex; flex-direction: column; gap: 10px; }
.bar-row { display: grid; grid-template-columns: 100px 1fr 60px; align-items: center; gap: 10px; }
.label { font-size: 13px; color: var(--text-secondary); }
.track { background: var(--bg-secondary); border-radius: 6px; height: 10px; overflow: hidden; }
.fill { background: var(--accent); height: 100%; border-radius: 6px; }
.value { text-align: right; font-size: 13px; }
</style>
