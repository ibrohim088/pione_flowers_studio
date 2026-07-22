<script setup lang="ts">
import AccountSidebar from '../../components/layout/AccountSidebar.vue';
</script>

<template>
  <div class="account-layout container">
    <AccountSidebar />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-layout {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  padding-block: var(--stack-lg) var(--section-padding);

  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.content {
  flex: 1;
  min-width: 0;
}
</style>