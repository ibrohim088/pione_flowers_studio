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
  { key: 'nameUz', label: 'Nomi' },
  { key: 'slug', label: 'Slug' },
  { key: 'actions', label: '' },
];

const modalOpen = ref(false);
const editingId = ref<string | null>(null);
const form = reactive({ name: '' });

function openCreate() {
  editingId.value = null;
  form.name = '';
  modalOpen.value = true;
}

function openEdit(cat: any) {
  editingId.value = cat.id;
  form.name = cat.nameUz;
  modalOpen.value = true;
}

async function save() {
  if (editingId.value) await updateCategory(editingId.value, form);
  else await createCategory(form);
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
        <AppInput v-model="form.name" label="Nomi" />
        <AppButton type="submit">Saqlash</AppButton>
      </form>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.form { display: flex; flex-direction: column; gap: 14px; width: 320px; }
</style>