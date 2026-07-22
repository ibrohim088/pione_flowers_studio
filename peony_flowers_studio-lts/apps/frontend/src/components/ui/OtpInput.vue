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
    const next = document.getElementById(`otp-${index + 1}`);
    (next as HTMLInputElement | null)?.focus();
  }
}

function onKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    const prev = document.getElementById(`otp-${index - 1}`);
    (prev as HTMLInputElement | null)?.focus();
  }
}
</script>

<template>
  <div class="otp">
    <input
      v-for="(d, i) in digits"
      :id="`otp-${i}`"
      :key="i"
      v-model="digits[i]"
      maxlength="1"
      inputmode="numeric"
      @input="onInput(i, $event)"
      @keydown="onKeydown(i, $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.otp {
  display: flex;
  gap: var(--stack-sm);
}
input {
  width: 44px;
  height: 52px;
  text-align: center;
  font-family: var(--font-body);
  font-size: 20px;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-on-surface);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}
</style>