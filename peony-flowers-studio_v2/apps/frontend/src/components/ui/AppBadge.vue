<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'success' | 'warning' | 'danger' | 'info' }>(), { variant: 'info' });
</script>

<template>
  <span :class="['badge', 'label-caps', `badge--${variant}`]"><slot /></span>
</template>

<style scoped lang="scss">
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  font-size: 10px;

  &--success {
    background: var(--color-secondary-container);
    color: var(--color-on-secondary-container);
  }
  &--warning {
    background: #fff3cd;
    color: #8a6100;
  }
  &--danger {
    background: var(--color-error-container);
    color: var(--color-on-error-container);
  }
  &--info {
    background: var(--color-surface-container-high);
    color: var(--color-on-surface-variant);
  }
}
</style>


<!-- <script setup lang="ts">
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
</style> -->
