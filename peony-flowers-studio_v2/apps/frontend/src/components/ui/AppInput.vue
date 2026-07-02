<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
}>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input
      :value="modelValue"
      :type="type || 'text'"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="{ error: !!error }"
    />
    <span v-if="error" class="error-text">{{ error }}</span>
  </div>
</template>

<style scoped lang="scss">
.field { display: flex; flex-direction: column; gap: 6px; }
label { font-size: 14px; color: var(--text-secondary); }
input {
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  color: var(--text-primary);
  &.error { border-color: var(--danger); }
  &:focus { outline: none; border-color: var(--accent); }
}
.error-text { font-size: 12px; color: var(--danger); }
</style>
