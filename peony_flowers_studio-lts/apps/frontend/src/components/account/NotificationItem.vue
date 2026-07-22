<script setup lang="ts">
import { formatDate } from '../../lib/utils';

defineProps<{ notification: any }>();
defineEmits<{ read: [id: string] }>();
</script>

<template>
  <div class="notif" :class="{ unread: !notification.isRead }" @click="$emit('read', notification.id)">
    <p class="title">{{ notification.title }}</p>
    <p class="message">{{ notification.message }}</p>
    <span class="date">{{ formatDate(notification.createdAt) }}</span>
  </div>
</template>

<style scoped lang="scss">
.notif {
  padding: 14px; border-radius: var(--radius);
  border: 1px solid var(--border);
  cursor: pointer;
  &.unread { background: var(--accent-light); }
}
.title { font-weight: 600; }
.message { color: var(--text-secondary); font-size: 14px; }
.date { font-size: 12px; color: var(--text-secondary); }
</style>
