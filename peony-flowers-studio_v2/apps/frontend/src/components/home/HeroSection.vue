<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="hero container">
    <div class="hero__grid">
      <div class="hero__content">
        <span class="label-caps eyebrow">{{ $t('hero.eyebrow') }}</span>
        <h1 class="display-lg title">{{ $t('hero.title') }}</h1>
        <p class="body-lg subtitle">{{ $t('hero.subtitle') }}</p>
        <div class="hero__actions">
          <RouterLink to="/catalog" class="cta-btn">{{ $t('hero.cta') }}</RouterLink>
          <RouterLink to="/about" class="secondary-link">
            {{ $t('hero.aboutLink') }}
            <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </div>
      </div>
      <div class="hero__image">
        <svg class="hero__decor" viewBox="0 0 500 560" aria-hidden="true">
          <defs>
            <path id="petalOuter" d="M0,0 C -28,-22 -24,-78 0,-102 C 24,-78 28,-22 0,0 Z" />
            <path id="petalMid" d="M0,0 C -22,-18 -19,-60 0,-80 C 19,-60 22,-18 0,0 Z" />
            <path id="petalInner" d="M0,0 C -16,-13 -14,-42 0,-54 C 14,-42 16,-13 0,0 Z" />
            <path id="petalCore" d="M0,0 C -10,-8 -9,-24 0,-30 C 9,-24 10,-8 0,0 Z" />
            <path id="leafShape" d="M0,0 C -38,-8 -66,-30 -78,-62 C -38,-56 -8,-32 0,0 Z" />

            <radialGradient id="petalShade" cx="50%" cy="90%" r="80%">
              <stop offset="0%" stop-color="var(--color-primary-container, #f6dde2)" stop-opacity="0.9" />
              <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0.75" />
            </radialGradient>
          </defs>

          <!-- stem + leaves for main bloom -->
          <path class="stem" d="M300 560 C 296 460, 304 380, 300 312" />
          <use href="#leafShape" class="leaf" transform="translate(298,430) rotate(20) scale(1.1)" />
          <use href="#leafShape" class="leaf" transform="translate(304,470) rotate(-160) scale(1.3)" />

          <!-- main bloom -->
          <g class="bloom" transform="translate(300,210)">
            <!-- outer ring -->
            <g class="ring ring--outer">
              <use v-for="n in 10" :key="'o' + n" href="#petalOuter" :transform="`rotate(${n * 36})`" />
            </g>

            <!-- middle ring -->
            <g class="ring ring--mid">
              <use v-for="n in 10" :key="'m' + n" href="#petalMid" :transform="`rotate(${n * 36 + 18})`" />
            </g>

            <!-- inner ring -->
            <g class="ring ring--inner">
              <use v-for="n in 8" :key="'i' + n" href="#petalInner" :transform="`rotate(${n * 45})`" />
            </g>

            <!-- core ring -->
            <g class="ring ring--core">
              <use v-for="n in 6" :key="'c' + n" href="#petalCore" :transform="`rotate(${n * 60 + 30})`" />
            </g>

            <circle class="center" cx="0" cy="0" r="10" />
          </g>

          <!-- secondary smaller bloom -->
          <g class="stem-group--bud">
            <path class="stem stem--bud" d="M120 470 C 118 420, 124 380, 118 344" />
            <use href="#leafShape" class="leaf leaf--bud" transform="translate(118,410) rotate(200) scale(0.7)" />

            <g class="bloom bloom--bud" transform="translate(118,320) scale(0.55)">
              <g class="ring ring--outer">
                <use v-for="n in 10" :key="'bo' + n" href="#petalOuter" :transform="`rotate(${n * 36})`" />
              </g>
              <g class="ring ring--mid">
                <use v-for="n in 10" :key="'bm' + n" href="#petalMid" :transform="`rotate(${n * 36 + 18})`" />
              </g>
              <g class="ring ring--inner">
                <use v-for="n in 8" :key="'bi' + n" href="#petalInner" :transform="`rotate(${n * 45})`" />
              </g>
              <circle class="center" cx="0" cy="0" r="8" />
            </g>
          </g>

          <circle class="dot dot--1" cx="90" cy="110" r="5" />
          <circle class="dot dot--2" cx="60" cy="260" r="4" />
          <circle class="dot dot--3" cx="430" cy="90" r="3.5" />
          <circle class="dot dot--4" cx="410" cy="330" r="3" />
          <circle class="dot dot--5" cx="200" cy="500" r="3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  padding-block: var(--section-padding);
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gutter);
  align-items: center;
  min-height: 320px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    min-height: 460px;
  }
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--stack-lg);
}

.eyebrow {
  color: var(--color-primary);
  letter-spacing: 0.15em;
}

.title {
  color: var(--color-on-surface);
  line-height: 1.1;
}

.subtitle {
  color: var(--color-on-surface-variant);
  max-width: 420px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--stack-md);
}

.cta-btn {
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: 16px 32px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
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

.hero__image {
  position: relative;
  height: 340px;
  max-width: 420px;
  margin-inline: auto;

  @media (min-width: 768px) {
    height: 480px;
    max-width: 100%;
    margin-inline: 0;
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
  stroke-width: 3;
  stroke-linecap: round;
}

.leaf {
  fill: var(--color-secondary, #57624c);
  opacity: 0.5;
}

.leaf--bud {
  opacity: 0.4;
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
  fill: url(#petalShade);
  opacity: 0.5;
}

.ring--outer {
  animation: spinCW 46s linear infinite;
}

.ring--mid use {
  fill: var(--color-primary);
  opacity: 0.7;
}

.ring--mid {
  animation: spinCCW 36s linear infinite;
}

.ring--inner use {
  fill: var(--color-primary);
  opacity: 0.9;
}

.ring--inner {
  animation: spinCW 28s linear infinite;
}

.ring--core use {
  fill: var(--color-primary-container, #f6dde2);
  opacity: 1;
}

.ring--core {
  animation: spinCCW 20s linear infinite;
}

.center {
  fill: var(--color-primary);
  opacity: 0.85;
}

.bloom--bud {
  opacity: 0.9;
}

.bloom--bud .ring--outer {
  animation-duration: 30s;
}

.bloom--bud .ring--mid {
  animation-duration: 24s;
}

.bloom--bud .ring--inner {
  animation-duration: 18s;
}

.dot {
  fill: var(--color-primary);
  opacity: 0.3;
  animation: drift 6s ease-in-out infinite;
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

@media (prefers-reduced-motion: reduce) {

  .ring--outer,
  .ring--mid,
  .ring--inner,
  .ring--core,
  .dot {
    animation: none;
  }
}
</style>


<!-- <script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="hero container">
    <div class="hero__grid">
      <div class="hero__content">
        <span class="label-caps eyebrow">{{ $t('hero.eyebrow') }}</span>
        <h1 class="display-lg title">{{ $t('hero.title') }}</h1>
        <p class="body-lg subtitle">{{ $t('hero.subtitle') }}</p>
        <div class="hero__actions">
          <RouterLink to="/catalog" class="cta-btn">{{ $t('hero.cta') }}</RouterLink>
          <RouterLink to="/about" class="secondary-link">
            {{ $t('hero.aboutLink') }}
            <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </div>
      </div>
      <div class="hero__image">
        <svg class="hero__decor" viewBox="0 0 500 560" aria-hidden="true">
          <defs>
            <path id="petalOuter" d="M0,0 C -28,-22 -24,-78 0,-102 C 24,-78 28,-22 0,0 Z" />
            <path id="petalMid" d="M0,0 C -22,-18 -19,-60 0,-80 C 19,-60 22,-18 0,0 Z" />
            <path id="petalInner" d="M0,0 C -16,-13 -14,-42 0,-54 C 14,-42 16,-13 0,0 Z" />
            <path id="petalCore" d="M0,0 C -10,-8 -9,-24 0,-30 C 9,-24 10,-8 0,0 Z" />
            <path id="leafShape" d="M0,0 C -38,-8 -66,-30 -78,-62 C -38,-56 -8,-32 0,0 Z" />

            <radialGradient id="petalShade" cx="50%" cy="90%" r="80%">
              <stop offset="0%" stop-color="var(--color-primary-container, #f6dde2)" stop-opacity="0.9" />
              <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0.75" />
            </radialGradient>
          </defs>


          <path class="stem" d="M300 560 C 296 460, 304 380, 300 312" />
          <use href="#leafShape" class="leaf" transform="translate(298,430) rotate(20) scale(1.1)" />
          <use href="#leafShape" class="leaf" transform="translate(304,470) rotate(-160) scale(1.3)" />


          <g class="bloom" transform="translate(300,210)">

            <g class="ring ring--outer">
              <use v-for="n in 10" :key="'o' + n" href="#petalOuter" :transform="`rotate(${n * 36})`" />
            </g>


            <g class="ring ring--mid">
              <use v-for="n in 10" :key="'m' + n" href="#petalMid" :transform="`rotate(${n * 36 + 18})`" />
            </g>


            <g class="ring ring--inner">
              <use v-for="n in 8" :key="'i' + n" href="#petalInner" :transform="`rotate(${n * 45})`" />
            </g>


            <g class="ring ring--core">
              <use v-for="n in 6" :key="'c' + n" href="#petalCore" :transform="`rotate(${n * 60 + 30})`" />
            </g>

            <circle class="center" cx="0" cy="0" r="10" />
          </g>


          <g class="stem-group--bud">
            <path class="stem stem--bud" d="M120 470 C 118 420, 124 380, 118 344" />
            <use href="#leafShape" class="leaf leaf--bud" transform="translate(118,410) rotate(200) scale(0.7)" />

            <g class="bloom bloom--bud" transform="translate(118,320) scale(0.55)">
              <g class="ring ring--outer">
                <use v-for="n in 10" :key="'bo' + n" href="#petalOuter" :transform="`rotate(${n * 36})`" />
              </g>
              <g class="ring ring--mid">
                <use v-for="n in 10" :key="'bm' + n" href="#petalMid" :transform="`rotate(${n * 36 + 18})`" />
              </g>
              <g class="ring ring--inner">
                <use v-for="n in 8" :key="'bi' + n" href="#petalInner" :transform="`rotate(${n * 45})`" />
              </g>
              <circle class="center" cx="0" cy="0" r="8" />
            </g>
          </g>

          <circle class="dot dot--1" cx="90" cy="110" r="5" />
          <circle class="dot dot--2" cx="60" cy="260" r="4" />
          <circle class="dot dot--3" cx="430" cy="90" r="3.5" />
          <circle class="dot dot--4" cx="410" cy="330" r="3" />
          <circle class="dot dot--5" cx="200" cy="500" r="3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  padding-block: var(--section-padding);
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gutter);
  align-items: center;
  min-height: 320px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    min-height: 460px;
  }
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--stack-lg);
}

.eyebrow {
  color: var(--color-primary);
  letter-spacing: 0.15em;
}

.title {
  color: var(--color-on-surface);
  line-height: 1.1;
}

.subtitle {
  color: var(--color-on-surface-variant);
  max-width: 420px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--stack-md);
}

.cta-btn {
  background: var(--color-primary-container);
  color: var(--color-on-primary);
  padding: 16px 32px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
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

.hero__image {
  position: relative;
  height: 340px;
  max-width: 420px;
  margin-inline: auto;

  @media (min-width: 768px) {
    height: 480px;
    max-width: 100%;
    margin-inline: 0;
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
  stroke-width: 3;
  stroke-linecap: round;
}

.leaf {
  fill: var(--color-secondary, #57624c);
  opacity: 0.5;
}

.leaf--bud {
  opacity: 0.4;
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
  fill: url(#petalShade);
  opacity: 0.5;
}

.ring--outer {
  animation: spinCW 46s linear infinite;
}

.ring--mid use {
  fill: var(--color-primary);
  opacity: 0.7;
}

.ring--mid {
  animation: spinCCW 36s linear infinite;
}

.ring--inner use {
  fill: var(--color-primary);
  opacity: 0.9;
}

.ring--inner {
  animation: spinCW 28s linear infinite;
}

.ring--core use {
  fill: var(--color-primary-container, #f6dde2);
  opacity: 1;
}

.ring--core {
  animation: spinCCW 20s linear infinite;
}

.center {
  fill: var(--color-primary);
  opacity: 0.85;
}

.bloom--bud {
  opacity: 0.9;
}

.bloom--bud .ring--outer {
  animation-duration: 30s;
}

.bloom--bud .ring--mid {
  animation-duration: 24s;
}

.bloom--bud .ring--inner {
  animation-duration: 18s;
}

.dot {
  fill: var(--color-primary);
  opacity: 0.3;
  animation: drift 6s ease-in-out infinite;
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

@media (prefers-reduced-motion: reduce) {

  .ring--outer,
  .ring--mid,
  .ring--inner,
  .ring--core,
  .dot {
    animation: none;
  }
}
</style> -->