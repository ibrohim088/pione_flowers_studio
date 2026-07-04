<script setup lang="ts">
import { computed } from 'vue';
import { LogOut } from '@lucide/vue';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const displayName = computed(() => authStore.user?.fullName || authStore.user?.phone || '');
const initial = computed(() => displayName.value.trim().charAt(0).toUpperCase() || '?');

async function logout() {
  await authStore.logout();
  router.push('/login');
}
</script>

<template>
  <header class="header">
    <div />
    <div class="user">
      <span class="avatar">{{ initial }}</span>
      <span class="name">{{ displayName }}</span>
      <button class="logout" @click="logout" title="Chiqish">
        <LogOut :size="16" />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}
.user { display: flex; align-items: center; gap: 12px; }
.avatar {
  width: 32px; height: 32px; border-radius: var(--radius-full);
  background: var(--accent-light); color: var(--accent-dark);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 600;
}
.name { font-size: 14px; font-weight: 500; color: var(--text-primary); }
.logout {
  background: none; border: 1px solid var(--border); color: var(--text-secondary);
  width: 32px; height: 32px; border-radius: var(--radius-full); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background-color 0.15s ease, color 0.15s ease;
  &:hover { background: var(--danger-bg); color: var(--danger); border-color: transparent; }
}
</style>


<!-- <script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { ChevronDown, LogOut, Pencil } from '@lucide/vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';
import { useProfile } from '../../composables/useProfile';
import AppModal from '../ui/AppModal.vue';
import AppInput from '../ui/AppInput.vue';
import AppButton from '../ui/AppButton.vue';

const authStore = useAuthStore();
const router = useRouter();
const { isSaving, updateProfile } = useProfile();

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  florist: 'Florist',
  courier: 'Kuryer',
};

function initials() {
  const name = authStore.user?.fullName;
  if (!name) return authStore.user?.phone?.slice(-2) || '??';
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

const dropdownOpen = ref(false);
const modalOpen = ref(false);
const error = ref('');
const form = reactive({ fullName: '', email: '' });

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function closeDropdown(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest('.user-menu')) dropdownOpen.value = false;
}

onMounted(() => document.addEventListener('click', closeDropdown));
onUnmounted(() => document.removeEventListener('click', closeDropdown));

function openEdit() {
  form.fullName = authStore.user?.fullName || '';
  form.email = authStore.user?.email || '';
  error.value = '';
  modalOpen.value = true;
  dropdownOpen.value = false;
}

async function saveProfile() {
  error.value = '';
  try {
    const updated = await updateProfile({ fullName: form.fullName, email: form.email || undefined });
    authStore.setUser(updated);
    modalOpen.value = false;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Xatolik yuz berdi';
  }
}

async function logout() {
  await authStore.logout();
  router.push('/login');
}
</script>

<template>
  <header class="header">
    <div />
    <div class="user-menu">
      <button class="trigger" @click="toggleDropdown">
        <span class="avatar">{{ initials() }}</span>
        <span class="name">{{ authStore.user?.fullName || authStore.user?.phone }}</span>
        <ChevronDown :size="16" />
      </button>

      <transition name="fade">
        <div v-if="dropdownOpen" class="dropdown">
          <div class="info">
            <span class="avatar large">{{ initials() }}</span>
            <div>
              <div class="fullname">{{ authStore.user?.fullName || 'Ism kiritilmagan' }}</div>
              <div class="phone">{{ authStore.user?.phone }}</div>
              <span class="role-badge">{{ roleLabels[authStore.user?.role || ''] || authStore.user?.role }}</span>
            </div>
          </div>
          <div class="divider" />
          <button class="item" @click="openEdit">
            <Pencil :size="16" /> Profilni tahrirlash
          </button>
          <button class="item danger" @click="logout">
            <LogOut :size="16" /> Chiqish
          </button>
        </div>
      </transition>
    </div>

    <AppModal :open="modalOpen" title="Profilni tahrirlash" @close="modalOpen = false">
      <form class="form" @submit.prevent="saveProfile">
        <AppInput v-model="form.fullName" label="Ism familiya" placeholder="Ism Familiya" />
        <AppInput v-model="form.email" label="Email" placeholder="email@example.com" />
        <p v-if="error" class="error">{{ error }}</p>
        <AppButton type="submit" :loading="isSaving">Saqlash</AppButton>
      </form>
    </AppModal>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
}

.user-menu {
  position: relative;
}

.trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: 1px solid transparent;
  color: var(--text-primary);
  padding: 6px 10px;
  border-radius: var(--radius);
  cursor: pointer;

  &:hover {
    border-color: var(--border);
  }
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--accent-light);
  color: var(--accent);
  font-size: 12px;
  font-weight: 600;

  &.large {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }
}

.name {
  font-size: 14px;
}

.dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  min-width: 240px;
  padding: 12px;
  z-index: 50;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px;
}

.fullname {
  font-weight: 600;
  font-size: 14px;
}

.phone {
  color: var(--text-secondary);
  font-size: 12px;
  margin: 2px 0 6px;
}

.role-badge {
  display: inline-block;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--accent-light);
  color: var(--accent);
}

.divider {
  height: 1px;
  background: var(--border);
  margin: 10px 0;
}

.item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 14px;
  padding: 10px 8px;
  border-radius: var(--radius);
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--bg-secondary);
  }

  &.danger {
    color: var(--danger);
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error {
  color: var(--danger);
  font-size: 13px;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style> -->
