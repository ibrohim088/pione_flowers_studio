<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';

const route = useRoute();

const isBare = computed(() => !!route.meta.bare);
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