<script setup lang="ts">
defineProps<{ address: any }>();
defineEmits<{ edit: [id: string]; remove: [id: string] }>();
</script>

<template>
  <div class="address-card">
    <div class="header">
      <strong>{{ address.label || $t('account.addresses.defaultLabel') }}</strong>
      <span v-if="address.isDefault" class="default">{{ $t('account.addresses.default') }}</span>
    </div>
    <p>{{ address.city }}, {{ address.district }}, {{ address.street }} {{ address.house }}</p>
    <div class="actions">
      <button @click="$emit('edit', address.id)">{{ $t('account.addresses.edit') }}</button>
      <button @click="$emit('remove', address.id)">{{ $t('account.addresses.delete') }}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.address-card {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
}
.header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.default { color: var(--accent); font-size: 12px; }
.actions { display: flex; gap: 12px; margin-top: 10px; }
.actions button { border: none; background: none; color: var(--accent); cursor: pointer; }
</style>