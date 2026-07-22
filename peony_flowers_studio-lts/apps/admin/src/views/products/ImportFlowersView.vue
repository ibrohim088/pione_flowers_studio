<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useFlowerImport, type FlowerSearchResultItem } from '../../composables/useFlowerImport';
import { useAdminProducts } from '../../composables/useAdminProducts';
import { useAdminCategories } from '../../composables/useAdminCategories';
import AppButton from '../../components/ui/AppButton.vue';
import AppInput from '../../components/ui/AppInput.vue';
import AppTextarea from '../../components/ui/AppTextarea.vue';
import AppSelect from '../../components/ui/AppSelect.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';
import AppModal from '../../components/ui/AppModal.vue';

const { results, isSearching, isLoadingDetail, error, search, getDetail } = useFlowerImport();
const { createProduct } = useAdminProducts();
const { categories, fetchAll: fetchCategories } = useAdminCategories();

fetchCategories();

const query = ref('');
const modalOpen = ref(false);
const activeExternalId = ref<number | null>(null);
const saving = ref(false);
const savedIds = ref<Set<number>>(new Set());

const form = reactive({
  categoryId: '',
  title: '',
  description: '',
  type: 'Flower',
  price: 0,
  discountPrice: 0,
  stock: 10,
  images: [] as string[],
});

function handleSearch() {
  if (query.value.trim().length < 2) return;
  search(query.value);
}

async function openFlower(item: FlowerSearchResultItem) {
  activeExternalId.value = item.externalId;
  const detail = await getDetail(item.externalId);
  if (!detail) return;

  Object.assign(form, {
    categoryId: '',
    title: detail.title,
    description: detail.description,
    type: detail.suggestedType,
    price: 0,
    discountPrice: 0,
    stock: 10,
    images: detail.images,
  });
  modalOpen.value = true;
}

async function save() {
  if (!form.categoryId) return;
  saving.value = true;
  try {
    const payload = {
      ...form,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
      stock: Number(form.stock),
    };
    await createProduct(payload);
    if (activeExternalId.value !== null) savedIds.value.add(activeExternalId.value);
    modalOpen.value = false;
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Gullar importi</h1>
    </div>
    <p class="hint">
      Tashqi ma'lumotlar bazasidan (Perenual) gul qidiring, ustiga bosing — nomi, tavsifi va rasmi
      avtomatik to'ldiriladi. Kategoriya va narxni tanlab, "Mahsulot sifatida saqlash" tugmasini bosing.
    </p>

    <form class="search-bar" @submit.prevent="handleSearch">
      <AppInput v-model="query" placeholder="Masalan: rose, tulip, peony..." />
      <AppButton type="submit">Qidirish</AppButton>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <AppSpinner v-if="isSearching" />

    <div v-else class="grid">
      <button
        v-for="item in results"
        :key="item.externalId"
        class="card"
        :class="{ saved: savedIds.has(item.externalId) }"
        :disabled="isLoadingDetail && activeExternalId === item.externalId"
        @click="openFlower(item)"
      >
        <div class="thumb">
          <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.commonName" />
          <span v-else class="no-image">rasm yo'q</span>
        </div>
        <strong>{{ item.commonName }}</strong>
        <span class="scientific">{{ item.scientificName.join(', ') }}</span>
        <span v-if="savedIds.has(item.externalId)" class="badge">Saqlangan ✓</span>
        <span v-else-if="isLoadingDetail && activeExternalId === item.externalId" class="badge loading">
          Yuklanmoqda...
        </span>
      </button>
    </div>

    <AppModal :open="modalOpen" title="Mahsulot sifatida saqlash" @close="modalOpen = false">
      <form class="form" @submit.prevent="save">
        <div v-if="form.images[0]" class="preview">
          <img :src="form.images[0]" alt="" />
        </div>
        <AppSelect
          v-model="form.categoryId"
          label="Kategoriya"
          :options="categories.map((c: any) => ({ label: c.name, value: c.id }))"
        />
        <AppInput v-model="form.title" label="Nomi" />
        <AppTextarea v-model="form.description" label="Tavsif" />
        <AppInput v-model="form.type" label="Turi (Bouquet, Flower, ChocolateBox, Souvenir)" />
        <AppInput v-model="form.price as any" label="Narx" type="number" />
        <AppInput v-model="form.discountPrice as any" label="Chegirma narxi (ixtiyoriy)" type="number" />
        <AppInput v-model="form.stock as any" label="Stok" type="number" />

        <AppButton type="submit" :disabled="saving || !form.categoryId">
          {{ saving ? 'Saqlanmoqda...' : "Mahsulot sifatida saqlash" }}
        </AppButton>
      </form>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.hint { color: var(--text-secondary); font-size: 13px; margin-bottom: 20px; max-width: 640px; }
.search-bar { display: flex; gap: 10px; margin-bottom: 24px; max-width: 480px; }
.error { color: var(--danger, #c0392b); margin-bottom: 16px; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 14px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-primary);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease;

  &:hover { border-color: var(--accent-dark); }
  &.saved { border-color: var(--accent-dark); background: var(--accent-light); }
  &:disabled { opacity: 0.6; cursor: wait; }
}

.thumb {
  width: 100%;
  height: 110px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-sidebar);
  display: flex;
  align-items: center;
  justify-content: center;

  img { width: 100%; height: 100%; object-fit: cover; }
  .no-image { font-size: 11px; color: var(--text-secondary); }
}

.scientific { font-size: 11px; color: var(--text-secondary); font-style: italic; }
.badge { font-size: 11px; color: var(--accent-dark); font-weight: 500; }

.form { display: flex; flex-direction: column; gap: 14px; width: 400px; }
.preview img { width: 100%; height: 160px; object-fit: cover; border-radius: 8px; }
</style>
