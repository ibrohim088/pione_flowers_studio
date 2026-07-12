<script setup lang="ts">
import { Gift, Clock, PackageCheck, ImagePlus, Upload } from '@lucide/vue';
import { computed, onMounted, ref } from 'vue';
import { useFlorist } from '../../composables/useFlorist';
import { formatDateTime } from '../../lib/utils';
import AppButton from '../../components/ui/AppButton.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';
import AppModal from '../../components/ui/AppModal.vue';

const { queue, isLoading, fetchQueue, markPrepared, uploadPhoto } = useFlorist();
onMounted(fetchQueue);

const queueCount = computed(() => queue.value.length);

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
    <div class="page-head">
      <div>
        <h1>Buyurtmalar navbati</h1>
        <p class="subtitle">Tayyorlanishi kerak bo'lgan buyurtmalar ro'yxati</p>
      </div>
      <div class="page-head-actions">
        <div v-if="!isLoading && queue.length" class="count-badge">
          <PackageCheck :size="16" />
          {{ queueCount }} ta buyurtma
        </div>
        <AppButton variant="secondary" :disabled="isLoading" @click="fetchQueue">Yangilash</AppButton>
      </div>
    </div>

    <AppSpinner v-if="isLoading" />

    <div v-else-if="!queue.length" class="empty-state">
      <PackageCheck :size="40" />
      <h2>Navbatda buyurtmalar yo'q</h2>
      <p>Yangi buyurtma kelganda bu yerda paydo bo'ladi</p>
    </div>

    <div v-else class="queue">
      <div v-for="order in queue" :key="order.id" class="order-card">
        <div class="header">
          <strong class="order-id">#{{ order.id.slice(-8) }}</strong>
          <span class="time"><Clock :size="13" /> {{ formatDateTime(order.createdAt) }}</span>
        </div>
        <ul class="items">
          <li v-for="item in order.items" :key="item.id">
            <span class="item-title">{{ item.product.title }}</span>
            <span class="item-qty">× {{ item.quantity }}</span>
          </li>
        </ul>
        <p v-if="order.giftMessage" class="gift"><Gift :size="14" /> {{ order.giftMessage }}</p>
        <AppButton class="prepare-btn" @click="openPrepareModal(order.id)">
          <PackageCheck :size="16" />
          Tayyor deb belgilash
        </AppButton>
      </div>
    </div>

    <AppModal :open="modalOpen" title="Buket rasmini yuklang" @close="modalOpen = false">
      <div class="upload-section">
        <div class="preview-frame" :class="{ 'has-image': photoUrl }">
          <img v-if="photoUrl" :src="photoUrl" class="preview" />
          <div v-else class="preview-placeholder">
            <ImagePlus :size="28" />
            <span>Rasm ko'rinishi shu yerda chiqadi</span>
          </div>
        </div>
        <label class="upload-btn" :class="{ uploading }">
          <Upload :size="16" />
          {{ uploading ? 'Yuklanmoqda...' : 'Rasm tanlash' }}
          <input type="file" accept="image/*" hidden :disabled="uploading" @change="handleUpload" />
        </label>
        <AppButton class="confirm-btn" :disabled="!photoUrl" @click="confirm">Tasdiqlash</AppButton>
      </div>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
}

.page-head-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.subtitle {
  margin: 6px 0 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.count-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 72px 24px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);

  svg { color: var(--text-secondary); opacity: 0.5; margin-bottom: 16px; }
  h2 { margin-bottom: 6px; }
  p { margin: 0; font-size: 14px; }
}

.queue {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}

.order-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.order-id {
  font-size: 15px;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.time {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-secondary);
}

.items {
  list-style: none;
  margin: 0 0 4px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;

  li {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 14px;
    color: var(--text-primary);
  }

  .item-qty {
    color: var(--text-secondary);
    white-space: nowrap;
  }
}

.gift {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-style: italic;
  font-size: 13px;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border-radius: var(--radius);
  padding: 8px 10px;
  margin: 12px 0 0;
}

.prepare-btn {
  margin-top: 16px;
  width: 100%;
  justify-content: center;
}

.upload-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}

.preview-frame {
  width: 100%;
  height: 200px;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;

  &.has-image { border-style: solid; }
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 13px;
  padding: 0 24px;
  text-align: center;

  svg { opacity: 0.5; }
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  color: var(--text-primary);
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover { border-color: var(--accent); color: var(--accent); }
  &.uploading { opacity: 0.6; cursor: wait; }
}

.confirm-btn {
  width: 100%;
  justify-content: center;
}
</style>