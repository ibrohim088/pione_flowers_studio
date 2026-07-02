<script setup lang="ts">
defineProps<{ modelValue: string; label?: string; placeholder?: string; rows?: number }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <textarea
      :value="modelValue"
      :rows="rows || 3"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>

<style scoped lang="scss">
.field { display: flex; flex-direction: column; gap: 6px; }
label { font-size: 14px; color: var(--text-secondary); }
textarea {
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  resize: vertical;
  &:focus { outline: none; border-color: var(--accent); }
}
</style>
