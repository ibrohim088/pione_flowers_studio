<script setup lang="ts">
defineProps<{ open: boolean; title?: string }>();
defineEmits<{ close: [] }>();
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <header class="modal-header">
          <h3>{{ title }}</h3>
          <button @click="$emit('close')">✕</button>
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
  button { border: none; background: none; font-size: 18px; cursor: pointer; }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
