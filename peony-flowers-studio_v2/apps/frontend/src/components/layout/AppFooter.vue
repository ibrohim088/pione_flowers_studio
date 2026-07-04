<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__grid container">
      <div class="brand-col">
        <span class="logo display-lg">Peony</span>
        <p class="body-md muted">{{ $t('footer.description') }}</p>
        <div class="socials">
          <a href="https://www.instagram.com/peony.uz" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.8" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
            </svg>
          </a>
          <a href="https://t.me/peony_flowers" target="_blank" rel="noopener" aria-label="Telegram kanal">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.05 3.5 2.9 10.6c-1.2.47-1.19 1.13-.22 1.42l4.65 1.45 1.8 5.5c.22.6.38.84.78.84.35 0 .5-.16.7-.35l1.9-1.83 4.7 3.47c.87.48 1.5.23 1.72-.8l3.1-14.6c.32-1.26-.48-1.83-1.98-1.2Z"
                stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
              <path d="M9.2 13.5 17.5 7l-6.7 7.4-.1 3.2-1.5-4.1Z" stroke="currentColor" stroke-width="1.6"
                stroke-linejoin="round" />
            </svg>
          </a>
          <!-- <a href="https://t.me/peony_floboutique" target="_blank" rel="noopener" aria-label="Telegram">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.05 3.5 2.9 10.6c-1.2.47-1.19 1.13-.22 1.42l4.65 1.45 1.8 5.5c.22.6.38.84.78.84.35 0 .5-.16.7-.35l1.9-1.83 4.7 3.47c.87.48 1.5.23 1.72-.8l3.1-14.6c.32-1.26-.48-1.83-1.98-1.2Z"
                stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
              <path d="M9.2 13.5 17.5 7l-6.7 7.4-.1 3.2-1.5-4.1Z" stroke="currentColor" stroke-width="1.6"
                stroke-linejoin="round" />
            </svg>
          </a> -->
        </div>
      </div>

      <div class="col">
        <h4 class="label-caps heading">{{ $t('footer.shop') }}</h4>
        <RouterLink to="/catalog" class="body-md link">{{ $t('footer.bouquets') }}</RouterLink>
        <RouterLink to="/collaborations" class="body-md link">{{ $t('footer.collaborations') }}</RouterLink>
        <RouterLink to="/delivery" class="body-md link">{{ $t('footer.delivery') }}</RouterLink>
        <RouterLink to="/payment-methods" class="body-md link">{{ $t('footer.paymentMethods') }}</RouterLink>
      </div>

      <div class="col">
        <h4 class="label-caps heading">{{ $t('footer.account') }}</h4>
        <RouterLink to="/account" class="body-md link">{{ $t('footer.myProfile') }}</RouterLink>
        <RouterLink to="/account/orders" class="body-md link">{{ $t('footer.orderHistory') }}</RouterLink>
      </div>

      <div class="col">
        <h4 class="label-caps heading">{{ $t('footer.contact') }}</h4>
        <p class="body-md muted">{{ $t('footer.address') }}</p>
        <a class="body-md link" href="tel:+998902100494">+998 90 210-04-94</a>
        <a class="body-md link" href="tel:+998948181818">+998 94 818-18-18</a>
      </div>
    </div>

    <div class="footer__bottom container">
      <p class="label-sm muted">&copy; {{ year }} Peony Flowers Studio. {{ $t('footer.rights') }}</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-surface-container-low);
  border-top: 1px solid var(--color-hairline);
  margin-top: var(--section-padding);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gutter);
  padding-block: var(--section-padding);

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.brand-col {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
}

.logo {
  color: var(--color-primary);
  font-style: italic;
}

.col {
  display: flex;
  flex-direction: column;
  gap: var(--stack-sm);
}

.heading {
  color: var(--color-on-surface);
  margin-bottom: var(--stack-sm);
}

.link {
  color: var(--color-on-surface-variant);
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all 0.2s;

  &:hover {
    color: var(--color-primary);
    text-decoration-color: currentColor;
  }
}

.muted {
  color: var(--color-on-surface-variant);
  opacity: 0.85;
}

.socials {
  display: flex;
  gap: var(--stack-md);
  margin-top: var(--stack-sm);
  color: var(--color-primary);

  a {
    display: flex;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }

    svg {
      width: 22px;
      height: 22px;
    }
  }
}

.footer__bottom {
  border-top: 1px solid var(--color-hairline);
  padding-block: var(--stack-lg);
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
}
</style>