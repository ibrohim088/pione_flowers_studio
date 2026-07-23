<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';
import { useNotifications } from '../../composables/useNotifications';
import AppSelect from '../ui/AppSelect.vue';

defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();

const authStore = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();
const { notifications, fetchNotifications } = useNotifications();

const localeOptions = [
  { label: 'UZ', value: 'uz' },
  { label: 'RU', value: 'ru' },
];

const searchQuery = ref(uiStore.searchQuery);

const unreadCount = () => notifications.value.filter((n) => !n.isRead).length;

if (authStore.isAuthenticated) {
  fetchNotifications();
}

function onSearchSubmit() {
  const trimmed = searchQuery.value.trim();
  uiStore.setSearchQuery(trimmed);
  if (!trimmed.length) return;
  router.push({ path: '/catalog', query: { search: trimmed } });
  emit('close');
}

async function onLogout(close: () => void) {
  await authStore.logout();
  close();
  router.push('/');
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

      <form class="mobile-search" @submit.prevent="onSearchSubmit">
        <span class="material-symbols-outlined">search</span>
        <input
          v-model="searchQuery"
          type="text"
          class="body-sm"
          :placeholder="$t('nav.searchPlaceholder')"
        />
      </form>

      <nav class="links">
        <RouterLink
          v-if="authStore.isAuthenticated"
          to="/account/notifications"
          class="headline-sm notif-link"
          @click="$emit('close')"
        >
          {{ $t('nav.notifications') }}
          <span v-if="unreadCount()" class="badge">{{ unreadCount() }}</span>
        </RouterLink>
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

.mobile-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--color-surface-container-low);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-lg);
  padding: 10px 12px;

  .material-symbols-outlined {
    font-size: 20px;
    color: var(--color-on-surface-variant);
  }

  input {
    border: none;
    background: none;
    outline: none;
    width: 100%;
    color: var(--color-on-surface);
  }
}

.links {
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);
}

.links a {
  color: var(--color-on-surface);
}

.notif-link {
  display: flex;
  align-items: center;
  gap: 8px;
}

.notif-link .badge {
  background: var(--color-primary);
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  min-width: 18px;
  height: 18px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
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