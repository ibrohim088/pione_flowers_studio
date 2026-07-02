<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cartStore';
import { useAddresses } from '../../composables/useAddresses';
import { useOrders } from '../../composables/useOrders';
import { usePayment } from '../../composables/usePayment';
import { formatPrice } from '../../lib/utils';
import PaymentMethodSelector from '../../components/payment/PaymentMethodSelector.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppSelect from '../../components/ui/AppSelect.vue';
import AppTextarea from '../../components/ui/AppTextarea.vue';
import AppInput from '../../components/ui/AppInput.vue';

const router = useRouter();
const cartStore = useCartStore();
const { addresses, fetchAddresses } = useAddresses();
const { createOrder } = useOrders();
const { initiateClickPayment, isLoading: paymentLoading } = usePayment();

const form = reactive({
  addressId: '',
  deliveryDate: '',
  deliveryTime: '',
  giftMessage: '',
  paymentMethod: 'cash' as 'click' | 'cash',
  couponCode: '',
});

onMounted(fetchAddresses);

async function submit() {
  const order = await createOrder({
    addressId: form.addressId || undefined,
    items: cartStore.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    paymentMethod: form.paymentMethod,
    deliveryDate: form.deliveryDate,
    deliveryTime: form.deliveryTime,
    giftMessage: form.giftMessage || undefined,
    couponCode: form.couponCode || undefined,
  });

  cartStore.clear();

  if (form.paymentMethod === 'click') {
    await initiateClickPayment(order.id);
  } else {
    router.push(`/account/orders/${order.id}`);
  }
}
</script>

<template>
  <div class="checkout">
    <h1>{{ $t('checkout.title') }}</h1>

    <form class="form" @submit.prevent="submit">
      <AppSelect
        v-model="form.addressId"
        label="Yetkazish manzili"
        :options="addresses.map((a: any) => ({ label: `${a.city}, ${a.street}`, value: a.id }))"
      />
      <AppInput v-model="form.deliveryDate" type="date" :label="$t('checkout.deliveryDate')" />
      <AppInput v-model="form.deliveryTime" type="time" :label="$t('checkout.deliveryTime')" />
      <AppTextarea v-model="form.giftMessage" :label="$t('checkout.giftMessage')" />
      <AppInput v-model="form.couponCode" label="Kupon kodi (ixtiyoriy)" />

      <div>
        <label>{{ $t('checkout.paymentMethod') }}</label>
        <PaymentMethodSelector v-model="form.paymentMethod" />
      </div>

      <div class="total">Jami: {{ formatPrice(cartStore.subtotal) }}</div>

      <AppButton type="submit" :loading="paymentLoading">{{ $t('checkout.submit') }}</AppButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
.checkout { max-width: 560px; margin: 0 auto; padding: 32px; }
.form { display: flex; flex-direction: column; gap: 16px; }
.total { font-size: 20px; font-weight: 700; color: var(--accent); }
</style>
