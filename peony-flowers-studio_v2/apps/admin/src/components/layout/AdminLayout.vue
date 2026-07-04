<script setup lang="ts">
import AdminSidebar from './AdminSidebar.vue';
import AdminHeader from './AdminHeader.vue';
</script>

<template>
  <div class="layout">
    <AdminSidebar />
    <div class="main">
      <AdminHeader />
      <div class="page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout { display: flex; min-height: 100vh; background: var(--bg-secondary); }
.main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.page { padding: 24px; flex: 1; max-width: 1600px; width: 100%; margin: 0 auto; }
</style>


<!-- <script setup lang="ts">
import AdminSidebar from './AdminSidebar.vue';
import AdminHeader from './AdminHeader.vue';
</script>

<template>
  <div class="layout">
    <AdminSidebar />
    <div class="main">
      <AdminHeader />
      <div class="page">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout { display: flex; min-height: 100vh; }
.main { flex: 1; display: flex; flex-direction: column; }
.page { padding: 24px; flex: 1; }
</style> -->
