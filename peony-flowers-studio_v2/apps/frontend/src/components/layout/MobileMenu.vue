<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';

defineProps<{ open: boolean }>();
defineEmits<{ close: [] }>();

const authStore = useAuthStore();
</script>

<template>
  <transition name="slide">
    <div v-if="open" class="mobile-menu">
      <div class="top">
        <span class="logo display-lg">Peony</span>
        <button class="close-btn" type="button" @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <nav class="links">
        <RouterLink to="/catalog" class="headline-sm" @click="$emit('close')">{{ $t('nav.catalog') }}</RouterLink>
        <RouterLink to="/about" class="headline-sm" @click="$emit('close')">{{ $t('mobileMenu.brand') }}</RouterLink>
        <RouterLink
          :to="authStore.isAuthenticated ? '/account' : '/login'"
          class="headline-sm"
          @click="$emit('close')"
        >
          {{ authStore.isAuthenticated ? $t('nav.account') : $t('nav.login') }}
        </RouterLink>
      </nav>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--color-surface);
  z-index: 60;
  display: flex;
  flex-direction: column;
  padding: var(--margin-mobile);
  gap: var(--stack-lg);
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  color: var(--color-primary);
  font-style: italic;
}
.close-btn {
  border: none;
  background: none;
  display: flex;
  color: var(--color-on-surface);
  cursor: pointer;
}
.links {
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);
}
.links a {
  color: var(--color-on-surface);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>