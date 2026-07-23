<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUiStore } from '../../stores/uiStore';
import { debounce } from '../../lib/utils';

const router = useRouter();
const route = useRoute();
const uiStore = useUiStore();

const query = ref(uiStore.searchQuery);
const isOpen = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

function goToCatalog() {
  const trimmed = query.value.trim();
  uiStore.setSearchQuery(trimmed);

  if (!trimmed.length) return;

  router.push({
    path: '/catalog',
    query: { ...route.query, search: trimmed },
  });
}

const debouncedNavigate = debounce(() => {
  if (query.value.trim().length > 0) {
    goToCatalog();
  }
}, 500);

function onInput() {
  uiStore.setSearchQuery(query.value);
  debouncedNavigate();
}

function onSubmit() {
  goToCatalog();
}

function openSearch() {
  isOpen.value = true;
  requestAnimationFrame(() => inputRef.value?.focus());
}

function closeSearch() {
  if (!query.value.trim().length) {
    isOpen.value = false;
  }
}
</script>

<template>
  <div class="search" :class="{ 'search--open': isOpen }">
    <button v-if="!isOpen" class="icon-btn" type="button" @click="openSearch">
      <span class="material-symbols-outlined">search</span>
    </button>

    <form v-else class="search__form" @submit.prevent="onSubmit">
      <span class="material-symbols-outlined search__icon">search</span>
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        class="search__input body-sm"
        :placeholder="$t('nav.searchPlaceholder')"
        @input="onInput"
        @blur="closeSearch"
      />
      <button
        v-if="query.length"
        type="button"
        class="search__clear"
        @mousedown.prevent="query = ''; uiStore.setSearchQuery('')"
      >
        <span class="material-symbols-outlined">close</span>
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;
}

.icon-btn {
  position: relative;
  display: flex;
  color: var(--color-on-surface-variant);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }

  .material-symbols-outlined {
    font-size: 24px;
  }
}

.search__form {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--color-surface-container-low);
  border: 1px solid var(--color-outline-variant);
  border-radius: var(--radius-full, 999px);
  padding: 6px 10px;
  width: 180px;
  transition: width 0.2s, border-color 0.2s;

  &:focus-within {
    border-color: var(--color-primary);
    width: 220px;
  }

  @media (max-width: 480px) {
    width: 140px;

    &:focus-within {
      width: 160px;
    }
  }
}

.search__icon {
  font-size: 18px;
  color: var(--color-on-surface-variant);
}

.search__input {
  border: none;
  background: none;
  outline: none;
  color: var(--color-on-surface);
  width: 100%;
}

.search__clear {
  display: flex;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-on-surface-variant);
  padding: 0;

  .material-symbols-outlined {
    font-size: 16px;
  }

  &:hover {
    color: var(--color-primary);
  }
}
</style>
