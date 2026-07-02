<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="hero">
    <div class="content">
      <h1>Har bir lahza uchun eng go'zal guldastalar</h1>
      <p>Peony Flowers Studio — sevganlaringiz uchun premium sovg'alar</p>
      <RouterLink to="/catalog" class="cta">Katalogni ko'rish</RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  background: linear-gradient(135deg, var(--accent-light), var(--bg-secondary));
  padding: 80px 32px;
  text-align: center;
}
h1 { font-size: 36px; margin-bottom: 12px; }
p { color: var(--text-secondary); margin-bottom: 24px; }
.cta {
  display: inline-block;
  background: var(--accent);
  color: white;
  padding: 14px 32px;
  border-radius: var(--radius);
  font-weight: 600;
}
</style>
