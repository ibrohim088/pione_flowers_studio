<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const points = [
  { label: t('home.brandStory.quality'), icon: 'check_circle' },
  { label: t('home.brandStory.design'), icon: 'auto_awesome' },
  { label: t('home.brandStory.delivery'), icon: 'speed' },
];
</script>

<template>
  <section class="story">
    <div class="story__grid container">
      <div class="story__text">
        <h2 class="headline-md">{{ $t('home.brandStory.title') }}</h2>
        <p class="body-lg">{{ $t('home.brandStory.text') }}</p>
        <span class="material-symbols-outlined story__icon">local_florist</span>
      </div>
      <div class="story__points">
        <div v-for="point in points" :key="point.label" class="point">
          <span class="label-caps">{{ point.label }}</span>
          <span class="material-symbols-outlined">{{ point.icon }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.story {
  background: var(--color-sage);
  padding-block: var(--section-padding);
}
.story__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--margin-desktop);
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}
.story__text {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
  color: var(--color-on-secondary-container);
}
.story__text p {
  opacity: 0.9;
  line-height: 1.6;
}
.story__icon {
  color: var(--color-primary);
  opacity: 0.5;
  font-size: 36px;
  margin-top: var(--stack-md);
}
.story__points {
  display: flex;
  flex-direction: column;
}
.point {
  padding-block: var(--stack-md);
  border-top: 1px solid var(--color-outline-variant);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-on-secondary-container);
  transition: transform 0.2s;

  .material-symbols-outlined {
    transition: transform 0.2s;
  }
  &:hover .material-symbols-outlined {
    transform: translateX(4px);
  }
}
</style>

<!-- <script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const points = [
  { label: t('home.brandStory.quality'), icon: 'check_circle' },
  { label: t('home.brandStory.design'), icon: 'auto_awesome' },
  { label: t('home.brandStory.delivery'), icon: 'speed' },
];
</script>

<template>
  <section class="story">
    <div class="story__grid container">
      <div class="story__text">
        <h2 class="headline-md">{{ $t('home.brandStory.title') }}</h2>
        <p class="body-lg">{{ $t('home.brandStory.text') }}</p>
        <span class="material-symbols-outlined story__icon">local_florist</span>
      </div>
      <div class="story__points">
        <div v-for="point in points" :key="point.label" class="point">
          <span class="label-caps">{{ point.label }}</span>
          <span class="material-symbols-outlined">{{ point.icon }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.story {
  background: var(--color-sage);
  padding-block: var(--section-padding);
}
.story__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--margin-desktop);
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}
.story__text {
  display: flex;
  flex-direction: column;
  gap: var(--stack-md);
  color: #404a36;
}
.story__text p {
  opacity: 0.9;
  line-height: 1.6;
}
.story__icon {
  color: var(--color-primary);
  opacity: 0.3;
  font-size: 36px;
  margin-top: var(--stack-md);
}
.story__points {
  display: flex;
  flex-direction: column;
}
.point {
  padding-block: var(--stack-md);
  border-top: 1px solid rgba(64, 74, 54, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #404a36;
  transition: transform 0.2s;

  .material-symbols-outlined {
    transition: transform 0.2s;
  }
  &:hover .material-symbols-outlined {
    transform: translateX(4px);
  }
}
</style> -->