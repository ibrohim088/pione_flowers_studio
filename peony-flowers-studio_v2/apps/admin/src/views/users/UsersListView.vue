<script setup lang="ts">
import { onMounted } from 'vue';
import { useAdminUsers } from '../../composables/useAdminUsers';
import AppTable from '../../components/ui/AppTable.vue';
import AppSelect from '../../components/ui/AppSelect.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppBadge from '../../components/ui/AppBadge.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { users, isLoading, fetchAll, updateUser, deleteUser } = useAdminUsers();
onMounted(() => fetchAll());

const columns = [
  { key: 'fullName', label: 'Ism' },
  { key: 'phone', label: 'Telefon' },
  { key: 'role', label: 'Rol' },
  { key: 'isActive', label: 'Holat' },
  { key: 'actions', label: '' },
];

const roleOptions = [
  { label: 'Mijoz', value: 'customer' },
  { label: 'Florist', value: 'florist' },
  { label: 'Kuryer', value: 'courier' },
  { label: 'Admin', value: 'admin' },
];

async function changeRole(id: string, role: string) {
  await updateUser(id, { role });
}
</script>

<template>
  <div class="page">
    <h1>Foydalanuvchilar</h1>
    <AppSpinner v-if="isLoading" />
    <AppTable v-else :columns="columns" :rows="users">
      <template #fullName="{ row }">{{ row.fullName || '—' }}</template>
      <template #role="{ row }">
        <AppSelect :model-value="row.role" :options="roleOptions" @update:model-value="(v) => changeRole(row.id, v)" />
      </template>
      <template #isActive="{ row }">
        <AppBadge :variant="row.isActive ? 'success' : 'danger'">{{ row.isActive ? 'Faol' : 'Bloklangan' }}</AppBadge>
      </template>
      <template #actions="{ row }">
        <AppButton variant="danger" @click="deleteUser(row.id)">Bloklash</AppButton>
      </template>
    </AppTable>
  </div>
</template>
