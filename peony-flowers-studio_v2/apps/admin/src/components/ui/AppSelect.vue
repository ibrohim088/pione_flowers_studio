<script setup lang="ts">
defineProps<{ modelValue: string; label?: string; options: { label: string; value: string }[] }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <select :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.field { display: flex; flex-direction: column; gap: 6px; }
label { font-size: 13px; color: var(--text-secondary); }
select {
  padding: 10px 12px; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-primary); color: var(--text-primary);
}
</style>
