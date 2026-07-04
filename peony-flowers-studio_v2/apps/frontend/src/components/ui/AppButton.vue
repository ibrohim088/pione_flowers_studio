<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit';
  }>(),
  {
    variant: 'primary',
    loading: false,
    disabled: false,
    type: 'button',
  }
);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['btn', `btn--${variant}`, { 'btn--loading': loading }]"
  >
    <span v-if="loading" class="spinner" />
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use '../../assets/styles/_mixins.scss' as *;

.btn {
  @include btn-base;
  padding: 14px 28px;

  &--primary {
    background: var(--color-primary);
    color: var(--color-on-primary);

    &:hover:not(:disabled) {
      background: var(--color-primary-container);
    }
  }

  &--secondary {
    background: var(--color-surface-container-low);
    color: var(--color-on-surface);

    &:hover:not(:disabled) {
      background: var(--color-surface-container);
    }
  }

  &--outline {
    background: transparent;
    border-color: var(--color-primary);
    color: var(--color-primary);

    &:hover:not(:disabled) {
      background: var(--color-surface-container-low);
    }
  }

  &--danger {
    background: var(--color-error);
    color: var(--color-on-error);
  }
}
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>