<template>
  <div class="about">
    <h1>{{ $t('about.title') }}</h1>
    <p>{{ $t('about.text') }}</p>
  </div>
</template>

<style scoped lang="scss">
.about { max-width: 720px; margin: 0 auto; padding: 48px 24px; }
p { color: var(--text-secondary); line-height: 1.6; }
</style>