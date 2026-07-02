<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFlorist } from '../../composables/useFlorist';
import { formatDateTime } from '../../lib/utils';
import AppButton from '../../components/ui/AppButton.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';
import AppModal from '../../components/ui/AppModal.vue';

const { queue, isLoading, fetchQueue, markPrepared, uploadPhoto } = useFlorist();
onMounted(fetchQueue);

const modalOpen = ref(false);
const activeOrderId = ref<string | null>(null);
const uploading = ref(false);
const photoUrl = ref('');

function openPrepareModal(orderId: string) {
  activeOrderId.value = orderId;
  photoUrl.value = '';
  modalOpen.value = true;
}

async function handleUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  uploading.value = true;
  try {
    photoUrl.value = await uploadPhoto(file);
  } finally {
    uploading.value = false;
  }
}

async function confirm() {
  if (!activeOrderId.value || !photoUrl.value) return;
  await markPrepared(activeOrderId.value, photoUrl.value);
  modalOpen.value = false;
}
</script>

<template>
  <div class="page">
    <h1>Buyurtmalar navbati</h1>
    <AppSpinner v-if="isLoading" />
    <p v-else-if="!queue.length">Navbatda buyurtmalar yo'q</p>
    <div v-else class="queue">
      <div v-for="order in queue" :key="order.id" class="order-card">
        <div class="header">
          <strong>#{{ order.id.slice(-8) }}</strong>
          <span>{{ formatDateTime(order.createdAt) }}</span>
        </div>
        <ul>
          <li v-for="item in order.items" :key="item.id">{{ item.product.title }} × {{ item.quantity }}</li>
        </ul>
        <p v-if="order.giftMessage" class="gift">🎁 {{ order.giftMessage }}</p>
        <AppButton @click="openPrepareModal(order.id)">Tayyor deb belgilash</AppButton>
      </div>
    </div>

    <AppModal :open="modalOpen" title="Buket rasmini yuklang" @close="modalOpen = false">
      <div class="upload-section">
        <img v-if="photoUrl" :src="photoUrl" class="preview" />
        <label class="upload-btn">
          {{ uploading ? 'Yuklanmoqda...' : 'Rasm tanlash' }}
          <input type="file" accept="image/*" hidden @change="handleUpload" />
        </label>
        <AppButton :disabled="!photoUrl" @click="confirm">Tasdiqlash</AppButton>
      </div>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.queue { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.order-card {
  background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px;
}
.header { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; color: var(--text-secondary); }
.gift { font-style: italic; color: var(--text-secondary); margin: 10px 0; }
.upload-section { display: flex; flex-direction: column; gap: 12px; align-items: center; }
.preview { width: 160px; height: 160px; object-fit: cover; border-radius: var(--radius); }
.upload-btn {
  padding: 10px 16px; border: 1px dashed var(--border); border-radius: var(--radius); cursor: pointer;
}
</style>
