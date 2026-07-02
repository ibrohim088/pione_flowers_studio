<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useAdminProducts } from '../../composables/useAdminProducts';
import { useAdminCategories } from '../../composables/useAdminCategories';
import { formatPrice } from '../../lib/utils';
import AppTable from '../../components/ui/AppTable.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppModal from '../../components/ui/AppModal.vue';
import AppInput from '../../components/ui/AppInput.vue';
import AppTextarea from '../../components/ui/AppTextarea.vue';
import AppSelect from '../../components/ui/AppSelect.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { products, isLoading, fetchAll, createProduct, updateProduct, deleteProduct, uploadImage } = useAdminProducts();
const { categories, fetchAll: fetchCategories } = useAdminCategories();

onMounted(() => {
  fetchAll();
  fetchCategories();
});

const columns = [
  { key: 'title', label: 'Nomi' },
  { key: 'category', label: 'Kategoriya' },
  { key: 'price', label: 'Narx' },
  { key: 'stock', label: 'Stok' },
  { key: 'actions', label: '' },
];

const modalOpen = ref(false);
const editingId = ref<string | null>(null);
const uploading = ref(false);
const form = reactive({
  categoryId: '', title: '', description: '', type: 'Bouquet',
  price: 0, discountPrice: 0, stock: 0, images: [] as string[],
});

function openCreate() {
  editingId.value = null;
  Object.assign(form, { categoryId: '', title: '', description: '', type: 'Bouquet', price: 0, discountPrice: 0, stock: 0, images: [] });
  modalOpen.value = true;
}

function openEdit(product: any) {
  editingId.value = product.id;
  Object.assign(form, {
    categoryId: product.categoryId,
    title: product.title,
    description: product.description || '',
    type: product.type,
    price: product.price,
    discountPrice: product.discountPrice || 0,
    stock: product.stock,
    images: product.images?.map((i: any) => i.url) || [],
  });
  modalOpen.value = true;
}

async function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploading.value = true;
  try {
    const url = await uploadImage(file);
    form.images.push(url);
  } finally {
    uploading.value = false;
  }
}

async function save() {
  const payload = {
    ...form,
    price: Number(form.price),
    discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
    stock: Number(form.stock),
  };
  if (editingId.value) await updateProduct(editingId.value, payload);
  else await createProduct(payload);
  modalOpen.value = false;
}
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Mahsulotlar</h1>
      <AppButton @click="openCreate">+ Yangi mahsulot</AppButton>
    </div>

    <AppSpinner v-if="isLoading" />
    <AppTable v-else :columns="columns" :rows="products">
      <template #category="{ row }">{{ row.category?.name }}</template>
      <template #price="{ row }">{{ formatPrice(row.discountPrice ?? row.price) }}</template>
      <template #actions="{ row }">
        <AppButton variant="secondary" @click="openEdit(row)">Tahrirlash</AppButton>
        <AppButton variant="danger" @click="deleteProduct(row.id)">O'chirish</AppButton>
      </template>
    </AppTable>

    <AppModal :open="modalOpen" :title="editingId ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'" @close="modalOpen = false">
      <form class="form" @submit.prevent="save">
        <AppSelect v-model="form.categoryId" label="Kategoriya" :options="categories.map((c: any) => ({ label: c.name, value: c.id }))" />
        <AppInput v-model="form.title" label="Nomi" />
        <AppTextarea v-model="form.description" label="Tavsif" />
        <AppInput v-model="form.type" label="Turi (Bouquet, Flower, ChocolateBox, Souvenir)" />
        <AppInput v-model="form.price as any" label="Narx" type="number" />
        <AppInput v-model="form.discountPrice as any" label="Chegirma narxi (ixtiyoriy)" type="number" />
        <AppInput v-model="form.stock as any" label="Stok" type="number" />

        <div class="images">
          <img v-for="(url, i) in form.images" :key="i" :src="url" />
          <label class="upload-btn">
            {{ uploading ? 'Yuklanmoqda...' : '+ Rasm' }}
            <input type="file" accept="image/*" hidden @change="handleFileUpload" />
          </label>
        </div>

        <AppButton type="submit">Saqlash</AppButton>
      </form>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.form { display: flex; flex-direction: column; gap: 14px; width: 400px; }
.images { display: flex; gap: 8px; flex-wrap: wrap; }
.images img { width: 60px; height: 60px; object-fit: cover; border-radius: 8px; }
.upload-btn {
  width: 60px; height: 60px; border: 1px dashed var(--border); border-radius: 8px;
  display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; text-align: center;
}
</style>
