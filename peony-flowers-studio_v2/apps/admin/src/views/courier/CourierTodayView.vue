<script setup lang="ts">
import { onMounted } from 'vue';
import { useCourier } from '../../composables/useCourier';
import AppButton from '../../components/ui/AppButton.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { deliveries, isLoading, fetchToday, markDelivered } = useCourier();
onMounted(fetchToday);
</script>

<template>
  <div class="page">
    <h1>Bugungi yetkazishlar</h1>
    <AppSpinner v-if="isLoading" />
    <p v-else-if="!deliveries.length">Bugun yetkazish uchun buyurtmalar yo'q</p>
    <div v-else class="list">
      <div v-for="order in deliveries" :key="order.id" class="delivery-card">
        <div class="header">
          <strong>#{{ order.id.slice(-8) }}</strong>
          <span>{{ order.deliveryTime }}</span>
        </div>
        <p>{{ order.user?.fullName }} — {{ order.user?.phone }}</p>
        <p class="address">
          {{ order.address?.city }}, {{ order.address?.district }}, {{ order.address?.street }} {{ order.address?.house }}
        </p>
        <AppButton @click="markDelivered(order.id)">Yetkazildi deb belgilash</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.delivery-card {
  background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px;
}
.header { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: var(--text-secondary); }
.address { color: var(--text-secondary); font-size: 13px; margin-bottom: 12px; }
</style>
