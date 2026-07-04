<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue: string;
  label?: string;
  options: { label: string; value: string }[];
}>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const isOpen = ref(false);
const rootEl = ref<HTMLElement | null>(null);

const selectedLabel = computed(
  () => props.options.find((o) => o.value === props.modelValue)?.label ?? ''
);

function toggle() {
  isOpen.value = !isOpen.value;
}

function selectOption(value: string) {
  emit('update:modelValue', value);
  isOpen.value = false;
}

function handleClickOutside(e: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div class="field" ref="rootEl">
    <label v-if="label" class="label-caps">{{ label }}</label>
    <div class="select-wrap" :class="{ open: isOpen }">
      <button type="button" class="select-trigger" @click="toggle">
        <span>{{ selectedLabel }}</span>
        <span class="material-symbols-outlined chevron">expand_more</span>
      </button>

      <Transition name="dropdown">
        <ul v-if="isOpen" class="dropdown" role="listbox">
          <li v-for="opt in options" :key="opt.value" class="option" :class="{ selected: opt.value === modelValue }"
            role="option" :aria-selected="opt.value === modelValue" @click="selectOption(opt.value)">
            {{ opt.label }}
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  color: var(--color-on-surface-variant);
  font-size: 12px;
}

.select-wrap {
  position: relative;
  width: fit-content;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  min-width: 72px;
  padding: 6px 8px 6px 12px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  border: 1.5px solid var(--color-hairline);
  border-radius: 20px;
  background: var(--color-surface-container-lowest);
  color: var(--color-on-surface);
  cursor: pointer;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    border-color: var(--color-outline);
  }
}

.select-wrap.open .select-trigger {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(111, 36, 53, 0.12);
}

.chevron {
  color: var(--color-on-surface-variant);
  font-size: 16px;
  transition: transform 0.18s ease, color 0.18s ease;
}

.select-wrap.open .chevron {
  color: var(--color-primary);
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 20;
  margin: 0;
  padding: 3px;
  list-style: none;
  border: 1.5px solid var(--color-hairline);
  border-radius: 10px;
  background: var(--color-surface-container-lowest);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.option {
  padding: 6px 10px;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-on-surface);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--color-surface-container-low, rgba(111, 36, 53, 0.06));
  }

  &.selected {
    background: var(--color-primary);
    color: var(--color-on-primary, #fff);
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>