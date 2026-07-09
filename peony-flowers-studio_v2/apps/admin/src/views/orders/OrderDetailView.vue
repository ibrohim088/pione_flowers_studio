<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../../lib/api';
import { useAdminOrders } from '../../composables/useAdminOrders';
import { formatPrice, formatDateTime } from '../../lib/utils';
import AppSelect from '../../components/ui/AppSelect.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';
import AppBadge from '../../components/ui/AppBadge.vue';

const route = useRoute();
const { updateStatus } = useAdminOrders();
const order = ref<any>(null);
const isLoading = ref(false);
const isUpdatingStatus = ref(false);
const statusError = ref<string | null>(null);

const STATUS_LABELS: Record<string, string> = {
  pending: 'Kutilmoqda',
  confirmed: 'Tasdiqlandi',
  preparing: 'Tayyorlanmoqda',
  ready: 'Tayyor',
  delivering: 'Yetkazilmoqda',
  delivered: 'Yetkazildi',
  cancelled: 'Bekor qilindi',
};

// Backenddagi ORDER_STATUS_TRANSITIONS bilan bir xil — faqat haqiqatan
// ruxsat etilgan keyingi statuslar ko'rsatiladi, aks holda server 400
// qaytaradi va tanlov "ishlamay qoladi".
const ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['preparing', 'cancelled'],
  preparing: ['ready', 'cancelled'],
  ready: ['delivering', 'cancelled'],
  delivering: ['delivered'],
  delivered: [],
  cancelled: [],
};

const statusOptions = computed(() => {
  if (!order.value) return [];
  const current = order.value.status as string;
  const next = ORDER_STATUS_TRANSITIONS[current] ?? [];
  const values = [current, ...next];
  return values.map((value) => ({ label: STATUS_LABELS[value] ?? value, value }));
});

async function load() {
  isLoading.value = true;
  try {
    const { data } = await api.get(`/orders/${route.params.id}`);
    order.value = data.data;
  } finally {
    isLoading.value = false;
  }
}

onMounted(load);

async function changeStatus(status: string) {
  if (!order.value || status === order.value.status) return;
  statusError.value = null;
  isUpdatingStatus.value = true;
  try {
    await updateStatus(order.value.id, status);
    await load();
  } catch (err: any) {
    statusError.value = err.response?.data?.message ?? 'Statusni o\'zgartirib bo\'lmadi';
  } finally {
    isUpdatingStatus.value = false;
  }
}
</script>

<template>
  <div class="page">
    <AppSpinner v-if="isLoading" />
    <template v-else-if="order">
      <h1>Buyurtma #{{ order.id.slice(-8) }}</h1>
      <p>{{ formatDateTime(order.createdAt) }}</p>

      <div class="section">
        <strong>Mijoz:</strong> {{ order.user?.fullName }} ({{ order.user?.phone }})
      </div>

      <div class="section">
        <strong>Status:</strong>
        <AppSelect :model-value="order.status" :options="statusOptions" @update:model-value="changeStatus" />
        <p v-if="isUpdatingStatus" class="status-hint">Yangilanmoqda...</p>
        <p v-if="statusError" class="status-error">{{ statusError }}</p>
      </div>

      <div class="section">
        <strong>To'lov:</strong> <AppBadge>{{ order.paymentStatus }}</AppBadge> ({{ order.paymentMethod }})
      </div>

      <div class="items">
        <div v-for="item in order.items" :key="item.id" class="item">
          <span>{{ item.product.title }} × {{ item.quantity }}</span>
          <span>{{ formatPrice(item.price * item.quantity) }}</span>
        </div>
      </div>

      <div class="total">Jami: {{ formatPrice(order.total) }}</div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.section { margin: 16px 0; }
.status-hint { font-size: 13px; color: var(--text-secondary); margin-top: 4px; }
.status-error { font-size: 13px; color: var(--danger); margin-top: 4px; }
.items { margin: 20px 0; display: flex; flex-direction: column; gap: 8px; }
.item { display: flex; justify-content: space-between; }
.total { font-size: 18px; font-weight: 700; color: var(--accent); }
</style>