<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboard } from '../../composables/useDashboard';
import { formatPrice } from '../../lib/utils';
import AppCard from '../../components/ui/AppCard.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';
import SimpleBarChart from '../../components/charts/SimpleBarChart.vue';
import SimpleLineChart from '../../components/charts/SimpleLineChart.vue';

const { data, isLoading, fetchDashboard } = useDashboard();
onMounted(() => fetchDashboard(30));
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <AppSpinner v-if="isLoading" />
    <template v-else-if="data">
      <div class="stats">
        <AppCard title="Daromad (30 kun)" :value="formatPrice(data.overview.totalRevenue)" icon="💰" />
        <AppCard title="Buyurtmalar" :value="String(data.overview.totalOrders)" icon="📦" />
        <AppCard title="Mijozlar" :value="String(data.overview.totalUsers)" icon="👥" />
        <AppCard title="Faol mahsulotlar" :value="String(data.overview.activeProducts)" icon="🌸" />
      </div>

      <div class="charts">
        <div class="chart-block">
          <h2>Daromad dinamikasi</h2>
          <SimpleLineChart :points="data.revenue" />
        </div>
        <div class="chart-block">
          <h2>Buyurtmalar statusi</h2>
          <SimpleBarChart :data="data.orders.map((o: any) => ({ label: o.status, value: o.count }))" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0; }
.charts { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.chart-block {
  background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px;
}
h2 { font-size: 16px; margin-bottom: 16px; }
</style>
