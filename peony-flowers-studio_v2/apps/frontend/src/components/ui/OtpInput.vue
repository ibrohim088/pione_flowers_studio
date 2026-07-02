<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ modelValue: string; length?: number }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const len = props.length || 6;
const digits = ref<string[]>(props.modelValue.split('').concat(Array(len).fill('')).slice(0, len));

watch(digits, () => emit('update:modelValue', digits.value.join('')), { deep: true });

function onInput(index: number, event: Event) {
  const value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
  digits.value[index] = value.slice(-1);
  if (value && index < len - 1) {
    (event.target as HTMLInputElement).nextElementSibling as HTMLInputElement | null;
    const next = document.getElementById(`otp-${index + 1}`);
    (next as HTMLInputElement | null)?.focus();
  }
}
</script>

<template>
  <div class="otp">
    <input
      v-for="(d, i) in digits"
      :key="i"
      :id="`otp-${i}`"
      v-model="digits[i]"
      maxlength="1"
      inputmode="numeric"
      @input="onInput(i, $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.otp { display: flex; gap: 8px; }
input {
  width: 44px; height: 52px;
  text-align: center;
  font-size: 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  &:focus { outline: none; border-color: var(--accent); }
}
</style>
