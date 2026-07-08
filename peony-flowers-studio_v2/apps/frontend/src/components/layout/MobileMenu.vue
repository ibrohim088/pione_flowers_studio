<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';
import AppSelect from '../ui/AppSelect.vue';

defineProps<{ open: boolean }>();
defineEmits<{ close: [] }>();

const authStore = useAuthStore();
const uiStore = useUiStore();

const localeOptions = [
  { label: 'UZ', value: 'uz' },
  { label: 'RU', value: 'ru' },
];

function onLogout(close: () => void) {
  authStore.logout();
  close();
}
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="mobile-menu-backdrop" @click="$emit('close')"></div>
  </transition>

  <transition name="slide">
    <div v-if="open" class="mobile-menu">
      <div class="top">
        <AppSelect
          :model-value="uiStore.locale"
          :options="localeOptions"
          @update:model-value="(v) => uiStore.setLocale(v as 'uz' | 'ru')"
        />
        <button class="close-btn" type="button" @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav class="links">
        <RouterLink to="/catalog" class="headline-sm" @click="$emit('close')">{{ $t('nav.catalog') }}</RouterLink>
        <RouterLink to="/about" class="headline-sm" @click="$emit('close')">{{ $t('mobileMenu.brand') }}</RouterLink>
        <RouterLink v-if="authStore.isAuthenticated" to="/account" class="headline-sm" @click="$emit('close')">
          {{ $t('nav.account') }}
        </RouterLink>
      </nav>

      <button
        v-if="authStore.isAuthenticated"
        type="button"
        class="logout-btn headline-sm"
        @click="onLogout(() => $emit('close'))"
      >
        <span class="material-symbols-outlined">logout</span>
        {{ $t('account.sidebar.logout') }}
      </button>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 59;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 68%;
  max-width: 260px;
  background: var(--color-surface);
  border-left: 1px solid var(--color-hairline);
  z-index: 60;
  display: flex;
  flex-direction: column;
  padding: var(--margin-mobile);
  gap: var(--stack-lg);
  overflow-y: auto;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--stack-sm);
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

.logout-btn {
  display: flex;
  align-items: center;
  gap: var(--stack-sm);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-error);
  font-family: var(--font-body);
  padding-top: var(--stack-lg);
  margin-top: auto;
  border-top: 1px solid var(--color-hairline);

  .material-symbols-outlined {
    font-size: 22px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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