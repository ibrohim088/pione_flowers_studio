<script setup lang="ts">
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../stores/cartStore';
import { RouterLink } from 'vue-router';
import AppButton from '../ui/AppButton.vue';

const cartStore = useCartStore();
</script>

<template>
  <div class="summary">
    <div class="row">
      <span>Mahsulotlar</span>
      <span>{{ formatPrice(cartStore.subtotal) }}</span>
    </div>
    <div class="row total">
      <span>Jami</span>
      <span>{{ formatPrice(cartStore.subtotal) }}</span>
    </div>
    <RouterLink to="/checkout">
      <AppButton :disabled="cartStore.items.length === 0">Buyurtma berish</AppButton>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/_mixins.scss';

.summary {
  @include card;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.row { display: flex; justify-content: space-between; }
.total { font-weight: 700; font-size: 18px; }
</style>
