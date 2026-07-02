<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <p>&copy; {{ new Date().getFullYear() }} Peony Flowers Studio. Barcha huquqlar himoyalangan.</p>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 24px;
  text-align: center;
  color: var(--text-secondary);
  border-top: 1px solid var(--border);
  background: var(--bg-primary);
}
</style>
