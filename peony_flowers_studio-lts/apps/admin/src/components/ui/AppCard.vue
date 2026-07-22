<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{ title?: string; value?: string; icon?: Component }>();
</script>

<template>
  <div class="stat-card">
    <div class="icon" v-if="icon">
      <component :is="icon" :size="22" />
    </div>
    <div>
      <p class="label">{{ title }}</p>
      <p class="value">{{ value }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stat-card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: box-shadow 0.15s ease;
  &:hover { box-shadow: var(--shadow); }
}
.icon {
  display: flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; border-radius: var(--radius);
  background: var(--accent-light); color: var(--accent);
  flex-shrink: 0;
}
.label { color: var(--text-secondary); font-size: 13px; margin: 0 0 4px; }
.value { font-size: 22px; font-weight: 700; margin: 0; color: var(--text-primary); letter-spacing: -0.01em; }
</style>


<!-- <script setup lang="ts">
import type { Component } from 'vue';

defineProps<{ title?: string; value?: string; icon?: Component }>();
</script>

<template>
  <div class="stat-card">
    <div class="icon" v-if="icon">
      <component :is="icon" :size="24" />
    </div>
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
.icon {
  display: flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; border-radius: var(--radius);
  background: var(--accent-light); color: var(--accent);
}
.label { color: var(--text-secondary); font-size: 13px; margin: 0 0 4px; }
.value { font-size: 22px; font-weight: 700; margin: 0; }
</style> -->
