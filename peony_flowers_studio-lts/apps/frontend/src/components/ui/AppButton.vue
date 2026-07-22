<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit';
  }>(),
  {
    variant: 'primary',
    size: 'md',
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
    :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--loading': loading }]"
  >
    <span v-if="loading" class="spinner" />
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use '../../assets/styles/_mixins.scss' as *;

.btn {
  @include btn-base;

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

  &--ghost {
    background: transparent;
    border-color: transparent;
    color: var(--color-primary);
    padding-inline: 4px;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }

  &--danger {
    background: var(--color-error);
    color: var(--color-on-error);
  }

  /* ==== Sizes: fixed height + width via min-width/padding, not fluid ==== */
  &--sm {
    height: 36px;
    min-width: 88px;
    padding-inline: 14px;
    font-size: 13px;

    .material-symbols-outlined {
      font-size: 16px;
    }
  }

  &--md {
    height: 44px;
    min-width: 108px;
    padding-inline: 20px;
    font-size: 14px;

    .material-symbols-outlined {
      font-size: 18px;
    }
  }

  &--lg {
    height: 52px;
    min-width: 128px;
    padding-inline: 28px;
    font-size: 15px;

    .material-symbols-outlined {
      font-size: 20px;
    }
  }

  &--xl {
    height: 60px;
    min-width: 148px;
    padding-inline: 36px;
    font-size: 16px;

    .material-symbols-outlined {
      font-size: 22px;
    }
  }

  &--ghost.btn--sm,
  &--ghost.btn--md,
  &--ghost.btn--lg,
  &--ghost.btn--xl {
    height: auto;
    min-width: 0;
    padding-inline: 4px;
  }

  /* ==== Mobile: every size collapses to sm, regardless of prop ==== */
  @media (max-width: 767px) {
    &--md,
    &--lg,
    &--xl {
      height: 36px;
      min-width: 88px;
      padding-inline: 14px;
      font-size: 13px;

      .material-symbols-outlined {
        font-size: 16px;
      }
    }

    &--ghost.btn--md,
    &--ghost.btn--lg,
    &--ghost.btn--xl {
      height: auto;
      min-width: 0;
      padding-inline: 4px;
    }
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