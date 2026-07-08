<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAdminContent } from '../../composables/useAdminContent';
import AppButton from '../../components/ui/AppButton.vue';
import AppInput from '../../components/ui/AppInput.vue';
import AppTextarea from '../../components/ui/AppTextarea.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const { data, isLoading, isSaving, notFoundYet, fetchContent, save } = useAdminContent('about');

onMounted(fetchContent);

const activeTab = ref<'uz' | 'ru'>('uz');
const statusMessage = ref('');
const statusIsError = ref(false);

function addListItem(locale: 'uz' | 'ru', field: 'services' | 'values') {
  data.value[locale][field].push('');
}

function removeListItem(locale: 'uz' | 'ru', field: 'services' | 'values', index: number) {
  data.value[locale][field].splice(index, 1);
}

async function onSave() {
  try {
    await save();
    statusIsError.value = false;
    statusMessage.value = 'Kontent muvaffaqiyatli saqlandi ✓';
  } catch {
    statusIsError.value = true;
    statusMessage.value = 'Saqlashda xatolik yuz berdi';
  }
  setTimeout(() => (statusMessage.value = ''), 3000);
}
</script>

<template>
  <div class="page">
    <div class="header">
      <div>
        <h1>Kontent boshqaruvi — "Biz haqimizda"</h1>
        <p class="subtitle">
          Bu yerdagi ma'lumotlar saytdagi "Biz haqimizda" sahifasida har ikkala tilda avtomatik
          ko'rinadi. Kod o'zgartirish yoki qayta deploy qilish shart emas.
        </p>
      </div>
      <div class="header-actions">
        <span v-if="statusMessage" :class="['status', { error: statusIsError }]">{{ statusMessage }}</span>
        <AppButton :loading="isSaving" @click="onSave">Saqlash</AppButton>
      </div>
    </div>

    <p v-if="notFoundYet" class="hint">
      Bu kontent hali bazada mavjud emas — formani to'ldirib "Saqlash" tugmasini bosing, yozuv
      avtomatik yaratiladi.
    </p>

    <AppSpinner v-if="isLoading" />

    <template v-else>
      <div class="tabs">
        <button :class="['tab', { active: activeTab === 'uz' }]" @click="activeTab = 'uz'">O'zbekcha</button>
        <button :class="['tab', { active: activeTab === 'ru' }]" @click="activeTab = 'ru'">Русский</button>
      </div>

      <template v-for="locale in (['uz', 'ru'] as const)" :key="locale">
        <div v-if="activeTab === locale" class="form">
          <AppInput v-model="data[locale].title" label="Sarlavha" />
          <AppTextarea v-model="data[locale].intro" label="Asosiy matn" :rows="6" />

          <div class="row">
            <AppInput :model-value="String(data[locale].foundedYear ?? '')" label="Tashkil topgan yil" type="number"
              @update:model-value="(v: string) => (data[locale].foundedYear = v ? Number(v) : undefined)" />
            <AppInput :model-value="String(data[locale].customersCount ?? '')" label="Mijozlar soni" type="number"
              @update:model-value="(v: string) => (data[locale].customersCount = v ? Number(v) : undefined)" />
          </div>

          <AppInput v-model="data[locale].address" label="Manzil (do'kon joylashuvi)" />

          <div class="row">
            <AppInput :model-value="String(data[locale].lat ?? '')" label="Kenglik (latitude)" type="number"
              @update:model-value="(v: string) => (data[locale].lat = v ? Number(v) : undefined)" />
            <AppInput :model-value="String(data[locale].lng ?? '')" label="Uzunlik (longitude)" type="number"
              @update:model-value="(v: string) => (data[locale].lng = v ? Number(v) : undefined)" />
          </div>

          <div class="list-field">
            <label class="list-label">Xizmatlar ro'yxati</label>
            <div v-for="(_, i) in data[locale].services" :key="i" class="list-row">
              <AppInput v-model="data[locale].services[i]" />
              <button class="remove-btn" type="button" @click="removeListItem(locale, 'services', i)">✕</button>
            </div>
            <AppButton variant="outline" type="button" @click="addListItem(locale, 'services')">+ Xizmat qo'shish
            </AppButton>
          </div>

          <div class="list-field">
            <label class="list-label">Qadriyatlar</label>
            <div v-for="(_, i) in data[locale].values" :key="i" class="list-row">
              <AppInput v-model="data[locale].values[i]" />
              <button class="remove-btn" type="button" @click="removeListItem(locale, 'values', i)">✕</button>
            </div>
            <AppButton variant="outline" type="button" @click="addListItem(locale, 'values')">+ Qadriyat qo'shish
            </AppButton>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped lang="scss">
.page {
  max-width: 720px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 13px;
  max-width: 480px;
  margin-top: 6px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.status {
  font-size: 13px;
  color: #2a9d5c;
  white-space: nowrap;

  &.error {
    color: #d33;
  }
}

.hint {
  background: var(--accent-light);
  color: var(--accent);
  padding: 12px 16px;
  border-radius: var(--radius);
  font-size: 13px;
  margin: 16px 0;
}

.tabs {
  display: flex;
  gap: 4px;
  margin: 20px 0;
  border-bottom: 1px solid var(--border);
}

.tab {
  padding: 10px 16px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  border-bottom: 2px solid transparent;

  &.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 4px;
}

.row {
  display: flex;
  gap: 16px;
}

.row>* {
  flex: 1;
}

.list-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}

.list-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-row> :first-child {
  flex: 1;
}

.remove-btn {
  border: 1px solid var(--border);
  background: var(--bg-primary);
  border-radius: var(--radius);
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  cursor: pointer;
  color: var(--text-secondary);

  &:hover {
    color: #d33;
    border-color: #d33;
  }
}
</style>