<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useAddresses } from '../../composables/useAddresses';
import AccountSidebar from '../../components/layout/AccountSidebar.vue';
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
  <div class="account-layout">
    <AccountSidebar />
    <div class="content">
      <div class="header">
        <h1>Manzillarim</h1>
        <AppButton @click="openCreate">+ Yangi manzil</AppButton>
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
    </div>

    <AppModal :open="modalOpen" title="Manzil" @close="modalOpen = false">
      <form class="form" @submit.prevent="save">
        <AppInput v-model="form.label" label="Nomi (Uy, Ish)" />
        <AppInput v-model="form.city" label="Shahar" />
        <AppInput v-model="form.district" label="Tuman" />
        <AppInput v-model="form.street" label="Ko'cha" />
        <AppInput v-model="form.house" label="Uy raqami" />
        <AppButton type="submit">Saqlash</AppButton>
      </form>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.account-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; padding: 32px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.list { display: flex; flex-direction: column; gap: 12px; }
.form { display: flex; flex-direction: column; gap: 12px; min-width: 320px; }
</style>
