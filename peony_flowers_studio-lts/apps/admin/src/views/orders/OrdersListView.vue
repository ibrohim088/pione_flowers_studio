<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAdminOrders } from '../../composables/useAdminOrders';
import { formatPrice, formatDateTime } from '../../lib/utils';
import AppTable from '../../components/ui/AppTable.vue';
import AppBadge from '../../components/ui/AppBadge.vue';
import AppSelect from '../../components/ui/AppSelect.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { orders, isLoading, fetchAll } = useAdminOrders();
onMounted(() => fetchAll());

const statusFilter = ref('');

function applyFilter() {
  fetchAll({ status: statusFilter.value || undefined });
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'user', label: 'Mijoz' },
  { key: 'total', label: 'Summa' },
  { key: 'status', label: 'Status' },
  { key: 'paymentStatus', label: "To'lov" },
  { key: 'createdAt', label: 'Sana' },
];

const statusOptions = [
  { label: 'Barchasi', value: '' },
  { label: 'Kutilmoqda', value: 'pending' },
  { label: 'Tasdiqlandi', value: 'confirmed' },
  { label: 'Tayyorlanmoqda', value: 'preparing' },
  { label: 'Tayyor', value: 'ready' },
  { label: 'Yetkazilmoqda', value: 'delivering' },
  { label: 'Yetkazildi', value: 'delivered' },
  { label: 'Bekor qilindi', value: 'cancelled' },
];
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Buyurtmalar</h1>
      <AppSelect v-model="statusFilter" :options="statusOptions" @update:model-value="applyFilter" />
    </div>

    <AppSpinner v-if="isLoading" />
    <AppTable v-else :columns="columns" :rows="orders">
      <template #id="{ row }">
        <RouterLink :to="`/orders/${row.id}`">#{{ row.id.slice(-8) }}</RouterLink>
      </template>
      <template #user="{ row }">{{ row.user?.fullName || row.user?.phone }}</template>
      <template #total="{ row }">{{ formatPrice(row.total) }}</template>
      <template #status="{ row }"><AppBadge>{{ row.status }}</AppBadge></template>
      <template #paymentStatus="{ row }"><AppBadge variant="info">{{ row.paymentStatus }}</AppBadge></template>
      <template #createdAt="{ row }">{{ formatDateTime(row.createdAt) }}</template>
    </AppTable>
  </div>
</template>

<style scoped lang="scss">
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
</style>
