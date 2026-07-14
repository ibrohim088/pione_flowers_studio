<script setup lang="ts">
import { onMounted } from 'vue';
import { useNotifications } from '../../composables/useNotifications';
import NotificationItem from '../../components/account/NotificationItem.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { notifications, isLoading, fetchNotifications, markRead, markAllRead } = useNotifications();
onMounted(fetchNotifications);
</script>

<template>
  <div class="header">
    <h1 class="headline-md">{{ $t('account.notifications.title') }}</h1>
    <AppButton variant="outline" @click="markAllRead">{{ $t('account.notifications.markAllRead') }}</AppButton>
  </div>
  <AppSpinner v-if="isLoading" />
  <p v-else-if="!notifications.length" class="empty body-md">{{ $t('account.notifications.empty') }}</p>
  <div v-else class="list">
    <NotificationItem
      v-for="n in notifications"
      :key="n.id"
      :notification="n"
      @read="markRead"
    />
  </div>
</template>

<style scoped lang="scss">
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.empty { color: var(--color-on-surface-variant); }
.list { display: flex; flex-direction: column; gap: 10px; }
</style>