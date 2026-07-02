<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'success' | 'warning' | 'danger' | 'info' }>(), { variant: 'info' });
</script>

<template>
  <span :class="['badge', `badge--${variant}`]"><slot /></span>
</template>

<style scoped lang="scss">
.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  &--success { background: #ebfbee; color: var(--success); }
  &--warning { background: #fff9db; color: var(--warning); }
  &--danger { background: #fff5f5; color: var(--danger); }
  &--info { background: var(--accent-light); color: var(--accent); }
}
</style>
