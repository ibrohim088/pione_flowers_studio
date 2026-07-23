<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useAdminCategories } from '../../composables/useAdminCategories';
import AppTable from '../../components/ui/AppTable.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppModal from '../../components/ui/AppModal.vue';
import AppInput from '../../components/ui/AppInput.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { categories, isLoading, fetchAll, createCategory, updateCategory, deleteCategory } = useAdminCategories();
onMounted(fetchAll);

const columns = [
  { key: 'nameUz', label: 'Nomi (UZ)' },
  { key: 'nameRu', label: 'Nomi (RU)' },
  { key: 'slug', label: 'Slug' },
  { key: 'actions', label: '' },
];

const modalOpen = ref(false);
const editingId = ref<string | null>(null);
const form = reactive({ nameUz: '', nameRu: '' });

function openCreate() {
  editingId.value = null;
  form.nameUz = '';
  form.nameRu = '';
  modalOpen.value = true;
}

function openEdit(cat: any) {
  editingId.value = cat.id;
  form.nameUz = cat.nameUz;
  form.nameRu = cat.nameRu || '';
  modalOpen.value = true;
}

async function save() {
  const payload = { nameUz: form.nameUz, nameRu: form.nameRu || undefined };
  if (editingId.value) await updateCategory(editingId.value, payload);
  else await createCategory(payload);
  modalOpen.value = false;
}
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Kategoriyalar</h1>
      <AppButton @click="openCreate">+ Yangi kategoriya</AppButton>
    </div>

    <AppSpinner v-if="isLoading" />
    <AppTable v-else :columns="columns" :rows="categories">
      <template #actions="{ row }">
        <AppButton variant="secondary" @click="openEdit(row)">Tahrirlash</AppButton>
        <AppButton variant="danger" @click="deleteCategory(row.id)">O'chirish</AppButton>
      </template>
    </AppTable>

    <AppModal :open="modalOpen" title="Kategoriya" @close="modalOpen = false">
      <form class="form" @submit.prevent="save">
        <AppInput v-model="form.nameUz" label="Nomi (UZ)" />
        <AppInput v-model="form.nameRu" label="Nomi (RU)" />
        <AppButton type="submit">Saqlash</AppButton>
      </form>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.form { display: flex; flex-direction: column; gap: 14px; width: 320px; }
</style>