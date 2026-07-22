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
    background: rgba(212, 175, 55, 0.15);
    color: var(--warning);
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
</style> -->