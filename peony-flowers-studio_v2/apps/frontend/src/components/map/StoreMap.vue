<template>
  <div class="store-map">
    <div ref="mapEl" class="store-map__canvas"></div>

    <div v-if="status === 'loading'" class="store-map__overlay">
      <AppSpinner />
    </div>

    <div v-else-if="status === 'error'" class="store-map__overlay store-map__overlay--error">
      <span class="material-symbols-outlined">location_off</span>
      <p class="body-md">{{ $t('about.mapError') }}</p>
      <a
        v-if="address"
        class="store-map__link"
        :href="directionsUrl"
        target="_blank"
        rel="noopener"
      >
        {{ $t('about.mapOpenExternal') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AppSpinner from '../ui/AppSpinner.vue';

interface Props {
  lat: number;
  lng: number;
  address?: string;
  zoom?: number;
}

const props = withDefaults(defineProps<Props>(), {
  zoom: 16,
});

const mapEl = ref<HTMLDivElement | null>(null);
const status = ref<'loading' | 'ready' | 'error'>('loading');

// OpenStreetMap manzillari uchun bepul (API key talab qilmaydigan) yo'nalish havolasi
const directionsUrl = computed(
  () => `https://www.openstreetmap.org/directions?to=${props.lat}%2C${props.lng}`
);

function cssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

let map: L.Map | null = null;

function initMap() {
  if (!mapEl.value) {
    status.value = 'error';
    return;
  }

  try {
    const position: L.LatLngExpression = [props.lat, props.lng];

    map = L.map(mapEl.value, {
      center: position,
      zoom: props.zoom,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: false,
    });

    // CartoDB "Dark Matter" plitalar — bepul, ochiq manba (OpenStreetMap
    // ma'lumotlariga asoslangan), API key yoki billing talab qilmaydi.
    // Faqat atributsiya ko'rsatish shart (pastda avtomatik chiqadi).
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    const primaryColor = cssVar('--color-primary', '#c9a24a');
    const surfaceColor = cssVar('--color-surface', '#0a0c10');

    const pinIcon = L.divIcon({
      className: 'store-map__pin-wrapper',
      html: `<span class="store-map__pin" style="background:${primaryColor};border-color:${surfaceColor};"></span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    L.marker(position, { icon: pinIcon }).addTo(map);

    status.value = 'ready';
  } catch (err) {
    console.error('Karta yuklanmadi:', err);
    status.value = 'error';
  }
}

onMounted(initMap);

onBeforeUnmount(() => {
  map?.remove();
  map = null;
});
</script>

<style scoped lang="scss">
.store-map {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  min-height: 420px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-hairline);
  background: var(--color-surface-container-low);

  @media (min-width: 768px) {
    aspect-ratio: 16 / 9;
    min-height: 480px;
  }
}

.store-map__canvas {
  width: 100%;
  height: 100%;
}

.store-map__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--color-surface-container-low);
}

.store-map__overlay--error {
  color: var(--color-on-surface-variant);

  .material-symbols-outlined {
    font-size: 28px;
    color: var(--color-primary);
  }
}

.store-map__link {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>

<style lang="scss">
// Leaflet marker (L.divIcon) uchun global uslub — scoped bo'lishi mumkin
// emas, chunki bu element Leaflet tomonidan runtime'da yaratiladi.
.store-map__pin {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 25%, transparent);
}

// Leaflet default uslublarini loyiha mavzusiga moslashtirish
.leaflet-container {
  font-family: var(--font-body);
  background: var(--color-surface-container-low);
}
.leaflet-control-attribution {
  background: color-mix(in srgb, var(--color-surface) 80%, transparent) !important;
  color: var(--color-on-surface-variant) !important;
  font-size: 10px !important;

  a {
    color: var(--color-on-surface-variant) !important;
  }
}
.leaflet-control-zoom a {
  background: var(--color-surface-container) !important;
  color: var(--color-on-surface) !important;
  border-color: var(--color-hairline) !important;
}
.leaflet-control-zoom a:hover {
  background: var(--color-surface-container-high) !important;
}
</style>