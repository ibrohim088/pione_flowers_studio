<script setup lang="ts">
import { onMounted } from 'vue';
import { useAdminPayments } from '../../composables/useAdminPayments';
import { formatPrice, formatDateTime } from '../../lib/utils';
import AppTable from '../../components/ui/AppTable.vue';
import AppBadge from '../../components/ui/AppBadge.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { transactions, isLoading, fetchHistory, confirmCash, rejectCash, refund } = useAdminPayments();
onMounted(() => fetchHistory());

const columns = [
  { key: 'order', label: 'Buyurtma' },
  { key: 'provider', label: 'Provider' },
  { key: 'amount', label: 'Summa' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Sana' },
  { key: 'actions', label: '' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'warning', paid: 'success', failed: 'danger', refunded: 'info',
};
</script>

<template>
  <div class="page">
    <h1>To'lovlar tarixi</h1>
    <AppSpinner v-if="isLoading" />
    <AppTable v-else :columns="columns" :rows="transactions">
      <template #order="{ row }">#{{ row.order?.id?.slice(-8) }} — {{ row.order?.user?.fullName }}</template>
      <template #amount="{ row }">{{ formatPrice(row.amount / 100) }}</template>
      <template #status="{ row }"><AppBadge :variant="statusVariant[row.status] || 'info'">{{ row.status }}</AppBadge></template>
      <template #createdAt="{ row }">{{ formatDateTime(row.createdAt) }}</template>
      <template #actions="{ row }">
        <template v-if="row.provider === 'cash' && row.status === 'pending'">
          <AppButton variant="primary" @click="confirmCash(row.orderId)">Tasdiqlash</AppButton>
          <AppButton variant="danger" @click="rejectCash(row.orderId)">Rad etish</AppButton>
        </template>
        <AppButton v-else-if="row.status === 'paid'" variant="secondary" @click="refund(row.id)">Qaytarish</AppButton>
      </template>
    </AppTable>
  </div>
</template>
