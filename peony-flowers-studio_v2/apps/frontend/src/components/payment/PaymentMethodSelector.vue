<script setup lang="ts">
defineProps<{ modelValue: string }>();
defineEmits<{ 'update:modelValue': [value: string] }>();

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const methods = computed(() => [
  { value: 'cash', label: t('checkout.cash'), icon: 'payments', desc: t('checkout.cashDesc') },
  { value: 'click', label: 'Click', icon: 'credit_card', desc: t('checkout.clickDesc') },
]);
</script>

<template>
  <div class="methods">
    <button
      v-for="m in methods"
      :key="m.value"
      type="button"
      class="method"
      :class="{ 'method--active': modelValue === m.value }"
      @click="$emit('update:modelValue', m.value)"
    >
      <span class="material-symbols-outlined">{{ m.icon }}</span>
      <div class="text">
        <span class="body-md label">{{ m.label }}</span>
        <span class="label-sm desc">{{ m.desc }}</span>
      </div>
      <span class="radio" :class="{ 'radio--checked': modelValue === m.value }" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.methods {
  display: flex;
  flex-direction: column;
  gap: var(--stack-sm);
}
.method {
  display: flex;
  align-items: center;
  gap: var(--stack-md);
  padding: var(--stack-md);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: var(--color-outline);
  }
  &--active {
    border-color: var(--color-primary);
    background: var(--color-surface-container-low);
  }

  .material-symbols-outlined {
    color: var(--color-primary);
  }
}
.text {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.label {
  font-weight: 600;
}
.desc {
  color: var(--color-on-surface-variant);
}
.radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--color-outline-variant);

  &--checked {
    border-color: var(--color-primary);
    background: radial-gradient(circle, var(--color-primary) 0 40%, transparent 44%);
  }
}
</style>