<script setup lang="ts">
import { X } from '@lucide/vue';

defineProps<{ open: boolean }>();
defineEmits<{ close: [] }>();
</script>

<template>
  <transition name="slide">
    <div v-if="open" class="mobile-menu">
      <button class="close-btn" @click="$emit('close')"><X :size="22" /></button>
      <RouterLink to="/catalog" @click="$emit('close')">Katalog</RouterLink>
      <RouterLink to="/about" @click="$emit('close')">Biz haqimizda</RouterLink>
      <RouterLink to="/account" @click="$emit('close')">Kabinet</RouterLink>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  z-index: 50;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
}
.close-btn {
  align-self: flex-end;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  color: var(--text-primary);
}
.slide-enter-active, .slide-leave-active { transition: transform 0.25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
