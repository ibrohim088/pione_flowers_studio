<script setup lang="ts">
defineProps<{ modelValue: 'click' | 'cash' }>();
defineEmits<{ 'update:modelValue': [value: 'click' | 'cash'] }>();
</script>

<template>
  <div class="methods">
    <label :class="{ active: modelValue === 'click' }">
      <input type="radio" value="click" :checked="modelValue === 'click'" @change="$emit('update:modelValue', 'click')" />
      💳 Click orqali
    </label>
    <label :class="{ active: modelValue === 'cash' }">
      <input type="radio" value="cash" :checked="modelValue === 'cash'" @change="$emit('update:modelValue', 'cash')" />
      💵 Naqd pul
    </label>
  </div>
</template>

<style scoped lang="scss">
.methods { display: flex; gap: 12px; }
label {
  flex: 1;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  display: flex; align-items: center; gap: 10px;
  &.active { border-color: var(--accent); background: var(--accent-light); }
}
input { display: none; }
</style>
