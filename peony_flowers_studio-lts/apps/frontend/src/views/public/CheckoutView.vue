<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useCartStore } from '../../stores/cartStore';
import { useAddresses } from '../../composables/useAddresses';
import { useOrders } from '../../composables/useOrders';
import { usePayment } from '../../composables/usePayment';
import { useContentStore, type AboutContent } from '../../stores/contentStore';
import PaymentMethodSelector from '../../components/payment/PaymentMethodSelector.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppSelect from '../../components/ui/AppSelect.vue';
import AppTextarea from '../../components/ui/AppTextarea.vue';
import AppInput from '../../components/ui/AppInput.vue';
import AppDatePicker from '../../components/ui/AppDatePicker.vue';
import TimeSlotPicker from '../../components/ui/TimeSlotPicker.vue';
import AppModal from '../../components/ui/AppModal.vue';
import CartSummary from '../../components/cart/CartSummary.vue';

const router = useRouter();
const { locale } = useI18n();
const cartStore = useCartStore();
const { addresses, fetchAddresses, createAddress } = useAddresses();
const { createOrder } = useOrders();
const { initiateClickPayment, isLoading: paymentLoading } = usePayment();
const contentStore = useContentStore();

const form = reactive({
  deliveryMethod: 'delivery' as 'delivery' | 'pickup',
  addressId: '',
  deliveryDate: '',
  deliveryTime: '',
  giftMessage: '',
  paymentMethod: 'cash' as 'click' | 'cash',
});

onMounted(() => {
  fetchAddresses();
  contentStore.fetchContent<AboutContent>('about', locale.value);
});

const aboutContent = computed<AboutContent | null>(
  () => (contentStore.cache[`about:${locale.value}`] as unknown as AboutContent) ?? null
);

const addressModalOpen = ref(false);
const addressForm = reactive({ label: '', city: '', district: '', street: '', house: '' });

const isSubmitting = ref(false);
const submitError = ref<string | null>(null);

function openAddressModal() {
  Object.assign(addressForm, { label: '', city: '', district: '', street: '', house: '' });
  addressModalOpen.value = true;
}

async function saveAddress() {
  const created = await createAddress(addressForm);
  form.addressId = created.id;
  addressModalOpen.value = false;
}

async function submit() {
  submitError.value = null;

  if (form.deliveryMethod === 'delivery' && !form.addressId) {
    submitError.value = "Iltimos, yetkazib berish manzilini tanlang";
    return;
  }
  if (!form.deliveryDate) {
    submitError.value = 'Iltimos, sanani tanlang';
    return;
  }
  if (!form.deliveryTime) {
    submitError.value = 'Iltimos, vaqtni tanlang';
    return;
  }

  isSubmitting.value = true;
  try {
    const order = await createOrder({
      addressId: form.deliveryMethod === 'delivery' ? form.addressId || undefined : undefined,
      items: cartStore.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      paymentMethod: form.paymentMethod,
      deliveryDate: form.deliveryDate,
      deliveryTime: form.deliveryTime,
      giftMessage: form.giftMessage || undefined,
    });

    cartStore.clear();

    if (form.paymentMethod === 'click') {
      await initiateClickPayment(order.id);
    } else {
      router.push(`/account/orders/${order.id}`);
    }
  } catch (err: any) {
    submitError.value = err.response?.data?.message ?? 'Buyurtmani rasmiylashtirishda xatolik yuz berdi. Qayta urinib ko\'ring.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="checkout container">
    <h1 class="display-lg">Buyurtmani rasmiylashtirish</h1>

    <form class="layout" @submit.prevent="submit">
      <div class="fields">
        <section class="block">
          <h2 class="label-caps block-title">Yetkazib berish</h2>

          <div class="delivery-method">
            <button
              type="button"
              class="delivery-option"
              :class="{ 'delivery-option--active': form.deliveryMethod === 'delivery' }"
              @click="form.deliveryMethod = 'delivery'"
            >
              <span class="material-symbols-outlined">local_shipping</span>
              Yetkazib berish
            </button>
            <button
              type="button"
              class="delivery-option"
              :class="{ 'delivery-option--active': form.deliveryMethod === 'pickup' }"
              @click="form.deliveryMethod = 'pickup'"
            >
              <span class="material-symbols-outlined">storefront</span>
              O'zim borib olib ketaman
            </button>
          </div>

          <template v-if="form.deliveryMethod === 'delivery'">
            <AppSelect
              v-model="form.addressId"
              label="Manzil"
              :options="addresses.map((a: any) => ({ label: `${a.city}, ${a.street}`, value: a.id }))"
            />
            <button type="button" class="add-address-link body-md" @click="openAddressModal">
              + Yangi manzil qo'shish
            </button>
          </template>

          <div v-else class="pickup-info">
            <span class="material-symbols-outlined">location_on</span>
            <p class="body-md">
              {{ aboutContent?.address || "Do'kon manzili" }}
              <span class="pickup-hint">Buyurtmani shu manzildan o'zingiz olib ketasiz</span>
            </p>
          </div>

          <div class="row-2">
            <AppDatePicker v-model="form.deliveryDate" label="Sana" />
            <TimeSlotPicker v-model="form.deliveryTime" label="Vaqt" />
          </div>
          <AppTextarea v-model="form.giftMessage" label="Sovg'a uchun xabar (ixtiyoriy)" />
        </section>

        <section class="block">
          <h2 class="label-caps block-title">To'lov usuli</h2>
          <PaymentMethodSelector v-model="form.paymentMethod" :delivery-method="form.deliveryMethod" />
        </section>

      </div>

      <div class="summary-col">
        <CartSummary :subtotal="cartStore.subtotal">
          <p v-if="submitError" class="submit-error body-md">{{ submitError }}</p>
          <AppButton type="submit" :loading="isSubmitting || paymentLoading" style="width: 100%">
            Buyurtmani tasdiqlash
          </AppButton>
        </CartSummary>
      </div>
    </form>

    <AppModal :open="addressModalOpen" title="Yangi manzil" @close="addressModalOpen = false">
      <form class="address-form" @submit.prevent="saveAddress">
        <AppInput v-model="addressForm.label" label="Nomi (masalan: Uy, Ish)" />
        <AppInput v-model="addressForm.city" label="Shahar" />
        <AppInput v-model="addressForm.district" label="Tuman" />
        <AppInput v-model="addressForm.street" label="Ko'cha" />
        <AppInput v-model="addressForm.house" label="Uy raqami" />
        <AppButton type="submit">Saqlash</AppButton>
      </form>
    </AppModal>
  </div>
</template>

<style scoped lang="scss">
.checkout {
  padding-block: var(--stack-lg) var(--section-padding);
  max-width: 1100px;
}
h1 {
  margin-bottom: var(--stack-lg);
}
.layout {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
}
.fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--stack-lg);
}
.block {
  background: var(--color-surface-container-lowest);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: var(--stack-lg);
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
}
.block-title {
  color: var(--color-on-surface-variant);
}
.row-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--stack-md);

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
}
.summary-col {
  width: 100%;

  @media (min-width: 768px) {
    width: 360px;
    position: sticky;
    top: 100px;
  }
}

.delivery-method {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--stack-sm);
}

.delivery-option {
  display: flex;
  align-items: center;
  gap: var(--stack-sm);
  padding: 12px 14px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-hairline);
  background: var(--color-surface);
  color: var(--color-on-surface-variant);
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);

  .material-symbols-outlined {
    font-size: 20px;
  }

  &--active {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  }
}

.add-address-link {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-family: var(--font-body);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.pickup-info {
  display: flex;
  align-items: flex-start;
  gap: var(--stack-sm);
  padding: var(--stack-md);
  border-radius: var(--radius-lg);
  background: var(--color-surface-container-low);
  border: 1px solid var(--color-hairline);
  color: var(--color-on-surface);

  .material-symbols-outlined {
    color: var(--color-primary);
    font-size: 20px;
  }
}

.pickup-hint {
  display: block;
  margin-top: 4px;
  color: var(--color-on-surface-variant);
  font-size: 13px;
}

.address-form {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
  min-width: 320px;
}

.submit-error {
  color: var(--color-error);
  margin-bottom: var(--stack-sm);
}
</style>