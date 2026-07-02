<script setup lang="ts">
defineProps<{ modelValue: string; label?: string; type?: string; placeholder?: string }>();
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
    />
  </div>
</template>

<style scoped lang="scss">
.field { display: flex; flex-direction: column; gap: 6px; }
label { font-size: 13px; color: var(--text-secondary); }
input {
  padding: 10px 12px; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-primary); color: var(--text-primary);
  &:focus { outline: none; border-color: var(--accent); }
}
</style>
