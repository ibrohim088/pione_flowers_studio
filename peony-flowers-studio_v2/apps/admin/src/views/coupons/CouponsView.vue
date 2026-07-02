<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useAdminCoupons } from '../../composables/useAdminCoupons';
import { formatDate } from '../../lib/utils';
import AppTable from '../../components/ui/AppTable.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppModal from '../../components/ui/AppModal.vue';
import AppInput from '../../components/ui/AppInput.vue';
import AppSelect from '../../components/ui/AppSelect.vue';
import AppBadge from '../../components/ui/AppBadge.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { coupons, isLoading, fetchAll, createCoupon, deleteCoupon } = useAdminCoupons();
onMounted(fetchAll);

const columns = [
  { key: 'code', label: 'Kod' },
  { key: 'discountType', label: 'Turi' },
  { key: 'discountValue', label: 'Qiymati' },
  { key: 'usedCount', label: 'Ishlatilgan' },
  { key: 'expiresAt', label: 'Muddati' },
  { key: 'actions', label: '' },
];

const modalOpen = ref(false);
const form = reactive({
  code: '', discountType: 'percent', discountValue: 10, minOrderTotal: 0, usageLimit: 0, expiresAt: '',
});

async function save() {
  await createCoupon({
    ...form,
    discountValue: Number(form.discountValue),
    minOrderTotal: Number(form.minOrderTotal),
    usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
    expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : undefined,
  });
  modalOpen.value = false;
}
</script>

<template>
  <div class="page">
    <div class="header">
      <h1>Kuponlar</h1>
      <AppButton @click="modalOpen = true">+ Yangi kupon</AppButton>
    </div>

    <AppSpinner v-if="isLoading" />
    <AppTable v-else :columns="columns" :rows="coupons">
      <template #discountValue="{ row }">{{ row.discountValue }}{{ row.discountType === 'percent' ? '%' : " so'm" }}</template>
      <template #expiresAt="{ row }">
        <AppBadge v-if="!row.expiresAt" variant="info">Cheksiz</AppBadge>
        <span v-else>{{ formatDate(row.expiresAt) }}</span>
      </template>
      <template #actions="{ row }">
        <AppButton variant="danger" @click="deleteCoupon(row.id)">O'chirish</AppButton>
      </template>
    </AppTable>

    <AppModal :open="modalOpen" title="Yangi kupon" @close="modalOpen = false">
      <form class="form" @submit.prevent="save">
        <AppInput v-model="form.code" label="Kod (masalan: SUMMER10)" />
        <AppSelect v-model="form.discountType" label="Turi" :options="[{ label: 'Foiz', value: 'percent' }, { label: 'Belgilangan summa', value: 'fixed' }]" />
        <AppInput v-model="form.discountValue as any" label="Qiymati" type="number" />
        <AppInput v-model="form.minOrderTotal as any" label="Min buyurtma summasi" type="number" />
        <AppInput v-model="form.usageLimit as any" label="Ishlatish limiti (ixtiyoriy)" type="number" />
        <AppInput v-model="form.expiresAt" label="Amal qilish muddati" type="date" />
        <AppButton type="submit">Yaratish</AppButton>
      </form>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.form { display: flex; flex-direction: column; gap: 14px; width: 340px; }
</style>
