<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useAdminUsers } from '../../composables/useAdminUsers';
import AppTable from '../../components/ui/AppTable.vue';
import AppSelect from '../../components/ui/AppSelect.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppBadge from '../../components/ui/AppBadge.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';
import AppModal from '../../components/ui/AppModal.vue';
import AppInput from '../../components/ui/AppInput.vue';

const { users, isLoading, fetchAll, updateUser, deleteUser, createStaff } = useAdminUsers();
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

const staffRoleOptions = [
  { label: 'Florist', value: 'florist' },
  { label: 'Kuryer', value: 'courier' },
  { label: 'Admin', value: 'admin' },
];

async function changeRole(id: string, role: string) {
  await updateUser(id, { role });
}

const modalOpen = ref(false);
const isSaving = ref(false);
const error = ref('');
const form = reactive({ phone: '+998', fullName: '', role: 'florist' });

function openCreate() {
  Object.assign(form, { phone: '+998', fullName: '', role: 'florist' });
  error.value = '';
  modalOpen.value = true;
}

async function saveStaff() {
  error.value = '';
  isSaving.value = true;
  try {
    await createStaff({ ...form });
    modalOpen.value = false;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Xatolik yuz berdi';
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Foydalanuvchilar</h1>
      <AppButton @click="openCreate">+ Yangi xodim</AppButton>
    </div>

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

    <AppModal :open="modalOpen" title="Yangi xodim qo'shish" @close="modalOpen = false">
      <form class="form" @submit.prevent="saveStaff">
        <AppInput v-model="form.phone" label="Telefon raqam" placeholder="+998901234567" />
        <AppInput v-model="form.fullName" label="Ism familiya" placeholder="Ism Familiya" />
        <AppSelect v-model="form.role" label="Rol" :options="staffRoleOptions" />
        <p v-if="error" class="error">{{ error }}</p>
        <AppButton type="submit" :loading="isSaving">Saqlash</AppButton>
      </form>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error {
  color: var(--danger);
  font-size: 13px;
  margin: 0;
}
</style>

<!-- <script setup lang="ts">
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
</template> -->
