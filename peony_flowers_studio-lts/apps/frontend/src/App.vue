<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import { useWishlistStore } from './stores/wishlistStore';

const route = useRoute();
const wishlistStore = useWishlistStore();

const isBare = computed(() => !!route.meta.bare);

onMounted(() => {
  wishlistStore.init();
});
</script>

<template>
  <div class="app-layout">
    <AppHeader v-if="!isBare" />
    <main class="app-main">
      <router-view />
    </main>
    <AppFooter v-if="!isBare" />
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app-main {
  flex: 1;
}
</style>