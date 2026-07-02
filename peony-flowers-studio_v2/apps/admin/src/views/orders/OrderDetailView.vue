<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

const statusOptions = [
  { label: 'Kutilmoqda', value: 'pending' },
  { label: 'Tasdiqlandi', value: 'confirmed' },
  { label: 'Tayyorlanmoqda', value: 'preparing' },
  { label: 'Tayyor', value: 'ready' },
  { label: 'Yetkazilmoqda', value: 'delivering' },
  { label: 'Yetkazildi', value: 'delivered' },
  { label: 'Bekor qilindi', value: 'cancelled' },
];

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
  await updateStatus(order.value.id, status);
  await load();
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
.items { margin: 20px 0; display: flex; flex-direction: column; gap: 8px; }
.item { display: flex; justify-content: space-between; }
.total { font-size: 18px; font-weight: 700; color: var(--accent); }
</style>
