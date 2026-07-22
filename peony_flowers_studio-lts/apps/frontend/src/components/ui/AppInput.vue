<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  icon?: string;
  disabled?: boolean;
}>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <div class="field">
    <label v-if="label" class="label-caps">{{ label }}</label>
    <div class="input-wrap">
      <span v-if="icon" class="material-symbols-outlined icon">{{ icon }}</span>
      <input
        :value="modelValue"
        :type="type || 'text'"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="{ 'has-icon': !!icon, error: !!error }"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <span v-if="error" class="error-text">{{ error }}</span>
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
.input-wrap {
  position: relative;
}
.icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-on-surface-variant);
  font-size: 20px;
  pointer-events: none;
}
input {
  width: 100%;
  padding: 12px 14px;
  font-family: var(--font-body);
  font-size: 16px;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-on-surface);
  transition: border-color 0.2s;

  &.has-icon {
    padding-left: 40px;
  }
  &::placeholder {
    color: var(--color-outline);
  }
  &.error {
    border-color: var(--color-error);
  }
  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--color-surface-container-low);
  }
}
.error-text {
  font-size: 12px;
  color: var(--color-error);
}
</style>


<!-- <script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
}>();
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
      :class="{ error: !!error }"
    />
    <span v-if="error" class="error-text">{{ error }}</span>
  </div>
</template>

<style scoped lang="scss">
.field { display: flex; flex-direction: column; gap: 6px; }
label { font-size: 14px; color: var(--text-secondary); }
input {
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
  color: var(--text-primary);
  &.error { border-color: var(--danger); }
  &:focus { outline: none; border-color: var(--accent); }
}
.error-text { font-size: 12px; color: var(--danger); }
</style> -->
