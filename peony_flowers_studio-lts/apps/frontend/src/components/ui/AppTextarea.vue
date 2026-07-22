<script setup lang="ts">
defineProps<{ modelValue: string; label?: string; placeholder?: string; rows?: number }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="field">
    <label v-if="label" class="label-caps">{{ label }}</label>
    <textarea :value="modelValue" :rows="rows || 4" :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
  </div>
</template>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: var(--unit);
}

label {
  color: var(--color-on-surface-variant);
}

textarea {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  font-family: var(--font-body);
  font-size: 16px;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-on-surface);
  resize: none;
  overflow-y: auto;
  min-height: 96px;
  max-height: 260px;

  &::placeholder {
    color: var(--color-outline);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}
</style>
