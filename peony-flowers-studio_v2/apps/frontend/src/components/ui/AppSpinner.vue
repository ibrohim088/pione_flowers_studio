<template>
  <div class="spinner-wrap">
    <div class="spinner" />
  </div>
</template>

<style scoped lang="scss">
.spinner-wrap { display: flex; justify-content: center; padding: 24px; }
.spinner {
  width: 32px; height: 32px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
