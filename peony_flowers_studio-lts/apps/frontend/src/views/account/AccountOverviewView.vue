<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <h1 class="headline-md">{{ $t('account.greeting') }}, {{ authStore.user?.fullName || $t('account.guest') }}!</h1>
  <p class="body-md subtitle">{{ $t('account.overviewText') }}</p>
</template>

<style scoped lang="scss">
.subtitle {
  color: var(--color-on-surface-variant);
  margin-top: var(--stack-sm);
}
</style>




<!-- <script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
import AccountSidebar from '../../components/layout/AccountSidebar.vue';

const authStore = useAuthStore();
</script>

<template>
  <div class="account-layout container">
    <AccountSidebar />
    <div class="content">
      <h1 class="headline-md">{{ $t('account.greeting') }}, {{ authStore.user?.fullName || $t('account.guest') }}!</h1>
      <p class="body-md subtitle">{{ $t('account.overviewText') }}</p>
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
}
.subtitle {
  color: var(--color-on-surface-variant);
  margin-top: var(--stack-sm);
}
</style> -->