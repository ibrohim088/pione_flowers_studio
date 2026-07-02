<script setup lang="ts">
withDefaults(defineProps<{ message: string; type?: 'success' | 'error' | 'info' }>(), { type: 'info' });
</script>

<template>
  <div :class="['toast', `toast--${type}`]">{{ message }}</div>
</template>

<style scoped lang="scss">
.toast {
  position: fixed;
  bottom: 24px; right: 24px;
  padding: 14px 20px;
  border-radius: var(--radius);
  color: white;
  z-index: 200;
  &--success { background: var(--success); }
  &--error { background: var(--danger); }
  &--info { background: var(--accent); }
}
</style>
