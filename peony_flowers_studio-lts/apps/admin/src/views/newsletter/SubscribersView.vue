<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAdminNewsletter } from '../../composables/useAdminNewsletter';
import AppTable from '../../components/ui/AppTable.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';
import AppInput from '../../components/ui/AppInput.vue';
import { formatDateTime } from '../../lib/utils';

const { subscribers, isLoading, fetchAll } = useAdminNewsletter();
onMounted(() => fetchAll());

const search = ref('');

const filtered = computed(() => {
  if (!search.value.trim()) return subscribers.value;
  const q = search.value.replace(/\D/g, '');
  return subscribers.value.filter((s) => s.phone.replace(/\D/g, '').includes(q));
});

const columns = [
  { key: 'phone', label: 'Telefon raqam' },
  { key: 'createdAt', label: "Qo'shilgan sana" },
];

function exportCsv() {
  const rows = [['Telefon', "Qo'shilgan sana"], ...filtered.value.map((s) => [s.phone, s.createdAt])];
  const csv = rows.map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'newsletter-subscribers.csv';
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Obunachilar</h1>
      <div class="header-actions">
        <span class="count">Jami: {{ subscribers.length }}</span>
        <button class="export-btn" @click="exportCsv" :disabled="!filtered.length">CSV yuklab olish</button>
      </div>
    </div>

    <AppInput v-model="search" v-autofocus placeholder="Telefon raqam bo'yicha qidirish" class="search" />

    <AppSpinner v-if="isLoading" />
    <template v-else>
      <AppTable v-if="filtered.length" :columns="columns" :rows="filtered">
        <template #phone="{ row }">{{ row.phone }}</template>
        <template #createdAt="{ row }">{{ formatDateTime(row.createdAt) }}</template>
      </AppTable>
      <p v-else class="empty">Hozircha obunachilar yo'q</p>
    </template>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.count {
  font-size: 13px;
  color: var(--text-secondary);
}

.export-btn {
  border: 1px solid var(--border);
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background: var(--accent-light);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.search {
  max-width: 320px;
  margin-bottom: 16px;
}

.empty {
  color: var(--text-secondary);
  font-size: 14px;
  padding: 24px 0;
  text-align: center;
}
</style>
