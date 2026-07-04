<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'success' | 'warning' | 'danger' | 'info' }>(), { variant: 'info' });
</script>

<template>
  <span :class="['badge', `badge--${variant}`]"><slot /></span>
</template>

<style scoped lang="scss">
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-transform: capitalize;
}
.badge--success { background: var(--success-bg); color: var(--success); }
.badge--warning { background: var(--warning-bg); color: var(--warning); }
.badge--danger { background: var(--danger-bg); color: var(--danger); }
.badge--info { background: var(--info-bg); color: var(--info); }
</style>


<!-- <script setup lang="ts">
withDefaults(defineProps<{ variant?: 'success' | 'warning' | 'danger' | 'info' }>(), { variant: 'info' });
</script>

<template>
  <span :class="['badge', `badge--${variant}`]"><slot /></span>
</template>

<style scoped lang="scss">
.badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
.badge--success { background: rgba(64,192,87,0.15); color: var(--success); }
.badge--warning { background: rgba(250,176,5,0.15); color: var(--warning); }
.badge--danger { background: rgba(250,82,82,0.15); color: var(--danger); }
.badge--info { background: var(--accent-light); color: var(--accent); }
</style> -->
