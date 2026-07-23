<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useNotifications } from '../../composables/useNotifications';
import { formatDateTime } from '../../lib/utils';
import AppModal from '../ui/AppModal.vue';

const { notifications, isLoading, fetchNotifications, markRead, markAllRead } = useNotifications();

const dropdownOpen = ref(false);
const selected = ref<any | null>(null);
const rootEl = ref<HTMLElement | null>(null);

const unreadCount = () => notifications.value.filter((n) => !n.isRead).length;

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
  if (dropdownOpen.value && !notifications.value.length) {
    fetchNotifications();
  }
}

function openDetails(n: any) {
  selected.value = n;
  dropdownOpen.value = false;
  if (!n.isRead) markRead(n.id);
}

function closeModal() {
  selected.value = null;
}

function onClickOutside(e: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
    dropdownOpen.value = false;
  }
}

onMounted(() => {
  fetchNotifications();
  document.addEventListener('click', onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<template>
  <div class="notif-root" ref="rootEl">
    <button class="icon-btn" type="button" @click.stop="toggleDropdown">
      <span class="material-symbols-outlined">notifications</span>
      <span v-if="unreadCount()" class="badge">{{ unreadCount() }}</span>
    </button>

    <transition name="dropdown-fade">
      <div v-if="dropdownOpen" class="dropdown">
        <header class="dropdown__header">
          <span class="label-sm title">{{ $t('nav.notifications') }}</span>
          <button
            v-if="notifications.length"
            type="button"
            class="mark-all"
            @click="markAllRead"
          >
            {{ $t('account.notifications.markAllRead') }}
          </button>
        </header>

        <div class="dropdown__body">
          <p v-if="isLoading" class="empty body-sm">{{ $t('common.loading') }}</p>
          <p v-else-if="!notifications.length" class="empty body-sm">
            {{ $t('account.notifications.empty') }}
          </p>
          <button
            v-else
            v-for="n in notifications"
            :key="n.id"
            type="button"
            class="notif-item"
            :class="{ unread: !n.isRead }"
            @click="openDetails(n)"
          >
            <span class="notif-item__title body-sm">{{ n.title }}</span>
            <span class="notif-item__message body-sm">{{ n.message }}</span>
            <span class="notif-item__date">{{ formatDateTime(n.createdAt) }}</span>
          </button>
        </div>
      </div>
    </transition>

    <AppModal :open="!!selected" :title="selected?.title" @close="closeModal">
      <p class="modal-message body-md">{{ selected?.message }}</p>
      <p v-if="selected" class="modal-date">{{ formatDateTime(selected.createdAt) }}</p>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.notif-root {
  position: relative;
  display: flex;
}

.icon-btn {
  position: relative;
  display: flex;
  color: var(--color-on-surface-variant);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }

  .material-symbols-outlined {
    font-size: 24px;
  }
}

.badge {
  position: absolute;
  top: -6px;
  right: -8px;
  z-index: 2;
  background: var(--color-primary);
  color: #ffffff;
  font-family: var(--font-body);
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  pointer-events: none;
}

.dropdown {
  position: absolute;
  top: calc(100% + 14px);
  right: -10px;
  width: 320px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-container-lowest);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  box-shadow: 0 12px 32px rgba(34, 25, 28, 0.14);
  z-index: 60;
  overflow: hidden;
}

.dropdown__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-hairline);

  .title {
    color: var(--color-on-surface-variant);
  }
}

.mark-all {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 600;
}

.dropdown__body {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.empty {
  padding: 20px 16px;
  color: var(--color-on-surface-variant);
  text-align: center;
}

.notif-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 16px;
  border: none;
  border-bottom: 1px solid var(--color-hairline);
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--color-surface-container-low);
  }

  &.unread {
    background: var(--color-surface-container-low);
  }

  &__title {
    font-weight: 600;
    color: var(--color-on-surface);
  }

  &__message {
    color: var(--color-on-surface-variant);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__date {
    font-size: 11px;
    color: var(--color-on-surface-variant);
    margin-top: 2px;
  }
}

.modal-message {
  color: var(--color-on-surface);
  white-space: pre-wrap;
}

.modal-date {
  margin-top: 12px;
  font-size: 12px;
  color: var(--color-on-surface-variant);
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
