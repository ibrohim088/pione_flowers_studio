<script setup lang="ts">
defineProps<{ open: boolean; title?: string }>();
defineEmits<{ close: [] }>();
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <header class="modal-header">
          <h3 class="headline-sm">{{ title }}</h3>
          <button class="close-btn" @click="$emit('close')">
            <span class="material-symbols-outlined">close</span>
          </button>
        </header>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(34, 25, 28, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: var(--margin-mobile);
}
.modal {
  background: var(--color-surface-container-lowest);
  border-radius: var(--radius-lg);
  padding: var(--stack-lg);
  min-width: 320px;
  max-width: 90vw;
  border: 1px solid var(--color-hairline);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--stack-md);
}
.close-btn {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  color: var(--color-on-surface-variant);

  &:hover {
    color: var(--color-primary);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


<!-- <script setup lang="ts">
import { X } from '@lucide/vue';

defineProps<{ open: boolean; title?: string }>();
defineEmits<{ close: [] }>();
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <header class="modal-header">
          <h3>{{ title }}</h3>
          <button @click="$emit('close')"><X :size="18" /></button>
        </header>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}
.modal {
  background: var(--bg-primary);
  border-radius: var(--radius);
  padding: 24px;
  min-width: 320px;
  max-width: 90vw;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
  button { border: none; background: none; cursor: pointer; display: flex; align-items: center; color: var(--text-secondary); }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style> -->
