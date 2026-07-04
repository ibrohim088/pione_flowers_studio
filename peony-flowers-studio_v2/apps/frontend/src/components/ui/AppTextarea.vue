<script setup lang="ts">
defineProps<{ modelValue: string; label?: string; placeholder?: string; rows?: number }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="field">
    <label v-if="label" class="label-caps">{{ label }}</label>
    <textarea
      :value="modelValue"
      :rows="rows || 4"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
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
  padding: 12px 14px;
  font-family: var(--font-body);
  font-size: 16px;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-on-surface);
  resize: vertical;

  &::placeholder {
    color: var(--color-outline);
  }
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}
</style>


<!-- <script setup lang="ts">
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
</style> -->
