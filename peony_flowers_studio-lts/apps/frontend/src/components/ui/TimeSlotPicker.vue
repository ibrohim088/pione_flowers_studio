<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

/**
 * Erkin vaqt tanlagich.
 * - Tashqi v-model hamon "HH:mm" ko'rinishidagi string (backend TEXT maydoni va
 *   orders.validation.ts dagi z.string().min(1) bilan mos bo'lishi uchun).
 * - Lekin componentning ICHKI barcha hisob-kitobi kun boshidan boshlab
 *   DAQIQALARDA (0..1439) olib boriladi — qattiq belgilangan slotlar yo'q,
 *   foydalanuvchi istalgan soat/daqiqani tanlashi mumkin.
 */

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    /** Eng erta tanlanadigan vaqt, daqiqada (0 = 00:00). Cheklov shart emas. */
    minMinutes?: number;
    /** Eng kech tanlanadigan vaqt, daqiqada (1439 = 23:59). */
    maxMinutes?: number;
    /** Daqiqa ustunidagi qadam. 1 = har bir daqiqa tanlanadi (to'liq erkin). */
    minuteStep?: number;
  }>(),
  {
    minMinutes: 0,
    maxMinutes: 1439,
    minuteStep: 1,
  }
);
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const isOpen = ref(false);
const rootEl = ref<HTMLElement | null>(null);
const hourListEl = ref<HTMLElement | null>(null);
const minuteListEl = ref<HTMLElement | null>(null);

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function minutesToLabel(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${pad(h)}:${pad(m)}`;
}

function parseToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value ?? '');
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

// Ichki holat — hammasi daqiqa asosida
const selectedMinutes = ref<number | null>(parseToMinutes(props.modelValue));

watch(
  () => props.modelValue,
  (val) => {
    const parsed = parseToMinutes(val);
    if (parsed !== selectedMinutes.value) selectedMinutes.value = parsed;
  }
);

const selectedHour = computed(() =>
  selectedMinutes.value === null ? null : Math.floor(selectedMinutes.value / 60)
);
const selectedMinute = computed(() =>
  selectedMinutes.value === null ? null : selectedMinutes.value % 60
);

// Soat/daqiqa ustunlari — min/max oralig'idan kelib chiqib hisoblanadi, qattiq
// slotlar emas.
const hourOptions = computed(() => {
  const firstHour = Math.floor(props.minMinutes / 60);
  const lastHour = Math.floor(props.maxMinutes / 60);
  const list: number[] = [];
  for (let h = firstHour; h <= lastHour; h++) list.push(h);
  return list;
});

const minuteOptions = computed(() => {
  const step = Math.max(1, props.minuteStep);
  const list: number[] = [];
  for (let m = 0; m < 60; m += step) list.push(m);
  return list;
});

function clampToRange(totalMinutes: number): number {
  return Math.min(props.maxMinutes, Math.max(props.minMinutes, totalMinutes));
}

function commit(totalMinutes: number) {
  const clamped = clampToRange(totalMinutes);
  selectedMinutes.value = clamped;
  emit('update:modelValue', minutesToLabel(clamped));
}

function pickHour(h: number) {
  const currentMinute = selectedMinute.value ?? 0;
  commit(h * 60 + currentMinute);
}

function pickMinute(m: number) {
  const currentHour = selectedHour.value ?? hourOptions.value[0] ?? 0;
  commit(currentHour * 60 + m);
}

function toggle() {
  isOpen.value = !isOpen.value;
}

function done() {
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
    <div class="picker" :class="{ open: isOpen }">
      <button type="button" class="trigger" @click="toggle">
        <span class="material-symbols-outlined icon">schedule</span>
        <span class="value" :class="{ placeholder: !modelValue }">{{ modelValue || 'Vaqtni tanlang' }}</span>
      </button>

      <Transition name="pop">
        <div v-if="isOpen" class="panel">
          <div class="columns">
            <div class="column" ref="hourListEl">
              <div class="column-label">Soat</div>
              <div class="column-scroll">
                <button
                  v-for="h in hourOptions"
                  :key="h"
                  type="button"
                  class="option"
                  :class="{ 'option--selected': selectedHour === h }"
                  @click="pickHour(h)"
                >
                  {{ pad(h) }}
                </button>
              </div>
            </div>
            <div class="column" ref="minuteListEl">
              <div class="column-label">Daqiqa</div>
              <div class="column-scroll">
                <button
                  v-for="m in minuteOptions"
                  :key="m"
                  type="button"
                  class="option"
                  :class="{ 'option--selected': selectedMinute === m }"
                  @click="pickMinute(m)"
                >
                  {{ pad(m) }}
                </button>
              </div>
            </div>
          </div>
          <button type="button" class="confirm" @click="done">Tayyor</button>
        </div>
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

.picker {
  position: relative;
}

.trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-on-surface);
  font-family: var(--font-body);
  cursor: pointer;
  transition: border-color 0.18s ease;

  &:hover {
    border-color: var(--color-outline);
  }

  .icon {
    color: var(--color-primary);
    font-size: 20px;
  }

  .value {
    flex: 1;
    text-align: left;
  }

  .placeholder {
    color: var(--color-on-surface-variant);
  }
}

.picker.open .trigger {
  border-color: var(--color-primary);
}

.panel {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface-container-lowest);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

.columns {
  display: flex;
  gap: 8px;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.column-label {
  color: var(--color-on-surface-variant);
  font-size: 11px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.column-scroll {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 176px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.option {
  padding: 8px 0;
  border: 1px solid transparent;
  border-radius: 8px;
  background: none;
  color: var(--color-on-surface);
  font-family: var(--font-body);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: var(--color-surface-container-low);
  }

  &--selected {
    background: var(--color-primary);
    color: var(--color-on-primary, #1a1006);
    font-weight: 600;
  }
}

.confirm {
  padding: 9px 12px;
  border: none;
  border-radius: 8px;
  background: var(--color-primary);
  color: var(--color-on-primary, #1a1006);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.9;
  }
}

.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>