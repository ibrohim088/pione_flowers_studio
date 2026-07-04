<script setup lang="ts">
defineProps<{ modelValue: string; label?: string; rows?: number }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <textarea
      :value="modelValue"
      :rows="rows || 3"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>

<style scoped lang="scss">
.field { display: flex; flex-direction: column; gap: 6px; }
label { font-size: 12px; font-weight: 500; letter-spacing: 0.02em; color: var(--text-secondary); }
textarea {
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--accent-light);
  }
}
</style>


<!-- <script setup lang="ts">
defineProps<{ modelValue: string; label?: string; rows?: number }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <textarea
      :value="modelValue"
      :rows="rows || 3"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>

<style scoped lang="scss">
.field { display: flex; flex-direction: column; gap: 6px; }
label { font-size: 13px; color: var(--text-secondary); }
textarea {
  padding: 10px 12px; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-primary); color: var(--text-primary); font-family: inherit; resize: vertical;
}
</style> -->
