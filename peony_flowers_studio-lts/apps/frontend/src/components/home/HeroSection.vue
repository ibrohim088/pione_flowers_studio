<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="hero">
    <div class="hero__grid container">
      <div class="hero__content">
        <div class="hero__plate">
          <span class="hero__index">No. 01</span>
          <span class="hero__hairline" aria-hidden="true"></span>
          <span class="hero__latin">Paeonia lactiflora</span>
        </div>

        <span class="label-caps eyebrow">{{ $t('hero.eyebrow') }}</span>

        <h1 class="display-hero title">
          {{ $t('hero.title').split(' ').slice(0, -1).join(' ') }}
          <span class="title__gold">{{ $t('hero.title').split(' ').slice(-1)[0] }}</span>
        </h1>

        <p class="body-lg subtitle">{{ $t('hero.subtitle') }}</p>

        <div class="hero__actions">
          <RouterLink to="/catalog" class="cta-btn">{{ $t('hero.cta') }}</RouterLink>
          <RouterLink to="/about" class="secondary-link">
            {{ $t('hero.aboutLink') }}
            <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </div>
      </div>

      <div class="hero__stage" aria-hidden="true">
        <svg class="hero__decor" viewBox="0 0 500 560" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="petalOuter" d="M0,0 C -34,-16 -40,-58 -20,-92 C -8,-112 8,-112 20,-92 C 40,-58 34,-16 0,0 Z" />
            <path id="petalMid" d="M0,0 C -26,-14 -30,-46 -14,-72 C -5,-86 5,-86 14,-72 C 30,-46 26,-14 0,0 Z" />
            <path id="petalInner" d="M0,0 C -19,-11 -21,-33 -9,-50 C -3,-59 3,-59 9,-50 C 21,-33 19,-11 0,0 Z" />
            <path id="petalCore" d="M0,0 C -12,-7 -13,-20 -5,-29 C -2,-33 2,-33 5,-29 C 13,-20 12,-7 0,0 Z" />
            <path id="leafShape" d="M0,0 C -30,-4 -60,-16 -82,-46 C -70,-70 -46,-78 -20,-70 C -34,-52 -30,-24 0,0 Z" />

            <radialGradient id="petalShadeGold" cx="50%" cy="88%" r="85%">
              <stop offset="0%" stop-color="var(--color-primary-container, #f6dde2)" stop-opacity="0.95" />
              <stop offset="60%" stop-color="var(--color-primary)" stop-opacity="0.85" />
              <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0.55" />
            </radialGradient>

            <radialGradient id="petalShadeBlush" cx="50%" cy="90%" r="85%">
              <stop offset="0%" stop-color="#fbeef0" stop-opacity="0.95" />
              <stop offset="100%" stop-color="var(--color-primary-container, #f6dde2)" stop-opacity="0.8" />
            </radialGradient>

            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--color-secondary, #57624c)" stop-opacity="0.65" />
              <stop offset="100%" stop-color="var(--color-secondary, #57624c)" stop-opacity="0.35" />
            </linearGradient>

            <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.35" />
              <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0" />
            </radialGradient>

            <filter id="softBlur" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>

          <circle class="glow glow--main" cx="300" cy="210" r="170" fill="url(#glowGold)" filter="url(#softBlur)" />
          <circle class="glow glow--bud" cx="118" cy="320" r="90" fill="url(#glowGold)" filter="url(#softBlur)" />

          <path class="stem" d="M300 560 C 294 460, 306 380, 299 312" />
          <use href="#leafShape" class="leaf" transform="translate(296,436) rotate(18) scale(1.15)" />
          <use href="#leafShape" class="leaf leaf--soft" transform="translate(306,476) rotate(-158) scale(1.35)" />

          <g class="bloom" transform="translate(300,210)">
            <g class="ring ring--outer">
              <use href="#petalOuter" transform="rotate(4) scale(1.04)" />
              <use href="#petalOuter" transform="rotate(40) scale(0.97)" />
              <use href="#petalOuter" transform="rotate(74) scale(1.06)" />
              <use href="#petalOuter" transform="rotate(112) scale(0.95)" />
              <use href="#petalOuter" transform="rotate(148) scale(1.03)" />
              <use href="#petalOuter" transform="rotate(184) scale(0.98)" />
              <use href="#petalOuter" transform="rotate(220) scale(1.05)" />
              <use href="#petalOuter" transform="rotate(256) scale(0.96)" />
              <use href="#petalOuter" transform="rotate(292) scale(1.02)" />
              <use href="#petalOuter" transform="rotate(328) scale(1)" />
            </g>
            <g class="ring ring--mid">
              <use href="#petalMid" transform="rotate(16) scale(1.05)" />
              <use href="#petalMid" transform="rotate(54) scale(0.96)" />
              <use href="#petalMid" transform="rotate(90) scale(1.02)" />
              <use href="#petalMid" transform="rotate(126) scale(0.97)" />
              <use href="#petalMid" transform="rotate(162) scale(1.04)" />
              <use href="#petalMid" transform="rotate(198) scale(0.95)" />
              <use href="#petalMid" transform="rotate(234) scale(1.03)" />
              <use href="#petalMid" transform="rotate(270) scale(0.98)" />
              <use href="#petalMid" transform="rotate(306) scale(1.01)" />
              <use href="#petalMid" transform="rotate(342) scale(0.99)" />
            </g>
            <g class="ring ring--inner">
              <use v-for="n in 8" :key="'i' + n" href="#petalInner" :transform="`rotate(${n * 45 + 12}) scale(${1 + (n % 3) * 0.02})`" />
            </g>
            <g class="ring ring--core">
              <use v-for="n in 6" :key="'c' + n" href="#petalCore" :transform="`rotate(${n * 60 + 30})`" />
            </g>
            <circle class="center" cx="0" cy="0" r="9" />
            <circle class="center center--dot" cx="0" cy="0" r="3" />
          </g>

          <g class="stem-group--bud">
            <path class="stem stem--bud" d="M120 470 C 117 420, 125 380, 118 344" />
            <use href="#leafShape" class="leaf leaf--bud" transform="translate(116,412) rotate(198) scale(0.72)" />

            <g class="bloom bloom--bud" transform="translate(118,320) scale(0.56)">
              <g class="ring ring--outer">
                <use href="#petalOuter" transform="rotate(8) scale(1.03)" />
                <use href="#petalOuter" transform="rotate(44) scale(0.97)" />
                <use href="#petalOuter" transform="rotate(80) scale(1.05)" />
                <use href="#petalOuter" transform="rotate(116) scale(0.96)" />
                <use href="#petalOuter" transform="rotate(152) scale(1.02)" />
                <use href="#petalOuter" transform="rotate(188) scale(0.98)" />
                <use href="#petalOuter" transform="rotate(224) scale(1.04)" />
                <use href="#petalOuter" transform="rotate(260) scale(0.97)" />
                <use href="#petalOuter" transform="rotate(296) scale(1.01)" />
                <use href="#petalOuter" transform="rotate(332) scale(1)" />
              </g>
              <g class="ring ring--mid">
                <use v-for="n in 10" :key="'bm' + n" href="#petalMid" :transform="`rotate(${n * 36 + 18})`" />
              </g>
              <g class="ring ring--inner">
                <use v-for="n in 8" :key="'bi' + n" href="#petalInner" :transform="`rotate(${n * 45})`" />
              </g>
              <circle class="center" cx="0" cy="0" r="7" />
            </g>
          </g>

          <circle class="dot dot--1" cx="90" cy="110" r="5" />
          <circle class="dot dot--2" cx="60" cy="260" r="4" />
          <circle class="dot dot--3" cx="430" cy="90" r="3.5" />
          <circle class="dot dot--4" cx="410" cy="330" r="3" />
          <circle class="dot dot--5" cx="200" cy="500" r="3" />
          <circle class="sparkle sparkle--1" cx="365" cy="145" r="2" />
          <circle class="sparkle sparkle--2" cx="235" cy="120" r="1.6" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--section-padding);
  border-bottom: 1px solid var(--color-hairline);
}

.hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 8px;
  min-height: 420px;

  @media (min-width: 768px) {
    grid-template-columns: 1.05fr 0.95fr;
    min-height: 560px;
  }
}

.hero__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--stack-md);
  padding-top: 8px;
}

.hero__plate {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-on-surface-variant);
}

.hero__index {
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--color-primary);
}

.hero__hairline {
  width: 32px;
  height: 1px;
  background: var(--color-plate-line);
}

.hero__latin {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 14px;
  color: var(--color-on-surface-variant);
}

.eyebrow {
  color: var(--color-primary);
  letter-spacing: 0.15em;
  margin-top: 4px;
}

.title {
  color: var(--color-on-surface);
  margin: 0;
}

.title__gold {
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: italic;
}

.subtitle {
  color: var(--color-on-surface-variant);
  max-width: 400px;
  margin-top: 4px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--stack-md);
  margin-top: 8px;
}

.cta-btn {
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: 16px 32px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
}

.secondary-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary);
  font-weight: 500;

  .material-symbols-outlined {
    transition: transform 0.2s;
    font-size: 20px;
  }

  &:hover .material-symbols-outlined {
    transform: translateX(4px);
  }
}

/* ==== Stage: illustration bleeds past the grid edge instead of floating in its own box ==== */
.hero__stage {
  position: relative;
  z-index: 1;
  height: 280px;
  margin-inline: -8px;

  @media (min-width: 768px) {
    height: 100%;
    position: absolute;
    inset: -40px -64px 0 auto;
    width: 62%;
  }
}

.hero__decor {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.stem {
  fill: none;
  stroke: var(--color-secondary, #57624c);
  stroke-width: 2.5;
  stroke-linecap: round;
  opacity: 0.85;
}

.glow {
  mix-blend-mode: screen;
}

.leaf {
  fill: url(#leafGradient);
}

.leaf--soft {
  opacity: 0.8;
}

.leaf--bud {
  opacity: 0.7;
}

.bloom,
.bloom--bud {
  transform-box: fill-box;
  transform-origin: center;
}

.ring {
  transform-box: fill-box;
  transform-origin: center;
}

.ring--outer use {
  fill: url(#petalShadeGold);
  opacity: 0.55;
}

.ring--outer {
  animation: spinCW 70s linear infinite;
}

.ring--mid use {
  fill: var(--color-primary);
  opacity: 0.75;
}

.ring--mid {
  animation: spinCCW 56s linear infinite;
}

.ring--inner use {
  fill: url(#petalShadeBlush);
  opacity: 0.95;
}

.ring--inner {
  animation: spinCW 42s linear infinite;
}

.ring--core use {
  fill: var(--color-primary-container, #f6dde2);
  opacity: 1;
}

.ring--core {
  animation: spinCCW 30s linear infinite;
}

.center {
  fill: var(--color-primary);
  opacity: 0.9;
}

.center--dot {
  fill: #ffffff;
  opacity: 0.6;
}

.bloom--bud {
  opacity: 0.92;
}

.bloom--bud .ring--outer {
  animation-duration: 46s;
}

.bloom--bud .ring--mid {
  animation-duration: 38s;
}

.bloom--bud .ring--inner {
  animation-duration: 32s;
}

.dot {
  fill: var(--color-primary);
  opacity: 0.3;
  animation: drift 6s ease-in-out infinite;
}

.sparkle {
  fill: #ffffff;
  opacity: 0.5;
  animation: twinkle 3.5s ease-in-out infinite;
}

.sparkle--1 {
  animation-delay: -0.8s;
}

.sparkle--2 {
  animation-delay: -2.1s;
}

.dot--1 {
  animation-delay: -1s;
}

.dot--2 {
  animation-delay: -2.5s;
}

.dot--3 {
  animation-delay: -4s;
}

.dot--4 {
  animation-delay: -1.5s;
}

.dot--5 {
  animation-delay: -3s;
}

@keyframes spinCW {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes spinCCW {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
}

@keyframes drift {

  0%,
  100% {
    transform: translateY(0);
    opacity: 0.2;
  }

  50% {
    transform: translateY(-14px);
    opacity: 0.45;
  }
}

@keyframes twinkle {

  0%,
  100% {
    opacity: 0.15;
    transform: scale(0.8);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

@media (prefers-reduced-motion: reduce) {

  .ring--outer,
  .ring--mid,
  .ring--inner,
  .ring--core,
  .dot,
  .sparkle {
    animation: none;
  }
}
</style>