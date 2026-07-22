<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useAddresses } from '../../composables/useAddresses';
import AddressCard from '../../components/account/AddressCard.vue';
import AppModal from '../../components/ui/AppModal.vue';
import AppInput from '../../components/ui/AppInput.vue';
import AppButton from '../../components/ui/AppButton.vue';

const { addresses, fetchAddresses, createAddress, updateAddress, deleteAddress } = useAddresses();
onMounted(fetchAddresses);

const modalOpen = ref(false);
const editingId = ref<string | null>(null);
const form = reactive({ label: '', city: '', district: '', street: '', house: '' });

function openCreate() {
  editingId.value = null;
  Object.assign(form, { label: '', city: '', district: '', street: '', house: '' });
  modalOpen.value = true;
}

function openEdit(id: string) {
  const address = addresses.value.find((a: any) => a.id === id);
  if (!address) return;
  editingId.value = id;
  Object.assign(form, address);
  modalOpen.value = true;
}

async function save() {
  if (editingId.value) await updateAddress(editingId.value, form);
  else await createAddress(form);
  modalOpen.value = false;
}
</script>

<template>
  <div class="header">
    <h1 class="headline-md">{{ $t('account.addresses.title') }}</h1>
    <AppButton @click="openCreate">{{ $t('account.addresses.addNew') }}</AppButton>
  </div>
  <div class="list">
    <AddressCard
      v-for="address in addresses"
      :key="address.id"
      :address="address"
      @edit="openEdit"
      @remove="deleteAddress"
    />
  </div>

  <AppModal :open="modalOpen" :title="$t('account.addresses.modalTitle')" @close="modalOpen = false">
    <form class="form" @submit.prevent="save">
      <AppInput v-model="form.label" :label="$t('account.addresses.labelField')" />
      <AppInput v-model="form.city" :label="$t('account.addresses.city')" />
      <AppInput v-model="form.district" :label="$t('account.addresses.district')" />
      <AppInput v-model="form.street" :label="$t('account.addresses.street')" />
      <AppInput v-model="form.house" :label="$t('account.addresses.house')" />
      <AppButton type="submit">{{ $t('account.addresses.save') }}</AppButton>
    </form>
  </AppModal>
</template>

<style scoped lang="scss">
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.list { display: flex; flex-direction: column; gap: 12px; }
.form { display: flex; flex-direction: column; gap: 12px; min-width: 320px; }
</style>
