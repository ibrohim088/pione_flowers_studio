<script setup lang="ts">
import { onMounted } from 'vue';
import { useNotifications } from '../../composables/useNotifications';
import AccountSidebar from '../../components/layout/AccountSidebar.vue';
import NotificationItem from '../../components/account/NotificationItem.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { notifications, isLoading, fetchNotifications, markRead, markAllRead } = useNotifications();
onMounted(fetchNotifications);
</script>

<template>
  <div class="account-layout">
    <AccountSidebar />
    <div class="content">
      <div class="header">
        <h1>Bildirishnomalar</h1>
        <AppButton variant="outline" @click="markAllRead">Barchasini o'qilgan deb belgilash</AppButton>
      </div>
      <AppSpinner v-if="isLoading" />
      <p v-else-if="!notifications.length">Bildirishnomalar yo'q</p>
      <div v-else class="list">
        <NotificationItem
          v-for="n in notifications"
          :key="n.id"
          :notification="n"
          @read="markRead"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; padding: 32px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.list { display: flex; flex-direction: column; gap: 10px; }
</style>
