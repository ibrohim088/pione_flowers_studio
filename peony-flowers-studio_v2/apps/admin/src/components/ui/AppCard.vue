<script setup lang="ts">
defineProps<{ title?: string; value?: string; icon?: string }>();
</script>

<template>
  <div class="stat-card">
    <div class="icon" v-if="icon">{{ icon }}</div>
    <div>
      <p class="label">{{ title }}</p>
      <p class="value">{{ value }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stat-card {
  background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 20px; display: flex; align-items: center; gap: 16px;
}
.icon { font-size: 28px; }
.label { color: var(--text-secondary); font-size: 13px; margin: 0 0 4px; }
.value { font-size: 22px; font-weight: 700; margin: 0; }
</style>
