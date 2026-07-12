<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useOrder } from '../../composables/useOrder';
import { useOrders } from '../../composables/useOrders';
import { formatPrice, formatDateTime } from '../../lib/utils';
import PaymentStatusBadge from '../../components/payment/PaymentStatusBadge.vue';
import AppButton from '../../components/ui/AppButton.vue';
import AppBadge from '../../components/ui/AppBadge.vue';
import AppSpinner from '../../components/ui/AppSpinner.vue';

const route = useRoute();
const { t } = useI18n();
const { order, isLoading, fetchById } = useOrder();
const { cancelOrder } = useOrders();

onMounted(() => fetchById(route.params.id as string));

async function handleCancel() {
  if (!order.value) return;
  await cancelOrder(order.value.id);
  await fetchById(order.value.id);
}

// Buyurtmaning tabiiy bosqichlari — "cancelled" alohida holat sifatida
// ko'rsatiladi, shu sababli bosqichlar zanjiriga kirmaydi.
const STEPS = ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered'] as const;

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  pending: 'warning',
  confirmed: 'info',
  preparing: 'info',
  ready: 'info',
  delivering: 'info',
  delivered: 'success',
  cancelled: 'danger',
};

const currentStepIndex = computed(() => {
  if (!order.value) return -1;
  return STEPS.indexOf(order.value.status as (typeof STEPS)[number]);
});

const isCancelled = computed(() => order.value?.status === 'cancelled');
const isDelivered = computed(() => order.value?.status === 'delivered');

// Yakuniy bosqich (yetkazildi) ham "bajarilgan" deb belgilanadi, aks holda
// tepadagi status va pastdagi bosqichlar bir-biriga zid ko'rinardi.
function stepState(i: number) {
  if (i < currentStepIndex.value || (isDelivered.value && i === currentStepIndex.value)) return 'done';
  if (i === currentStepIndex.value) return 'current';
  return 'upcoming';
}

const priceBreakdown = computed(() => {
  if (!order.value) return null;
  const { subtotal, discount, loyaltyDiscount, deliveryFee, total } = order.value;
  return { subtotal, discount: discount || 0, loyaltyDiscount: loyaltyDiscount || 0, deliveryFee: deliveryFee || 0, total };
});
</script>

<template>
  <AppSpinner v-if="isLoading" />

  <template v-else-if="order">
    <RouterLink to="/account/orders" class="back-link label-sm">
      <span class="material-symbols-outlined">arrow_back</span>
      {{ t('account.orderDetail.back') }}
    </RouterLink>

    <section class="hero-panel">
      <header class="order-header">
        <div class="heading-block">
          <p class="label-sm ordered-on">{{ t('account.orderDetail.orderedOn') }}: {{ formatDateTime(order.createdAt) }}</p>
          <h1 class="headline-md">
            {{ t('account.orderDetail.title') }} <span class="order-id">#{{ order.id.slice(-8) }}</span>
          </h1>
        </div>
        <AppBadge :variant="statusVariants[order.status] || 'info'" class="status-badge">
          {{ t(`orderStatus.${order.status}`) }}
        </AppBadge>
      </header>

      <p v-if="isCancelled" class="cancelled-banner body-md">
        <span class="material-symbols-outlined">cancel</span>
        {{ t('orderStatus.cancelled') }}
      </p>

      <ol v-else class="stepper" role="list">
        <li
          v-for="(step, i) in STEPS"
          :key="step"
          class="stepper-item"
          :class="`is-${stepState(i)}`"
        >
          <span class="stepper-dot">
            <span v-if="stepState(i) === 'done'" class="material-symbols-outlined">check</span>
            <span v-else-if="stepState(i) === 'current'" class="stepper-pulse" />
          </span>
          <span class="stepper-label label-sm">{{ t(`orderStatus.${step}`) }}</span>
        </li>
      </ol>
    </section>

    <div class="layout-grid">
      <section class="panel items-panel">
        <h2 class="headline-sm panel-title">{{ t('account.orderDetail.items') }}</h2>
        <div class="items">
          <div v-for="item in order.items" :key="item.id" class="item">
            <img
              class="item-thumb"
              :src="item.product.images?.[0]?.url || '/placeholder.jpg'"
              :alt="item.product.title"
            />
            <div class="item-info">
              <p class="body-md item-title">{{ item.product.title }}</p>
              <p class="label-sm item-qty">{{ item.quantity }} × {{ formatPrice(item.price) }}</p>
            </div>
            <span class="body-md item-total">{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
        </div>

        <div v-if="order.giftMessage" class="gift-message">
          <span class="material-symbols-outlined">redeem</span>
          <p class="body-md">{{ order.giftMessage }}</p>
        </div>
      </section>

      <aside class="side-column">
        <section class="panel">
          <h2 class="headline-sm panel-title">{{ t('checkout.delivery') }}</h2>
          <template v-if="order.address">
            <p class="body-md">
              {{ order.address.city }}<template v-if="order.address.district">, {{ order.address.district }}</template>,
              {{ order.address.street }}<template v-if="order.address.house"> {{ order.address.house }}</template>
            </p>
            <p v-if="order.address.entrance || order.address.floor || order.address.apartment" class="label-sm muted">
              <template v-if="order.address.entrance">{{ order.address.entrance }}-podyezd </template>
              <template v-if="order.address.floor">{{ order.address.floor }}-qavat </template>
              <template v-if="order.address.apartment">{{ order.address.apartment }}-xonadon</template>
            </p>
            <p v-if="order.address.landmark" class="label-sm muted">{{ order.address.landmark }}</p>
          </template>
          <p v-else class="body-md pickup">
            <span class="material-symbols-outlined">storefront</span>
            {{ t('account.orderDetail.selfPickup') }}
          </p>
          <p class="label-sm muted delivery-time">
            <span class="material-symbols-outlined">event</span>
            {{ order.deliveryDate?.slice(0, 10) }} · {{ order.deliveryTime }}
          </p>
          <p v-if="order.courier" class="label-sm muted courier-line">
            <span class="material-symbols-outlined">local_shipping</span>
            {{ t('account.orderDetail.courier') }}: {{ order.courier.fullName }} ({{ order.courier.phone }})
          </p>
        </section>

        <section class="panel payment-panel">
          <h2 class="headline-sm panel-title">{{ t('checkout.paymentMethod') }}</h2>
          <div class="payment-row">
            <span class="payment-method body-md">
              <span class="material-symbols-outlined">{{ order.paymentMethod === 'click' ? 'bolt' : 'payments' }}</span>
              {{ order.paymentMethod === 'click' ? t('checkout.click') : t('checkout.cash') }}
            </span>
          </div>
          <div class="payment-divider" />
          <div class="payment-row payment-status-row">
            <span class="label-sm muted">{{ t('account.orderDetail.paymentStatusLabel') }}</span>
            <PaymentStatusBadge :status="order.paymentStatus" />
          </div>
        </section>

        <section v-if="priceBreakdown" class="panel summary-panel">
          <h2 class="headline-sm panel-title">{{ t('account.orderDetail.summary') }}</h2>
          <div class="summary-row label-sm">
            <span>{{ t('account.orderDetail.subtotal') }}</span>
            <span>{{ formatPrice(priceBreakdown.subtotal) }}</span>
          </div>
          <div v-if="priceBreakdown.discount" class="summary-row label-sm discount">
            <span>{{ t('account.orderDetail.discount') }}</span>
            <span>−{{ formatPrice(priceBreakdown.discount) }}</span>
          </div>
          <div v-if="priceBreakdown.loyaltyDiscount" class="summary-row label-sm discount">
            <span>{{ t('account.orderDetail.loyaltyDiscount') }}</span>
            <span>−{{ formatPrice(priceBreakdown.loyaltyDiscount) }}</span>
          </div>
          <div class="summary-row label-sm">
            <span>{{ t('account.orderDetail.deliveryFee') }}</span>
            <span>{{ priceBreakdown.deliveryFee ? formatPrice(priceBreakdown.deliveryFee) : '—' }}</span>
          </div>
          <div class="summary-divider" />
          <div class="summary-row total-row">
            <span class="body-md">{{ t('account.orderDetail.total') }}</span>
            <span class="headline-sm total-value">{{ formatPrice(priceBreakdown.total) }}</span>
          </div>
        </section>

        <AppButton v-if="order.status === 'pending'" variant="danger" class="cancel-btn" @click="handleCancel">
          {{ t('account.orderDetail.cancel') }}
        </AppButton>
      </aside>
    </div>
  </template>

  <p v-else class="body-md not-found">{{ t('account.orderDetail.notFound') }}</p>
</template>

<style scoped lang="scss">
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-on-surface-variant);
  text-decoration: none;
  margin-bottom: var(--stack-md);
  transition: color 0.15s ease;

  .material-symbols-outlined { font-size: 18px; }

  &:hover { color: var(--color-primary); }
}

// --- Hero panel: header + stepper grouped together for visual cohesion ---
.hero-panel {
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface-container-lowest);
  padding: var(--stack-lg);
  margin-bottom: var(--stack-lg);
}

.order-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--stack-md);
  margin-bottom: var(--stack-lg);
  flex-wrap: wrap;
}
.order-id {
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  letter-spacing: inherit;
  color: var(--color-primary);
}
.ordered-on {
  color: var(--color-on-surface-variant);
  margin-bottom: 4px;
}
.status-badge {
  flex-shrink: 0;
  padding: 6px 16px;
  font-size: 11px;
}

.cancelled-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border: 1px solid var(--color-error-container);
  background: var(--color-error-container);
  color: var(--color-on-error-container);
  border-radius: var(--radius-lg);

  .material-symbols-outlined { font-size: 20px; }
}

// --- Status stepper: buyurtma yo'lining ko'rgazmali shaklda tasviri ---
.stepper {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: auto;
}
.stepper-item {
  flex: 1;
  min-width: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 11px;
    left: calc(50% + 20px);
    right: calc(-50% + 20px);
    height: 1px;
    background: var(--color-hairline);
  }
  &.is-done:not(:last-child)::after {
    background: var(--color-primary);
  }
}
.stepper-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--color-outline-variant);
  background: var(--color-surface-container-lowest);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  z-index: 1;

  .material-symbols-outlined { font-size: 14px; color: var(--color-on-primary); }
}
.stepper-item.is-done .stepper-dot {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
.stepper-item.is-current .stepper-dot {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-container);
}
.stepper-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
}
.stepper-label {
  color: var(--color-on-surface-variant);
}
.stepper-item.is-current .stepper-label {
  color: var(--color-primary);
  font-weight: 600;
}
.stepper-item.is-done .stepper-label {
  color: var(--color-on-surface);
}

// --- Layout ---
.layout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--stack-lg);

  @media (min-width: 900px) {
    grid-template-columns: 1.6fr 1fr;
    align-items: start;
  }
}

.panel {
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  background: var(--color-surface-container-lowest);
  padding: var(--stack-lg);

  p {
    margin: 0;
  }
}
.panel-title {
  margin: 0 0 var(--stack-md);
}

.side-column {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);

  @media (min-width: 900px) {
    position: sticky;
    top: var(--stack-lg);
  }
}

// --- Items ---
.items {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
}
.item {
  display: flex;
  align-items: center;
  gap: var(--stack-md);
}
.item-thumb {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  object-fit: cover;
  flex-shrink: 0;
  background: var(--color-surface-container-high);
}
.item-info {
  flex: 1;
  min-width: 0;
}
.item-title {
  color: var(--color-on-surface);
}
.item-qty {
  color: var(--color-on-surface-variant);
  margin-top: 2px;
}
.item-total {
  font-weight: 600;
  color: var(--color-on-surface);
  white-space: nowrap;
}

.gift-message {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: var(--stack-lg);
  padding-top: var(--stack-lg);
  border-top: 1px solid var(--color-hairline);
  color: var(--color-on-surface-variant);

  .material-symbols-outlined { color: var(--color-primary); font-size: 20px; }
}

// --- Delivery panel ---
.pickup {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary);

  .material-symbols-outlined { font-size: 18px; }
}
.muted {
  color: var(--color-on-surface-variant);
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 6px;

  .material-symbols-outlined {
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 1px;
  }
}
.delivery-time { margin-top: 10px; }

// --- Payment panel: method va holat aniq ajratilgan, so'z takrorlanmaydi ---
.payment-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.payment-method {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-on-surface);

  .material-symbols-outlined {
    font-size: 18px;
    color: var(--color-primary);
  }
}
.payment-status-row .muted {
  margin-top: 0;
}
.payment-divider {
  height: 1px;
  background: var(--color-hairline);
  margin: var(--stack-md) 0;
}

// --- Summary ---
.summary-panel {
  display: flex;
  flex-direction: column;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  color: var(--color-on-surface-variant);
  padding: 4px 0;
}
.summary-row.discount {
  color: var(--color-primary);
}
.summary-divider {
  height: 1px;
  background: var(--color-hairline);
  margin: var(--stack-sm) 0;
}
.total-row {
  color: var(--color-on-surface);
}
.total-value {
  color: var(--color-primary);
}

.cancel-btn {
  width: 100%;
}

.not-found {
  color: var(--color-on-surface-variant);
}
</style>