<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
}>(), {
  variant: 'primary',
  loading: false,
  disabled: false,
  type: 'button',
});
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
.btn {
  padding: 12px 24px;
  border-radius: var(--radius);
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;

  &:disabled { opacity: 0.6; cursor: not-allowed; }

  &--primary { background: var(--accent); color: white; }
  &--secondary { background: var(--bg-secondary); color: var(--text-primary); }
  &--outline { background: transparent; border: 1px solid var(--accent); color: var(--accent); }
  &--danger { background: var(--danger); color: white; }
}
.spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
