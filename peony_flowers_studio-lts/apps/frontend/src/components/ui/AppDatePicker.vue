<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{ modelValue: string; label?: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const WEEKDAYS_UZ = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
const MONTHS_UZ = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
];

const isOpen = ref(false);
const rootEl = ref<HTMLElement | null>(null);

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}
function toKey(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const selectedDate = computed(() => (props.modelValue ? new Date(props.modelValue + 'T00:00:00') : null));

const viewYear = ref(selectedDate.value?.getFullYear() ?? today.getFullYear());
const viewMonth = ref(selectedDate.value?.getMonth() ?? today.getMonth());

const displayLabel = computed(() => {
  if (!selectedDate.value) return "Sanani tanlang";
  return `${selectedDate.value.getDate()} ${MONTHS_UZ[selectedDate.value.getMonth()]} ${selectedDate.value.getFullYear()}`;
});

const monthLabel = computed(() => `${MONTHS_UZ[viewMonth.value]} ${viewYear.value}`);

const days = computed(() => {
  const firstOfMonth = new Date(viewYear.value, viewMonth.value, 1);
  // JS getDay(): 0=Yak..6=Shan. Dushanbadan boshlash uchun offsetni moslashtiramiz.
  const jsDay = firstOfMonth.getDay();
  const leadingBlanks = (jsDay + 6) % 7;

  const daysInMonth = new Date(viewYear.value, viewMonth.value + 1, 0).getDate();

  const cells: { date: Date | null; key: string }[] = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push({ date: null, key: `blank-${i}` });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(viewYear.value, viewMonth.value, d);
    cells.push({ date, key: toKey(date) });
  }
  return cells;
});

function isPast(date: Date) {
  return date.getTime() < today.getTime();
}
function isToday(date: Date) {
  return toKey(date) === toKey(today);
}
function isSelected(date: Date) {
  return selectedDate.value ? toKey(date) === toKey(selectedDate.value) : false;
}

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11;
    viewYear.value -= 1;
  } else {
    viewMonth.value -= 1;
  }
}
function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0;
    viewYear.value += 1;
  } else {
    viewMonth.value += 1;
  }
}

function pick(date: Date | null) {
  if (!date || isPast(date)) return;
  emit('update:modelValue', toKey(date));
  isOpen.value = false;
}

function toggle() {
  isOpen.value = !isOpen.value;
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
        <span class="material-symbols-outlined icon">calendar_month</span>
        <span class="value" :class="{ placeholder: !selectedDate }">{{ displayLabel }}</span>
      </button>

      <Transition name="pop">
        <div v-if="isOpen" class="panel">
          <div class="panel-header">
            <button type="button" class="nav-btn" @click="prevMonth">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <span class="month-label body-md">{{ monthLabel }}</span>
            <button type="button" class="nav-btn" @click="nextMonth">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <div class="weekdays">
            <span v-for="w in WEEKDAYS_UZ" :key="w">{{ w }}</span>
          </div>

          <div class="days-grid">
            <button
              v-for="cell in days"
              :key="cell.key"
              type="button"
              class="day"
              :disabled="!cell.date || isPast(cell.date)"
              :class="{
                'day--today': cell.date && isToday(cell.date),
                'day--selected': cell.date && isSelected(cell.date),
                'day--empty': !cell.date,
              }"
              @click="pick(cell.date)"
            >
              {{ cell.date?.getDate() }}
            </button>
          </div>
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
  z-index: 30;
  width: min(280px, calc(100vw - 48px));
  padding: var(--stack-md);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface-container-lowest);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--stack-sm);
}

.month-label {
  font-weight: 600;
  color: var(--color-on-surface);
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: none;
  color: var(--color-on-surface-variant);
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: var(--color-surface-container-low);
    color: var(--color-primary);
  }
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;

  span {
    text-align: center;
    font-size: 11px;
    color: var(--color-on-surface-variant);
  }
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: none;
  color: var(--color-on-surface);
  font-size: 13px;
  font-family: var(--font-body);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover:not(:disabled):not(.day--empty) {
    background: var(--color-surface-container-low);
  }

  &:disabled {
    color: var(--color-on-surface-variant);
    opacity: 0.35;
    cursor: not-allowed;
  }

  &--empty {
    visibility: hidden;
    cursor: default;
  }

  &--today {
    border: 1px solid var(--color-primary);
  }

  &--selected {
    background: var(--color-primary);
    color: var(--color-on-primary, #1a1006);
    font-weight: 700;
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